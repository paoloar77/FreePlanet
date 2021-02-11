<template>
  <div :class="getclassCol(col)">
    <div v-if="visulabel" class="flex">
      <div v-if="visInNewRec(col)" style="flex-grow: 1;">
        <div v-if="col.fieldtype === tools.FieldType.string">
          <q-input v-model="myvalue"
                   autogrow
                   @keyup.enter.stop
                   @input="changevalRec"
                   autofocus
                   :label="col.label">
          </q-input>
        </div>
        <div v-if="col.fieldtype === tools.FieldType.date">
          <CDateTime
            :label="col.label"
            class="cursor-pointer"
            :valueDate="myvalue"
            :readonly="false"
            :minuteinterval="minuteinterval"
            :dense="true"
            @input="changevalRec"
            canEdit="true"
            @savetoclose="SaveValueInt"
            @show="OpenEdit">
          </CDateTime>
        </div>
        <div v-else-if="col.fieldtype === tools.FieldType.number">
          <q-input v-model="myvalue" type="number"
                   autofocus
                   @input="changevalRec"
                   :label="col.label"
          >

          </q-input>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="col.fieldtype === tools.FieldType.listimages">
        <CGallery :gall="row" :listimages="myvalue" :edit="isviewfield"
                  @showandsave="Savedb">

        </CGallery>
      </div>
      <div v-else-if="col.fieldtype === tools.FieldType.image">
        <CGallery :gall="row" :listimages="myvalue" :edit="isviewfield"
                  @showandsave="Savedb">

        </CGallery>
      </div>
      <div v-else-if="col.fieldtype === tools.FieldType.nationality">
        <div>
          {{ myvalue }}
        </div>
      </div>
      <div v-else-if="col.fieldtype === tools.FieldType.intcode">
        <div>
          {{ myvalue }}
        </div>
      </div>
      <div v-else>
        <!-- Edit Value -->
        <span v-if="col.fieldtype === tools.FieldType.date">
                <CDateTime
                  :label="col.label"
                  class="cursor-pointer"
                  :valueDate="myvalue"
                  :readonly="false"
                  :minuteinterval="minuteinterval"
                  :dense="true"
                  :canEdit="canEdit"
                  @savetoclose="SaveValueInt"
                  @show="OpenEdit">
                </CDateTime>
            </span>
        <span v-else-if="col.fieldtype === tools.FieldType.onlydate">
                <CDateTime
                  :label="col.label"
                  class="cursor-pointer"
                  :valueDate="myvalue"
                  :readonly="false"
                  :minuteinterval="minuteinterval"
                  :dense="true"
                  :canEdit="canEdit"
                  @savetoclose="SaveValueInt"
                  @show="OpenEdit"
                  view="date">
                </CDateTime>
            </span>
        <div v-else>
          <div>
            <div v-if="col.fieldtype === tools.FieldType.binary">
              <CMyChipList
                :type="tools.FieldType.binary"
                :value="myvalue"
                :options="db_fieldsTable.getTableJoinByName(col.jointable)"
                :optval="db_fieldsTable.getKeyByTable(col.jointable)"
                :optlab="db_fieldsTable.getLabelByTable(col.jointable)"
                :opticon="db_fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
            </div>
            <!-- Show Value -->
            <div v-else-if="col.fieldtype === tools.FieldType.multiselect">
              <CMyChipList
                :type="tools.FieldType.multiselect"
                :value="myvalue"
                :options="db_fieldsTable.getTableJoinByName(col.jointable)"
                :optval="db_fieldsTable.getKeyByTable(col.jointable)"
                :optlab="db_fieldsTable.getLabelByTable(col.jointable)"
                :opticon="db_fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
            </div>
            <div v-else-if="col.fieldtype === tools.FieldType.select">
              <CMyChipList
                myclass="text-center"
                :type="tools.FieldType.select"
                :value="myvalue"
                :options="db_fieldsTable.getTableJoinByName(col.jointable)"
                :optval="db_fieldsTable.getKeyByTable(col.jointable)"
                :optlab="db_fieldsTable.getLabelByTable(col.jointable)"
                :opticon="db_fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
            </div>
            <div v-else-if="col.fieldtype === tools.FieldType.boolean">
              <q-toggle dark color="green" v-model="myvalue" :label="col.title"
                        :disable="disable && col.name !== 'profile.saw_zoom_presentation'"
                        @input="Savedb"></q-toggle>
            </div>
            <div v-else-if="col.fieldtype === tools.FieldType.html">
              <div v-html="visuValByType(myvalue, col, row)" @click="visueditor = true">

              </div>
            </div>
            <div v-else>
              {{ visuValByType(myvalue, col, row) }}
            </div>

            <div v-if="col.fieldtype === tools.FieldType.html">

              <CMyEditor v-if="visueditor" :value.sync="myvalue" :title="col.title" @keyup.enter.stop
                         @showandsave="Savedb" @annulla="visueditor=false">

              </CMyEditor>
            </div>
            <q-popup-edit
              v-if="canEdit && col.fieldtype !== tools.FieldType.html"
              v-model="myvalue"
              :disable="col.disable"
              :title="col.title"
              buttons
              persistent
              @save="SaveValueInt"
              @show="OpenEdit">

              <div v-if="col.fieldtype === tools.FieldType.boolean">
                <q-checkbox v-model="myvalue" :label="col.title">
                </q-checkbox>
                {{ visuValByType(myvalue, col, row) }}
              </div>
              <div v-else-if="col.fieldtype === tools.FieldType.string">
                <q-input v-model="myvalue"
                         autogrow
                         @keyup.enter.stop
                         autofocus>

                </q-input>
              </div>
              <div v-else-if="col.fieldtype === tools.FieldType.password">
                <q-input v-model="myvalue"
                         type="password"
                         @keyup.enter.stop
                         autofocus>

                </q-input>
              </div>
              <div v-else-if="col.fieldtype === tools.FieldType.number">
                <q-input v-model="myvalue" type="number"
                         autofocus>

                </q-input>
              </div>
              <div v-else-if="col.fieldtype === tools.FieldType.binary">
                <CMyToggleList :label="col.title"
                               :options="db_fieldsTable.getTableJoinByName(col.jointable)"
                               :value.sync="myvalue"
                               :optval="db_fieldsTable.getKeyByTable(col.jointable)"
                               :optlab="db_fieldsTable.getLabelByTable(col.jointable)">
                </CMyToggleList>
              </div>
              <div v-else-if="col.fieldtype === tools.FieldType.select">
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
                  >

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

                <vue-tel-input
                  @country-changed="intcode_change"
                  v-model="myvalue"
                  :placeholder="$t('reg.cell')"
                  :enabledCountryCode="true"
                  inputClasses="clCell"
                  wrapperClasses="clCellCode">
                </vue-tel-input>

              </div>
              <div v-else-if="col.fieldtype === tools.FieldType.multiselect">
                <div>join: {{ col.jointable }}</div>

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
                  @input="changeCol">

                </q-select>
              </div>
            </q-popup-edit>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./CMyPopupEdit.ts">
</script>

<style lang="scss" scoped>
@import './CMyPopupEdit.scss';
</style>
