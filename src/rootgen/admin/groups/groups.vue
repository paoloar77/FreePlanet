<template>
    <CMyPage title="Gruppi" imgbackground="../../statics/images/produttori.jpg" sizes="max-height: 120px">
        <span>{{ setmeta({
            title: 'Gruppi',
            description: "",
            keywords: '' } ) }}
        </span>

        <div class="q-ma-sm q-gutter-sm q-pa-xs">
            <CTitleBanner title="Gruppi"></CTitleBanner>
            <CGridTableRec prop_mytable="groups"
                           prop_mytitle="Gruppi"
                           :prop_mycolumns="getcolgroups"
                           prop_colkey="descr"
                           nodataLabel="Nessun Gruppo"
                           noresultLabel="Il filtro selezionato non ha trovato nessun risultato">

            </CGridTableRec>
        </div>
    </CMyPage>
</template>
<script lang="ts" src="./groups.ts">

</script>
<style lang="scss" scoped>
    @import 'groups.scss';
</style>
