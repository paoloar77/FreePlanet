<template>
    <div class="q-pa-sm">
        <!--<div class="col-2 q-table__title">{{ mytitle }}</div>-->

        <!--<q-space/>-->
        <!--<p style="color:red"> Rows: {{ getrows }}</p>-->


        <q-table
                :title="mytitle"
                :data="serverData"
                :columns="mycolumns"
                :filter="filter"
                :pagination.sync="pagination"
                :row-key="colkey"
                :loading="loading"
                @request="onRequest"
                binary-state-sort
        >



            <!--<template v-slot:top="props">-->

            <q-tr slot="body" slot-scope="props" :props="props">

                <q-td v-for="col in mycolumns" :key="col.name" :props="props">
                    <div v-if="col.action">
                        <q-btn flat round color="red" icon="fas fa-trash-alt"
                               @click="col.clickfunz"></q-btn>
                    </div>
                    <div v-else>
                        {{ props.row[col.name] }}
                        <q-popup-edit v-model="props.row[col.name]" :disable="col.disable" :title="col.title" buttons
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
            <!--</template>-->
        </q-table>
    </div>
</template>
<script lang="ts" src="./CGridTableRec.ts">
</script>

<style lang="scss" scoped>
    @import './CGridTableRec.scss';
</style>
