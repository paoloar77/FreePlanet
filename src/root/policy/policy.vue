<template>
    <q-page class="">
        <div class="landing">
            <PagePolicy
                    owneremail="info@associazioneshen.it"
                    SiteName="Associazione Shen"
                    ownerDataName="Associazione Shen"
                    managerData="Cristina Barattoni"
                    includeData="dati anagrafici (ragione sociale, nome, cognome), recapiti (telefono, indirizzo email)"
                    url="www.associazioneshen.it"
                    lastdataupdate="11 luglio 2019"
                    country="Italia"
            >

            </PagePolicy>

            <Footer></Footer>
        </div>

    </q-page>


</template>
<script lang="ts" src="./policy.ts">
</script>
<style lang="scss" scoped>
    @import './policy.scss';
</style>
