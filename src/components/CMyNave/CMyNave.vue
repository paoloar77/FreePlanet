<template>
  <div>
    <CTitleBanner v-if="nave" class="q-pa-xs"
                  :title="$t('pages.nave') + ` ` + getRiganave(nave.riga) + `.`+getColnave(nave.col) + ` ` + $t('dashboard.nave_in_partenza') + ` ` + tools.getstrDate(nave.date_start)"
                  bgcolor="bg-primary"
                  clcolor="text-white"
                  mystyle="" myclass="myshad" canopen="true">


      <div v-if="nave" class="flex flex-center column justify-center">
        <div class="">
          <!--IndPrimario: {{ nave.indprimario }} - IndOrder: {{ nave.ind_order }} -->
        </div>

        <q-tabs
          v-model="cosa"
          dense
          class="text-blue"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="tragitto" label="Tragitto"></q-tab>
          <q-tab name="donatore" label="Donatore"></q-tab>
          <q-tab name="mediatore" label="Mediatore"></q-tab>
          <q-tab name="spiegazione" label="Spiegazione"></q-tab>
        </q-tabs>


        <q-tab-panels v-model="cosa" animated>
          <q-tab-panel name="spiegazione">

            <div v-if="sonoMediatore()">
              <div class="text-left" v-html="$t('dashboard.sonomediatore')"></div>

              <q-input v-model="link_chat" :label="$t('dashboard.link_chat')"
                       debounce="1000"
                       input-class="myinput-area"
                       @input="change_link_chat">

              </q-input>

              <div class="">
                <div class="row justify-center centermydiv q-gutter-sm" style="max-width: 420px;">
                  <q-btn rounded text-color="secondary" icon="fab fa-telegram"
                         :label="$t('dashboard.controlla_donatori')"
                         @click="InviaLinkChatADonatori(false)"></q-btn>

                  <q-btn rounded text-color="primary" icon="fab fa-telegram"
                         :disable="!linkchatesiste"
                         :label="$t('dashboard.invia_link_chat')"
                         @click="InviaLinkChatADonatori(true)"></q-btn>

                </div>
              </div>

            </div>
            <div v-else-if="sonoDonatore()">
              <div v-html="$t('dashboard.sonosognatore')">
              </div>
            </div>

          </q-tab-panel>
          <q-tab-panel name="tragitto">
            <div class="row justify-between">
              <div class="cont_pos_intest">N</div>

              <div class="cont_intestaz q-mx-sm"> Nome<br>dei Passaggi</div>

              <div class="cont_intestaz">Nave</div>
              <div class="cont_intestaz">Data<br>Partenza</div>
              <div class="cont_intestaz_small">Doni<br>Inviati</div>
            </div>

            <div v-for="rec in tragitto" :key="rec.ind">
              <div :class="`row items-center ` + rec.extracl">
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
                <div class="">
                  <q-chip class="glossy" :color="rec.color" text-color="white">
                    {{ gettitlenave(rec.ind) }}
                  </q-chip>
                </div>
                <div class="">
                  <q-chip class="glossy" :color="rec.color" text-color="white">
                    {{ getdatanave(rec) }}
                  </q-chip>
                </div>
                <q-icon color="green" inverted size="sm" :name="geticon(rec)" class="gift"></q-icon>
              </div>
            </div>

            <div class="q-ma-md q-butter-sm" v-if="!!linkchatopen">
              Per entrare nella Gift Chat, clicca qui:<br>
              <div class="q-ma-md">
                <q-btn rounded color="primary" icon="fab fa-telegram" :label="$t('dashboard.entra_in_gift_chat')"
                       type="a"
                       :href="linkchatopen" target="_blank"></q-btn>
                <br>
              </div>

            </div>

          </q-tab-panel>
          <q-tab-panel name="donatore">

            <div v-if="nave.rec.donatore.recsognatori">
              <div class="sognatore">SOGNATORI:</div>
              <div v-for="(sognatore, index) in nave.rec.donatore.recsognatori" :key="10+index">
                <div v-if="sognatore" :class="`cont_sognatore ` + getclassSelect(sognatore)">
                  A{{3 - index}} - {{ sognatore.name }} {{ sognatore.surname }} ({{sognatore.username }})
                </div>
              </div>
              <div class="">
                <div class="mediatore">MEDIATORE:</div>
                <div :class="`cont_mediatore ` + getclassSelect(nave.rec.donatore.recmediatore)">
                  {{ nave.rec.donatore.recmediatore.name }} {{ nave.rec.donatore.recmediatore.surname }} ({{
                  nave.rec.donatore.recmediatore.username }})
                </div>
              </div>
              <div class="donatore">DONATORI:</div>
              <div v-for="(donatore, index) in nave.rec.donatore.arrdonatori" :key="index">
                <div v-if="donatore" :class="`cont_donatore ` + getclassSelect(donatore)">
                  D{{index + 1}} - {{ donatore.name }} {{ donatore.surname }} ({{ donatore.username }}) {{
                  donatore.riga}}.{{donatore.col}}<br>
                </div>
              </div>
            </div>

          </q-tab-panel>
          <q-tab-panel name="mediatore">

            <div v-if="nave.rec.mediatore.recsognatori">
              <div class="sognatore">SOGNATORI:</div>
              <div v-for="(sognatore, index) in nave.rec.mediatore.recsognatori" :key="10+index">
                <div v-if="sognatore" :class="`cont_sognatore ` + getclassSelect(sognatore)">
                  A{{3 - index}} - {{ sognatore.name }} {{ sognatore.surname }} ({{sognatore.username }})
                </div>
              </div>
              <div class="">
                <div class="mediatore">MEDIATORE:</div>
                <div :class="`cont_mediatore ` + getclassSelect(nave.rec.mediatore.recmediatore)">
                  {{ nave.rec.mediatore.recmediatore.name }} {{ nave.rec.mediatore.recmediatore.surname }} ({{
                  nave.rec.mediatore.recmediatore.username }})
                </div>
              </div>
              <div class="donatore">DONATORI:</div>
              <div v-for="(donatore, index) in nave.rec.mediatore.arrdonatori" :key="index">
                <div v-if="donatore" :class="`cont_donatore ` + getclassSelect(donatore)">
                  D{{index + 1}} - {{ donatore.name }} {{ donatore.surname }} ({{ donatore.username }}) {{
                  donatore.riga}}.{{donatore.col}}<br>
                </div>
              </div>
            </div>

          </q-tab-panel>
        </q-tab-panels>
      </div>
    </CTitleBanner>
  </div>
</template>

<script lang="ts" src="./CMyNave.ts">
</script>

<style lang="scss" scoped>
  @import './CMyNave.scss';
</style>
