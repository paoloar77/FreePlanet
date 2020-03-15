<template>
  <div>
    <CTitleBanner title="Operazioni su DB:"></CTitleBanner>
    <div class="row justify-center q-gutter-sm q-list--bordered center_img" style="max-width: 600px">
      <div class="row">
        <q-btn label="Passa i codici Telefoni sul campo cell" color="primary"
               @click="EseguiFunz('changeCellInt')"></q-btn>
        <br></div>
      <div class="row">
        <q-btn label="Trasforma le email tutte in minuscolo" color="primary"
               @click="EseguiFunz('changeEmailLowerCase')"></q-btn>
        <br></div>
      <div class="row">
        <q-btn label="Crea Utenti Test" color="primary" @click="EseguiFunz('creaUtentiTest')"></q-btn><br>
      </div>
      <div class="row">
        <q-btn label="IMPOSTARE A TUTTI PAYPAL" color="primary" @click="EseguiFunz('ImpostaATuttiPaypal')"></q-btn><br>
      </div>
      <div class="row">
        <q-btn label="NUM_TESS A 1" color="primary" @click="EseguiFunz('numtessUno')"></q-btn><br>
      </div>
      <div class="row">
        <q-btn label="Inizializza ListaIngresso" color="negative" @click="EseguiFunz('initListaIngresso')"></q-btn><br>
        <q-btn label="Crea ListaIngresso" color="negative" @click="EseguiFunz('creaLista')"></q-btn>
      </div>
<!--
      <div class="row">
        <q-btn label="Elimina Navi" color="negative" @click="EseguiFunz('delNavi')"></q-btn><br>
      </div>
-->
      <div class="row">
        <q-btn label="Elimina Navi non Partite" color="negative" @click="EseguiFunz('delNaviNoStarted')"></q-btn><br>
      </div>
      <div class="row">
        <q-btn label="Controlla Utenti inesistenti in Navi" color="primary" @click="EseguiFunz('checkUtentiInesistentiInNavi')"></q-btn><br>
      </div>
      <div>
        <CDateTime
          :value.sync="date_start"
          :label="$t('cal.eventstartdatetime')"
          :readonly="false">
        </CDateTime>
        <q-input v-model="numpersone" type="number" autofocus label="Num Persone to Add" style="width: 50px;"></q-input>
        <q-btn label="Crea Nave" color="negative" @click="EseguiFunz('creaNave')"></q-btn>
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
        <CMyFieldDb title="Riga Doni"
                    mykey="rigadoni"
                    :serv="false"
                    :type="tools.FieldType.number">
        </CMyFieldDb>
        <CMyFieldDb title="Col Doni"
                    mykey="coldoni"
                    :serv="false"
                    :type="tools.FieldType.number">
        </CMyFieldDb>
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
        <q-btn label="Pulisci chi non è presente in Nave" color="primary" @click="EseguiFunz('pulisciNonPresenzeInNave')"></q-btn><br>
      </div>
      <div class="row">
        <q-btn label="Visualizza Lista Nave" color="primary" @click="EseguiFunz('visuListaNave')"></q-btn><br>
      </div>
      <div class="row">
        <q-btn label="Visualizza ListaIngresso" color="primary" @click="EseguiFunz('visuListaIngresso')"></q-btn><br>
      </div>
      <div class="row">
        <q-btn label="Visualizza ListaIngresso NUOVI" color="primary" @click="EseguiFunz('visuListaIngressoNew')"></q-btn><br>
      </div>
      <div class="row">
        <q-btn label="CHECK SE INSERIRE UTENTI IN Nave" color="primary" @click="EseguiFunz('checkInserimentiUtentiInNave')"></q-btn><br>
      </div>

      <div class="row">
        <q-input v-model="riga" type="number" autofocus label="Riga" style="width: 50px;"></q-input>
        <q-input v-model="col" type="number" autofocus label="Col" style="width: 50px;"></q-input>
        <q-btn label="Visualizza Nave da 8" color="primary" @click="EseguiFunz('visuPlacca')"></q-btn><br>
        <q-btn label="Visualizza Nave" color="primary" @click="EseguiFunz('visuNave')"></q-btn><br>
      </div>
      <div class="row">
        <q-input v-model="placca" type="textarea" autofocus label="Placca" autogrow style="width: 500px; height: 400px;"></q-input>
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
