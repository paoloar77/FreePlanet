<template>
  <div>
    <CTitleBanner title="Operazioni su DB:"></CTitleBanner>
    <div class="row justify-center q-gutter-sm q-list--bordered center_img" style="max-width: 400px">
      <div class="row">
        <q-btn label="Passa i codici Telefoni sul campo cell" color="primary"
               @click="EseguiFunz('changeCellInt')"></q-btn>
        <br></div>
      <div class="row">
        <q-btn label="Trasforma le email tutte in minuscolo" color="primary"
               @click="EseguiFunz('changeEmailLowerCase')"></q-btn>
        <br></div>
      <div class="row">
        <q-btn label="Crea Lista" color="primary" @click="EseguiFunz('creaLista')"></q-btn>
        <br></div>
      <div class="row">
        <q-btn label="Crea Billettera" color="primary" @click="EseguiFunz('creaBillettera')"></q-btn>
        <br></div>

      <div class="row">
        <q-input v-model="riga" type="number" autofocus label="Riga" style="width: 50px;"></q-input>
        <q-input v-model="col" type="number" autofocus label="Col" style="width: 50px;"></q-input>
        <q-btn label="Visualizza Placca" color="primary" @click="EseguiFunz('visuPlacca')"></q-btn>
        <q-input v-model="placca" autofocus label="Col" style="width: 300px; height: 400px;"></q-input>
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
