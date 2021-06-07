<template>
    <q-page padding class="signup">
        <CSignUpSIP :showadultcheck="true" :showcell="true" :showaportador="true" :shownationality="true">

        </CSignUpSIP>
    </q-page>

</template>

<script lang="ts" src="./signup_sip.ts">
</script>
<style lang="scss" scoped>
    @import './signup_sip.scss';
</style>
