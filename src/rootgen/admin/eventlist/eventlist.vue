<template>
  <CMyPage title="Events" keywords="" description="" imgbackground="../../statics/images/calendario_eventi.jpg"
           sizes="max-height: 120px">

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
        <th>{{ $t('cal.data') }}</th>
        <th>{{ $t('cal.event') }}</th>
        <th v-if="!tools.isMobile()">{{ $t('cal.teachertitle') }}</th>
        <th v-if="showall">
          <span v-if="!tools.isMobile()">{{ $t('cal.selnumpeople') }}</span>
          <span v-else>{{ $t('cal.selnumpeople_short') }}</span>
        </th>
        <th v-if="showall">
          {{ $t('cal.selnumpeopleLunch') }}
        </th>
        <th v-if="showall">
          {{ $t('cal.selnumpeopleDinner') }}
        </th>
        <th v-if="showall">
          {{ $t('cal.selnumpeopleDinnerShared') }}
        </th>
        <th>{{ $t('cal.peoplebooked') }}</th>
        </thead>

        <tbody>
        <tr v-for="(event, index) in getEventList()" class="listaev listaev__table">
          <td>
            <div class="text-center text-blue">{{ func_tools.getDateStr(event.dateTimeStart) }}</div>
          </td>
          <td :class="">
            <div class="text-center boldhigh">{{ event.title }}</div>
          </td>
          <td v-if="!tools.isMobile()">
            <div class="text-center">{{ getTeacherByUsername(event.teacher) }}
              <span v-if="isValidUsername(event.teacher2)"> - {{ getTeacherByUsername(event.teacher2) }}</span>
              <span v-if="isValidUsername(event.teacher3)"> - {{ getTeacherByUsername(event.teacher3) }}</span>
              <span v-if="isValidUsername(event.teacher4)"> - {{ getTeacherByUsername(event.teacher4) }}</span>
            </div>
          </td>
          <td v-if="showall">
            <div class="text-center">{{ getNumParticipants(event, showall, tools.peopleWhere.participants) }}</div>
          </td>
          <td v-if="showall">
            <div class="text-center">{{ getNumParticipants(event, showall, tools.peopleWhere.lunch) }}</div>
          </td>
          <td v-if="showall">
            <div class="text-center">{{ getNumParticipants(event, showall, tools.peopleWhere.dinner) }}</div>
          </td>
          <td v-if="showall">
            <div class="text-center">{{ getNumParticipants(event, showall, tools.peopleWhere.dinnerShared) }}</div>
          </td>

          <td class="text-center">
            <q-btn v-if="getNumParticipants(event, showall, tools.peopleWhere.participants) > 0"
                   flat
                   dense
                   color="positive"
                   rounded
                   icon="fas fa-user-check"
                   @click="showpeople = true; eventsel = event"
                   >
            </q-btn>
            <q-btn dense
                   flat
                   rounded
                   :color="!!event.note ? 'positive' : 'dark'"
                   icon="fas fa-pencil-alt"
                   @click="shownote = true; eventsel = event"
                   >
            </q-btn>
          </td>
        </tr>
        </tbody>
      </q-markup-table>
      <q-dialog v-model="shownote">
        <q-card v-if="eventsel" :style="`min-width: ` + tools.myheight_dialog() + `px;`">
          <q-toolbar class="bg-primary text-white">
            <q-toolbar-title>
              Note: {{ eventsel.title }}
            </q-toolbar-title>
            <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
          </q-toolbar>
          <q-card-section class="q-pa-xs inset-shadow">
            <q-input v-model="eventsel.note" style="min-height: 50px; " label="Note:"
                     filled dense
                     autogrow
                     type="textarea" debounce="500"
                     input-class="myinput-area"
                     @input="change_rec(eventsel)">
            </q-input>

          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-model="showpeople">
        <q-card v-if="eventsel" :style="`min-width: ` + tools.myheight_dialog() + `px;`">
          <q-toolbar class="bg-primary text-white">
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
              <th>Partec</th>
              <th>Azione</th>
              </thead>

              <tbody>
              <tr v-for="(eventbook, index) in getEventsBookedByIdEvent(eventsel._id, showall)"
                  class="listaev listaev__table">
                <td class="text-center">
                  <div>{{ func_tools.getDateTimeShortStr(eventbook.datebooked) }}
                  </div>
                </td>
                <td class="text-center">
                  <strong>{{ getNameSurnameByUserId(eventbook.userId) }}</strong> <span
                  v-if="eventbook.msgbooking"> {{ $t('sendmsg.write') }}: </span><br>
                  {{ eventbook.msgbooking }}
                </td>
                <td class="text-center">
                  <span v-if="eventbook.numpeople > 0">Partecipanti: {{ eventbook.numpeople }}<br></span>
                  <span v-if="eventbook.numpeopleLunch > 0">Pranzo: {{ eventbook.numpeopleLunch }}<br></span>
                  <span v-if="eventbook.numpeopleDinner > 0">Cena: {{ eventbook.numpeopleDinner }}<br></span>
                  <span v-if="eventbook.numpeopleDinnerShared > 0">Cena Condivisa: {{ eventbook.numpeopleDinnerShared }}<br></span>
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
<script lang="ts" src="./eventlist.ts">
</script>
<style lang="scss" scoped>
@import './eventlist.scss';
</style>
