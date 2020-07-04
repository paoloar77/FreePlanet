<template>
    <CMyPage title="Template Messaggi" imgbackground="../../statics/images/calendario_eventi.jpg" sizes="max-height: 100px">
        <span>{{ setmeta({
            title: 'Template Messaggi',
            description: "",
            keywords: '' } ) }}
        </span>

        <div class="q-ma-sm q-gutter-sm q-pa-xs">
            <CTitleBanner title="Template Messaggi"></CTitleBanner>
            <CGridTableRec prop_mytable="msg_templates"
                           prop_mytitle="Lista Messaggi"
                           :prop_mycolumns="getcolmsg_templates"
                           prop_colkey="title"
                           nodataLabel="Nessun Messaggio"
                           noresultLabel="Il filtro selezionato non ha trovato nessun risultato">

            </CGridTableRec>
        </div>
    </CMyPage>
</template>
<script lang="ts" src="./msg_template.ts">

</script>
<style lang="scss" scoped>
    @import 'msg_template.scss';
</style>
