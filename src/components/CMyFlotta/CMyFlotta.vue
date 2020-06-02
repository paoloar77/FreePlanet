<template>
  <div class="text-center">
    <CTitleBanner class=""
                  :title="gettitoloflotta()"
                  :bgcolor="getcolorflotta()"
                  clcolor="text-white"
                  :visible="false" mystyle="" myclass="myshad" canopen="true" @apri="apriflotta">

      <div>

        <div class="row q-pa-sm q-ma-sm">
          <div>TEST messaggio Flotta:
            <q-btn rounded text-color="secondary" icon="fab fa-telegram"
                   label="TEST MESSAGGIO"
                   @click="InviaMsgAFlotta(false)"></q-btn>

          </div>
          <div>
            Invia messaggio a TUTTA la Flotta:
            <q-btn rounded text-color="secondary" icon="fab fa-telegram"
                   :label="$t('dialog.sendmsg')"
                   @click="InviaMsgAFlotta(true)"></q-btn>
          </div>
        </div>

        <q-table
          dense
          color="primary"
          dense
          flat
          table-style="padding: 0px;"
          :title="$t('dashboard.donatori')"
          :data="arrdonatori"
          :columns="getcol"
          :nodataLabel="$t('grid.nodata')"
          :Pagination.sync="MyPagination"
          row-key="index">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-if="!tools.isMobile()" key="index" :props="props">
                {{ props.row.index }}
              </q-td>
              <q-td v-if="!tools.isMobile()" key="nave" :props="props">
                <div style="font-size:1rem;"><a :href="getlinkchat(props.row)" target="_blank">{{
                  getnavestr(props.row)}}</a></div>
              </q-td>
              <q-td key="name" :props="props">
                <q-btn v-if="!!props.row.profile" flat rounded color="blue"
                       :size="tools.getsize()"
                       :label="props.row.name + ' ' + props.row.surname"
                       @click="clickseluser(props.row)">
                </q-btn>
                <div v-if="tools.isMobile()">
                  <br>
                  {{'(' + getnavestr(props.row) + ')'}} - {{ tools.getstrshortDateTime(props.row.date_made_gift)
                  }}
                </div>
              </q-td>
              <q-td v-if="!tools.isMobile()" key="posizione" :props="props">
                {{ props.row.riga }}.{{ props.row.col }}
              </q-td>
              <q-td v-if="!tools.isMobile()" key="date_made_gift" :props="props">
                {{ tools.getstrshortDateTime(props.row.date_made_gift) }}
              </q-td>
              <q-td key="made_gift" :props="props">

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
                <div v-if="props.row.made_gift">
                  <q-chip class="glossy"
                          text-color="white"
                          color="positive"
                          icon="fas fa-gift">
                    {{ $t('dialog.ok')
                    }}
                  </q-chip>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>

      <q-dialog v-model="showmsguser">
        <q-card v-if="seluser" :style="`min-width: `+ tools.myheight_dialog() + `px;` ">
          <q-toolbar class="bg-primary text-white" style="min-height: 30px;">
            <q-toolbar-title>
              <div v-if="!!seluser">
                {{ seluser.name }} {{ seluser.surname }}
              </div>
            </q-toolbar-title>
            <q-btn flat round color="white" icon="close" v-close-popup clickable
                   @click="Chiudi"></q-btn>
          </q-toolbar>
          <q-card-section class="inset-shadow" style="padding: 4px !important;">
            <div class="row justify-center q-gutter-md">
              <div>
                <div v-if="!!seluser.profile">
                  <div v-if="!!seluser.profile.cell" class="q-ma-sm text-center clBorderWarning">
                    Whatsapp: {{seluser.profile.cell}}
                    <q-btn

                      fab-mini
                      icon="fab fa-whatsapp"
                      color="white" text-color="green" type="a"
                      size="sm"
                      :href="tools.getHttpForWhatsapp(seluser.profile.cell)"
                      target="__blank">
                    </q-btn>
                  </div>
                </div>
                <div class="q-ma-sm text-center clBorderSteps">
                  <div>TELEGRAM {{$t('ws.sitename')}} BOT {{$t('dialog.sendmsg')}} ->
                    {{seluser.name }} {{ seluser.surname }}:
                  </div>
                  <q-input type="textarea"
                           autogrow
                           v-model="msg_tosend_user" :label="$t('cal.msgbooking')"
                           input-class="myinput-area">

                  </q-input>

                  <div class="row justify-center centermydiv q-gutter-sm"
                       style="max-width: 420px;">
                    <q-btn rounded text-color="secondary" icon="fab fa-telegram"
                           :label="$t('dialog.sendmsg') + ` -> ` + seluser.name + ` ` + seluser.surname"
                           @click="InviaMsgAUser()"></q-btn>

                  </div>
                </div>

                <div v-if="isManager || isTutor">
                  <CTitleBanner class="shadow-2 rounded-borders" title="Sostituisci"
                                bgcolor="bg-positive"
                                clcolor="text-white"
                                :visible="false"
                                mystyle=" " myclass="myshad" :canopen="true">

                    <div class="column q-gutter-sm justify-center text-center">
                      <q-input
                        bg-color="lightblue"
                        v-model="username_sostituire"
                        rounded outlined
                        @blur="$v.username_sostituire.$touch"
                        :error="$v.username_sostituire.$error"
                        @keydown.space="(event) => event.preventDefault()"
                        maxlength="20"
                        debounce="1000"

                        label="Username Nuova Persona:">

                        <template v-slot:prepend>
                          <q-icon name="person"/>
                        </template>

                      </q-input>

                      <q-btn rounded color="warning" icon="fab fa-find"
                             text-color="black"
                             label="Cerca il primo Disponibile"
                             @click="TrovaUserFree()"></q-btn>
                      <div v-if="!!userfreestr">
                        <q-field
                          stack-label
                          dense
                        >
                          <template v-slot:control>
                            <div class="text-center" tabindex="0">{{userfreestr}}</div>
                          </template>

                        </q-field>
                      </div>

                      <q-toggle v-model="deleteUser"
                                :label="'Elimina ' + seluser.name + ' ' + seluser.surname"></q-toggle>
                      <q-toggle v-model="AddImbarco"
                                label="Aggiungi Destinatario (senza spostarlo da altre Navi)"></q-toggle>
                      <q-toggle v-model="notifBot" :label="$t('dashboard.sendnotification')"></q-toggle>


                      <q-btn class="q-ma-sm" rounded color="positive" text-color="white"
                             icon="fas fa-gift"
                             label="Sostituisci"
                             :disabled='!allowSubmit'
                             @click="SostituisciUtente(seluser, username_sostituire, getnotifBotTxt)"></q-btn>
                    </div>
                  </CTitleBanner>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>

    </CTitleBanner>
  </div>
</template>

<script lang="ts" src="./CMyFlotta.ts">
</script>

<style lang="scss" scoped>
  @import './CMyFlotta.scss';
</style>
