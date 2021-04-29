<template>
  <div>
    <CSignIn :mythis="mythis"
             @loginOk="loginOk"
             @loginInCorso="loginInCorso"
             :showregbutt="showregbutt"
             @checkErrors="checkErrors"
             @showNotif="showNotif">
    </CSignIn>
  </div>
</template>

<script lang="ts" src="./CSigninNoreg.ts">
</script>

<style lang="scss" scoped>
  @import './CSigninNoreg.scss';
</style>
