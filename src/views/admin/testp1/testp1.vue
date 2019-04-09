<template>
    <div>
        CATEGORY:  <strong>{{ paramcategory }}</strong> <br>

        <label>TEST Prova Paolo</label><br>


        GETTER CONTATORE:
        {{ testpao1(300) }} <br>
        ARRAY:
        {{ testpao1_array(300) }} <br>

        TEST OBJECT {{ mioobj }} <br>
        ARR1 {{ getarr1 }} <br>
        <!--ARR2 {{ mioobj.arr2 }} <br>-->

        <!--<q-input v-model="testpao1(myvar)"></q-input>-->

        <q-input v-model="prova2" float-label="PROVA2:"></q-input>

        <q-input v-model="provagetter" float-label="PROVA GETTER:"></q-input>
        <q-input v-model="provagetterarray" float-label="GETTER ARRAY:"></q-input>

        <br>

        <q-btn color="secondary" rounded icon="refresh"
               @click="TestBtn" label="Test 1"/>

        <q-btn color="secondary" rounded icon="refresh" @click="TestBtn2" label="ADD TO ARRAY"/>
        <q-btn color="secondary" rounded icon="refresh" @click="TestBtnModify" label="MODIFY"/>
        <q-btn color="secondary" rounded icon="refresh" @click="TestBtnAction" label="MODIF_BYACTION"/>
        <q-btn color="secondary" rounded icon="refresh" @click="TestBtnDelete" label="DEL LAST"/>
        <!--<q-btn color="secondary" rounded icon="refresh" @click="TestBtnCambiaTutto" label="NEW ARR"/>-->
        <q-btn color="secondary" rounded icon="refresh" @click="TestBtnCambioaParamPassing" label="CAMBIA PARAM"/>

    </div>
</template>
<script lang="ts" src="./testp1.ts">
</script>

<style lang="scss" scoped>
    @import './testp1';
</style>
