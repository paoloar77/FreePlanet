<template>
    <q-page padding class="signin">
        <CSignIn :mythis="mythis"
                 @loginOk="loginOk"
                 @loginInCorso="loginInCorso"
                 @checkErrors="checkErrors"
                 @showNotif="showNotif">
        </CSignIn>
    </q-page>
</template>

<script lang="ts" src="./signin.ts">
</script>

<style lang="scss" scoped>
    @import './signin.scss';
</style>
