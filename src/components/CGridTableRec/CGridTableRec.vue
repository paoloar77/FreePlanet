<template>
    <div class="q-pa-sm">

        <q-table
                :data="serverData"
                :columns="mycolumns"
                :filter="filter"
                :pagination.sync="pagination"
                :row-key="colkey"
                :loading="loading"
                @request="onRequest"
                binary-state-sort
                :visible-columns="colVisib"
                :no-data-label="nodataLabel"
                :no-results-label="noresultLabel"
        >


            <template v-slot:header="props">
                <q-tr :props="props">
                    <q-th
                            v-for="col in props.cols"
                            v-if="colVisib.includes(col.field)"
                            :key="col.name"
                            :props="props"
                            class="text-italic text-weight-bold"
                    >
                        {{ col.label }}
                    </q-th>
                </q-tr>
            </template>

            <template v-slot:top="props">
                <div class="col-2 q-table__title">{{ mytitle }}</div>

                <!--<p style="color:red"> Rows: {{ getrows }}</p>-->

                <q-input v-model="search" filled dense type="search" hint="Search" v-on:keyup.enter="doSearch">
                    <template v-slot:after>
                        <q-btn v-if="mytable" label="" color="primary" @click="refresh" icon="search"></q-btn>
                    </template>
                </q-input>
                <q-toggle v-if="mytable" v-model="funcActivated" :val="lists.MenuAction.CAN_EDIT_TABLE" class="q-mx-sm"
                          :label="$t('grid.editvalues')"></q-toggle>

                <q-btn v-if="mytable" flat dense color="primary" :disable="loading || !canEdit"
                       :label="$t('grid.addrecord')"
                       @click="createNewRecord"></q-btn>

                <q-space/>


                <!--<q-toggle v-for="(mycol, index) in mycolumns" v-model="colVisib" :val="rec.field" :label="mycol.label"></q-toggle>-->

                <q-select
                        v-if="mytable"
                        v-model="colVisib"
                        multiple
                        borderless
                        dense
                        options-dense
                        :display-value="$t('grid.columns')"
                        emit-value
                        map-options
                        :options="mycolumns"
                        option-value="name"
                        style="min-width: 150px">

                </q-select>

                <q-select v-if="tablesList"
                          v-model="tablesel"
                          rounded
                          outlined
                          dense
                          :options="tablesList"
                          :display-value="mytitle"
                          emit-value
                          @input="changeTable"
                >
                </q-select>


                <q-inner-loading :showing="spinner_visible">
                    <q-spinner-tail size="2em" color="primary"/>
                </q-inner-loading>

            </template>

            <q-tr v-if="mytable" slot="body" slot-scope="props" :props="props">
                <q-td v-for="col in mycolumns" :key="col.name" :props="props" v-if="colVisib.includes(col.field)">
                    <div v-if="col.fieldtype === tools.FieldType.date">
                        <div :class="getclassCol(col)">
                            <CDateTime
                                    class="cursor-pointer"
                                    :value.sync="props.row[col.name]"
                                    :label="col.title"
                                    :dense="true"
                                    :readonly="true"
                                    @savetoclose="SaveValue"
                                    @show="selItem(props.row, col)"
                                    >
                            </CDateTime>
                        </div>
                    </div>
                    <div v-else-if="col.fieldtype === tools.FieldType.boolean">
                        <div :class="getclassCol(col)">
                            {{ visuValByType(col, props.row[col.name]) }}
                            <q-popup-edit v-if="canEdit" v-model="props.row[col.name]" :disable="col.disable"
                                          :title="col.title" buttons
                                          @save="SaveValue" @show="selItem(props.row, col)">
                                <q-checkbox v-model="props.row[col.name]" label="">

                                </q-checkbox>
                                {{ visuValByType(col, props.row[col.name]) }}

                            </q-popup-edit>
                        </div>
                    </div>
                    <div v-else-if="col.fieldtype === tools.FieldType.binary">
                        <div :class="getclassCol(col)">

                            <CMyChipList
                                    :value="props.row[col.name]"
                                    :options="db_fieldsTable.getTableJoinByName(col.jointable)"
                                    :optval="db_fieldsTable.getKeyByTable(col.jointable)"
                                    :optlab="db_fieldsTable.getLabelByTable(col.jointable)"
                                    :opticon="db_fieldsTable.getIconByTable(col.jointable)"
                            ></CMyChipList>

                            <q-popup-edit v-if="canEdit" v-model="props.row[col.name]" :disable="col.disable"
                                          :title="col.title" buttons
                                          @save="SaveValue" @show="selItem(props.row, col)">

                                <CMyToggleList :label="col.title"
                                        :options="db_fieldsTable.getTableJoinByName(col.jointable)"
                                               :value.sync="props.row[col.name]"
                                               :optval="db_fieldsTable.getKeyByTable(col.jointable)"
                                               :optlab="db_fieldsTable.getLabelByTable(col.jointable)"

                                >

                                </CMyToggleList>

                            </q-popup-edit>
                        </div>
                    </div>
                    <div v-else>
                        <div :class="getclassCol(col)">
                            {{ visuValByType(col, props.row[col.name]) }}
                            <q-popup-edit v-if="canEdit" v-model="props.row[col.name]" :disable="col.disable"
                                          :title="col.title" buttons
                                          @save="SaveValue" @show="selItem(props.row, col)">
                                <q-input v-model="props.row[col.name]"/>

                            </q-popup-edit>
                        </div>
                    </div>
                </q-td>
                <q-td v-for="col in mycolumns" :key="col.name" :props="props" v-if="colExtra.includes(col.name)">
                    <div v-if="col.action && visCol(col)">
                        <q-btn flat round color="red" :icon="col.icon" size="sm"
                               @click="clickFunz(props.row, col)"></q-btn>
                    </div>
                </q-td>
            </q-tr>
            <!--
                            <q-btn
                                    flat round dense
                                    :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                                    @click="props.toggleFullscreen"
                                    class="q-ml-md">
                            </q-btn>
            -->
            <!---->
        </q-table>
    </div>
</template>
<script lang="ts" src="./CGridTableRec.ts">
</script>

<style lang="scss" scoped>
    @import './CGridTableRec.scss';
</style>
