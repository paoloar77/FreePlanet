<template>
    <CMyPage title="Siti" imgbackground="../../statics/images/siti.jpg" sizes="max-height: 120px">
        <span>{{ setmeta({
            title: 'Siti',
            description: "",
            keywords: '' } ) }}
        </span>


        <div class="q-ma-sm q-gutter-sm q-pa-xs">
            <CTitleBanner title="Siti Web"></CTitleBanner>
            <CGridTableRec prop_mytable="sites"
                           prop_mytitle="Lista Siti"
                           :prop_mycolumns="getcolSites"
                           prop_colkey="name"
                           nodataLabel="Nessun Sito"
                           noresultLabel="Il filtro selezionato non ha trovato nessun risultato">

            </CGridTableRec>
        </div>
    </CMyPage>
</template>
<script lang="ts" src="./sites.ts">

</script>
<style lang="scss" scoped>
    @import 'sites.scss';
</style>
