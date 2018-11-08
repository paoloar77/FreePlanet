<template >
    <q-page class="flex flex-center">
        <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">

        <q-btn round color="blue" icon="add" id="shareimagebutton" @click="openCreatePostModal">
            <q-spinner-facebook slot="loading"/>
        </q-btn>

        <q-field
                icon="wifi"
                :count="10"
                helper="Some helper"
        >
            <br>Conta = {{ conta }}
        </q-field>

        <!--<q-btn
                @click="showNotification"
                color="primary"
                label="Mostra notifica"
        />-->

        <q-card id="mycard" class="mycard" :style="mystilecard">
            <q-card-title>
                Card Title
            </q-card-title>
            <q-card-separator/>
            <q-card-main>
                Card Content
            </q-card-main>
        </q-card>

    </q-page>


</template>
<script lang="ts" src="./home.ts">
</script>
