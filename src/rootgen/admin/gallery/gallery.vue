<template>
    <CMyPage title="Gallerie" imgbackground="../../statics/images/calendario_eventi.jpg" sizes="max-height: 120px">

        <div class="q-ma-sm q-gutter-sm">
            <CTitleBanner title="Gallerie"></CTitleBanner>
            <CGridTableRec prop_mytable="gallery"
                           prop_mytitle=""
                           :prop_mycolumns="getcolgallery"
                           prop_colkey="_id"
                           nodataLabel="Nessuna Galleria"
                           noresultLabel="Il filtro selezionato non ha trovato nessun risultato">

            </CGridTableRec>
        </div>
    </CMyPage>
</template>
<script lang="ts" src="gallery.ts">

</script>
<style lang="scss" scoped>
    @import 'gallery.scss';
</style>
