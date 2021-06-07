<template>
    <CMyPage title="Produttori" imgbackground="../../statics/images/produttori.jpg" sizes="max-height: 120px">
        <span>{{ setmeta({
            title: 'Produttori',
            description: "",
            keywords: '' } ) }}
        </span>

        <div class="q-ma-sm q-gutter-sm q-pa-xs">
            <CTitleBanner title="Produttori"></CTitleBanner>
            <CGridTableRec prop_mytable="producers"
                           prop_mytitle="Lista Produttori"
                           :prop_mycolumns="getcolproducer"
                           prop_colkey="name"
                           nodataLabel="Nessun Produttore"
                           noresultLabel="Il filtro selezionato non ha trovato nessun risultato">

            </CGridTableRec>
        </div>
    </CMyPage>
</template>
<script lang="ts" src="./producer.ts">

</script>
<style lang="scss" scoped>
    @import 'producer.scss';
</style>
