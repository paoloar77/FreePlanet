<template>
    <CMyPage img="" :title="$t('otherpages.admin.userlist')" keywords="" description="Lista Extra Utenti">
        <CGridTableRec prop_mytable="extralist"
                       prop_mytitle="Lista Extra Utenti"
                       :prop_mycolumns="db_fieldsTable.colTableExtraList"
                       prop_colkey="_id"
                       nodataLabel="Nessun Utente"
                       noresultLabel="Il filtro selezionato non ha trovato nessun risultato"
                       :arrfilters="arrfilterand"
        >

        </CGridTableRec>
    </CMyPage>
</template>
<script lang="ts" src="./extraList.ts">
</script>

<style lang="scss" scoped>
    @import './extraList.scss';
</style>
