<template>
    <div>
        <div class="q-ma-sm q-gutter-sm q-pa-xs">
            <CGridTableRec prop_mytable="hours"
                           prop_mytitle="Lista Ore"
                           :prop_mycolumns="getcolHours"
                           prop_colkey="descr"
                           nodataLabel="Nessuna Lista Ore"
                           noresultLabel="Il filtro selezionato non ha trovato nessun risultato"
                           :arrfilters="myarrfilterand"
                           :filterdef="myfilterdef"
                           :prop_codeId="todoId"
                           :defaultnewrec="getdefaultnewrec"
                           :extraparams="extraparams"
            labeladd="Aggiungi Ora">

            </CGridTableRec>
        </div>
    </div>
</template>
<script lang="ts" src="./CHours.ts">

</script>
<style lang="scss" scoped>
    @import 'CHours.scss';
</style>
