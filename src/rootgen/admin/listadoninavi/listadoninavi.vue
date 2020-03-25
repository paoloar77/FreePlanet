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
                        :loading="loading"
                        :Pagination.sync="pagination"
                        row-key="index">
                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td key="index" :props="props">
                                {{ props.row.index }}
                            </q-td>
                            <q-td key="rigacol" :props="props">
                                {{ props.row.riga }}.{{ props.row.col }}
                            </q-td>
                            <q-td key="date_gift_chat_open" :props="props">

                                <div v-if="!!props.row.rec.donatore.arrdonatori">
                                    {{ tools.getstrshortDate(props.row.rec.donatore.arrdonatori[0].date_gift_chat_open)
                                    }}
                                </div>

                                <a v-if="!!props.row.rec.donatore.recmediatore.link_chat"
                                   :href="props.row.rec.donatore.recmediatore.link_chat" target="_blank">Link</a>

                                <div v-if="props.row.rec.donatore.recmediatore.sent_msg_howto_make_gift">(Link Inviato)</div>
                            </q-td>
                            <q-td key="date_start" :props="props">
                                <div v-if="!!props.row.rec.donatore.arrdonatori">
                                    {{ tools.getstrshortDate(props.row.rec.donatore.arrdonatori[0].date_start) }}
                                </div>
                            </q-td>
                            <q-td key="mediatore" :props="props">
                                <q-btn v-if="!!props.row.rec.donatore.recmediatore" flat rounded color="blue"
                                       :label="props.row.rec.donatore.recmediatore.name + ` ` + props.row.rec.donatore.recmediatore.surname"
                                       @click="clickseluser(props.row.rec.donatore.recmediatore)">
                                </q-btn>
                            </q-td>
                            <q-td key="sognatore" :props="props">
                                <q-btn v-if="!!props.row.rec.donatore.recsognatori[0]" flat rounded color="blue"
                                       :label="props.row.rec.donatore.recsognatori[0].name + ` ` + props.row.rec.donatore.recsognatori[0].surname"
                                       @click="clickseluser(props.row.rec.donatore.recsognatori[0])">
                                </q-btn>
                            </q-td>
                            <q-td key="donatori" :props="props">
                                <q-btn flat rounded color="blue"
                                       :label="$t('dashboard.donatori')"
                                       @click="clickdonatori(props.row.rec)">
                                </q-btn>
                            </q-td>

                            <q-td key="DoniAttesaDiConferma" :props="props">
                                <div v-if="props.row.DoniAttesaDiConferma > 0" class="DoniAttesaDiConferma">{{
                                    props.row.DoniAttesaDiConferma }}
                                </div>
                            </q-td>
                            <q-td key="DoniMancanti" :props="props">
                                <div v-if="props.row.DoniMancanti > 0" class="DoniMancanti">{{ props.row.DoniMancanti
                                    }}
                                </div>
                            </q-td>
                            <q-td key="DoniConfermati" :props="props">
                                <div v-if="props.row.DoniConfermati > 0" class="DoniConfermati">{{
                                    props.row.DoniConfermati }}
                                </div>
                            </q-td>
                            <q-td key="note" :props="props">
                                <div class="Note">
                                    <div v-if="props.row.note">{{ props.row.note }}</div>
                                    <div v-else>---</div>
                                    <q-popup-edit v-model="props.row.note" buttons @save="SaveField(props.row, 'note')">
                                        <q-field>
                                            <q-input v-model="props.row.note" />
                                        </q-field>
                                    </q-popup-edit>
                                </div>
                            </q-td>
                            <q-td key="note_interne" :props="props">
                                <div class="Note">
                                    <div v-if="props.row.note_interne">{{ props.row.note_interne }}</div>
                                    <div v-else>---</div>
                                    <q-popup-edit v-model="props.row.note_interne" buttons @save="SaveField(props.row, 'note_interne')">
                                        <q-field>
                                            <q-input v-model="props.row.note_interne" />
                                        </q-field>
                                    </q-popup-edit>
                                </div>
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>

            </CTitleBanner>

            <q-dialog v-model="showdonatori">
                <q-card v-if="selrec" :style="`min-width: `+ tools.myheight_dialog() + `px;` ">
                    <q-toolbar class="bg-primary text-white" style="min-height: 30px;">
                        <q-toolbar-title>
                            {{$t('dashboard.donatori')}}
                        </q-toolbar-title>
                        <q-btn flat round color="white" icon="close" v-close-popup clickable @click="Chiudi"></q-btn>
                    </q-toolbar>
                    <q-card-section class="inset-shadow" style="padding: 4px !important;">
                        <div class="row justify-center q-gutter-md">
                            <div>
                                <q-table
                                        dense
                                        color="primary"
                                        title="Donatori"
                                        :data="selrec.donatore.arrdonatori"
                                        :columns="coldonatori"
                                        :Pagination="pagination2"
                                        row-key="index">
                                    <template v-slot:body="props">
                                        <q-tr :props="props">
                                            <q-td key="index" :props="props">
                                                D{{ props.row.index }}
                                            </q-td>
                                            <q-td key="rigacol" :props="props">
                                                {{ props.row.riga }}.{{ props.row.col }}
                                            </q-td>
                                            <q-td key="name" :props="props">
                                                <q-btn flat rounded color="blue"
                                                       :label="props.row.name + ` ` + props.row.surname"
                                                       @click="clickseluser(props.row)">
                                                </q-btn>
                                            </q-td>
                                            <q-td key="num_tess" :props="props">
                                                {{ props.row.num_tess }}
                                            </q-td>
                                            <q-td key="date_made_gift" :props="props">
                                                {{ tools.getstrshortDateTime(props.row.date_made_gift) }}
                                            </q-td>
                                            <q-td key="made_gift" :props="props">

                                                <div v-if="deveDonare(props.row)">
                                                    <div class="row justify-center">
                                                        <q-btn v-if="!props.row.made_gift"
                                                               push
                                                               rounded
                                                               color="primary"
                                                               size="md"
                                                               :label="$t('dashboard.dono_ricevuto_3', {donatore: props.row.name })"

                                                               @click="HoRicevutoIlDono(props.row)">
                                                        </q-btn>
                                                    </div>
                                                    <q-icon v-if="props.row.made_gift" color="green" inverted size="sm"
                                                            name="fas fa-gift" class="gift"></q-icon>
                                                </div>
                                                <div v-else>
                                                    --------
                                                </div>
                                            </q-td>

                                        </q-tr>
                                    </template>
                                </q-table>

                                <div class="q-ma-sm text-center">
                                    <div>Invia un Messaggio a tutti questi Donatori:</div>
                                    <q-input type="textarea"
                                             autogrow
                                             v-model="msg_tosend" :label="$t('cal.msgbooking')"
                                             input-class="myinput-area">

                                    </q-input>

                                    <div class="row justify-center centermydiv q-gutter-sm" style="max-width: 420px;">
                                        <q-btn rounded text-color="secondary" icon="fab fa-telegram"
                                               :label="$t('dialog.sendmsg')"
                                               @click="InviaMsgADonatori()"></q-btn>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </q-dialog>
            <q-dialog v-model="showmsguser">
                <q-card v-if="seluser" :style="`min-width: `+ tools.myheight_dialog() + `px;` ">
                    <q-toolbar class="bg-primary text-white" style="min-height: 30px;">
                        <q-toolbar-title>
                            {{$t('dashboard.donatori')}}
                        </q-toolbar-title>
                        <q-btn flat round color="white" icon="close" v-close-popup clickable @click="Chiudi"></q-btn>
                    </q-toolbar>
                    <q-card-section class="inset-shadow" style="padding: 4px !important;">
                        <div class="row justify-center q-gutter-md">
                            <div>
                                <div class="q-ma-sm text-center">
                                    <div>Invia un Messaggio a {{seluser.name }} {{ seluser.surname }}:</div>
                                    <q-input type="textarea"
                                             autogrow
                                             v-model="msg_tosend_user" :label="$t('cal.msgbooking')"
                                             input-class="myinput-area">

                                    </q-input>

                                    <div class="row justify-center centermydiv q-gutter-sm" style="max-width: 420px;">
                                        <q-btn rounded text-color="secondary" icon="fab fa-telegram"
                                               :label="$t('dialog.sendmsg') + ` a ` + seluser.name + ` ` + seluser.surname"
                                               @click="InviaMsgAUser()"></q-btn>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </q-dialog>

        </div>
    </div>
</template>
<script lang="ts" src="./listadoninavi.ts">
</script>
<style lang="scss" scoped>
    @import './listadoninavi.scss';
</style>
