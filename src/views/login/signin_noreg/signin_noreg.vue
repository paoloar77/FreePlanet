<template>
    <q-page padding class="signin">
        <CSignIn :mythis="mythis"
                 @loginOk="loginOk"
                 @loginInCorso="loginInCorso"
                 :showregbutt="false"
                 @checkErrors="checkErrors"
                 @showNotif="showNotif">
        </CSignIn>
    </q-page>
</template>

<script lang="ts" src="./signin_noreg.ts">
</script>

<style lang="scss" scoped>
    @import './signin_noreg.scss';
</style>
