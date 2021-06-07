<template>
  <div class="q-pa-xs" v-if="isfinishLoading">
    <div class="centermydiv q-ma-sm" style="text-align: center">
      <q-btn v-if="mytable && visButtRow" rounded dense color="primary"
             size="lg"
             :label="getlabelAddRow"
             @click="createNewRecordDialog"></q-btn>
    </div>

    <q-table
      flat
      bordered
      class="my-sticky-header-table"
      :data="serverData"
      :columns="mycolumns"
      :filter="myfilter"
      :pagination.sync="pagination"
      :row-key="colkey"
      :loading="loading"
      @request="onRequest"
      @selection="selectionclick"
      binary-state-sort
      :visible-columns="colVisib"
      :no-data-label="nodataLabel"
      :no-results-label="noresultLabel"
      :selected-rows-label="getSelectedString"
      selection="single"
      :selected.sync="selected">

      <template v-slot:header="props">

        <q-tr :props="props">
          <q-th>

          </q-th>
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
        <div class="q-table__title" style="min-width: 150px;">{{ mytitle }}</div>

        <!--<p style="color:red"> Rows: {{ getrows }}</p>-->

        <q-input v-model="search" filled dense type="search" debounce="500" hint="Search"
                 v-on:keyup.enter="doSearch">
          <template v-slot:after>
            <q-btn v-if="mytable" label="" color="primary" @click="refresh" icon="search"></q-btn>
          </template>
        </q-input>
        <q-toggle v-if="mytable" v-model="canEdit" :disable="disabilita" :val="lists.MenuAction.CAN_EDIT_TABLE"
                  class="q-mx-sm"
                  :label="$t('grid.editvalues')" @input="changefuncAct">
        </q-toggle>

        <q-btn v-if="mytable" flat dense color="primary" :disable="loading || !canEdit"
               :label="$t('grid.addrecord')"
               @click="createNewRecord">

        </q-btn>

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
          º
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

        <div class="row">
          <q-toggle v-for="(filter, index) of arrfilters"
                    :key="index"
                    v-model="myfilterand" :disable="filter.hide"
                    :val="filter.value"
                    :label="filter.label">

          </q-toggle>
        </div>
      </template>

      <template v-slot:body="props">

        <q-tr :props="props" class="trclass">
          <q-td auto-width class="tdclass">
            <q-checkbox dense v-model="props.selected"></q-checkbox>
          </q-td>
          <q-td v-for="col in mycolumns" :key="col.name" :props="props"
                v-if="colVisib.includes(col.field + col.subfield)" class="tdclass">
            <div :class="getclrow(props.row)">
              <CMyPopupEdit :canEdit="canEdit"
                            :disable="disabilita"
                            :col="col"
                            :row.sync="props.row"
                            :field="col.field"
                            :subfield="col.subfield"
                            minuteinterval="1"
                            @save="SaveValue"
                            @show="selItem(props.row, col)"
                            @showandsave="showandsel">

              </CMyPopupEdit>
            </div>
          </q-td>
          <q-td v-for="col in mycolumns" :key="col.name" :props="props" v-if="colExtra.includes(col.name)"
                class="tdclass">
            <div v-if="col.action && visCol(col)">
              <q-btn flat round color="red" :icon="col.icon" size="sm"
                     @click="clickFunz(props.row, col)"></q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>

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

      <div v-if="(prop_mytable === 'users') && tools.appid() === '7'">
        <CMyDashboard :username="getusernamesel">

        </CMyDashboard>
      </div>

      <CTitleBanner title="Record:"></CTitleBanner>

      <div class="q-ma-xs q-pa-xs text-center rounded-borders q-list--bordered"
           v-for="mycol in mycolumns" :key="mycol.name"
           v-if="colVisib.includes(mycol.field + mycol.subfield)">
        <div class="row items-center justify-center q-gutter-md q-ma-xs">
          <div class="q-ma-xs">
            <q-field rounded outlined bg-color="orange-3" dense>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{ mycol.label }}</div>
              </template>
            </q-field>
          </div>
          <div class="q-ma-sm q-pa-sm colmodif col-grow rounded-borders " style="border: 1px solid #bbb"
               @click="colclicksel = mycol">
            <CMyPopupEdit :canEdit="true"
                          :disable="disabilita"
                          view="field"
                          :col="mycol"
                          :showall="true"
                          :row="rowclicksel"
                          :field="mycol.field"
                          :subfield="mycol.subfield"
                          @save="SaveValdb"
                          @show="selItem(rowclicksel, mycol)"
                          @showandsave="showandsel"
                          @annulla="annulla">

            </CMyPopupEdit>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="newRecordBool" @hide="hidewindow">
      <q-card :style="`min-width: `+ tools.myheight_dialog() + `px;`">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>
            {{ mytitle }}
          </q-toolbar-title>
          <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
        </q-toolbar>
        <q-card-section class="inset-shadow">
          <div v-for="col in mycolumns" :key="col.name"
               v-if="colVisib.includes(col.field + col.subfield)">
            <div>

              <CMyPopupEdit :canEdit="true"
                            :col="col"
                            :row.sync="newRecord"
                            :field="col.field"
                            :subfield="col.subfield"
                            minuteinterval="1"
                            :visulabel="true"
                            @save="SaveValue"
                            @show="selItem(newRecord, col)"
                            @showandsave="showandsel">

              </CMyPopupEdit>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat :label="$t('dialog.ok')" color="primary" @click="saveNewRecord"></q-btn>
          <q-btn flat :label="$t('dialog.cancel')" color="primary" v-close-popup @click="annulla"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts" src="./CGridTableRec.ts">
</script>

<style lang="scss">
@import './CGridTableRec.scss';
</style>
