<template>
    <CMyPage img="" :title="$t('otherpages.admin.userlist')" keywords="" description="Lista Utenti">
        <CGridTableRec prop_mytable="users"
                       prop_mytitle="Lista Utenti"
                       :prop_mycolumns="userlist"
                       prop_colkey="_id"
                       nodataLabel="Nessun Utente"
                       noresultLabel="Il filtro selezionato non ha trovato nessun risultato"
                       :arrfilters="arrfilterand">

        </CGridTableRec>
    </CMyPage>
</template>
<script lang="ts" src="./usersList.ts">
</script>

<style lang="scss" scoped>
    @import './usersList.scss';
</style>


