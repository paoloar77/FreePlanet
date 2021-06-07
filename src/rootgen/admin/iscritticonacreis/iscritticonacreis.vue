<template>
  <CMyPage title="Iscritti Conacreis" imgbackground="../../statics/images/iscritti_conacreis.jpg"
           sizes="max-height: 120px">
        <span>{{
            setmeta({
              title: 'Iscritti Conacreis',
              description: "",
              keywords: ''
            })
          }}
        </span>


    <div class="q-ma-sm q-gutter-sm q-pa-xs">
      <CTitleBanner title="Iscritti Conacreis"></CTitleBanner>

      <q-btn
        rounded
        dense
        color="primary"
        size="md"
        label="Copia questa Lista negli appunti"

        @click="exportLista()">
      </q-btn>


      <CGridTableRec prop_mytable="iscritticonacreis"
                     prop_mytitle="Iscritti Conacreis"
                     :prop_mycolumns="getcolIscrittiConacreis"
                     prop_colkey="name"
                     nodataLabel="Nessun Iscritto Conacreis"
                     noresultLabel="Il filtro selezionato non ha trovato nessun risultato"
                     :arrfilters="arrfilterand"
                     @savefilter="savefilter"
      >

      </CGridTableRec>

    </div>
  </CMyPage>
</template>
<script lang="ts" src="./iscritticonacreis.ts">

</script>
<style lang="scss" scoped>
@import 'iscritticonacreis.scss';
</style>
