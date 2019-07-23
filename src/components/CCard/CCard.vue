<template>
    <q-card class="my-card text-center">
        <q-img :src="myop.img" class="myimg">
            <div class="absolute-bottom text-spacetrans text-shadow">
                <div class="text-h6 text-trans">{{myop.name}}</div>
                <div class="text-subtitle-carica text-trans">{{myop.sub1}}</div>
            </div>
        </q-img>

        <q-tabs v-model="tab" class="text-teal">
            <q-tab label="Info" name="one"></q-tab>
            <q-tab label="Storia" name="two"></q-tab>
        </q-tabs>

        <q-separator></q-separator>

        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="one">
                <div class="text-subtitle-carica">{{myop.sub2}}</div>
                <div v-if="myop.sub3" class="text-subtitle-certificato">{{myop.sub3}}</div>
                <div class="op__cell">
                    <q-icon class="flex-icon" name="mobile_friendly"></q-icon>
                    {{myop.cell}}
                </div>
                <div class="op__email">
                    <q-icon class="flex-icon" name="contact_mail"> </q-icon>&nbsp;
                    <a :href="tools.getemailto(myop.email)" target="_blank">{{myop.email}}
                    </a>
                </div>

                <div class="op__facebook" v-if="myop.paginafb">
                    <a :href="myop.paginafb" target="_blank">
                        <i aria-hidden="true" class="q-icon fab fa-facebook-f icon_contact links"></i> Pagina Facebook
                    </a>
                </div>


                <div class="op__storia" v-html="myop.intro"></div>
                <q-btn rounded size="sm" color="secondary" @click="clicca()">Continua ...</q-btn>
            </q-tab-panel>

            <q-tab-panel name="two">
                <div class="op__storia" v-html="myop.info"></div>
            </q-tab-panel>
        </q-tab-panels>

        <!--<q-card-section>-->
        <!--<div class="text-subtitle3">{{myop.sub2}}</div>-->
        <!--{{myop.info}}-->
        <!--</q-card-section>-->
    </q-card>
</template>

<script lang="ts" src="./CCard.ts">
</script>

<style lang="scss" scoped>
    @import './CCard.scss';
</style>
