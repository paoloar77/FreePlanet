<template>
  <div>
    <CTitleBanner title="Operazioni su DB:"></CTitleBanner>
    <div class="row justify-center q-gutter-sm q-list--bordered center_img" style="max-width: 600px">
      <CMyFieldDb title="SITO_ONLINE"
                  mykey="SITO_ONLINE"
                  :serv="false"
                  :type="tools.FieldType.boolean">
      </CMyFieldDb>
      <br>

      <CMyFieldDb title="ABILITA CRONTAB (1 ora)"
                  mykey="CRONTAB"
                  :serv="false"
                  :type="tools.FieldType.boolean">
      </CMyFieldDb>
      <br>


      <div class="row">
        <q-btn label="Crea Utenti Test" color="primary" @click="EseguiFunz('creaUtentiTest')"></q-btn>
        <br>
      </div>
      <!--<div class="row">
        <q-btn label="Passa i codici Telefoni sul campo cell" color="primary"
               @click="EseguiFunz('changeCellInt')"></q-btn>
        <br></div>
      <div class="row">
        <q-btn label="Trasforma le email tutte in minuscolo" color="primary"
               @click="EseguiFunz('changeEmailLowerCase')"></q-btn>
        <br></div>
      <div class="row">
        <q-btn label="IMPOSTARE A TUTTI PAYPAL" color="primary" @click="EseguiFunz('ImpostaATuttiPaypal')"></q-btn><br>
      </div>
    <div class="row">
      <q-btn label="NUM_TESS A 1" color="primary" @click="EseguiFunz('numtessUno')"></q-btn><br>
    </div>

      -->

      <div class="row">
        <!--<q-btn label="CORREGGI NUM_TESS" color="primary" @click="EseguiFunz('Corregginumtess')"></q-btn>
        <br>-->
        <!--<q-btn label="CORREGGI DATA GIFT CHAT" color="primary" @click="EseguiFunz('CorreggiDataGiftChat')"></q-btn>
        <br>-->
      </div>
      <div class="row">
        <!--<q-btn label="Inizializza ListaIngresso" color="negative"
               @click="EseguiFunz('initListaIngresso')"></q-btn>
        <br>-->
      </div>
      <!--
            <div class="row">
              <q-btn label="Elimina Navi" color="negative" @click="EseguiFunz('delNavi')"></q-btn><br>
            </div>
      -->
      <!--<div class="row">
          <q-btn label="Elimina Navi non Partite" color="negative"
                 @click="EseguiFunz('delNaviNoStarted')"></q-btn>
          <br>
      </div>-->
      <div class="row">
        <q-btn label="Rigenera (Elim, Genera Graduat, Add Navi Temp" color="positive" size="lg"
               @click="EseguiFunz('rigeneraTutto')"></q-btn>

        <!--<q-btn label="Crea ListaIngresso" color="positive" @click="EseguiFunz('creaLista')"></q-btn>-->
      </div>
      <br>
      <div class="row">
        <q-btn label="Elimina Navi Provvisorie" color="negative"
               @click="EseguiFunz('delNaviProvvisorie')"></q-btn>

        <!--<q-btn label="Crea ListaIngresso" color="positive" @click="EseguiFunz('creaLista')"></q-btn>-->
      </div>
      <q-btn label="Genera Graduatoria" color="primary"
             @click="EseguiFunz('GeneraGraduatoria')"></q-btn>
      <br>
      <q-btn label="1) Aggiungi in Navi Temporanee" color="primary" @click="EseguiFunz('creaNavi')"></q-btn>
      <br>
      <div class="q-pa-sm row">
        <CDateTime
          :value.sync="date_start"
          :label="$t('cal.eventstartdatetime')"
          :readonly="false">
        </CDateTime>
        <q-input v-model="numpersone" type="number" autofocus label="Num Persone to Add"
                 style="width: 100px;"></q-input>
        <q-btn label="2) CREA NAVI PERSISTENTI" color="primary" @click="EseguiFunz('CreaNaviPersistenti')"></q-btn>
        <br>

      </div>
      <div v-if="!incaricamento" class="row">
        <CMyFieldDb title="Riga"
                    mykey="riga"
                    :serv="false"
                    :type="tools.FieldType.number">
        </CMyFieldDb>
        <CMyFieldDb title="Col"
                    mykey="col"
                    :serv="false"
                    :type="tools.FieldType.number">
        </CMyFieldDb>
        <!--<CMyFieldDb title="Riga Doni"
                    mykey="rigadoni"
                    :serv="false"
                    :type="tools.FieldType.number">
        </CMyFieldDb>
        <CMyFieldDb title="Col Doni"
                    mykey="coldoni"
                    :serv="false"
                    :type="tools.FieldType.number">
        </CMyFieldDb>-->
        <CMyFieldDb title="Visu_TEST"
                    mykey="VISU_TEST"
                    :serv="false"
                    :type="tools.FieldType.boolean">
        </CMyFieldDb>
        <CMyFieldDb title="VISU_NAVE_BOT"
                    mykey="VISU_NAVE_BOT"
                    :serv="false"
                    :type="tools.FieldType.boolean">
        </CMyFieldDb>
      </div>

      <div class="row">
        <q-btn label="Statistiche" color="warning" @click="EseguiFunz('visuStat')"></q-btn>

      </div>

      <div class="row">
        <q-btn label="Pulisci chi non è presente in Nave" color="positive"
               @click="EseguiFunz('pulisciNonPresenzeInNave')"></q-btn>
        <br>
      </div>
      <div class="row">
        <q-btn label="Visualizza Lista Nave" color="primary" @click="EseguiFunz('visuListaNave')"></q-btn>

      </div>
      <!--<div class="row">
        <q-btn label="Visualizza ListaIngresso" color="primary"
               @click="EseguiFunz('visuListaIngresso')"></q-btn>
        <br>
        <q-btn label="Visualizza ListaIngresso Nuovi" color="primary"
               @click="EseguiFunz('visuListaIngressoNuovi')"></q-btn>
        <br>
      </div>-->

      <q-btn label="Aggiorna Indice Graduatoria" color="primary"
             @click="EseguiFunz('AggiornaIndiceGraduatoria')"></q-btn>
      <br>
      <q-btn label="Visu Navi con utenti Eliminati" color="primary"
             @click="EseguiFunz('visuNaviUtentiEliminati')"></q-btn>
      <br>
      <div class="row">
        <q-btn label="0) ELIMINA VECCHI LISTEINGRESSO !" color="negative"
               @click="EseguiFunz('eliminaListeIngressoNascoste')"></q-btn>
        <br>
      </div>
      <div class="row">
        <q-btn label="CONVERTI SUBACCOUNT !" color="negative"
               @click="EseguiFunz('convSubAccount')"></q-btn>
        <br>
      </div>
      <div class="row">
        <q-btn label="FLAGGA GLI UTENTI CON NAVI NON PRESENTI!" color="primary"
               @click="EseguiFunz('flagUtentiNaviNonPresenti')"></q-btn>
        <br>
      </div>
      <div class="row">
        <q-btn label="GENERA FLOTTE!" color="primary"
               @click="EseguiFunz('generaFlotte')"></q-btn>
        <br>
      </div>
      <!--<div class="row">
        <q-btn label="AGGIUNGI NAVE PER UTENTI CHE NON CE L'HANNO (flag navinonpresenti)!" color="primary"
               @click="EseguiFunz('addNavePerUtentiNaviNonPresenti')"></q-btn>
        <br>
      </div>-->
      <div class="row">
        <q-btn label="1) CONVERTI TUTTA LA STRUTTURA NEL NUOVO SISTEMA !" color="negative"
               @click="EseguiFunz('creaTessituraeConv')"></q-btn>
        <br>
      </div>
      <div class="row">
        <q-btn label="2) CONVERTI Navi Num_Tess 3 e 5 in Record di ListaIngresso" color="negative"
               @click="EseguiFunz('convNaviTessinListaIngressoRec')"></q-btn>
        <br>
      </div>
      <div class="row">
        <q-btn label="3) Rendi Visibile i Record Nascosti di ListaINGRESSO" color="negative"
               @click="EseguiFunz('RendiVisibileIrecordNascosti')"></q-btn>
        <br>
      </div>
      <br>
      <br>
      <!--<div class="row">
          <q-btn label="CHECK SE INSERIRE UTENTI IN Nave" color="primary"
                 @click="EseguiFunz('checkInserimentiUtentiInNave')"></q-btn>
          <br>
      </div>-->

      <div class="row">
        <q-input v-model="riga" type="number" autofocus label="Riga" style="width: 50px;"></q-input>
        <q-input v-model="col" type="number" autofocus label="Col" style="width: 50px;"></q-input>
        <q-btn label="Visualizza Nave da 8" color="primary" @click="EseguiFunz('visuPlacca')"></q-btn>
        <br>
        <q-btn label="Visualizza Nave" color="primary" @click="EseguiFunz('visuNave')"></q-btn>
        <br>
      </div>
      <div class="row">
        <q-input v-model="placca" type="textarea" autofocus label="Placca" autogrow
                 style="width: 500px; height: 400px;"></q-input>
        <br>
      </div>
    </div>


    <q-field
      stack-label
      dense
    >
      <template v-slot:control>
        <div class="self-center full-width no-outline text-center" tabindex="0">{{ris}}</div>
      </template>

    </q-field>

  </div>
</template>
<script lang="ts" src="./dbop.ts">
</script>

<style lang="scss" scoped>
  @import './dbop';
</style>
