<template>
    <div class="q-pa-sm">

        <q-table
                :data="serverData"
                :columns="mycolumns"
                :filter="myfilter"
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
                            v-if="colVisib.includes(col.field + col.subfield)"
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

                <q-input v-model="search" filled dense type="search" debounce="500" hint="Search"
                         v-on:keyup.enter="doSearch">
                    <template v-slot:after>
                        <q-btn v-if="mytable" label="" color="primary" @click="refresh" icon="search"></q-btn>
                    </template>
                </q-input>
                <q-toggle v-if="mytable" v-model="canEdit" :val="lists.MenuAction.CAN_EDIT_TABLE" class="q-mx-sm"
                          :label="$t('grid.editvalues')" @input="changefuncAct"
                ></q-toggle>

                <q-btn v-if="mytable" flat dense color="primary" :disable="loading || !canEdit"
                       :label="$t('grid.addrecord')"
                       @click="createNewRecord"></q-btn>

                <q-space/>


                <!--<q-toggle v-for="(mycol, index) in mycolumns" v-model="colVisib" :val="rec.field" :label="mycol.label"></q-toggle>-->

                <q-select
                        v-if="mytable"
                        v-model="colVisib"
                        rounded
                        outlined
                        multiple
                        dense
                        options-dense
                        :display-value="$t('grid.columns')"
                        emit-value
                        map-options
                        :options="mycolumns"
                        option-value="name"
                        style="min-width: 150px"
                        @input="changeCol">

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
                <q-td v-for="col in mycolumns" :key="col.name" :props="props"
                      v-if="colVisib.includes(col.field + col.subfield)" @click="clickrowcol(props.row, col)">
                        <div :class="getclrow(props.row)">
                        <CMyPopupEdit :canEdit="canEdit"
                                      :col="col"
                                      :row.sync="props.row"
                                      :field="col.field"
                                      :subfield="col.subfield"
                                      @save="SaveValue"
                                      @show="selItem(props.row, col)"
                                      @showandsave="showandsel">

                        </CMyPopupEdit>
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

        <div v-if="rowclicksel">
            <CTitleBanner title="Record:"></CTitleBanner>

            <div class="q-ma-xs q-pa-xs text-center rounded-borders q-list--bordered"
                 v-for="mycol in mycolumns" :key="mycol.name"
                 v-if="colVisib.includes(mycol.field + mycol.subfield)">
                <div class="row items-center justify-center q-gutter-md q-ma-xs">
                    <div class="q-ma-xs">
                        <q-field rounded outlined bg-color="orange-3" dense>
                            <template v-slot:control>
                                <div class="self-center full-width no-outline" tabindex="0">{{mycol.label}}</div>
                            </template>
                        </q-field>
                    </div>
                    <div class="q-ma-sm q-pa-sm colmodif col-grow rounded-borders " style="border: 1px solid #bbb"
                         @click="colclicksel = mycol">
                        <CMyPopupEdit :canEdit="true"
                                      :col="mycol"
                                      :showall="true"
                                      :row="rowclicksel"
                                      :field="mycol.field"
                                      :subfield="mycol.subfield"
                                      @save="SaveValdb"
                                      @show="selItem(rowclicksel, mycol)"
                                      @showandsave="showandsel">

                        </CMyPopupEdit>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./CGridTableRec.ts">
</script>

<style lang="scss" scoped>
    @import './CGridTableRec.scss';
</style>
