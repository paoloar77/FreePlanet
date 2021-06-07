<template>
    <CMyPage title="Magazzini" imgbackground="../../statics/images/produttori.jpg" sizes="max-height: 120px">
        <span>{{ setmeta({
            title: 'Magazzini',
            description: "",
            keywords: '' } ) }}
        </span>

        <div class="q-ma-sm q-gutter-sm q-pa-xs">
            <CTitleBanner title="Magazzini"></CTitleBanner>
            <CGridTableRec prop_mytable="storehouses"
                           prop_mytitle="Lista Magazzini"
                           :prop_mycolumns="getcolstorehouses"
                           prop_colkey="name"
                           nodataLabel="Nessun Magazzino"
                           noresultLabel="Il filtro selezionato non ha trovato nessun risultato">

            </CGridTableRec>
        </div>
    </CMyPage>
</template>
<script lang="ts" src="./storehouses.ts">

</script>
<style lang="scss" scoped>
    @import 'storehouses.scss';
</style>
