<template>
    <CMyPage title="Newsletter" keywords="" description="" imgbackground="../../statics/images/calendario_eventi.jpg"
             sizes="max-height: 120px">

        <q-card>
            <div v-show="false">
                <q-tabs
                        v-model="tab"
                        dense
                        class="text-grey"
                        active-color="primary"
                        indicator-color="primary"
                        align="justify"
                        narrow-indicator
                >
                    <q-tab name="settings" label="Impostazioni"></q-tab>
                    <q-tab name="main_settings" label="Impostaz. Primarie"></q-tab>
                    <q-tab name="templemail" label="Template Email"></q-tab>
                    <q-tab name="newnewsletter" label="Invia"></q-tab>
                    <q-tab name="check" label="Controlla"></q-tab>
                    <q-tab name="newslist" label="Già Inviate"></q-tab>
                    <q-tab name="mailinglist" label="Lista Contatti (MailingList)"></q-tab>
                    <q-tab name="events" label="Altre"></q-tab>
                </q-tabs>
            </div>
            <q-tab-panels v-model="tab" animated @transition="changetabnews">
                <q-tab-panel name="settings">
                    <div class="q-ma-xs q-pa-xs text-center rounded-borders q-list--bordered">
                        <CTitleBanner title="Impostazioni:"></CTitleBanner>

                        <div class="row">
                            <CMyFieldDb title="Altezza Logo"
                                        mykey="HEIGHT_LOGO"
                                        serv="true"
                                        :type="tools.FieldType.number">
                            </CMyFieldDb>
                            <CMyFieldDb title="Titolo Discipline"
                                        mykey="DISC_TITLE"
                                        serv="true"
                                        :type="tools.FieldType.string">
                            </CMyFieldDb>
                        </div>
                        <CMyFieldDb title="Testo Promozione"
                                    mykey="TEXT_PROMO"
                                    serv="true"
                                    :type="tools.FieldType.html">
                        </CMyFieldDb>

                        <div class="row">
                            <CMyFieldDb title="Numero di Eventi da mostrare"
                                        mykey="SHOW_LAST_N_EV"
                                        serv="true"
                                        :type="tools.FieldType.number">
                            </CMyFieldDb>
                            <CMyFieldDb title="Testo dopo gli Eventi"
                                        mykey="TEXT_AFTER_EV"
                                        serv="true"
                                        :type="tools.FieldType.html">
                            </CMyFieldDb>
                        </div>
                        <div class="row">
                            <CMyFieldDb title="Pagina Twitter"
                                        mykey="URL_TWITTER"
                                        :type="tools.FieldType.string">
                            </CMyFieldDb>
                            <CMyFieldDb title="Pagina Facebook"
                                        mykey="URL_FACEBOOK"
                                        :type="tools.FieldType.string">
                            </CMyFieldDb>
                            <CMyFieldDb title="Pagina YouTube"
                                        mykey="URL_YOUTUBE"
                                        :type="tools.FieldType.string">
                            </CMyFieldDb>
                            <CMyFieldDb title="Pagina Instagram"
                                        mykey="URL_INSTAGRAM"
                                        :type="tools.FieldType.string">
                            </CMyFieldDb>
                        </div>
                        <CMyFieldDb title="Firma"
                                    mykey="TEXT_SIGN"
                                    serv="true"
                                    :type="tools.FieldType.html">
                        </CMyFieldDb>
                        <CMyFieldDb title="Testo Disclaimer"
                                    mykey="TEXT_DISCLAIMER"
                                    serv="true"
                                    :type="tools.FieldType.html">
                        </CMyFieldDb>
                        <CMyFieldDb title="Testo a piè pagina"
                                    mykey="TEXT_DISC_BOTTOM"
                                    serv="true"
                                    :type="tools.FieldType.html">
                        </CMyFieldDb>


                    </div>
                </q-tab-panel>
                <q-tab-panel name="main_settings">
                    <div class="q-ma-xs q-pa-xs text-center rounded-borders q-list--bordered">
                        <CTitleBanner title="Impostazioni Server:"></CTitleBanner>

                        <CMyFieldDb title="Email da cui Inviare la Newsletter"
                                    mykey="EMAIL_FROM"
                                    serv="true"
                                    :type="tools.FieldType.string">
                        </CMyFieldDb>
                        <CMyFieldDb title="Email di Reply"
                                    mykey="EMAIL_REPLY"
                                    serv="true"
                                    :type="tools.FieldType.string">
                        </CMyFieldDb>
                        <CMyFieldDb title="Password email"
                                    mykey="PWD_FROM"
                                    serv="true"
                                    :type="tools.FieldType.password">
                        </CMyFieldDb>
                        <CMyFieldDb title="Servizio SMTP Email ('gmail' per inviare email da Gmail)"
                                    mykey="EMAIL_SERVICE_SEND"
                                    serv="true"
                                    :type="tools.FieldType.string">
                        </CMyFieldDb>
                        <CMyFieldDb title="Porta SMTP"
                                    mykey="EMAIL_PORT"
                                    serv="true"
                                    :type="tools.FieldType.number">
                        </CMyFieldDb>
                        <CMyFieldDb title="Millisecondi di pausa tra una email e l'altra"
                                    mykey="MSEC_PAUSE_SEND"
                                    serv="true"
                                    :type="tools.FieldType.number">
                        </CMyFieldDb>
                    </div>
                </q-tab-panel>
                <q-tab-panel name="events">
                    <CTitleBanner title="Altre Impostazioni:"></CTitleBanner>

                    <CMyFieldDb title="Messaggio dopo che l'utente ha Prenotato un Evento"
                                mykey="MSG_REPLY_AFTER_BOOKING"
                                serv="true"
                                :type="tools.FieldType.string">
                    </CMyFieldDb>

                </q-tab-panel>
                <q-tab-panel name="templemail">
                    <CTitleBanner title="Modelli Email:"></CTitleBanner>
                    <CGridTableRec prop_mytitle=""
                                   prop_mytable="templemail"
                                   :prop_mycolumns="getcoltemplemail"
                                   :prop_colkey="db_fieldsTable.getKeyByTable('templemail')"
                                   nodataLabel="Nessuna Email Template attualmente creata"
                                   noresultLabel="Il filtro selezionato non ha trovato nessun risultato"
                    >

                    </CGridTableRec>

                </q-tab-panel>
                <q-tab-panel name="newnewsletter">
                    <div class="q-ma-md q-pa-sm text-center rounded-borders q-list--bordered">
                        <CTitleBanner title="Test Invio Newsletter:"></CTitleBanner>
                        <div class="q-pa-xs q-ma-md q-gutter-md">

                            <q-btn v-if="tools.isDebug()" :loading="myloadingprew" rounded outline
                                   @click="sendNewsletterTest(true)"
                                   color="primary"
                                   icon="fas fa-desktop">
                                <span class="q-px-sm">Anteprima</span>
                                <template v-slot:loading>
                                    <q-spinner-hourglass class="on-left"/>
                                    Carica Anteprima...
                                </template>
                            </q-btn>
                            <div class="text-center">
                                <CMyFieldDb title="Email di Test"
                                            mykey="EMAIL_TEST"
                                            serv="true"
                                            :type="tools.FieldType.string">
                                </CMyFieldDb>
                                <q-btn :loading="myloading" rounded outline @click="sendNewsletterTest(false)"
                                       color="primary"
                                       icon="email">
                                    <span class="q-px-sm">Invia Email di Test</span>
                                    <template v-slot:loading>
                                        <q-spinner-hourglass class="on-left"/>
                                        Invia Email a '{{emailtest}}' in corso ...
                                    </template>
                                </q-btn>
                            </div>
                        </div>
                        <div class="q-ma-xs q-pa-sm text-center rounded-borders q-list--bordered">
                            <CTitleBanner title="Invia Newsletter:"></CTitleBanner>

                            <div class="q-pa-xs q-ma-md q-gutter-md">
                                <CMyFieldDb title="Template Email da Inviare"
                                            mykey="TEMPLEMAIL_ID"
                                            serv="true"
                                            :type="tools.FieldType.select"
                                            jointable="templemail">
                                </CMyFieldDb>

                                <q-btn :loading="myloading2" rounded outline @click="createNewsletter(3, myloading2)"
                                       color="primary"
                                       icon="fas fa-file-alt">
                                    <span class="q-px-sm">Crea Nuovo Invio Newsletter Schedulato tra 3 minuti</span>
                                    <template v-slot:loading>
                                        <q-spinner-hourglass class="on-left"/>
                                        Creazione Newsletter...
                                    </template>
                                </q-btn>
                                <br>
                                <q-btn :loading="myloading3" rounded outline @click="createNewsletter(10, myloading3)"
                                       color="primary"
                                       icon="fas fa-clock">
                                    <span class="q-px-sm">Crea Nuovo Invio Newsletter Schedulato tra 10 minuti</span>
                                    <template v-slot:loading>
                                        <q-spinner-hourglass class="on-left"/>
                                        Creazione Newsletter
                                    </template>
                                </q-btn>
                                <br>
                                <q-btn :loading="myloading4" rounded outline
                                       @click="createNewsletter(60*60*24, myloading4)"
                                       color="primary"
                                       icon="fas fa-calendar-day">
                                    <span class="q-px-sm">Crea Nuovo Invio Newsletter Schedulato tra 1 giorno</span>
                                    <template v-slot:loading>
                                        <q-spinner-hourglass class="on-left"/>
                                        Creazione Newsletter...
                                    </template>
                                </q-btn>
                            </div>
                        </div>
                        <div class="q-ma-md rounded-borders q-list--bordered">
                            <div class="text-center">
                                <CTitleBanner title="Prossima Newsletter da Inviare:"></CTitleBanner>
                            </div>


                            <div v-if="newsstate.nextnewstosent"
                                 class="q-ma-md q-pa-sm text-center rounded-borders q-list--bordered">
                                <q-card class="bg-grey-3 relative-position card-example">
                                    <q-card-section>
                                        <q-chip dense class="shadow-5 q-mb-md" color="orange" text-color="white"
                                                icon="schedule">
                                            Modello Email da Inviare: <span class="mlvalue">{{ newsstate.nextnewstosent.templemail_str }}</span>
                                        </q-chip>
                                        <br>
                                        <q-chip dense class="shadow-5 q-mb-md" color="blue" text-color="white"
                                                icon="schedule">
                                            Data Schedulato: <span class="mlvalue">{{ tools.getstrDateTimeAll(newsstate.nextnewstosent.datetoSent) }}</span>
                                        </q-chip>
                                        <br>
                                        <q-chip dense class="shadow-5 q-mb-md" color="blue" text-color="white"
                                                icon="schedule">
                                            Inizio Invio: <span class="mlvalue">{{ tools.getstrDateTimeAll(newsstate.nextnewstosent.datestartJob) }}</span>
                                        </q-chip>

                                        <q-chip dense class="shadow-5 q-mb-md" color="blue" text-color="white"
                                                icon="schedule">
                                            Fine Invio: <span class="mlvalue">{{ tools.getstrDateTimeAll(newsstate.nextnewstosent.datefinishJob) }}</span>
                                        </q-chip>
                                        <br>
                                        <div v-if="newsstate.nextnewstosent.starting_job && !newsstate.nextnewstosent.finish_job">
                                            <q-chip
                                                    dense class="shadow-5 q-mb-md" color="orange" text-color="white"
                                                    icon="email">
                                                <span class="mlvalue">Invio Newsletter in Corso...</span>
                                            </q-chip>
                                            <br>
                                        </div>
                                        <div>
                                            <q-chip dense class="shadow-5 q-mb-md" color="blue" text-color="white"
                                                    icon="schedule">
                                                Ultima Email inviata: <span class="mlvalue">{{ tools.getstrTimeAll(newsstate.nextnewstosent.lastemailsent_Job) }}</span>
                                            </q-chip>
                                            <q-chip dense class="shadow-5 q-mb-md" color="blue" text-color="white"
                                                    icon="email">
                                                Inviate: <span class="mlvalue">{{ newsstate.nextnewstosent.numemail_sent }} / {{ newsstate.nextnewstosent.numemail_tot }}</span>
                                            </q-chip>
                                            <q-circular-progress
                                                    show-value font-size="12px" :value="percsent(true)"
                                                    size="60px" :thickness="0.22" color="green"
                                                    track-color="grey-3"
                                                    class="q-ma-md"
                                            >
                                                <span class="mlvalue"> {{ percsent(true) }} % </span>
                                            </q-circular-progress>
                                            <div class="text-center">
                                                <q-slider
                                                        v-model="newsstate.nextnewstosent.numemail_sent"
                                                        :min="0"
                                                        readonly
                                                        :max="newsstate.nextnewstosent.numemail_tot"
                                                        :step="1"
                                                        label
                                                        label-always
                                                        color="light-green"></q-slider>
                                            </div>

                                        </div>
                                        <div v-if="newsstate.nextnewstosent.finish_job">
                                            <br>
                                            <q-chip dense class="shadow-5 q-mb-md" color="green"
                                                    text-color="white" icon="email">
                                                <span class="mlvalue">Invio Newsletter Completato</span>
                                            </q-chip>
                                        </div>
                                    </q-card-section>
                                    <q-inner-loading id="spinner2" :showing="myloadingload">
                                        <q-spinner-tail
                                                color="primary"
                                                size="4em">
                                        </q-spinner-tail>
                                    </q-inner-loading>
                                </q-card>
                            </div>
                            <div v-else>
                                <div>
                                    Nessuna Newsletter attualmente è stata Schedulata
                                </div>
                            </div>
                        </div>

                    </div>

                </q-tab-panel>
                <q-tab-panel name="check">
                    <div class="q-ma-md rounded-borders q-list--bordered">
                        <div class="text-center">
                            <CTitleBanner title="Ultima Newsletter Inviata:"></CTitleBanner>
                        </div>

                        <div v-if="newsstate.lastnewstosent"
                             class="q-ma-md q-pa-sm text-center rounded-borders q-list--bordered">
                            <q-card class="bg-grey-3 relative-position card-example">
                                <q-card-section>

                                    <q-chip dense class="shadow-5 q-mb-md" color="orange" text-color="white"
                                            icon="schedule">
                                        Modello Email: <span class="mlvalue">{{ newsstate.lastnewstosent.templemail_str }}</span>
                                    </q-chip>
                                    <div class="text-center">

                                    </div>

                                    <q-chip dense class="shadow-5 q-mb-md" color="blue" text-color="white"
                                            icon="schedule">
                                        Data Schedulato: <span class="mlvalue">{{ tools.getstrDateTimeAll(newsstate.lastnewstosent.datetoSent) }}</span>
                                    </q-chip>
                                    <br>
                                    <q-chip dense class="shadow-5 q-mb-md" color="blue" text-color="white"
                                            icon="schedule">
                                        Inizio Invio: <span class="mlvalue">{{ tools.getstrDateTimeAll(newsstate.lastnewstosent.datestartJob) }}</span>
                                    </q-chip>

                                    <q-chip dense class="shadow-5 q-mb-md" color="blue" text-color="white"
                                            icon="schedule">
                                        Fine Invio: <span class="mlvalue">{{ tools.getstrDateTimeAll(newsstate.lastnewstosent.datefinishJob) }}</span>
                                    </q-chip>
                                    <br>
                                    <div v-if="newsstate.lastnewstosent.activate && newsstate.lastnewstosent.starting_job && !newsstate.lastnewstosent.finish_job">
                                        <q-chip
                                                dense class="shadow-5 q-mb-md" color="orange" text-color="white"
                                                icon="email">
                                            <span class="mlvalue">Invio Newsletter in Corso...</span>
                                        </q-chip>
                                        <br>
                                    </div>
                                    <div v-if="!newsstate.lastnewstosent.activate">
                                        <q-chip
                                                dense class="shadow-5 q-mb-md" color="red" text-color="white"
                                                icon="email">
                                            <span class="mlvalue">L'invio della Newsletter è stato fermato dall'Utente.</span>
                                        </q-chip>
                                        <br>
                                    </div>

                                    <div>
                                        <q-chip dense class="shadow-5 q-mb-md" color="blue" text-color="white"
                                                icon="schedule">
                                            Ultima Email inviata: <span class="mlvalue">{{ tools.getstrTimeAll(newsstate.lastnewstosent.lastemailsent_Job) }}</span>
                                        </q-chip>
                                        <q-chip dense class="shadow-5 q-mb-md" color="blue" text-color="white"
                                                icon="email">
                                            Inviate: <span class="mlvalue">{{ newsstate.lastnewstosent.numemail_sent }} / {{   newsstate.lastnewstosent.numemail_tot }}</span>
                                        </q-chip>
                                        <q-circular-progress
                                                show-value font-size="12px" :value="percsent(false)"
                                                size="60px" :thickness="0.5" color="green"
                                                track-color="grey-3"
                                                class="q-ma-md"
                                        >
                                            <span class="mlvalue"> {{ percsent(false) }} % </span>
                                        </q-circular-progress>
                                        <div class="text-center">
                                            <q-slider
                                                    v-model="newsstate.lastnewstosent.numemail_sent"
                                                    :min="0"
                                                    readonly
                                                    :max="newsstate.lastnewstosent.numemail_tot"
                                                    :step="1"
                                                    label
                                                    label-always
                                                    color="light-green"></q-slider>
                                        </div>

                                    </div>
                                    <div v-if="newsstate.lastnewstosent.finish_job">
                                        <br>
                                        <q-chip dense class="shadow-5 q-mb-md" color="green"
                                                text-color="white" icon="email">
                                            <span class="mlvalue">Invio Newsletter Completato</span>
                                        </q-chip>
                                    </div>

                                    <div v-if="!newsstate.lastnewstosent.finish_job">
                                        <q-btn v-if="newsstate.lastnewstosent.activate" :loading="myloadingState"
                                               rounded outline
                                               @click="DisableNewsletter" color="negative" icon="">
                                            Ferma l'Invio della Newsletter
                                            <template v-slot:loading>
                                                <q-spinner-hourglass class="on-left"/>
                                                Disattivazione Invio Newsletter ...
                                            </template>
                                        </q-btn>
                                        <q-btn v-if="!newsstate.lastnewstosent.activate" :loading="myloadingState"
                                               rounded outline
                                               @click="EnableNewsletter" color="positive" icon="">
                                            Riattiva l'Invio della Newsletter
                                            <template v-slot:loading>
                                                <q-spinner-hourglass class="on-left"/>
                                                Riattivazione Invio Newsletter ...
                                            </template>
                                        </q-btn>
                                    </div>
                                </q-card-section>
                                <q-inner-loading id="spinner2" :showing="myloading">
                                    <q-spinner-tail
                                            color="primary"
                                            size="4em">
                                    </q-spinner-tail>
                                </q-inner-loading>
                            </q-card>
                        </div>
                    </div>
                </q-tab-panel>

                <q-tab-panel name="newslist">
                    <CTitleBanner bgcolor="bg-accent" title="Lista Newsletter Inviate:"></CTitleBanner>

                    <CGridTableRec prop_mytitle="Newsletter"
                                   prop_mytable="newstosent"
                                   :prop_mycolumns="getcolnewstosent"
                                   :prop_colkey="db_fieldsTable.getKeyByTable('newstosent')"
                                   nodataLabel="Nessuna Newsletter attualmente creata"
                                   noresultLabel="Il filtro selezionato non ha trovato nessun risultato"
                    >

                    </CGridTableRec>
                </q-tab-panel>
                <q-tab-panel name="mailinglist">
                    <div class="q-ma-md rounded-borders q-list--bordered">
                        <CTitleBanner title="Lista Contatti:" bgcolor="bg-positive"></CTitleBanner>

                        <div class="q-ma-md q-pa-sm text-center rounded-borders q-list--bordered">
                            <q-chip dense class="shadow-5 q-mb-md" color="blue" text-color="white" icon="email">
                                Email Totali: <span class="mlvalue">{{ newsstate.totemail }}</span>
                            </q-chip>
                            <q-chip dense class="shadow-5 q-mb-md" color="green" text-color="white"
                                    icon="event_available">
                                Email Sottoscritte: <span class="mlvalue">{{ newsstate.totsubscribed }}</span>
                            </q-chip>
                            <q-circular-progress
                                    show-value font-size="12px" :value="percsubscribed * 100"
                                    size="60px" :thickness="0.22" color="green"
                                    track-color="grey-3"
                                    class="q-ma-md"
                            >
                                <span class="mlvalue"> {{ progresslabsubscribed }} </span>
                            </q-circular-progress>

                            <q-chip dense class="shadow-5 q-mb-md" color="orange" text-color="white"
                                    icon="">
                                Email Desottoscritte: <span class="mlvalue">{{ newsstate.totunsubscribed }}</span>
                            </q-chip>
                        </div>

                        <CGridTableRec prop_mytitle="Lista Contatti"
                                       :prop_mytable="tools.TABMAILINGLIST"
                                       :prop_mycolumns="getcolmailinglist"
                                       :prop_colkey="db_fieldsTable.getKeyByTable('mailinglist')"
                                       nodataLabel="Nessuna Lista Contatti attualmente creata"
                                       noresultLabel="Il filtro selezionato non ha trovato nessun risultato"
                        >

                        </CGridTableRec>

                        <CTitleBanner title="Importa lista di Email:"></CTitleBanner>
                        <div class="q-ma-md q-pa-sm text-center rounded-borders q-list--bordered">

                            <q-input v-model="mailinglist_imported"
                                     autofocus
                                     filled
                                     bordered
                                     color="blue-12"
                                     @keyup.enter.stop
                                     type="textarea"
                            >
                            </q-input>
                            <div class="q-ma-md q-pa-sm text-center">
                                <q-btn :loading="myloadingImport" rounded outline :disable="mailinglist_imported === ''"
                                       @click="importMailinglist" color="primary" icon="email">
                                    Importa
                                    <template v-slot:loading>
                                        <q-spinner-hourglass class="on-left"/>
                                        Importazione Email in corso ...
                                    </template>
                                </q-btn>
                            </div>

                            <transition
                                    enter-active-class="animated fadeIn"
                                    leave-active-class="animated fadeOut"
                                    appear

                            >
                                <CTitleBanner v-if="errimport" bgcolor="bg-warning" :title="myrisimport"></CTitleBanner>
                                <CTitleBanner v-if="okimport" :title="myrisimport"></CTitleBanner>
                            </transition>
                        </div>
                    </div>
                </q-tab-panel>

            </q-tab-panels>

        </q-card>
    </CMyPage>

</template>
<script lang="ts" src="./newsletter.ts">
</script>
<style lang="scss" scoped>
    @import './newsletter.scss';
</style>
