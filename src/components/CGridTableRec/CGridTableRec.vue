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
        >


            <template v-slot:header="props">
                <q-tr :props="props">
                    <q-th
                            v-for="col in props.cols"
                            v-if="colVisib.includes(col.field)"
                            :key="col.name"
                            :props="props"
                            class="text-italic text-red text-weight-bold"
                    >
                        {{ col.label }}
                    </q-th>
                </q-tr>
            </template>

            <template v-slot:top="props">
                <div class="col-2 q-table__title">{{ mytitle }}</div>

                <!--<p style="color:red"> Rows: {{ getrows }}</p>-->

                <q-toggle v-model="funcActivated" :val="lists.MenuAction.CAN_EDIT_TABLE"
                          :label="$t('grid.editvalues')"></q-toggle>

                <q-space/>

                <!--<q-toggle v-for="(mycol, index) in mycolumns" v-model="colVisib" :val="rec.field" :label="mycol.label"></q-toggle>-->

                <q-select
                        v-model="colVisib"
                        multiple
                        borderless
                        dense
                        options-dense
                        display-value="Colonne"
                        emit-value
                        map-options
                        :options="mycolumns"
                        option-value="name"
                        style="min-width: 150px">

                </q-select>

            </template>

            <q-tr slot="body" slot-scope="props" :props="props">

                <q-td v-for="col in mycolumns" :key="col.name" :props="props" v-if="colVisib.includes(col.field)">
                    <div v-if="col.action">
                        <q-btn flat round color="red" icon="fas fa-trash-alt"
                               @click="clickFunz(props.row, col)"></q-btn>
                    </div>
                    <div v-else :class="getclassCol(col)">
                        {{ props.row[col.name] }}
                        <q-popup-edit v-if="canEdit" v-model="props.row[col.name]" :disable="col.disable"
                                      :title="col.title" buttons
                                      @save="SaveValue" @show="selItem(props.row, col.field)">
                            <q-input v-model="props.row[col.name]"/>

                        </q-popup-edit>
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
