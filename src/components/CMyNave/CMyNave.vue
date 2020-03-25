<template>
    <div>
        <CTitleBanner v-if="nave" class="q-pa-xs"
                      :title="$t('pages.nave') + ` ` + getisProvvisoriaStr() + getRiganave(nave.riga) + `.`+getColnave(nave.col) + ` ` + $t('dashboard.nave_in_partenza') + ` ` + tools.getstrDate(nave.date_start)"
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
                    <q-tab name="mediatore" label="Mediatore"></q-tab>
                </q-tabs>


                <q-tab-panels v-model="cosa" animated>
                    <q-tab-panel name="tragitto">
                        <q-chip class="glossy q-ma-sm" color="orange" text-color="white" icon="star">
                            {{getposizione()}}
                        </q-chip>
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
                    <q-tab-panel name="mediatore">

                        <div class="title-nave">{{gettitlemediatore()}}</div>

                        <div class="row justify-center q-gutter-md">
                            <div v-if="nave.rec.mediatore.recsognatori">
                                <div class="sognatore">SOGNATORI:</div>
                                <div v-for="(sognatore, index) in nave.rec.mediatore.recsognatori" :key="10+index">
                                    <div v-if="sognatore" :class="`cont_sognatore ` + getclassSelect(sognatore)">
                                        A{{3 - index}} - {{ sognatore.name }} {{ sognatore.surname }}
                                        ({{sognatore.username }})
                                    </div>
                                </div>
                                <div class="">
                                    <div class="mediatore">MEDIATORE:</div>
                                    <div :class="`cont_mediatore ` + getclassSelect(nave.rec.mediatore.recmediatore)">
                                        {{ nave.rec.mediatore.recmediatore.name }} {{
                                        nave.rec.mediatore.recmediatore.surname }} ({{
                                        nave.rec.mediatore.recmediatore.username }})
                                    </div>
                                </div>
                                <div class="">
                                    <div class="intermedio3">INTERMEDIO3:</div>
                                    <div v-for="(terra, index) in nave.rec.mediatore.arrterra" :key="index">
                                        <div v-if="terra" :class="`cont_donatore ` + getclassSelect(terra)">
                                            B{{index + 1}} - {{ terra.name }} {{ terra.surname }} ({{ terra.username }})
                                            - {{
                                            terra.riga}}.{{terra.col}}<br>
                                        </div>
                                    </div>
                                </div>
                                <div class="">
                                    <div class="intermedio2">INTERMEDIO2:</div>
                                    <div v-for="(aria, index) in nave.rec.mediatore.arraria" :key="index">
                                        <div v-if="aria" :class="`cont_donatore ` + getclassSelect(aria)">
                                            C{{index + 1}} - {{ aria.name }} {{ aria.surname }} ({{ aria.username }}) -
                                            {{
                                            aria.riga}}.{{aria.col}}<br>
                                        </div>
                                    </div>
                                </div>
                                <div class="donatore">DONATORI:</div>
                                <div v-for="(donatore, index) in nave.rec.mediatore.arrdonatori" :key="index">
                                    <div v-if="donatore" :class="`cont_donatore row ` + getclassSelect(donatore)">
                                        {{ getindex(donatore, index + 1) }} - {{ donatore.name }} {{ donatore.surname }}
                                        ({{
                                        donatore.username }}) - {{ donatore.riga}}.{{donatore.col}}
                                        <q-icon v-if="donatore.made_gift" color="green" inverted size="sm"
                                                name="fas fa-gift" class="gift"></q-icon>
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
                <q-tabs
                        v-model="cosa2"
                        dense
                        class="text-blue"
                        active-color="primary"
                        indicator-color="primary"
                        align="justify"
                        narrow-indicator
                >

                    <q-tab name="donatore" label="Donatore"></q-tab>
                    <q-tab name="sognatore" label="Sognatore"></q-tab>
                </q-tabs>
                <q-tab-panels v-model="cosa2" animated>
                    <q-tab-panel name="donatore">

                        <div class="title-nave">{{gettitledonatore()}}</div>

                        <div class="">
                            <div class="row justify-center q-gutter-md">
                                <div v-if="nave.rec.donatore.recsognatori">
                                    <div class="sognatore">SOGNATORI:</div>
                                    <div v-for="(sognatore, index) in nave.rec.donatore.recsognatori" :key="10+index">
                                        <div v-if="sognatore" :class="`cont_sognatore ` + getclassSelect(sognatore)">
                                            A{{3 - index}} - {{ sognatore.name }} {{ sognatore.surname }}
                                            ({{sognatore.username }})
                                        </div>
                                    </div>
                                    <div class="">
                                        <div class="mediatore">MEDIATORE:</div>
                                        <div :class="`cont_mediatore ` + getclassSelect(nave.rec.donatore.recmediatore)">
                                            {{ nave.rec.donatore.recmediatore.name }} {{
                                            nave.rec.donatore.recmediatore.surname }} ({{
                                            nave.rec.donatore.recmediatore.username }})
                                        </div>
                                    </div>
                                    <div class="">
                                        <div class="intermedio3">INTERMEDIO3:</div>
                                        <div v-for="(terra, index) in nave.rec.donatore.arrterra" :key="index">
                                            <div v-if="terra" :class="`cont_donatore ` + getclassSelect(terra)">
                                                B{{index + 1}} - {{ terra.name }} {{ terra.surname }} ({{ terra.username
                                                }}) - {{
                                                terra.riga}}.{{terra.col}}<br>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="">
                                        <div class="intermedio2">INTERMEDIO2:</div>
                                        <div v-for="(aria, index) in nave.rec.donatore.arraria" :key="index">
                                            <div v-if="aria" :class="`cont_donatore ` + getclassSelect(aria)">
                                                C{{index + 1}} - {{ aria.name }} {{ aria.surname }} ({{ aria.username
                                                }}) - {{
                                                aria.riga}}.{{aria.col}}<br>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="donatore">DONATORI:</div>
                                    <div v-for="(donatore, index) in nave.rec.donatore.arrdonatori" :key="index">
                                        <div v-if="donatore" :class="`cont_donatore row ` + getclassSelect(donatore)">
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

                        <div class="q-ma-md q-butter-sm" v-if="!!linkchatopen">
                            Per entrare nella Gift Chat, clicca qui:<br>
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

                                <div v-if="!FattoDono" class="text-evidente bordo_stondato">

                                    <div>Quando effettuare il Regalo: <strong>{{ getGiornoDelDono() }}</strong><br>
                                    </div>
                                    <div>
                                        Metodi Disponibili:

                                        <CMyChipList
                                                :type="tools.FieldType.multiselect"
                                                :value="getMetodoPagamentoSognatore()"
                                                :options="db_fieldsTable.getTableJoinByName('paymenttypes')"
                                                :optval="db_fieldsTable.getKeyByTable('paymenttypes')"
                                                :optlab="db_fieldsTable.getLabelByTable('paymenttypes')"
                                                :opticon="db_fieldsTable.getIconByTable('paymenttypes')"></CMyChipList>

                                    </div>
                                    <div>
                                        Importo: <strong>33€</strong>
                                    </div>
                                    <br>
                                </div>
                                <div class="text-evidente bordo_stondato_blu">
                                    <div v-if="GiornoDelDonoArrivato">

                                        <div v-if="!FattoDono">

                                            E' arrivato il momento di Effettuare il proprio Dono!<br>
                                            Inviare tramite PayPal a: <strong>{{ getemailPagamentoSognatore()
                                            }}</strong><br>
                                            (Scegliere l'opzione "Invia ad Amici")<br>

                                            <CTitleBanner class="q-pa-xs"
                                                          :title="$t('dashboard.come_inviare_regalo_con_paypal')"
                                                          bgcolor="bg-primary"
                                                          clcolor="text-white"
                                                          myclass="myshad" canopen="true" :visible="false">

                                                <CVideo myvideokey="5rp_XEV6Mzg">

                                                </CVideo>
                                            </CTitleBanner>

                                            <div v-if="!donoinviato">
                                                {{$t('dashboard.clicca_conferma_dono')}}:<br>

                                                <div class="row justify-center q-ma-sm">
                                                    <q-btn push
                                                           rounded
                                                           color="positive"
                                                           size="md"
                                                           :label="$t('dashboard.ho_effettuato_il_dono')"
                                                           icon="fas fa-gift"
                                                           @click="HoEffettuatoIlDono">
                                                    </q-btn>
                                                </div>
                                            </div>
                                            <div v-else>
                                                <div class="row justify-center q-ma-sm">
                                                    <q-chip class="glossy"
                                                            text-color="white"
                                                            color="positive"
                                                            icon="fas fa-gift">
                                                        {{ $t('dashboard.ho_effettuato_il_dono') }}
                                                    </q-chip>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="FattoDono">
                                            <q-chip class="glossy"
                                                    color="positive"
                                                    text-color="white"
                                                    icon="fas fa-gift">
                                                {{ $t('dashboard.dono_ricevuto') }}
                                            </q-chip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </q-tab-panel>
                    <q-tab-panel name="sognatore" class="pan_sognatore">
                        <div v-if="sonoSognatore">
                            <div class="text-evidente bordo_stondato justify-between q-pa-xs-sm">
                                <div class="">
                                    <div>
                                        Doni Ricevuti:
                                    </div>
                                    <div class="ricevuti dati">{{getDoniConfermati()}}</div>
                                </div>
                                <div class="">
                                    <div class="inviati">
                                        Doni Inviati (da confermare):
                                    </div>
                                    <div class="inviati dati">{{getDoniAttesaDiConferma()}}</div>
                                </div>
                                <div class="">
                                    <div class="">
                                        Doni Mancanti:
                                    </div>
                                    <div class="mancanti dati">{{getDoniMancanti()}}</div>
                                </div>

                            </div>
                            <q-table
                                    dense
                                    color="primary"
                                    title="Donatori"
                                    :data="arrdonatori"
                                    :columns="coldonatori"
                                    :Pagination.sync="MyPagination"
                                    row-key="index">
                                <template v-slot:body="props">
                                    <q-tr :props="props">
                                        <!--<q-td key="index" :props="props">
                                            {{ props.row.index }}
                                        </q-td>-->
                                        <q-td key="name" :props="props">
                                            {{ props.row.name }}
                                        </q-td>
                                        <q-td key="surname" :props="props">
                                            {{ props.row.surname }}
                                        </q-td>
                                        <q-td key="date_made_gift" :props="props">
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
                                                    {{ $t('dashboard.dono_ricevuto_2', {donatore: props.row.name }) }}
                                                </q-chip>
                                            </div>
                                        </q-td>
                                    </q-tr>
                                </template>
                            </q-table>
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
