<template>
    <CMyPage title="Uffici" imgbackground="../../statics/images/produttori.jpg" sizes="max-height: 120px">
        <span>{{ setmeta({
            title: 'Uffici',
            description: "",
            keywords: '' } ) }}
        </span>

        <div class="q-ma-sm q-gutter-sm q-pa-xs">
            <CTitleBanner title="Uffici"></CTitleBanner>
            <CGridTableRec prop_mytable="departments"
                           prop_mytitle="Lista Uffici"
                           :prop_mycolumns="getcoldepartments"
                           prop_colkey="name"
                           nodataLabel="Nessun Ufficio"
                           noresultLabel="Il filtro selezionato non ha trovato nessun risultato">

            </CGridTableRec>
        </div>
    </CMyPage>
</template>
<script lang="ts" src="./departments.ts">

</script>
<style lang="scss" scoped>
    @import 'departments.scss';
</style>
