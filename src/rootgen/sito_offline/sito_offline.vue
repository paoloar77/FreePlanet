<template>
    <CMyPage img="statics/images/logo.png" title="Sito in Aggiornamento" sizes="max-height: 150px">
        <span>{{ setmeta({
            title: 'Pagine',
            description: "",
            keywords: '' } ) }}
        </span>

      <div class="q-gutter-sm flex-center text-h5 text-center">
        <div class="">Il Sito è attualmente in fase di Aggiornamento! </div>
        <div class="">Si prega di riprovare più tardi. </div>
        <div class="">Grazie</div>

        <div class="">
          <q-btn rounded type="a" to="/" color="primary" icon="event" size="lg"
                 label="Riprova">
          </q-btn>
        </div>
      </div>
      <br><br><br><br>

    </CMyPage>
</template>
<script lang="ts" src="./sito_offline.ts">

</script>
<style lang="scss" scoped>
    @import './sito_offline';
</style>
