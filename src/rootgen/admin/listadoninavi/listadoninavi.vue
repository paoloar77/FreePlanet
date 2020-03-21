<template>
    <div>
        <div class="q-my-xs q-gutter-xs q-py-xs text-center">
            <CTitleBanner class="q-pa-xs"
                          title="Navi"
                          bgcolor="bg-primary"
                          clcolor="text-white"
                          mystyle="" myclass="myshad" canopen="true">

                <q-table
                        dense
                        color="primary"
                        title="Doni Navi"
                        :data="arrdoninavi"
                        :columns="coldoninavi"
                        :Pagination.sync="MyPagination"
                        row-key="index">
                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td key="index" :props="props">
                                {{ props.row.index }}
                            </q-td>
                            <q-td key="rigacol" :props="props">
                                {{ props.row.riga }}.{{ props.row.col }}
                            </q-td>
                            <q-td key="col" :props="props">
                                {{ props.row.col }}
                            </q-td>
                            <q-td key="date_gift_chat_open" :props="props">

                                <div v-if="!!props.row.rec.mediatore.arrdonatori">
                                    {{ tools.getstrshortDate(props.row.rec.mediatore.arrdonatori[0].date_gift_chat_open)
                                    }}
                                </div>

                                <a v-if="!!props.row.rec.mediatore.recmediatore.link_chat" :href="props.row.rec.mediatore.recmediatore.link_chat" target="_blank">Link</a>
                            </q-td>
                            <q-td key="date_start" :props="props">
                                <div v-if="!!props.row.rec.mediatore.arrdonatori">
                                    {{ tools.getstrshortDate(props.row.rec.mediatore.arrdonatori[0].date_start) }}
                                </div>
                            </q-td>
                            <q-td key="mediatore" :props="props">
                                <div v-if="!!props.row.rec.mediatore.recmediatore">
                                    {{ props.row.rec.mediatore.recmediatore.name }} {{
                                    props.row.rec.mediatore.recmediatore.surname }}
                                </div>
                            </q-td>
                            <q-td key="sognatore" :props="props">
                                <div v-if="!!props.row.rec.mediatore.recsognatori[0]">
                                    {{ props.row.rec.mediatore.recsognatori[0].name }} {{
                                    props.row.rec.mediatore.recsognatori[0].surname }}
                                </div>
                            </q-td>
                            <q-td key="DoniAttesaDiConferma" :props="props">
                                <div v-if="props.row.DoniAttesaDiConferma > 0" class="DoniAttesaDiConferma">{{ props.row.DoniAttesaDiConferma }} </div>
                            </q-td>
                            <q-td key="DoniMancanti" :props="props">
                                <div v-if="props.row.DoniMancanti > 0" class="DoniMancanti">{{ props.row.DoniMancanti }}</div>
                            </q-td>
                            <q-td key="DoniConfermati" :props="props">
                                <div v-if="props.row.DoniConfermati > 0" class="DoniConfermati">{{ props.row.DoniConfermati }}</div>
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>

            </CTitleBanner>
        </div>
    </div>
</template>
<script lang="ts" src="./listadoninavi.ts">
</script>
<style lang="scss" scoped>
    @import './listadoninavi.scss';
</style>
