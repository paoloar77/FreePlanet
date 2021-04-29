<template>
  <div>
    <CMyPage mypath="/diventa_socio">
    </CMyPage>

    <CTitleBanner v-if="isSocio" title="Nota: Ci risulta che sei già Socio Iscritto !"
                  bgcolor="bg-positive"
                  clcolor="text-white"></CTitleBanner>

    <q-page padding>
      <div class="signup">
        <CSignUpIscrizioneConacreis>

        </CSignUpIscrizioneConacreis>
      </div>

      <Footer></Footer>
    </q-page>
  </div>
</template>

<script lang="ts" src="./iscrizioneconacreis.ts">
</script>
<style lang="scss" scoped>
@import './iscrizioneconacreis.scss';
</style>
