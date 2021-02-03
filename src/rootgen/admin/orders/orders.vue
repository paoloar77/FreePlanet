<template>
    <CMyPage title="Ordini Ufficio" imgbackground="../../statics/images/produttori.jpg" sizes="max-height: 120px">
        <span>{{ setmeta({
            title: 'Ordini Ufficio',
            description: "",
            keywords: '' } ) }}
        </span>

        <div class="q-ma-sm q-gutter-sm q-pa-xs">
            <CTitleBanner title="Ordini Ufficio"></CTitleBanner>
            <!--<CGridTableRec prop_mytable="orderscart"
                           prop_mytitle="Lista Ordini"
                           :prop_mycolumns="getcolorderscart"
                           prop_colkey="name"
                           nodataLabel="Nessun Ordine"
                           noresultLabel="Il filtro selezionato non ha trovato nessun risultato">

            </CGridTableRec>
            -->
        </div>
    </CMyPage>
</template>
<script lang="ts" src="./orders.ts">

</script>
<style lang="scss" scoped>
    @import 'orders.scss';
</style>
