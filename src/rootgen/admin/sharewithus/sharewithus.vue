<template>
    <CMyPage title="Condividi" imgbackground="../../statics/images/sharewithus.jpg" sizes="max-height: 120px">
        <span>{{ setmeta({
            title: 'Condividi',
            description: "",
            keywords: '' } ) }}
        </span>

        <div class="q-ma-sm q-gutter-sm q-pa-xs">
            <CTitleBanner title="Condividi Con Noi"></CTitleBanner>
            <CGridTableRec prop_mytable="sharewithus"
                           prop_mytitle="Lista Condivisioni"
                           :prop_mycolumns="getcolsharewithus"
                           prop_colkey="description"
                           nodataLabel="Nessuna Condivisione"
                           noresultLabel="Il filtro selezionato non ha trovato nessun risultato">

            </CGridTableRec>
        </div>
    </CMyPage>
</template>
<script lang="ts" src="./sharewithus.ts">

</script>
<style lang="scss" scoped>
    @import 'sharewithus.scss';
</style>
