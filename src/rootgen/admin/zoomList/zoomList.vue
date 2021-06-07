<template>
    <CMyPage img="" :title="$t('otherpages.admin.zoomlist')" keywords="" :description="$t('otherpages.admin.zoomlist')">
        <CGridTableRec prop_mytable="calzoom"
                       :prop_mytitle="$t('otherpages.admin.zoomlist')"
                       :prop_mycolumns="db_fieldsTable.colTableCalZoom"
                       prop_colkey="_id"
                       nodataLabel="Nessuno Zoom"
                       noresultLabel="Il filtro selezionato non ha trovato nessun risultato">

        </CGridTableRec>
    </CMyPage>
</template>
<script lang="ts" src="./zoomList.ts">
</script>

<style lang="scss" scoped>
    @import './zoomList.scss';
</style>


