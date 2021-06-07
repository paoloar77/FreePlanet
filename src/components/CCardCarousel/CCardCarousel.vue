<template>
    <div class="row items-center q-gutter-md ">
        <div class="padding">
            <div class="landing__features">
                <q-list bordered class="q-ma-md">
                    <q-item>
                        <q-item-section>
                            <q-item-label overline class="text-subtitle3">Discipline Offerte:</q-item-label>
                        </q-item-section>
                    </q-item>
                    <div v-for="(disc, index) in myarr" :key="index">
                        <q-item clickable v-ripple
                                :to="disc.linkpage">
                            <q-item-section avatar v-if="tools.getimgev(disc)">
                                <q-avatar>
                                    <img :src="tools.getimgev(disc)" :alt="disc.label">
                                </q-avatar>
                            </q-item-section>
                            <q-item-section>{{disc.label}}</q-item-section>
                        </q-item>
                        <q-separator/>
                    </div>
                </q-list>
            </div>
        </div>

        <q-carousel
                swipeable
                animated
                :autoplay="autoplaydisc"
                v-model="slidedisc"
                thumbnails
                infinite
                ref="carousel"
                transition-next="slide-left"
                transition-prev="slide-right"
                height="600px"
                width="100%"
        >
            <template v-slot:control>
                <q-carousel-control
                        position="top"
                        class="text-center"
                        style="padding: 4px 8px 4px 0; border-radius: 4px; font-weight: bold;"
                >
                    <q-toggle dark color="white" v-model="autoplaydisc" label="Auto Play" class="shadow-8"
                              style="background-color: rgba(0,0,0, 0.2);"></q-toggle>
                </q-carousel-control>

                <q-carousel-control
                        position="top-left"
                        class="q-gutter-xs"
                        style="opacity: 0.7;"
                >
                    <q-btn
                            push round color="white" text-color="black" icon="keyboard_arrow_left"
                            @click="$refs.carousel.previous()"></q-btn>
                </q-carousel-control>
                <q-carousel-control
                        position="top-right"
                        class="q-gutter-xs"
                        style="opacity: 0.7;"
                >
                    <q-btn
                            push round color="white" text-color="black" icon="keyboard_arrow_right"
                            @click="$refs.carousel.next()"></q-btn>
                </q-carousel-control>
            </template>
            <q-carousel-slide v-for="(myrec, index) in myarr" :key="index"
                              :img-src="`statics/`+myrec.img_small"
                              :alt="myrec.label"
                              :name="index">
                <div class="row q-ma-xs">
                    <CCardDiscipline :discipline="myrec" mystyle="height: 500px" :autoplay.sync="autoplaydisc">

                    </CCardDiscipline>
                </div>
                <div class="absolute-bottom sfondo-grigio">
                    <span class="text-h6 text-grey-1 shadow-max alignleft">{{index + 1}}. </span>
                </div>

            </q-carousel-slide>
        </q-carousel>
    </div>
</template>

<script lang="ts" src="./CCardCarousel.ts">
</script>

<style lang="scss" scoped>
    @import './CCardCarousel.scss';
</style>
