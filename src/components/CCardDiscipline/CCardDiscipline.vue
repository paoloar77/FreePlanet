<template>
    <q-card class="my-card-discipline text-center fa-border inset-shadow">
        <q-img :src="`statics/` + discipline.img_small" class="myimg">
            <div class="absolute-bottom text-spacetrans">
                <q-btn rounded :to="discipline.linkpage">
                    <div class="text-h4 text-trans disc__title shadow-max">{{discipline.label}}</div>
                </q-btn>
            </div>
        </q-img>

        <q-card-section>
            <div class="disc__description">{{discipline.description}}</div>
        </q-card-section>

        <q-card-section v-if="getNextLesson(discipline.typol_code)">
            <i class="icon ion-calendar"></i> Prossima Lezione:
            <div class="disc__description">{{getNextLesson(discipline.typol_code)}}</div>
        </q-card-section>

        <q-btn rounded size="sm" color="primary" :to="discipline.linkpage">Leggi tutto</q-btn>


        <!--<q-card-section>-->
        <!--<div class="text-subtitle3">{{myop.disciplines}}</div>-->
        <!--{{myop.info}}-->
        <!--</q-card-section>-->
    </q-card>
</template>

<script lang="ts" src="./CCardDiscipline.ts">
</script>

<style lang="scss" scoped>
    @import './CCardDiscipline.scss';
</style>
