<template>
    <CMyPage img="" :title="$t('otherpages.admin.userlist')" keywords="" description="">
        <CGridTableRec :prop_mytitle="$t('otherpages.admin.tableslist')"
                       nodataLabel="Nessun Dato"
                       noresultLabel="Il filtro selezionato non ha trovato nessun risultato"
                       :tablesList="gettablesList">

        </CGridTableRec>
    </CMyPage>
</template>
<script lang="ts" src="./tablesList.ts">
</script>

<style lang="scss" scoped>
    @import './tablesList.scss';
</style>
