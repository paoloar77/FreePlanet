<template>
  <div v-if="!!nave" class="text-center">

    <CTitleBanner v-if="!!getpartenza()" class=""
                  :title="gettitolonave"
                  :bgcolor="getcolortitle()"
                  clcolor="text-white"
                  :visible="rendivisibile"
                  mystyle="" myclass="myshad" canopen="true" @apri="apri">
      <div class="">
        <q-chip class="glossy q-ma-sm" color="orange" text-color="white" icon="star">
          {{getposizione()}}
        </q-chip>
        <div class="row items-center justify-evenly no-wrap">
          <div class="cont_pos_intest">N</div>

          <div class="cont_intestaz q-mx-sm passoint"
               v-html="$t('dashboard.nome_dei_passaggi')"></div>

          <div class="cont_intestaz titlenave">{{$t('dashboard.nave')}}</div>
          <div class="cont_intestaz datanave_int" v-html="$t('dashboard.data_partenza')"></div>
          <div class="cont_intestaz_small" v-html="$t('dashboard.doni_inviati')"></div>
        </div>

        <div v-for="rec in tragitto" :key="rec.ind">
          <div :class="`row items-center  justify-evenly ` + rec.extracl">
            <div :class="`cont_pos ` + getclpos(rec)">
              {{ rec.ind }}
            </div>
            <div v-if="rec.title_lang" class="passo">
              <div :class="rec.extracl">
                <q-chip class="glossy" :color="rec.color" text-color="white">
                  {{ $t(rec.title_lang) }}
                </q-chip>
              </div>
            </div>
            <div class="titlenave">
              <q-chip class="glossy text-small" :color="rec.color" text-color="white">
                <div class="" v-html="gettitlenave(rec.ind)"></div>
              </q-chip>
            </div>
            <div class="datanave">
              <q-chip class="glossy" :color="rec.color" text-color="white">
                {{ getdatanave(rec) }}
              </q-chip>
            </div>
            <q-icon color="green" inverted size="sm" :name="geticon(rec)" class="gift"></q-icon>
          </div>
        </div>
        <br>
        <div style="margin-bottom: 8px;"></div>

      </div>


      <q-tabs
        v-model="tabnave"
        dense
        class="bg-blue text-white shadow-2"
        indicator-color="white"
        align="center"
        narrow-indicator
        @input="changetab">
        <q-tab name="donatore" icon="fas fa-gift" :label="$t('dashboard.donatore')"></q-tab>
        <q-tab name="mediatore" icon="fas fa-comments" :label="$t('dashboard.mediatore')"></q-tab>
        <q-tab name="sognatore" icon="fas fa-gifts" :label="$t('dashboard.sognatore')"></q-tab>

      </q-tabs>

      <q-tab-panels v-model="tabnave" animated>
        <q-tab-panel name="donatore">

          <div v-if="mediatore" class="">
            <div class="q-my-sm">

              <div class="q-ma-md q-butter-sm" v-if="!!linkchatopen">
                {{$t('dashboard.gift_chat')}}:<br>
                <div class="q-ma-md">
                  <q-btn rounded color="primary" icon="fab fa-telegram"
                         :label="$t('dashboard.entra_in_gift_chat')"
                         type="a"
                         :href="linkchatopen" target="_blank"></q-btn>
                  <br>
                </div>

              </div>

              <div v-if="sonoDonatore()">
                <div v-if="sonoSecondaTessituraDonatore()"
                     v-html="$t('dashboard.sonodonatore_seconda_tessitura')">
                </div>
                <div v-else>
                  <div v-if="!FattoDono" v-html="$t('dashboard.sonodonatore')">
                  </div>

                  <div v-if="!FattoDono && !donatore_navepers.provvisoria" class="text-evidente bordo_stondato">

                    <div>{{$t('dashboard.quando_eff_il_tuo_dono')}}: <strong>{{ getGiornoDelDono()
                      }}</strong><br>
                    </div>
                    <div>
                      {{$t('dashboard.metodi_disponibili')}}:

                      <CMyChipList
                        :type="tools.FieldType.multiselect"
                        :value="getMetodoPagamentoSognatore()"
                        :options="db_fieldsTable.getTableJoinByName('paymenttypes')"
                        :optval="db_fieldsTable.getKeyByTable('paymenttypes')"
                        :optlab="db_fieldsTable.getLabelByTable('paymenttypes')"
                        :opticon="db_fieldsTable.getIconByTable('paymenttypes')"></CMyChipList>

                    </div>
                    <div>
                      {{$t('dashboard.importo')}}: <strong>33€</strong>
                    </div>
                    <br>
                  </div>
                  <div class="text-evidente2 bordo_stondato_blu2">

                    <div v-if="GiornoDelDonoArrivato && !donatore_navepers.provvisoria">

                      <q-img src="statics/images/regalo.jpg"
                             class=""
                             style="height: 150px; width: 150px;"
                             alt="regalo">
                      </q-img>

                      <div v-if="!FattoDono && !donoinviato"
                           v-html="$t('dashboard.effettua_il_dono', {email: getemailPagamentoSognatore() })">
                      </div>
                      <CTitleBanner v-if="!FattoDono  && !donoinviato" class="q-pa-xs"
                                    :title="$t('dashboard.come_inviare_regalo_con_paypal')"
                                    bgcolor="bg-primary"
                                    clcolor="text-white"
                                    myclass="myshad" canopen="true" :visible="false">

                        <CVideo myvideokey="5rp_XEV6Mzg">

                        </CVideo>

                      </CTitleBanner>
                      <div v-if="!FattoDono && !!getpaypalmePagamentoSognatore()  && !donoinviato"
                           v-html="$t('dashboard.paypal_me', {link_payment: getpaypalmePagamentoSognatore() })">
                      </div>
                      <CTitleBanner v-if="!FattoDono && !!getpaypalmePagamentoSognatore()  && !donoinviato"
                                    class="q-pa-xs"
                                    :title="$t('dashboard.come_inviare_regalo_con_paypal') + '.me'"
                                    bgcolor="bg-primary"
                                    clcolor="text-white"
                                    myclass="myshad" canopen="true" :visible="false">

                        <CVideo myvideokey="VzCy4BxQKhM">

                        </CVideo>

                      </CTitleBanner>
                      <div v-if="!FattoDono && !!getnoteaggiuntivePagamentoSognatore() && !donoinviato"
                           v-html="getnoteaggiuntivePagamentoSognatore()">
                      </div>
                      <div v-if="!FattoDono">
                        <br/>
                        <div v-if="!donoinviato">
                          {{$t('dashboard.clicca_conferma_dono')}}:<br>


                          <q-input type="textarea"
                                   input-class="myinput-area"
                                   v-model="commento_al_sognatore"
                                   autogrow
                                   :label="$t('dashboard.commento_al_sognatore')"
                          >
                          </q-input>


                          <div class="row justify-center q-ma-sm">
                            <q-btn push
                                   rounded
                                   color="positive"
                                   size="lg"
                                   :label="$t('dashboard.ho_effettuato_il_dono')"
                                   icon="fas fa-gift"
                                   @click="HoEffettuatoIlDono">
                            </q-btn>
                          </div>
                        </div>
                        <div v-else>
                          <div class="row justify-center q-ma-sm">
                            <q-chip class="glossy"
                                    text-color="green"
                                    color="white"
                                    icon="fas fa-gift">
                              {{ $t('dashboard.ho_effettuato_il_dono') }}
                            </q-chip>
                          </div>
                        </div>
                      </div>
                      <div v-if="FattoDono">
                        <q-chip class=""
                                color="white"
                                text-color="green"
                                icon="fas fa-gift">
                          {{ $t('dashboard.dono_ricevuto') }}
                        </q-chip>
                      </div>
                    </div>
                    <div v-else v-html="$t('dashboard.qui_compariranno_le_info')">
                    </div>
                  </div>
                </div>

                <div v-if="!!getsuperchat && !FattoDono"
                     class="text-evidente bordo_stondato"
                     v-html="$t('dashboard.superchat', {link_superchat: getsuperchat })">
                </div>

              </div>
              <br>

              <br>
              <div class="column justify-center items-center q-gutter-md tutor">
                <q-btn rounded color="blue"
                       class="title-nave"
                       :label="gettitledonatore(true)"
                       @click="Mostraplacca(donatore.riga, donatore.col)">
                </q-btn>

                <!--<div class="title-nave clBorderSteps">{{gettitledonatore()}}</div>-->
                <div v-if="getTutor(donatore)" class="clBorderTutor q-ma-sm selezione cursor-pointer"
                     @click="clickseluser({name: getTutor(donatore), surname: '', username: getTutor_username(donatore), profile: { cell: '' } })">
                  {{ $t('dashboard.tutor') }}: {{getTutor(donatore)}}
                </div>
              </div>

              <div class="">
                <div class="row justify-center q-gutter-md">
                  <div v-if="nave.rec.donatore.recsognatori">
                    <div v-for="(sognatore, index) in nave.rec.donatore.recsognatori"
                         :key="10+index">
                      <div :class="getclasselivello(index)">{{ getlivellostr(index, false)}}:</div>
                      <div v-if="sognatore"
                           :class="`cont_sognatore ` + getclassSelect(sognatore, true, index)">
                        {{ sognatore.name }} {{ sognatore.surname }}
                        ({{sognatore.username }})
                      </div>
                    </div>
                    <div class="">
                      <div :class="getclasselivello(3)">{{ getlivellostr(3, false)}}:</div>
                      <div
                        :class="`cont_mediatore cursor-pointer selezione ` + getclassSelect(nave.rec.donatore.recmediatore)"
                        @click="clickseluser(nave.rec.donatore.recmediatore)">
                        {{ nave.rec.donatore.recmediatore.name }} {{
                        nave.rec.donatore.recmediatore.surname }} ({{
                        nave.rec.donatore.recmediatore.username }})
                      </div>
                    </div>
                    <div class="">
                      <div :class="getclasselivello(4)">{{ getlivellostr(4, true)}}:</div>
                      <div v-for="(terra, index) in nave.rec.donatore.arrterra" :key="index">
                        <div v-if="terra" :class="`cont_donatore text-small ` + getclassSelect(terra)">
                          {{ terra.name }} {{ terra.surname }} ({{ terra.username }}) - {{
                          terra.riga}}.{{terra.col}} <br>
                        </div>
                      </div>
                    </div>
                    <div class="">
                      <div :class="getclasselivello(5)">{{ getlivellostr(5, false)}}:</div>
                      <div v-for="(aria, index) in nave.rec.donatore.arraria" :key="index">
                        <div v-if="aria" :class="`cont_donatore text-small ` + getclassSelect(aria)">
                          {{ aria.name }} {{ aria.surname }} ({{aria.username }}) - {{aria.riga}}.{{aria.col}}<br>
                        </div>
                      </div>
                    </div>
                    <div :class="getclasselivello(6)">{{ getlivellostr(6)}}:</div>
                    <div v-for="(donatore, index) in nave.rec.donatore.arrdonatori" :key="index">

                      <div v-if="donatore"
                           :class="`cont_donatore text-small row ` + getclassSelect(donatore)"
                           @click="clickseluser(donatore)">
                        <div>
                          {{ getindex(donatore, index + 1) }} - {{ donatore.name }} {{
                          donatore.surname }} ({{
                          donatore.username }}) - {{
                          donatore.riga}}.{{donatore.col}} <span
                          v-if="isAdmin"> [ord:{{ donatore.ind_order }}]</span><br>

                        </div>
                        <div>
                          <q-icon v-if="donatore.made_gift" color="green" inverted size="sm"
                                  name="fas fa-gift" class="gift"></q-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="mediatore">
          <div v-if="mediatore" class="">
            <div class="q-ma-sm">
              <div class="column justify-center items-center q-gutter-md tutor">
                <q-btn rounded color="blue"
                       class="title-nave"
                       :label="gettitlemediatore(true)"
                       @click="Mostraplacca(donatore.riga, donatore.col)">
                </q-btn>

                <!--<div class="title-nave clBorderSteps" v-html="gettitlemediatore(true)"></div>-->
                <div v-if="getTutor(mediatore)" class=" clBorderTutor q-ma-sm selezione cursor-pointer"
                     @click="clickseluser({name: getTutor(mediatore), surname: '', username: getTutor_username(mediatore), profile: { cell: '' } })">
                  {{ $t('dashboard.tutor') }}: {{getTutor(mediatore)}}
                </div>
              </div>

              <div v-if="isDefinitivaMediatore()" class="q-my-md">
                <div class="text-left" v-html="gettesto()"></div>

                <!--
                <div>
                  <q-input v-model="link_chat" :label="$t('dashboard.link_chat')"
                           debounce="1000"
                           input-class="myinput-area"
                           @input="change_link_chat">

                  </q-input>

                  <div class="row justify-center centermydiv q-gutter-sm" style="max-width: 420px;">
                    <q-btn rounded text-color="secondary" icon="fab fa-telegram"
                           :label="$t('dashboard.controlla_donatori')"
                           @click="InviaLinkChatADonatori(false)"></q-btn>

                    <q-btn rounded text-color="primary" icon="fab fa-telegram"
                           :disable="!linkchatesiste"
                           :label="$t('dashboard.invia_link_chat')"
                           @click="InviaLinkChatADonatori(true)"></q-btn>

                  </div>
                </div>-->

              </div>

              <div class="">
                <div class="row justify-center q-gutter-md">
                  <div v-if="nave.rec.mediatore.recsognatori">
                    <div v-for="(sognatore, index) in nave.rec.mediatore.recsognatori"
                         :key="10+index">
                      <div :class="getclasselivello(index)">{{ getlivellostr(index, false)}}:</div>
                      <div v-if="sognatore"
                           :class="`cont_sognatore ` + getclassSelect(sognatore, true, index)">
                        {{ sognatore.name }} {{ sognatore.surname }}
                        ({{sognatore.username }})
                      </div>
                    </div>
                    <div class="">
                      <div :class="getclasselivello(3)">{{ getlivellostr(3, false)}}:</div>
                      <div
                        :class="`cont_mediatore cursor-pointer selezione ` + getclassSelect(nave.rec.mediatore.recmediatore)"
                        @click="clickseluser(nave.rec.mediatore.recmediatore)">
                        {{ nave.rec.mediatore.recmediatore.name }} {{
                        nave.rec.mediatore.recmediatore.surname }} ({{
                        nave.rec.mediatore.recmediatore.username }})
                      </div>
                    </div>
                    <div class="">
                      <div :class="getclasselivello(4)">{{ getlivellostr(4, true)}}:</div>
                      <div v-for="(terra, index) in nave.rec.mediatore.arrterra" :key="index">
                        <div v-if="terra" :class="`cont_donatore text-small ` + getclassSelect(terra)">
                          {{ terra.name }} {{ terra.surname }} ({{
                          terra.username
                          }}) - {{
                          terra.riga}}.{{terra.col}}<br>
                        </div>
                      </div>
                    </div>
                    <div class="">
                      <div :class="getclasselivello(5)">{{ getlivellostr(5, false)}}:</div>
                      <div v-for="(aria, index) in nave.rec.mediatore.arraria" :key="index">
                        <div v-if="aria" :class="`cont_donatore text-small ` + getclassSelect(aria)">
                          {{ aria.name }} {{ aria.surname }} ({{
                          aria.username
                          }}) - {{
                          aria.riga}}.{{aria.col}}<br>
                        </div>
                      </div>
                    </div>
                    <div :class="getclasselivello(6)">{{ getlivellostr(6)}}:</div>
                    <div v-for="(donatore, index) in nave.rec.mediatore.arrdonatori" :key="index">

                      <div v-if="donatore"
                           :class="`cont_donatore text-small row ` + getclassSelect(donatore)"
                           @click="clickseluser(donatore)">
                        <div>
                          {{ getindex(donatore, index + 1) }} - {{ donatore.name }} {{
                          donatore.surname }} ({{
                          donatore.username }}) - {{
                          donatore.riga}}.{{donatore.col}}<br>

                        </div>
                        <div>
                          <q-icon v-if="donatore.made_gift" color="green" inverted size="sm"
                                  name="fas fa-gift" class="gift"></q-icon>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="sognatore">
          <div v-if="mediatore" class="">
            <div v-if="sonoSognatore" class="q-ma-sm">
              <div class="text-evidente bordo_stondato justify-between q-pa-xs-sm">
                <div class="">
                  <div>
                    {{$t('dashboard.doni_ricevuti')}}:
                  </div>
                  <div class="ricevuti dati">{{getDoniConfermati()}}</div>
                </div>
                <div class="">
                  <div class="inviati">
                    {{$t('dashboard.doni_inviati_da_confermare')}}:
                  </div>
                  <div class="inviati dati">{{getDoniAttesaDiConferma()}}</div>
                </div>
                <div class="">
                  <div class="">
                    {{$t('dashboard.doni_mancanti')}}:
                  </div>
                  <div class="mancanti dati">{{getDoniMancanti()}}</div>
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
                    <q-td v-if="!tools.isMobile()" key="commento_al_sognatore" :props="props">
                      {{ props.row.commento_al_sognatore }}
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>

      <!--<CTitleBanner v-if="!!getpartenza()" class=""
                    :title="titolonave()"
                    :bgcolor="getcolortitle()"
                    clcolor="text-white"
                    mystyle="" myclass="myshad" canopen="true" :visible="false" @apri="apri">-->


      <div v-if="mediatore" class="flex flex-center column justify-center">


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

      </div>
    </CTitleBanner>
  </div>
</template>

<script lang="ts" src="./CMyNave.ts">
</script>

<style lang="scss" scoped>
  @import './CMyNave.scss';
</style>
