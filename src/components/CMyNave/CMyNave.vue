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
        </q-tabs>


        <q-tab-panels v-model="cosa" animated>
          <q-tab-panel name="tragitto">
            <q-chip class="glossy q-ma-sm" color="orange" text-color="white" icon="star">{{getposizione()}}</q-chip>
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

          </q-tab-panel>
          <q-tab-panel name="donatore">

            <div class="title-nave">{{gettitledonatore()}}</div>

            <div class="">
              <div class="row justify-center q-gutter-md">
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
                  <div class="">
                    <div class="intermedio3">INTERMEDIO3:</div>
                    <div v-for="(terra, index) in nave.rec.donatore.arrterra" :key="index">
                      <div v-if="terra" :class="`cont_donatore ` + getclassSelect(terra)">
                        B{{index + 1}} - {{ terra.name }} {{ terra.surname }} ({{ terra.username }}) - {{
                        terra.riga}}.{{terra.col}}<br>
                      </div>
                    </div>
                  </div>
                  <div class="">
                    <div class="intermedio2">INTERMEDIO2:</div>
                    <div v-for="(aria, index) in nave.rec.donatore.arraria" :key="index">
                      <div v-if="aria" :class="`cont_donatore ` + getclassSelect(aria)">
                        C{{index + 1}} - {{ aria.name }} {{ aria.surname }} ({{ aria.username }}) - {{
                        aria.riga}}.{{aria.col}}<br>
                      </div>
                    </div>
                  </div>
                  <div class="donatore">DONATORI:</div>
                  <div v-for="(donatore, index) in nave.rec.donatore.arrdonatori" :key="index">
                    <div v-if="donatore" :class="`cont_donatore ` + getclassSelect(donatore)">
                      D{{index + 1}} - {{ donatore.name }} {{ donatore.surname }} ({{ donatore.username }}) - {{
                      donatore.riga}}.{{donatore.col}}<br>
                    </div>
                  </div>
                </div>
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

            <div v-if="sonoDonatore()">
              <div v-html="$t('dashboard.sonosognatore')">
              </div>

              {{ sognatoredelDono() }}

              Quando effettuare il Regalo: {{ getGiornoDelDono() }}<br>
              Metodo Utilizzato: {{ getMetodoPagamentoSognatore() }}<br>

              <div v-if="GiornoDelDonoArrivato">
                <div v-if="!FattoDono">
                  E' arrivato il momento di Effettuare il proprio Dono di 33€:<br>
                  tramite {{ getMetodoPagamentoSognatore() }}<br>
                  Inviarlo a: {{ getemailPagamentoSognatore() }}

                  <!--Clicca qui per confermare che hai effettuato il tuo dono.-->
                </div>
                <div v-else>
                  Il tuo Dono è stato Ricevuto Correttamente.
                </div>
              </div>
            </div>

          </q-tab-panel>
          <q-tab-panel name="mediatore">

            <div class="title-nave">{{gettitlemediatore()}}</div>

            <div class="row justify-center q-gutter-md">
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
                <div class="">
                  <div class="intermedio3">INTERMEDIO3:</div>
                  <div v-for="(terra, index) in nave.rec.mediatore.arrterra" :key="index">
                    <div v-if="terra" :class="`cont_donatore ` + getclassSelect(terra)">
                      B{{index + 1}} - {{ terra.name }} {{ terra.surname }} ({{ terra.username }}) - {{
                      terra.riga}}.{{terra.col}}<br>
                    </div>
                  </div>
                </div>
                <div class="">
                  <div class="intermedio2">INTERMEDIO2:</div>
                  <div v-for="(aria, index) in nave.rec.mediatore.arraria" :key="index">
                    <div v-if="aria" :class="`cont_donatore ` + getclassSelect(aria)">
                      C{{index + 1}} - {{ aria.name }} {{ aria.surname }} ({{ aria.username }}) - {{
                      aria.riga}}.{{aria.col}}<br>
                    </div>
                  </div>
                </div>
                <div class="donatore">DONATORI:</div>
                <div v-for="(donatore, index) in nave.rec.mediatore.arrdonatori" :key="index">
                  <div v-if="donatore" :class="`cont_donatore ` + getclassSelect(donatore)">
                    D{{index + 1}} - {{ donatore.name }} {{ donatore.surname }} ({{ donatore.username }}) - {{
                    donatore.riga}}.{{donatore.col}}<br>
                  </div>
                </div>
              </div>
            </div>

            <div class="q-my-md">
              <div class="text-left" v-html="gettesto()"></div>

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
