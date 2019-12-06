<template>
    <q-card class="my-card text-center">
        <q-img :src="myop.img" class="myimg" :alt="`${myop.name} ${myop.surname}`">
            <div class="absolute-bottom text-spacetrans text-shadow">
                <div class="text-h6 text-trans">{{myop.name}}</div>
                <div class="text-subtitle-carica text-trans">{{myop.qualification}}</div>
            </div>
        </q-img>

        <q-tabs v-model="tab" class="text-teal">
            <q-tab label="Info" name="one"></q-tab>
            <q-tab label="Biografia" name="two"></q-tab>
        </q-tabs>

        <q-separator></q-separator>

        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="one">
                <div class="text-subtitle-carica">{{myop.disciplines}}</div>
                <div v-if="myop.certifications" class="text-subtitle-certificato">{{myop.certifications}}</div>
                <div class="op__cell">
                    <q-icon class="flex-icon" name="mobile_friendly"></q-icon>
                    {{myop.cell}}
                </div>

                <div class="op__storia" v-html="myop.intro"></div>
                <q-btn rounded size="sm" color="secondary" @click="clicca()">Continua ...</q-btn>
            </q-tab-panel>

            <q-tab-panel name="two">
                <div class="op__storia" v-html="myop.info"></div>
            </q-tab-panel>
        </q-tab-panels>

        <!--<q-card-section>-->
        <!--<div class="text-subtitle3">{{myop.disciplines}}</div>-->
        <!--{{myop.info}}-->
        <!--</q-card-section>-->
    </q-card>
</template>

<script lang="ts" src="./CBook.ts">
</script>

<style lang="scss" scoped>
    @import './CBook.scss';
</style>
