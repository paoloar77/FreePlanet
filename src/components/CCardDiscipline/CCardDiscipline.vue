<template>
    <div class="my-card-shadow yes_shadow" style="opacity: 1 !important;">
        <q-card class="my-card-discipline text-center inset-shadow" :style="mystyle">
            <q-img :src="`statics/` + discipline.img_small" class="myimg">
                <div class="absolute-bottom text-spacetrans">
                    <q-btn rounded :to="discipline.linkpage">
                        <div class="text-h5 disc__title shadow-max">{{discipline.label}}</div>
                    </q-btn>
                </div>
            </q-img>

            <q-card-section>
                <div class="disc__description" v-html="discipline.description"></div>
            </q-card-section>

            <q-card-section v-if="ExistLesson()" class="text-blue">
                <span v-if="!tools.isMobile()">{{ $t('cal.nextevent') }}:</span>
                <q-btn rounded type="a" :to="getLinkEvent" color="primary" icon="event" :label="NextEventDate()">
                </q-btn>
            </q-card-section>

            <span v-if="!tools.isMobile()"><q-separator inset></q-separator></span>

            <q-card-section class="row justify-center">
                <div v-for="(teach, index) in discipline.teachers" :key="index"
                     v-if="getImgTeacherByUsername(teach) && isValidUsername(teach)">
                    <CMyTeacher :username="teach">
                    </CMyTeacher>
                </div>
            </q-card-section>

            <q-btn class="q-mb-md" rounded size="md" color="primary" :to="discipline.linkpage" :label="$t('cal.readall')"></q-btn>


            <!--<q-card-section>-->
            <!--<div class="text-subtitle3">{{myop.disciplines}}</div>-->
            <!--{{myop.info}}-->
            <!--</q-card-section>-->
        </q-card>
    </div>
</template>

<script lang="ts" src="./CCardDiscipline.ts">
</script>

<style lang="scss" scoped>
    @import './CCardDiscipline.scss';
</style>
