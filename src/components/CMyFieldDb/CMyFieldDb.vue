<template>
    <div class="text-center">
        <div class="row items-center justify-center q-gutter-md q-ma-xs">
            <div class="q-ma-xs">
                <q-field rounded outlined bg-color="orange-3" dense style="min-width:110px;">
                    <template v-slot:control>
                        <div class="self-center full-width no-outline text-center" tabindex="0">{{title}}</div>
                    </template>
                </q-field>
            </div>
            <div :class="getclassCol(col) + ` q-ma-sm q-pa-sm col-grow rounded-borders`" style="border: 1px solid #bbb">
                <div v-if="type === tools.FieldType.date">
                    <CDateTime
                            :label="col.label"
                            class="cursor-pointer"
                            :value.sync="myvalue"
                            :readonly="false"
                            :dense="true"
                            :canEdit="canEdit"
                    >
                    </CDateTime>
                </div>
                <div v-else :class="mycl">
                    <div v-if="type === tools.FieldType.binary">
                        <CMyChipList
                                :type="tools.FieldType.binary"
                                :value="myvalue"
                                :options="db_fieldsTable.getTableJoinByName(col.jointable)"
                                :optval="db_fieldsTable.getKeyByTable(col.jointable)"
                                :optlab="db_fieldsTable.getLabelByTable(col.jointable)"
                                :opticon="db_fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
                    </div>
                    <!-- Show Value -->
                    <div v-else-if="col.fieldtype === tools.FieldType.nationality">
                      <q-input
                        input-class="cursor-pointer text-center"
                        :readonly="true"
                        v-model="countryname"
                        rounded
                        dense
                        debounce="1000"
                        >

                        <div class="hidden">
                          <vue-country-code
                            :defaultCountry="myvalue"
                            :disabledFetchingCountry="true"
                            @onSelect="selectcountry"
                            :preferredCountries="tools.getprefCountries"
                            :dropdownOptions="{ disabledDialCode: true }">

                          </vue-country-code>
                        </div>

                      </q-input>
                    </div>
                    <div v-else-if="col.fieldtype === tools.FieldType.intcode">

                      {{ myvalue }}

                    </div>
                    <div v-else-if="type === tools.FieldType.multiselect">
                        <CMyChipList
                                :type="tools.FieldType.multiselect"
                                :value="myvalue"
                                :options="db_fieldsTable.getTableJoinByName(col.jointable)"
                                :optval="db_fieldsTable.getKeyByTable(col.jointable)"
                                :optlab="db_fieldsTable.getLabelByTable(col.jointable)"
                                :opticon="db_fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
                    </div>
                    <div v-else-if="type === tools.FieldType.html">
                        <div v-html="myvalprinted">

                        </div>
                    </div>
                    <div v-else-if="type === tools.FieldType.boolean">
                        <q-toggle dark color="green" v-model="myvalue" :label="col.title"
                                  @input="savefield"></q-toggle>
                    </div>
                    <div v-else>
                        {{ myvalprinted }}
                    </div>

                    <q-popup-edit
                            v-if="(canEdit && type !== tools.FieldType.boolean) && !disable"
                            v-model="myvalue"
                            :disable="col.disable"
                            :title="col.title"
                            @save="savefield"
                            buttons
                    >

                        <div v-if="type === tools.FieldType.boolean">
                            <q-checkbox v-model="myvalue" :label="col.title">
                            </q-checkbox>
                            {{ visuValByType(myvalue) }}
                        </div>
                        <div v-else-if="type === tools.FieldType.string">
                            <q-input v-model="myvalue"

                                     autogrow
                                     @keyup.enter.stop
                                     autofocus>

                            </q-input>
                        </div>
                        <div v-else-if="type === tools.FieldType.password">
                            <q-input v-model="myvalue"
                                     type="password"
                                     @keyup.enter.stop
                                     autofocus>

                            </q-input>
                        </div>
                        <div v-else-if="type === tools.FieldType.number">
                            <q-input v-model="myvalue" type="number"
                                     autofocus>

                            </q-input>
                        </div>
                        <div v-else-if="type === tools.FieldType.binary">
                            <CMyToggleList :label="col.title"
                                           :options="db_fieldsTable.getTableJoinByName(col.jointable)"
                                           :value.sync="myvalue"
                                           :optval="db_fieldsTable.getKeyByTable(col.jointable)"
                                           :optlab="db_fieldsTable.getLabelByTable(col.jointable)">
                            </CMyToggleList>
                        </div>
                        <div v-else-if="type === tools.FieldType.html">
                            <CMyEditor :value.sync="myvalue" :title="title" @keyup.enter.stop>

                            </CMyEditor>
                        </div>
                        <div v-else-if="type === tools.FieldType.select">
                            <CMySelect :label="col.title"
                                       :value.sync="myvalue"
                                       :optval="db_fieldsTable.getKeyByTable(col.jointable)"
                                       :optlab="db_fieldsTable.getLabelByTable(col.jointable)"
                                       :options="db_fieldsTable.getTableJoinByName(col.jointable)"
                                       :useinput="false">
                            </CMySelect>
                        </div>
                        <div v-else-if="col.fieldtype === tools.FieldType.nationality">
                          <div class="justify-center q-gutter-sm clgutter q-mt-sm">
                            <q-input
                              v-model="countryname"
                              :readonly="true"
                              rounded dense
                              debounce="1000"
                              :label="title">

                              <template v-slot:prepend>
                                <div style="font-size: 1rem;">
                                <vue-country-code
                                  :defaultCountry="myvalue"
                                  :disabledFetchingCountry="true"
                                  @onSelect="selectcountry"
                                  :preferredCountries="tools.getprefCountries"
                                  :dropdownOptions="{ disabledDialCode: true }">

                                </vue-country-code>
                                </div>
                              </template>
                            </q-input>
                            <div style="height: 180px;">

                            </div>
                          </div>
                        </div>
                        <div v-else-if="col.fieldtype === tools.FieldType.intcode">

                          <div class="justify-center q-gutter-sm clgutter q-mt-sm">
                            <vue-tel-input
                              @country-changed="intcode_change"
                              v-model="myvalue"
                              :disabledFetchingCountry="true"
                              :preferredCountries="tools.getprefCountries"
                              :placeholder="$t('reg.cell')"
                              :enabledCountryCode="true"
                              inputClasses="clCell"
                              wrapperClasses="clCellCode">
                            </vue-tel-input>
                            <div style="height: 180px;">

                            </div>
                          </div>

                        </div>
                        <div v-else-if="type === tools.FieldType.multiselect">
                            <q-select
                                    v-model="myvalue"
                                    rounded
                                    outlined
                                    multiple
                                    dense
                                    options-dense
                                    :display-value="db_fieldsTable.getTitleByTable(col.jointable)"
                                    emit-value
                                    map-options
                                    :options="db_fieldsTable.getTableJoinByName(col.jointable)"
                                    :option-label="db_fieldsTable.getLabelByTable(col.jointable)"
                                    :option-value="db_fieldsTable.getKeyByTable(col.jointable)"
                                    style="min-width: 150px"
                            >

                            </q-select>
                        </div>

                    </q-popup-edit>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./CMyFieldDb.ts">
</script>

<style lang="scss" scoped>
    @import './CMyFieldDb.scss';
</style>
