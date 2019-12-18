<template>
    <CMyPage title="Events" keywords="" description="" imgbackground="../../statics/images/calendario_eventi.jpg" sizes="max-height: 120px">

        <div class="q-ma-sm q-pa-xs">
            <div v-if="!showall" class="text-h6 bg-red text-white text-center q-pa-xs shadow-max">Lista delle tue
                prenotazioni agli Eventi:
            </div>

            <q-space></q-space>

            <q-toggle v-model="showPrev" :val="lists.MenuAction.SHOW_PREV_REC"
                      :label="$t('grid.showprevedit')"></q-toggle>
        </div>

        <div>
            <q-markup-table wrap-cells bordered separator="horizontal" class="listaev__table">
                <thead>
                <th>{{$t('cal.data')}}</th>
                <th>{{$t('cal.event')}}</th>
                <th v-if="!tools.isMobile()">{{$t('cal.teachertitle')}}</th>
                <th v-if="showall"><span v-if="!tools.isMobile()">{{$t('cal.selnumpeople')}}</span><span v-else>{{$t('cal.selnumpeople_short')}}</span>
                </th>
                <th>{{$t('cal.peoplebooked')}}</th>
                </thead>

                <tbody>
                <tr v-for="(event, index) in getEventList()" class="listaev listaev__table">
                    <td>
                        <div class="text-center text-blue">{{func_tools.getDateStr(event.dateTimeStart)}}</div>
                    </td>
                    <td :class="">
                        <div class="text-center boldhigh">{{ event.title }}</div>
                    </td>
                    <td v-if="!tools.isMobile()">
                        <div class="text-center">{{ getTeacherByUsername(event.teacher) }}
                        <span v-if="isValidUsername(event.teacher2)"> - {{ getTeacherByUsername(event.teacher2) }}</span>
                        </div>
                    </td>
                    <td v-if="showall">
                        <div class="text-center">{{ getNumParticipants(event, showall) }}</div>
                    </td>
                    <td class="text-center">
                        <q-btn v-if="getNumParticipants(event, showall) > 0"
                               dense
                               round
                               @click="showpeople = true; eventsel = event"
                               aria-label="Menu">
                            <q-icon name="info"/>
                        </q-btn>
                    </td>
                </tr>
                </tbody>
            </q-markup-table>
            <q-dialog v-model="showpeople">
                <q-card v-if="eventsel">
                    <q-toolbar class="bg-primary text-white" :style="`min-width: ` + tools.myheight_dialog() + `px;`">
                        <q-toolbar-title>
                            {{ eventsel.title }}
                        </q-toolbar-title>
                        <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
                    </q-toolbar>
                    <q-card-section class="q-pa-xs inset-shadow">
                        <q-markup-table wrap-cells bordered separator="horizontal" class="listaev__table">
                            <thead>
                            <th>Data</th>
                            <th>Messaggio</th>
                            <th>Num</th>
                            <th>Azione</th>
                            </thead>

                            <tbody>
                            <tr v-for="(eventbook, index) in getEventsBookedByIdEvent(eventsel._id, showall)"
                                class="listaev listaev__table">
                                <td class="text-center">
                                    <div>{{func_tools.getDateTimeShortStr(eventbook.datebooked)}}
                                    </div>
                                </td>
                                <td class="text-center">
                                    <strong>{{getNameSurnameByUserId(eventbook.userId)}}</strong> <span
                                        v-if="eventbook.msgbooking"> {{ $t('sendmsg.write') }}: </span><br>
                                    {{ eventbook.msgbooking }}
                                </td>
                                <td class="text-center">
                                    {{eventbook.numpeople}}
                                </td>
                                <td class="text-center">
                                    <q-btn flat round color="red" icon="fas fa-trash-alt" size="sm"
                                           @click="tools.CancelBookingEvent(mythis, eventsel, eventbook._id, false)"></q-btn>
                                </td>
                            </tr>
                            </tbody>
                        </q-markup-table>
                    </q-card-section>
                </q-card>
            </q-dialog>
            <div v-if="numrec === 0">
                <div v-if="!showPrev" class="text-blue text-center q-pa-xs shadow">
                    Attualmente non hai nessuna Prenotazione futura.
                </div>
                <div v-else class="text-blue text-center q-pa-xs shadow">
                    Non hai nessuna Prenotazione passata.
                </div>

            </div>

            <br>
        </div>
    </CMyPage>
</template>
<script lang="ts" src="eventlist.ts">
</script>
<style lang="scss" scoped>
    @import './eventlist.scss';
</style>
