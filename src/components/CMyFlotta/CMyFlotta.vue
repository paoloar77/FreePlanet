<template>
  <div class="text-center">
    <CTitleBanner v-if="!!flotta" class=""
                  :title="gettitoloflotta()"
                  :bgcolor="getcolorflotta()"
                  clcolor="text-white"
                  :visible="isaperto" mystyle="" myclass="myshad" canopen="true" @apri="apriflotta">

      <div v-if="loading" class="q-ma-md text-center" style="height: 50px;">
        <q-spinner-hourglass size="50px" color="primary"></q-spinner-hourglass>
      </div>

      <p v-if="flotta.provvisoria" class="text-center" style="color:red; font-weight: bold; font-size: 1.5rem;">
        NAVE <span v-if="flotta.provvisoria">TEMPORANEA</span><span v-else>DEFINITIVA</span>
      </p>

      <div class="row">
        <CDateTime
          label="Data Inizio"
          class="cursor-pointer"
          :value.sync="date_start"
          :readonly="false"
          :minuteinterval="30"
          :dense="true"
          :canEdit="true"
          @savetoclose="change_field('date_start')">
        </CDateTime>

        <CDateTime
          label="Data Fine"
          class="cursor-pointer"
          :value.sync="date_close"
          :readonly="false"
          :minuteinterval="30"
          :dense="true"
          :canEdit="true"
          @savetoclose="change_field('date_close')">
        </CDateTime>
      </div>

      <q-tabs
        v-model="tabflotta"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="messaggi" icon="fas fa-comments" label="Messaggi"></q-tab>
        <q-tab name="flotta" icon="fas fa-ship" label="Flotta"></q-tab>
        <q-tab name="attivita" icon="fas fa-ship" label="Attività Eseguite"></q-tab>
      </q-tabs>


      <q-tab-panels v-model="tabflotta" animated>
        <q-tab-panel name="messaggi">

          <div class="row q-ma-md">
            <q-input v-model="tutor1" label="Tutor 1:"
                     filled dense
                     debounce="1000"
                     @input="change_field('tutor1')">

            </q-input>
            <q-input v-model="tutor2" label="Tutor 2:"
                     filled dense
                     debounce="1000"
                     @input="change_field('tutor2')">

            </q-input>
            <q-input v-model="tutor3" label="Tutor 3:"
                     filled dense
                     debounce="1000"
                     @input="change_field('tutor3')">

            </q-input>
            <q-input v-model="tutorslo" label="Tutor per Sloveni:"
                     filled dense
                     debounce="1000"
                     @input="change_field('tutorslo')">

            </q-input>
          </div>

          <div class="justify-sm-start q-ma-md">
            <q-input v-model="payeer_id" style="max-width: 300px;" label="ID Payeer:"
                     filled dense
                     :readonly="true"
                     debounce="1000"
                     @input="change_field('payeer_id')">

            </q-input>
            <q-input v-model="advcash_id" style="max-width: 300px;" label="ID Advanced Cash:"
                     filled dense
                     :readonly="true"
                     debounce="1000"
                     @input="change_field('advcash_id')">

            </q-input>
            <q-input v-model="email_paypal" style="max-width: 300px;" label="Email Paypal:"
                     filled dense
                     :readonly="true"
                     debounce="1000"
                     @input="change_field('email_paypal')">

            </q-input>
            <q-input v-model="revolut" style="max-width: 300px;" label="Revolut:"
                     filled dense
                     :readonly="true"
                     debounce="1000"
                     @input="change_field('revolut')">

            </q-input>
            <q-input standout bottom-slots
                     v-model="link_payment" style="max-width: 400px;" label="Link MoneyBox PayPal:"
                     :readonly="true"
                     debounce="1000"
                     filled dense
                     @input="change_link_payment">

              <q-btn round dense flat icon="send"
                     type="a" :href="tools.getlinkstd(link_payment)"
                     target="_blank" color="primary">
              </q-btn>
            </q-input>
            <q-input v-model="note_payment" style="max-width: 400px;" label="Note Aggiuntive Pagamento:"
                     filled dense
                     debounce="1000" dense
                     :readonly="true"
                     autogrow
                     @input="change_field('note_payment')">
            </q-input>
            <br>
            <div class="justify-center" style="max-width: 500px;">
              <q-input standout bottom-slots
                       filled dense
                       v-model="link_superchat" style="max-width: 400px;" label="Link per Super Chat:"
                       debounce="1000"
                       @input="change_link_superchat">

                <q-btn round dense flat icon="send"
                       type="a" :href="link_superchat"
                       target="_blank" color="primary">
                </q-btn>

              </q-input>
            </div>
          </div>

          <q-toggle v-model="inviaemail" label="Invia anche tramite Email"></q-toggle>

          <q-tabs
            v-model="tabmsg"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="sognatore" icon="fas fa-ship" label="Sognatore"></q-tab>
            <q-tab name="mediatore" icon="fas fa-ship" label="Mediatore"></q-tab>
            <q-tab name="donatori" icon="fas fa-ship" label="Donatori"></q-tab>
            <q-tab name="donatori_nodono" icon="fas fa-ship" label="Donatori che non hanno fatto il Dono"></q-tab>
          </q-tabs>

          <q-tab-panels v-model="tabmsg" animated>
            <q-tab-panel name="sognatore">
              <div class="row q-pa-sm q-ma-sm" style="max-width: 450px;">
                <div class="q-pa-sm">
                  <q-btn rounded text-color="secondary" icon="fab fa-telegram"
                         label="TEST Messaggio a Sognatore"
                         @click="InviaMsgAFlotta(false, tools.TipoMsg.SEND_MSG_A_SOGNATORE, 'TEST: Inviare al Sognatore?')"></q-btn>

                </div>
                <div class="q-pa-sm">
                  <q-btn rounded color="primary" icon="fab fa-telegram"
                         :label="$t('dialog.sendmsg') + ` a Sognatore`"
                         @click="InviaMsgAFlotta(true, tools.TipoMsg.SEND_MSG_A_SOGNATORE, 'Inviare al Sognatore?')"></q-btn>
                </div>
              </div>

            </q-tab-panel>
            <q-tab-panel name="mediatore">

              <div>
                <strong>MEDIATORI:</strong>
                <br>
                <div v-for="(rec, index) of arrmediatori">
                  <div class="row justify-center q-px-xs content-center" style="max-width: 350px;">
                    <div style="width: 30px;">
                      {{index + 1}}
                    </div>
                    <div :style="`color: blue; ` + getwidthnome()">
                      <q-btn v-if="!!rec.profile" flat rounded dense color="blue"
                             :size="tools.getsizesmall()"
                             :label=getnamebyrec(rec)
                             @click="viewdashboard(rec)">
                      </q-btn>
                    </div>
                    <div style="color: blue; width: 40px;">
                      <q-btn color="blue"
                             dense
                             size="md"
                             label="Msg"
                             @click="clickseluser(rec)">
                      </q-btn>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-pa-sm q-ma-sm" style="max-width: 450px;">
                <div class="q-pa-sm">
                  <q-btn rounded text-color="secondary" icon="fab fa-telegram"
                         label="TEST Messaggio Mediatori"
                         @click="InviaMsgAFlotta(false, tools.TipoMsg.SEND_MSG_A_MEDIATORI, 'TEST: Inviare ai Mediatori?')"></q-btn>

                </div>
                <div class="q-pa-sm">
                  <q-btn rounded color="primary" icon="fab fa-telegram"
                         :label="$t('dialog.sendmsg') + ` a Tutti Mediatori`"
                         @click="InviaMsgAFlotta(true, tools.TipoMsg.SEND_MSG_A_MEDIATORI, 'Inviare ai Mediatori?')"></q-btn>
                </div>
              </div>

            </q-tab-panel>
            <q-tab-panel name="donatori">
              <div class="row q-pa-sm q-ma-sm" style="max-width: 450px;">
                <div class="q-pa-sm">
                  <q-btn rounded text-color="secondary" icon="fab fa-telegram"
                         label="TEST Messaggio Donatori"
                         @click="InviaMsgAFlotta(false, tools.TipoMsg.SEND_MSG_EFFETTUA_IL_DONO, 'TEST: Inviare a tutti i Donatori?')"></q-btn>

                </div>
                <div class="q-pa-sm">
                  <q-btn rounded color="primary" icon="fab fa-telegram"
                         :label="$t('dialog.sendmsg') + ` a Tutti i Donatori`"
                         @click="InviaMsgAFlotta(true, tools.TipoMsg.SEND_MSG_EFFETTUA_IL_DONO, 'Inviare a tutti i Donatori?')"></q-btn>
                </div>
              </div>

            </q-tab-panel>
            <q-tab-panel name="donatori_nodono">
              <div class="row q-pa-sm q-ma-sm" style="max-width: 450px;">
                <div class="q-pa-sm">
                  <q-btn rounded text-color="secondary" icon="fab fa-telegram"
                         label="TEST Messaggio Donatori No Dono"
                         @click="InviaMsgAFlotta(false, tools.TipoMsg.SEND_MSG_SOLLECITO_DONATORI_NO_DONO, 'TEST: Inviare a tutti i Donatori che non hanno fatto il dono, il msg del Sollecito?')"></q-btn>

                </div>
                <div class="q-pa-sm">
                  <q-btn rounded color="primary" icon="fab fa-telegram"
                         :label="$t('dialog.sendmsg') + ` a Tutti i Donatori No Dono`"
                         @click="InviaMsgAFlotta(true, tools.TipoMsg.SEND_MSG_SOLLECITO_DONATORI_NO_DONO, 'Inviare a tutti i Donatori che non hanno fatto il dono, il msg del Sollecito?')"></q-btn>
                </div>
              </div>

            </q-tab-panel>
          </q-tab-panels>

          <div v-if="tools.isAdmin()">
            <q-field rounded outlined bg-color="orange-3" dense>
              <div class="justify-evenly" style="max-width: 300px;">
                <strong>Legenda dei codici speciali da inserire nei messaggi: </strong>
                <div>{link_paypalme}</div>
                <div>{payeer_id}</div>
                <div>{advcash_id}</div>
                <div>{link_superchat}</div>
                <div>{tutor1}</div>
                <div>{tutor2}</div>
                <div>{tutor3}</div>
                <div>{tutorslo}</div>
                <div>{date_start}</div>
                <div>{date_close}</div>
                <div>{sognatore}</div>
              </div>
            </q-field>
          </div>

        </q-tab-panel>
        <q-tab-panel name="flotta">
          <div>

            <q-toggle v-model="tuttiidoni"
                      label="Mostra Tutti i Doni">

            </q-toggle>

            <q-toggle v-model="showcommenti"
                      label="Mostra i Commenti">

            </q-toggle>

            <q-toggle v-model="showcolmodifica"
                      label="Modifica">
            </q-toggle>

            <q-toggle v-model="showcoldati"
                      label="Mostra Dati Extra">
            </q-toggle>

            <div v-if="!!flotta" class="text-evidente bordo_stondato justify-between q-pa-xs-sm">
              <div class="">
                SOGNATORE:
                <q-btn rounded color="green"
                       :label="flotta.sognatore_nomecognome + ' ' + ' (' + flotta.sognatore + ')'"
                       @click="viewdashboard({username: flotta.sognatore })">
                </q-btn>

              </div>
              <div class="">
                <div>
                  {{$t('dashboard.doni_ricevuti')}}:
                  <span class="ricevuti dati">{{getDoniConfermati()}}</span>
                </div>
              </div>
              <div class="">
                <div class="inviati">
                  {{$t('dashboard.doni_inviati_da_confermare')}}:
                  <span class="inviati dati">{{getDoniAttesaDiConferma()}}</span>
                </div>
              </div>
              <div class="">
                <div class="">
                  {{$t('dashboard.doni_mancanti')}}:
                  <span class="mancanti dati">{{getDoniMancanti()}}</span>
                </div>
              </div>

            </div>

            <q-btn
                   rounded
                   dense
                   color="primary"
                   size="md"
                   label="Copia questa Lista negli appunti"

                   @click="exportLista()">
            </q-btn>

            <div class="row">
              <div class="row justify-center q-px-xs content-center">
                <div style="width: 40px;">
                  <q-btn
                    flat
                    rounded
                    dense
                    color="primary"
                    size="md"
                    label="Num"
                    @click="setordin('num')">
                  </q-btn>
                </div>
                <div style="width: 100px;">
                  <q-btn
                    flat
                    rounded
                    dense
                    color="primary"
                    size="md"
                    label="Ora Invio"

                    @click="setordin('data')">
                  </q-btn>

                </div>
                <div style="width: 80px;">
                  Esegui
                </div>
                <div v-if="showcolmodifica" style="width: 80px;">
                  Annulla
                </div>
                <div v-if="showcoldati" style="width: 70px;">
                  Nave Posiz
                </div>
                <div v-else style="width: 40px;">
                  Nave
                </div>
                <div style="width: 30px;">
                  <q-btn
                    flat
                    rounded
                    dense
                    color="primary"
                    size="md"
                    label="Nat"

                    @click="setordin('nationality')">
                  </q-btn>
                </div>
                <div :style="getwidthnome()">
                  Nome Cognome
                </div>
                <div v-if="showcoldati" style="width: 40px;">
                  Tess
                </div>
                <div v-if="showcoldati" style="width: 40px;">
                  Msg
                </div>
                <div v-if="showcolmodifica" style="width: 60px;">
                  Sostituisci
                </div>
                <div v-if="showcommenti" style="width: 100px;">
                  Commenti
                </div>

              </div>
            </div>

            <div class="row" v-for="(rec, index) of getarr">

              <div class="row justify-center q-px-xs content-center">
                <div class="row items-center q-mx-md justify-between" style="padding: 2px;">
                  <div style="width: 40px;">
                    {{index + 1}}

                  </div>
                  <div v-if="!tools.isMobile()" style="width: 100px;">
                    {{ tools.getstrshortDateTime(rec.date_made_gift) }}
                  </div>
                  <div>
                    <div class="row justify-center">
                      <q-btn v-if="!rec.made_gift"
                             rounded
                             dense
                             color="primary"
                             size="md"
                             :label="$t('dashboard.dono_ricevuto_3', {donatore: rec.name })"

                             @click="HoRicevutoIlDono(rec, false)">
                      </q-btn>
                    </div>
                    <div v-if="rec.made_gift">
                      <q-chip class="glossy"
                              size="sm"
                              text-color="white"
                              color="positive"
                              icon="fas fa-gift">
                        {{ $t('dialog.ok')
                        }}
                      </q-chip>
                    </div>
                  </div>
                  <div v-if="showcolmodifica" style="width: 80px;">
                    <q-btn v-if="rec.made_gift || rec.date_made_gift"
                           rounded
                           dense
                           color="negative"
                           size="md"
                           label="Annulla"
                           @click="HoRicevutoIlDono(rec, true)">
                    </q-btn>
                  </div>
                  <div :style="`color: blue; width: ` + getwidthpos() + `;`">
                    <q-btn rounded color="blue"
                           flat
                           dense
                           size="md"
                           :label="getnavestr(rec)"
                           @click="Mostraplacca(tools.getRiganave(rec.riga), tools.getColnave(rec.col))">
                    </q-btn>
                  </div>
                  <div v-if="!!rec.profile" style="width: 30px;">

                    <q-avatar v-if="tools.geticon(rec.profile.nationality)" :class="tools.geticon(rec.profile.nationality)"
                              size="sm">
                    </q-avatar>
                  </div>
                  <div :style="`color: blue; ` + getwidthnome()">
                    <q-btn v-if="!!rec.profile" flat rounded dense color="blue"
                           :size="tools.getsizesmall()"
                           :label=getnamebyrec(rec)
                           @click="viewdashboard(rec)">
                    </q-btn>
                  </div>
                  <div v-if="showcoldati && !tools.isMobile()">
                    ({{ rec.num_tess }})
                  </div>
                  <div v-if="showcolmodifica" style="color: blue; width: 40px;">
                    <q-btn color="blue"
                           dense
                           size="md"
                           label="Msg"
                           @click="clickseluser(rec)">
                    </q-btn>
                  </div>
                  <div v-if="showcolmodifica" style="color: blue; width: 70px;">
                    <q-btn color="red"
                           dense
                           size="md"
                           label="Sostituisci"
                           @click="clicksostituisci(rec)">
                    </q-btn>
                  </div>
                </div>
                <div v-if="showcommenti && !!rec.commento_al_sognatore" class="wrap">
                  {{ rec.commento_al_sognatore }}
                </div>
                <div v-if="showcoldati && !!rec.ind_order" class="wrap">
                  ({{ rec.ind_order }})
                </div>
              </div>

            </div>

            <!--<q-table
              v-if="false"
              dense
              color="primary"
              dense
              flat
              table-style="padding: 0;"
              :title="$t('dashboard.donatori')"
              :data="arrdonatori"
              :columns="getcol"
              :nodataLabel="$t('grid.nodata')"
              :Pagination.sync="MyPagination"
              row-key="index">
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td v-if="!tools.isMobile()" key="nave" :props="props">
                    <div style="font-size:1rem;"><a :href="getlinkchat(props.row)" target="_blank">{{
                      getnavestr(props.row)}}</a></div>
                  </q-td>
                  <q-td key="name" :props="props">
                    <q-btn v-if="!!props.row.profile" flat rounded dense color="blue"
                           :size="tools.getsizesmall()"
                           :label="props.row.name + ' ' + props.row.surname"
                           @click="clickseluser(props.row)">
                    </q-btn>
                    <div v-if="tools.isMobile()">
                      <br>
                      {{'(' + getnavestr(props.row) + ')'}} - {{ tools.getstrshortDateTime(props.row.date_made_gift)
                      }}
                    </div>
                  </q-td>
                  <q-td v-if="!tools.isMobile()" key="num_tess" :props="props">
                    {{ props.row.num_tess }}
                  </q-td>
                  <q-td v-if="!tools.isMobile()" key="date_made_gift" :props="props">
                    {{ tools.getstrshortDateTime(props.row.date_made_gift) }}
                  </q-td>
                  <q-td key="made_gift" :props="props">

                    <div class="row justify-center">
                      <q-btn v-if="!props.row.made_gift"
                             push
                             rounded
                             dense
                             color="primary"
                             size="sm"
                             :label="$t('dashboard.dono_ricevuto_3', {donatore: props.row.name })"

                             @click="HoRicevutoIlDono(props.row)">
                      </q-btn>
                    </div>
                    <div v-if="props.row.made_gift">
                      <q-chip class="glossy"
                              size="sm"
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
            </q-table>-->
          </div>

        </q-tab-panel>
        <q-tab-panel name="attivita">
          <div class="text-left" v-html="log_attivita"></div>
        </q-tab-panel>
      </q-tab-panels>

      <q-dialog v-model="showdashboard">
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
            <CMyDashboard :username="seluser.username">

            </CMyDashboard>
          </q-card-section>
        </q-card>
      </q-dialog>
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
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-model="showsostituisci">
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
                <div v-if="isManager || isTutor">
                  <CTitleBanner class="shadow-2 rounded-borders" title="Sostituisci"
                                bgcolor="bg-positive"
                                clcolor="text-white"
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
                      <q-toggle v-model="inviaemail" label="Invia anche tramite Email"></q-toggle>

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
      <q-dialog v-model="showtesto">
        <q-card v-if="seltesto" :style="`min-width: `+ tools.myheight_dialog() + `px;` ">
          <q-toolbar class="bg-primary text-white" style="min-height: 30px;">
            <q-toolbar-title>
              Testo:
            </q-toolbar-title>
            <q-btn flat round color="white" icon="close" v-close-popup clickable @click="Chiudi"></q-btn>
          </q-toolbar>
          <q-card-section class="inset-shadow" style="padding: 4px !important;">
            <div class="">
              <div>
                <pre>{{ seltesto }}</pre>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-inner-loading id="spinner" :showing="loading">
        <q-spinner-tail
          color="primary"
          size="4em">
        </q-spinner-tail>
      </q-inner-loading>

    </CTitleBanner>
  </div>
</template>

<script lang="ts" src="./CMyFlotta.ts">
</script>

<style lang="scss" scoped>
  @import './CMyFlotta.scss';
</style>
