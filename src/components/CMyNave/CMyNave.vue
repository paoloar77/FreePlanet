<template>
    <div>
        <CTitleBanner v-if="true" class=""
                      :title="titolonave()"
                      :bgcolor="getcolortitle()"
                      clcolor="text-white"
                      mystyle="" myclass="myshad" canopen="true" :visible="!listanavi" @apri="apri">

            <q-inner-loading :showing="loading">
                <q-spinner-tail size="2em" color="primary"/>
            </q-inner-loading>

            <div v-if="mediatore" class="flex flex-center column justify-center">
                <div class="">
                    <!--IndPrimario: {{ nave.indprimario }} - IndOrder: {{ nave.ind_order }} -->
                </div>

                <CTitleBanner v-if="nave" class=""
                              :title="$t('dashboard.tragitto')"
                              bgcolor="bg-primary"
                              clcolor="text-white"
                              mystyle="" myclass="myshad" canopen="true">
                    <q-chip class="glossy q-ma-sm" color="orange" text-color="white" icon="star">
                        {{getposizione()}}
                    </q-chip>
                    <div class="row justify-between no-wrap">
                        <div class="cont_pos_intest">N</div>

                        <div class="cont_intestaz q-mx-sm passoint"
                             v-html="$t('dashboard.nome_dei_passaggi')"></div>

                        <div class="cont_intestaz titlenave">{{$t('dashboard.nave')}}</div>
                        <div class="cont_intestaz datanave_int" v-html="$t('dashboard.data_partenza')"></div>
                        <div class="cont_intestaz_small" v-html="$t('dashboard.doni_inviati')"></div>
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
                            <div class="titlenave">
                                <q-chip class="glossy" :color="rec.color" text-color="white">
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

                </CTitleBanner>

                <CTitleBanner v-if="nave" class=""
                              :title="$t('dashboard.donatore')"
                              bgcolor="bg-primary"
                              clcolor="text-white"
                              mystyle="" myclass="myshad" canopen="true">

                    <br />
                    <div class="q-ma-sm">
                        <div class="column justify-center items-center q-gutter-md tutor">
                            <div class="title-nave clBorderSteps">{{gettitledonatore()}}</div>
                            <div v-if="getTutor(donatore)" class="clBorderTutor q-ma-sm selezione cursor-pointer"
                                 @click="clickseluser({name: getTutor(donatore), surname: '', username: getTutor_username(donatore), profile: { cell: '' } })">
                                {{ $t('dashboard.tutor') }}: {{getTutor(donatore)}}
                            </div>
                        </div>

                        <div class="">
                            <div class="row justify-center q-gutter-md">
                                <div v-if="nave.rec.donatore.recsognatori">
                                    <div class="sognatore">{{$t('dashboard.sognatori')}}:</div>
                                    <div v-for="(sognatore, index) in nave.rec.donatore.recsognatori"
                                         :key="10+index">
                                        <div v-if="sognatore"
                                             :class="`cont_sognatore ` + getclassSelect(sognatore)">
                                            A{{3 - index}} - {{ sognatore.name }} {{ sognatore.surname }}
                                            ({{sognatore.username }})
                                        </div>
                                    </div>
                                    <div class="">
                                        <div class="mediatore text-uppercase">{{$t('dashboard.mediatore')}}:</div>
                                        <div :class="`cont_mediatore cursor-pointer selezione ` + getclassSelect(nave.rec.donatore.recmediatore)"
                                             @click="clickseluser(nave.rec.donatore.recmediatore)">
                                            {{ nave.rec.donatore.recmediatore.name }} {{
                                            nave.rec.donatore.recmediatore.surname }} ({{
                                            nave.rec.donatore.recmediatore.username }})
                                        </div>
                                    </div>
                                    <div class="">
                                        <div class="intermedio3">{{$t('dashboard.intermedio')}}3:</div>
                                        <div v-for="(terra, index) in nave.rec.donatore.arrterra" :key="index">
                                            <div v-if="terra" :class="`cont_donatore ` + getclassSelect(terra)">
                                                B{{index + 1}} - {{ terra.name }} {{ terra.surname }} ({{
                                                terra.username
                                                }}) - {{
                                                terra.riga}}.{{terra.col}}<br>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="">
                                        <div class="intermedio2">{{$t('dashboard.intermedio')}}2:</div>
                                        <div v-for="(aria, index) in nave.rec.donatore.arraria" :key="index">
                                            <div v-if="aria" :class="`cont_donatore ` + getclassSelect(aria)">
                                                C{{index + 1}} - {{ aria.name }} {{ aria.surname }} ({{
                                                aria.username
                                                }}) - {{
                                                aria.riga}}.{{aria.col}}<br>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="donatore text-uppercase">{{$t('dashboard.donatori')}}:</div>
                                    <div v-for="(donatore, index) in nave.rec.donatore.arrdonatori" :key="index">
                                        <div v-if="donatore"
                                             :class="`cont_donatore row ` + getclassSelect(donatore)">
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

                                <div v-if="!FattoDono" class="text-evidente bordo_stondato">

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

                                    <CTitleBanner class="q-pa-xs"
                                                  :title="$t('dashboard.come_inviare_regalo_con_paypal')"
                                                  bgcolor="bg-primary"
                                                  clcolor="text-white"
                                                  myclass="myshad" canopen="true" :visible="false">

                                        <CVideo myvideokey="5rp_XEV6Mzg">

                                        </CVideo>
                                    </CTitleBanner>

                                </div>
                                <div class="text-evidente bordo_stondato_blu">

                                    <div v-if="GiornoDelDonoArrivato">
                                        <div v-if="!FattoDono"
                                             v-html="$t('dashboard.effettua_il_dono', {email: getemailPagamentoSognatore() })">
                                        </div>
                                        <div v-if="!FattoDono">
                                            <br/>
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
                                    <div v-else v-html="$t('dashboard.qui_compariranno_le_info')">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </CTitleBanner>

                <CTitleBanner v-if="nave" class=""
                              :title="$t('dashboard.mediatore')"
                              bgcolor="bg-primary"
                              clcolor="text-white"
                              mystyle="" myclass="myshad" canopen="true" :visible="false">

                    <br />
                    <div class="q-ma-sm">
                        <div class="column justify-center items-center q-gutter-md tutor">
                            <div class="title-nave clBorderSteps">{{gettitlemediatore()}}</div>
                            <div v-if="getTutor(mediatore)" class=" clBorderTutor q-ma-sm selezione cursor-pointer"
                                 @click="clickseluser({name: getTutor(mediatore), surname: '', username: getTutor_username(mediatore), profile: { cell: '' } })">
                                {{ $t('dashboard.tutor') }}: {{getTutor(mediatore)}}
                            </div>
                        </div>

                        <div class="">
                            <div class="row justify-center q-gutter-md">
                                <div v-if="nave.rec.mediatore.recsognatori">
                                    <div class="sognatore">{{$t('dashboard.sognatori')}}:</div>
                                    <div v-for="(sognatore, index) in nave.rec.mediatore.recsognatori"
                                         :key="10+index">
                                        <div v-if="sognatore"
                                             :class="`cont_sognatore selezione cursor-pointer ` + getclassSelect(sognatore)"
                                             @click="clickseluser(sognatore)">
                                            A{{3 - index}} - {{ sognatore.name }} {{ sognatore.surname }}
                                            ({{sognatore.username }})
                                        </div>
                                    </div>
                                    <div class="">
                                        <div class="mediatore text-uppercase">{{$t('dashboard.mediatore')}}:</div>
                                        <div :class="`cont_mediatore ` + getclassSelect(nave.rec.mediatore.recmediatore)">
                                            {{ nave.rec.mediatore.recmediatore.name }} {{
                                            nave.rec.mediatore.recmediatore.surname }} ({{
                                            nave.rec.mediatore.recmediatore.username }})
                                        </div>
                                    </div>
                                    <div class="">
                                        <div class="intermedio3">{{$t('dashboard.intermedio')}}3:</div>
                                        <div v-for="(terra, index) in nave.rec.mediatore.arrterra" :key="index">
                                            <div v-if="terra" :class="`cont_donatore ` + getclassSelect(terra)">
                                                B{{index + 1}} - {{ terra.name }} {{ terra.surname }} ({{
                                                terra.username
                                                }})
                                                - {{
                                                terra.riga}}.{{terra.col}}<br>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="">
                                        <div class="intermedio2">{{$t('dashboard.intermedio')}}2:</div>
                                        <div v-for="(aria, index) in nave.rec.mediatore.arraria" :key="index">
                                            <div v-if="aria" :class="`cont_donatore ` + getclassSelect(aria)">
                                                C{{index + 1}} - {{ aria.name }} {{ aria.surname }} ({{
                                                aria.username
                                                }}) -
                                                {{
                                                aria.riga}}.{{aria.col}}<br>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="donatore text-uppercase">{{$t('dashboard.donatori')}}:</div>
                                    <div v-for="(donatore, index) in nave.rec.mediatore.arrdonatori" :key="index">
                                        <div v-if="donatore"
                                             :class="`cont_donatore row selezione cursor-pointer ` + getclassSelect(donatore)"
                                             @click="clickseluser(donatore)">

                                            {{ getindex(donatore, index + 1) }} - {{ donatore.name }} {{
                                            donatore.surname }}
                                            ({{ donatore.username }}) - {{ donatore.riga}}.{{donatore.col}}
                                            <q-icon v-if="donatore.made_gift" color="green" inverted size="sm"
                                                    name="fas fa-gift" class="gift"></q-icon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="isDefinitivaMediatore()" class="q-my-md">
                            <div class="text-left" v-html="gettesto()"></div>

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
                            </div>

                        </div>

                    </div>

                </CTitleBanner>

                <CTitleBanner v-if="nave" class=""
                              :title="$t('dashboard.sognatore')"
                              bgcolor="bg-primary"
                              clcolor="text-white"
                              mystyle="" myclass="myshad" canopen="true" :visible="false">

                    <br />
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
                                :title="$t('dashboard.donatori')"
                                :data="arrdonatori"
                                :columns="coldonatori"
                                :nodataLabel="$t('grid.nodata')"
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
                                    <q-td key="posizione" :props="props">
                                        {{ props.row.riga }}.{{ props.row.col }}
                                    </q-td>
                                    <q-td key="date_made_gift" :props="props">
                                        {{ tools.getstrshortDateTime(props.row.date_made_gift) }}
                                    </q-td>
                                    <q-td key="tel" :props="props">
                                        <q-btn flat rounded color="blue"
                                               :label="props.row.profile.cell"
                                               @click="clickseluser(props.row)">
                                        </q-btn>
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
                                                {{ $t('dashboard.dono_ricevuto_2', {donatore: props.row.name })
                                                }}
                                            </q-chip>
                                        </div>
                                    </q-td>
                                </q-tr>
                            </template>
                        </q-table>
                    </div>
                </CTitleBanner>


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
                                    <div class="q-ma-sm text-center clBorderSteps">
                                        <div>TELEGRAM AYNI BOT {{$t('dialog.sendmsg')}} -> {{seluser.name }} {{
                                            seluser.surname }}:
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
            </div>
        </CTitleBanner>
    </div>
</template>

<script lang="ts" src="./CMyNave.ts">
</script>

<style lang="scss" scoped>
    @import './CMyNave.scss';
</style>
