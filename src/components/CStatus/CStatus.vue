<template>
  <div>
    <CTitleBanner class="text-center" title="Guida passo passo" bgcolor="bg-primary" clcolor="text-white"
                  mystyle="" myclass="myshad" :canopen="true">

      <div class="q-pa-xs">
        <q-stepper
          v-model="step"
          vertical
          header-nav
          done-color="green"
          active-color="blue"
          inactive-color="grey"
          animated
        >
          <q-step
            :name="1"
            :title="emailtext"
            icon="mail"
            :done="isEmailVerified"
            :error="!isEmailVerified"
            :error-icon="geterricon(true)"
          >
            <q-chip v-if="isEmailVerified" color="positive" text-color="white" icon="mail">
              {{ `Email ` + $t('pages.statusreg.verified') }}
            </q-chip>
            <q-chip v-else color="negative" text-color="white" icon="">
              {{ `Email ` + $t('pages.statusreg.nonverified') }}
            </q-chip>
            <div v-if="!isEmailVerified" v-html="$t('components.authentication.email_verification.link_sent')">

            </div>

            <q-stepper-navigation v-if="isEmailVerified">
              <q-btn @click="step = 2" color="primary" :label="$t('dialog.avanti')"></q-btn>
            </q-stepper-navigation>

          </q-step>
          <q-step
            :name="2"
            :title="telegramtext"
            icon="fab fa-telegram"
            :done="TelegVerificato"
            :error="!TelegVerificato"
            :error-icon="geterricon(true)"
          >
            <q-chip v-if="TelegVerificato" color="positive" text-color="white" icon="fab fa-telegram">
              {{ telegramtext }}
            </q-chip>
            <q-chip v-else color="negative" text-color="white" icon="">
              {{ telegramtext }}
            </q-chip>

            <div v-if="TelegCode" class="text-h4 text-center">
              {{ $t('reg.teleg_auth') }} Telegram: {{TelegCode}}
            </div>

            <div v-if="!TelegVerificato" class="q-pa-sm q-gutter-sm">
              <strong>{{ $t('components.authentication.telegram.open')}}</strong>
              <div class="q-ma-sm">
                <q-btn color="primary" icon="fab fa-telegram" :label="$t('components.authentication.telegram.openbot')"
                       type="a"
                       :href="getLinkBotTelegram" target="_blank"></q-btn>
                <br>
              </div>
              <strong>{{ $t('components.authentication.telegram.ifclose')}}</strong>
              <div class="q-my-sm">
                <q-img src="statics/images/ayni_bot.jpg" class="" alt="AYNI BOT" style="height: 100px; width: 250px;">
                </q-img>
              </div>
            </div>

            <q-stepper-navigation>
              <q-btn v-if="TelegVerificato" @click="step = 3" color="primary" :label="$t('dialog.avanti')"></q-btn>
              <q-btn flat @click="step = 1" color="primary" :label="$t('dialog.indietro')" class="q-ml-sm"></q-btn>
            </q-stepper-navigation>
          </q-step>
          <q-step
            v-for="(mystep, index) in arrsteps"
            :key="mystep.title"
            :name="NUMSTEP_START + index"
            :title="gettextstep(mystep)"
            icon="check-circle"
            :done="mystep.funccheck(index)"
            :error="getiferror(mystep.funccheck_error(index), mystep.funccheck(index))"
            :error-icon="geterricon(mystep.funccheck(index))"
          >
            <div v-if="mystep.title === 'steps.paymenttype'">
              <div v-if="mystep.descr">
                <div v-html="$t(mystep.descr)"></div>
              </div>
              <CMyFieldDb :title="$t('reg.paymenttype')"
                          table="users"
                          mykey="profile"
                          mysubkey="paymenttypes"
                          :type="tools.FieldType.multiselect"
                          jointable="paymenttypes">
              </CMyFieldDb>
            </div>
            <div v-else-if="mystep.title === 'steps.dream'">
              <div v-if="mystep.descr">
                <div v-html="$t(mystep.descr)"></div>
              </div>
              <CMyFieldDb :title="$t('reg.my_dream')"
                          table="users"
                          mykey="profile"
                          mysubkey="my_dream"
                          :type="tools.FieldType.string"
              >
              </CMyFieldDb>
            </div>
            <div v-else-if="mystep.title === 'steps.zoom'">
              <div v-if="mystep.descr">
                <div v-html="$t(mystep.descr)"></div>
              </div>
              <CTitleBanner class="q-pa-xs" title="Che cos'è Zoom e come funziona?" bgcolor="bg-primary"
                            clcolor="text-white"
                            myclass="myshad" canopen="true" :visible="false">
                <div>

                  <h3>ISTRUZIONI ZOOM</h3>

                  <ul style="text-align: left; font-size:0.75rem;">
                    <li>1. Scarica l'app (<a href="https://play.google.com/store/apps/details?id=us.zoom.videomeetings"
                                             target="_blank">store</a> o <a href="https://zoom.us/support/download"
                                                                            target="_blank">da PC</a>)
                    </li>
                    <li>1B. Fai il test per vedere se funziona: <a href="https://zoom.us/test" target="_blank">Esegui
                      TEST</a></li>
                    <li>2. Clicca "Join meeting"</li>
                    <li>3. Inserisci il codice ID</li>
                    <li>4. Sotto inserisci il tuo nominativo per essere riconosciuto</li>
                    <li>5. Clicca "join meeting"</li>
                    <li>6. Clicca "call in device" altrimenti non potrai sentire 🔊</li>
                    <li>7. SILENZIARE I MICROFONI clicca sullo schermo e si aprirà una banda in basso</li>
                    <li>8. Clicca 🔇 per SILENZIARE</li>
                  </ul>

                  <div class="text-h6"><strong>In più avrai:</strong></div>
                  <ul style="text-align: left; font-size:0.75rem;">
                    <li>Tasto per togliere il video (📹) ❌</li>
                    <li>Tasto 'Share': per condividere contenuti condivisi</li>
                    <li>Tasto 'Partecipants' in cui sulla sinistra, in basso, troverai la CHAT.</li>
                    <li>Tasto 'More': troverai Raise Hands per fare le domande.</li>
                  </ul>

                </div>
              </CTitleBanner>

              <CTitleBanner class="q-pa-xs" title="Prossimi Incontri" bgcolor="bg-primary"
                            clcolor="text-white"
                            myclass="myshad" canopen="true" :visible="false">
                <div v-if="mystep.page">
                  <CMyInnerPage :path=mystep.page>
                    <div v-if="mystep.descr">
                      <div v-html="$t(mystep.descr)"></div>
                    </div>
                  </CMyInnerPage>
                </div>

              </CTitleBanner>


            </div>
            <div v-else-if="mystep.title === 'steps.sharemovement'">
              <div v-if="mystep.descr">
                <div v-html="$t(mystep.descr)"></div>
              </div>
              {{ $t('reg.reflink') + ' ' + getRefLink }}
            </div>
            <div v-else>
              <div v-if="mystep.page">
                <CMyInnerPage :path=mystep.page>
                  <div v-if="mystep.descr">
                    <div v-html="$t(mystep.descr)"></div>
                  </div>
                </CMyInnerPage>
              </div>
            </div>

            <q-stepper-navigation>
              <q-btn v-if="NUMSTEP_START + index < getlaststep" @click="step = NUMSTEP_START + index + 1"
                     color="primary" :label="$t('dialog.avanti')" class="q-ml-sm"></q-btn>
              <q-btn flat @click="step = NUMSTEP_START + index - 1" color="primary" :label="$t('dialog.indietro')"
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
      </div>

    </CTitleBanner>


  </div>
</template>

<script lang="ts" src="./CStatus.ts">
</script>

<style lang="scss">
  @import './CStatus.scss';
</style>
