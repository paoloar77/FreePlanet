<template>
  <div>
    <div v-if="CompletatoRequisiti" class="centermydiv">
      <q-btn class="q-mb-md" rounded size="md" color="primary" to="/dashboard"
             :label="$t('dashboard.entra_in_lavagna')"></q-btn>
    </div>

    <CTitleBanner class="text-center" :title="$t('home.guida_passopasso')" bgcolor="bg-primary" clcolor="text-white"
                  mystyle="" myclass="myshad" :canopen="true">

      <q-stepper
        v-model="step"
        vertical
        header-nav
        done-color="green"
        active-color="blue"
        inactive-color="grey"
        animated
      >
        <!--
                <q-step
                  id="step1"
                  :name="1"
                  :title="emailtext"
                  icon="mail"
                  :done="isEmailVerified"
                  :error="!isEmailVerified"
                  :error-icon="geterricon(true)"
                >
                  <q-stepper-navigation v-if="isEmailVerified">
                    <q-btn @click="step = 2" color="primary" :label="$t('dialog.avanti')"></q-btn>
                  </q-stepper-navigation>

                </q-step>
                <q-step
                  id="step2"
                  :name="2"
                  :title="telegramtext"
                  icon="fab fa-telegram"
                  :done="TelegVerificato"
                  :error="!TelegVerificato"
                  :error-icon="geterricon(true)"
                >

                  <q-stepper-navigation>
                    <q-btn v-if="TelegVerificato" @click="step = 3" color="primary" :label="$t('dialog.avanti')"></q-btn>
                    <q-btn flat @click="step = 1" color="primary" :label="$t('dialog.indietro')" class="q-ml-sm"></q-btn>
                  </q-stepper-navigation>
                </q-step>
        -->
        <q-step
          v-for="(mystep, index) in arrsteps"
          :id="`step`+(index)"
          :key="mystep.title"
          :name="index"
          :title="gettextstep(mystep, index)"
          :icon="geticonstep(mystep)"
          :done-color="geticoncolor(mystep.title)"
          :done="mystep.funccheck(index)"
          :error="getiferror(mystep.funccheck_error(index), mystep.funccheck(index))"
          :error-icon="geterricon(mystep.funccheck(index), mystep)"
          :error-color="geterrcolor(mystep)"
        >
          <div v-if="mystep.title === 'reg.email'">
            <CVerifyEmail>

            </CVerifyEmail>

          </div>
          <div v-else-if="mystep.title === 'reg.telegram'">
            <q-chip v-if="TelegVerificato" color="positive" text-color="white" icon="fab fa-telegram">
              {{ telegramtext }}
            </q-chip>
            <q-chip v-else color="negative" text-color="white" icon="email">
              {{ telegramtext }}
            </q-chip>

            <CVerifyTelegram v-if="TelegCode || !TelegVerificato">

            </CVerifyTelegram>
            <div v-else>
              <br>
              <q-btn color="primary" icon="fab fa-telegram"
                     :label="$t('components.authentication.telegram.openbot', {botname: $t('ws.botname')})"
                     type="a"
                     :href="getLinkBotTelegram" target="_blank"></q-btn>
              <br>
            </div>

          </div>
          <div v-else-if="mystep.title === 'steps.linee_guida'">
            <CGuidelines :showconditions="true">

            </CGuidelines>
          </div>
          <div v-else-if="mystep.title === 'steps.video_intro'">
            <CVideoPromo :showconditions="true">

            </CVideoPromo>

          </div>
          <div v-else-if="mystep.title === 'steps.paymenttype'">
            <div v-if="mystep.descr">
              <div v-html="$t(mystep.descr, {sitename: $t('ws.sitename')})"></div>
            </div>

            <!--
            <CTitleBanner class="q-pa-xs" :title="$t('steps.paymenttype_revolut')" bgcolor="bg-primary"
                          clcolor="text-white"
                          myclass="myshad" canopen="true" :visible="false">

              <CVideo myvideokey="nST5iHM2LbE">

              </CVideo>

              <q-btn class="q-ma-md" size="md" type="a" href="https://www.revolut.com/"
                     target="_blank" rounded color="primary" icon="info"
                     :label="$t('steps.paymenttype_revolut_link')">
              </q-btn>

            </CTitleBanner>
            -->

            <!--
            <CTitleBanner class="q-pa-xs" :title="$t('steps.paymenttype_paypal')" bgcolor="bg-primary"
                          clcolor="text-white"
                          myclass="myshad" canopen="true" :visible="false">

              <CVideo myvideokey="RqsWDlpnN3k">

              </CVideo>

              <q-btn class="q-ma-md" size="md" type="a" href="https://www.paypal.com/"
                     target="_blank" rounded color="primary" icon="info"
                     :label="$t('steps.paymenttype_paypal_link')">
              </q-btn>
              <CTitleBanner class="q-pa-xs" :title="$t('steps.paymenttype_paypal_carta_conto')"
                            bgcolor="bg-primary"
                            clcolor="text-white"
                            myclass="myshad" canopen="true" :visible="true">

                <CVideo myvideokey="wRNBmQrsnes">

                </CVideo>

              </CTitleBanner>
            </CTitleBanner>
            -->


            <div>

              <!--<CRequisiti :statebool="RequisitoPayment" :msgTrue="$t('steps.paymenttype_long2')"
                          :msgFalse="$t('steps.paymenttype_long2')">
              </CRequisiti>-->

              <CMyFieldDb :title="$t('reg.paymenttype')"
                          table="users"
                          mykey="profile"
                          mysubkey="paymenttypes"
                          :type="tools.FieldType.multiselect"
                          jointable="paymenttypes">
              </CMyFieldDb>

              <CMyFieldDb v-if="tools.isselectRevolut()" :title="$t('reg.revolut')"
                          table="users"
                          mykey="profile"
                          mysubkey="revolut"
                          :type="tools.FieldType.string">
              </CMyFieldDb>

              <CMyFieldDb v-if="tools.isselectPaypal()"
                          :title="$t('reg.email_paypal')"
                          table="users"
                          mykey="profile"
                          mysubkey="email_paypal"
                          :type="tools.FieldType.string">
              </CMyFieldDb>

              <CMyFieldDb v-if="tools.isselectPayeer()"
                          :title="$t('reg.payeer_id')"
                          table="users"
                          mykey="profile"
                          mysubkey="payeer_id"
                          :type="tools.FieldType.string">
              </CMyFieldDb>

              <CMyFieldDb v-if="tools.isselectAdvCash()"
                          :title="$t('reg.advcash_id')"
                          table="users"
                          mykey="profile"
                          mysubkey="advcash_id"
                          :type="tools.FieldType.string">
              </CMyFieldDb>

              <CMyFieldDb v-if="tools.isselectPaypal()"
                          :title="$t('reg.link_payment')"
                          table="users"
                          mykey="profile"
                          mysubkey="link_payment"
                          :type="tools.FieldType.string">
              </CMyFieldDb>


              <CMyFieldDb :title="$t('reg.note_payment')"
                          table="users"
                          mykey="profile"
                          mysubkey="note_payment"
                          :type="tools.FieldType.string">
              </CMyFieldDb>


            </div>
          </div>
          <div v-else-if="mystep.title === 'steps.dream'">
            <div v-if="mystep.descr">
              <div v-html="$t(mystep.descr, {sitename: $t('ws.sitename')})"></div>
            </div>
            <q-input v-model="my_dream" :label="$t('steps.dream')+' (min. 10):'"
                     type="textarea" debounce="1000"
                     input-class="myinput-area-big"
                     autogrow
                     @input="change_mydream">

            </q-input>

            <!--
                        <CMyFieldDb :title="$t('reg.my_dream')"
                                    table="users"
                                    mykey="profile"
                                    mysubkey="my_dream"
                                    :type="tools.FieldType.string"
                        >
                        </CMyFieldDb>
            -->
          </div>
          <div v-else-if="mystep.title === 'steps.zoom'">

            <CRequisiti :statebool="VistoZoom" :msgTrue="$t('steps.zoom_si_partecipato')"
                        :msgFalse="$t('steps.zoom_no_partecipato')">
            </CRequisiti>

            <div v-if="NoPartNoZoom()">
              <q-btn rounded color="blue" @click="hagiapartecipato()"
                     :label="$t('steps.zoom_gia_partecipato')"></q-btn>
              <br>
            </div>
            <div v-else>
              <CRequisiti v-if="!VistoZoom" :statebool="true" :msgTrue="$t('steps.zoom_richiesta_inviata')"
                          msgFalse="">
              </CRequisiti>
            </div>



            <div v-if="mystep.descr">
              <div v-html="$t(mystep.descr, {sitename: $t('ws.sitename')})"></div>
            </div>
            <CTitleBanner class="q-pa-xs" :title="$t('steps.zoom_what')" bgcolor="bg-primary"
                          clcolor="text-white"
                          myclass="myshad" canopen="true" :visible="false">
              <div>
                <CVideo myvideokey="2yHhNktRDjg">

                </CVideo>

                <div v-if="toolsext.isLang('it')">
                  <h3>ISTRUZIONI ZOOM Cloud Meeting</h3>

                  <ul style="text-align: left; font-size:0.75rem;">
                    <li>1. Scarica l'app per: (<a
                      href="https://play.google.com/store/apps/details?id=us.zoom.videomeetings"
                      target="_blank">Android</a> o per
                      <a href="https://apps.apple.com/us/app/zoom-cloud-meetings/id546505307" target="_blank">iPhone</a>
                      o per
                      <a href="https://zoom.us/support/download" target="_blank">PC Desktop</a>
                      )
                    </li>
                    <li>2. Inserisci il tuo Nome e Cognome per essere riconosciuto</li>
                    <li>3. Clicca "join meeting"</li>
                    <li>4. Clicca "call in device" altrimenti non potrai sentire 🔊</li>
                    <li>5. Clicca il microfono per Attivarlo o Silenziarlo.</li>
                  </ul>

                  <div class="text-h6"><strong>In più avrai:</strong></div>
                  <ul style="text-align: left; font-size:0.75rem;">
                    <li>Tasto per togliere il video (📹) ❌</li>
                    <li>Tasto 'Share': per condividere contenuti condivisi</li>
                    <li>Tasto 'Partecipants' in cui sulla sinistra, in basso, troverai la CHAT.</li>
                    <li>Tasto 'More': troverai Raise Hands per fare le domande.</li>
                  </ul>
                </div>
                <div v-else>
                  <h3>ZOOM INSTRUCTIONS</h3>

                  <ul style="text-align: left; font-size:0.75rem;">
                    <li>1. Download the app (<a
                      href="https://play.google.com/store/apps/details?id=us.zoom.videomeetings"
                      target="_blank">store</a> or <a href="https://zoom.us/support/download"
                                                      target="_blank">by PC</a>)
                    </li>
                    <li>2. Enter your first and last name to be recognized</li>
                    <li>3. Click "join meeting"</li>
                    <li>4. Click "call in device" otherwise you won't be able to hear 🔊</li>
                    <li>5. Click the microphone to turn it on or mute it</li>
                  </ul>

                  <div class="text-h6"><strong>More you will have:</strong></div>
                  <ul style="text-align: left; font-size:0.75rem;">
                    <li>Cancel button to remove the video (📹) ❌</li>
                    <li>Share' button: to share shared content</li>
                    <li>Participants' button where on the left, at the bottom, you will find the
                      CHAT.
                    </li>
                    <li>Button 'More': you'll find Raise Hands to ask questions.</li>
                  </ul>
                </div>

              </div>
            </CTitleBanner>

          </div>
          <div v-else-if="mystep.title === 'steps.sharemovement'">

            <!--<CRequisiti :statebool="getnuminvitati() >= 2" :msgTrue="$t('steps.sharemovement_hai_invitato')"
                        :msgFalse="$t('steps.sharemovement_devi_invitare_almeno_2')">
            </CRequisiti>-->

            <q-btn class="q-mb-md" rounded size="md" color="primary" to="/dashboard"
                   :label="$t('pages.dashboard')"></q-btn>

            <div v-if="mystep.descr">
              <div v-html="$t(mystep.descr, {sitename: $t('ws.sitename')})"></div>
            </div>

            <div class="row justify-center q-ma-sm">
              <q-btn push
                     rounded
                     color="primary"
                     size="md"
                     :label="$t('pages.invita')"
                     icon="fas fa-user-plus"
                     to="/invite">
              </q-btn>
            </div>


            <CCopyBtn :title="$t('reg.reflink')" :texttocopy="getRefLink">

            </CCopyBtn>

            <CCopyBtn :title="$t('reg.linkzoom')" :texttocopy="tools.getLinkZoom()">

            </CCopyBtn>


          </div>
          <div v-else-if="mystep.title === 'dashboard.inv_attivi'">

            <CRequisiti v-if="getnuminvitati() > 0" :statebool="getnuminvitati_attivi() >= 2"
                        :msgTrue="$t('steps.sharemovement_invitati_attivi_si')"
                        :msgFalse="$t('steps.sharemovement_invitati_attivi_no')">
            </CRequisiti>

            <q-btn class="q-mb-md" rounded size="md" color="primary" to="/dashboard"
                   :label="$t('pages.dashboard')"></q-btn>


            <div v-if="mystep.descr">
              <div v-html="$t(mystep.descr, {sitename: $t('ws.sitename')})"></div>
            </div>

          </div>
          <div v-else-if="mystep.title === 'steps.enter_prog'">

            <div v-if="mystep.descr">
              <div v-html="$t(mystep.descr, {sitename: $t('ws.sitename')})"></div>
            </div>

            <div v-if="CompletatoRequisiti && !Completato9Req">
              <CRequisiti :statebool="CompletatoRequisiti" :msgTrue="$t('steps.enter_prog_requisiti_ok')"
                          :msgFalse="$t('steps.enter_prog_completa_requisiti')">
              </CRequisiti>
            </div>

            <br>

            <CRequisiti v-if="Completato9Req" :statebool="Completato9Req"
                        :msgTrue="$t('steps.enter_nave_9req_ok', {sitename: $t('ws.sitename')})"
                        :msgFalse="$t('steps.enter_nave_9req_ko')">
            </CRequisiti>

          </div>
          <div v-else>
            <div v-if="mystep.page">
              <CMyInnerPage :path=mystep.page>
                <div v-if="mystep.descr">
                  <div v-html="$t(mystep.descr, {sitename: $t('ws.sitename')})"></div>
                </div>
              </CMyInnerPage>
            </div>
          </div>

          <q-stepper-navigation>
            <q-btn v-if="index < getlaststep" @click="nextstep(index)"
                   color="primary" :label="$t('dialog.avanti')" class="q-ml-sm"></q-btn>
            <q-btn flat @click="step = index - 1" color="primary" :label="$t('dialog.indietro')"
                   class="q-ml-sm"></q-btn>
          </q-stepper-navigation>
        </q-step>

        <!--<q-step-->
        <!--:name="getlaststep"-->
        <!--:title="$t('dialog.finish')"-->
        <!--icon="check-circle"-->
        <!--:done="step > getlaststep"-->
        <!--&gt;-->

        <!--<q-stepper-navigation>-->
        <!--<q-btn flat @click="step = getlaststep - 1" color="primary" :label="$t('dialog.indietro')" class="q-ml-sm"></q-btn>-->
        <!--</q-stepper-navigation>-->
        <!--</q-step>-->
      </q-stepper>

    </CTitleBanner>

    <q-page-sticky expand position="top" v-if="!stepcompleti">
      <q-toolbar class="bg-yellow-7 glossy text-white">
        <q-toolbar-title @click="scrolltostep(steptodo)">
          <div class="flex flex-center q-mt-xs">
            <div class="flex flex-center">
              <q-badge color="white" text-color="grey-8" style="opacity: 0.9; font-size: 0.85rem;"
                       :label="strpercstep"></q-badge>
            </div>
            <q-linear-progress size="lg" :value="percstep" color="green" class="q-pa-xs q-mb-xs bg-red">
            </q-linear-progress>
          </div>
          <div class="flex flex-center q-mb-xs">
            <q-badge color="white" text-color="blue" :label="progressstep" class="wrap"
                     style="font-size: 0.85rem; height:20px; font-weight: bold;"></q-badge>
          </div>
        </q-toolbar-title>
        <q-btn round dense icon="arrow_forward" color="blue" @click="scrolltostep(steptodo)"></q-btn>
      </q-toolbar>
    </q-page-sticky>

  </div>
</template>

<script lang="ts" src="./CStatus.ts">
</script>

<style lang="scss">
  @import './CStatus.scss';
</style>
