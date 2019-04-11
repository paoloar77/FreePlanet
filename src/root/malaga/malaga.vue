<template>
    <q-page class="text-white">
        <div class="landing">
            <section>
                <div class="landing__hero">
                    <q-carousel
                            animated
                            infinite
                            arrows
                            thumbnails
                            transition-next="slide-left"
                            transition-prev="slide-right"
                            v-model="slide2"
                            height="100%"
                            width="100%"
                    >
                        <q-carousel-slide v-for="(rec, index) in getImmagini" :key="index" :name="index" :img-src="rec.img" class="carousel_slide">
                            <div class="absolute-bottom custom-caption" style="margin-bottom: 70px">
                                <div class="text-h5"><span class="text-h6 text-grey-2">{{index + 1}}. </span>{{rec.title}}</div>
                                <div class="subtitle1">{{rec.subtitle}}</div>
                            </div>
                        </q-carousel-slide>
                    </q-carousel>
                </div>
            </section>

            <section class="padding bg-white text-grey-10 text-center">
                <div class="landing__features row items-start q-col-gutter-sm">
                    <div class="col-12 text-center"><h4>{{$t('piso.descrizione')}}</h4>
                        <p v-html="$t('piso.descrpiso')"></p>
                    </div>
                </div>
            </section>
            <section class="landing__footer">
                <div class="text-center">
                    <div class="landing__footer-icons row flex-center">
                        <!--<a href="" target="_blank"><i aria-hidden="true" class="q-icon fab fa-github"> </i></a>-->
                        <!--<a href="https://twitter.com/" target="_blank"><i aria-hidden="true" class="q-icon fab fa-twitter"> </i></a>-->
                        <!--<a href="https://discord.gg/5TDhbDg" target="_blank"><i aria-hidden="true"-->
                        <!--class="q-icon fab fa-discord"> </i></a><a-->
                        <!--href="https://forum.quasar-framework.org/" target="_blank"><i aria-hidden="true"-->
                        <!--class="q-icon fas fa-comments"> </i></a><a-->
                        <!--href="https://www.patreon.com/quasarframework" target="_blank"><i aria-hidden="true"-->
                        <!--class="q-icon fab fa-patreon"> </i></a>-->
                    </div>

                    <div class="q-mt-xs text-weight-thin" style="text-shadow: 4px 4px 8px #555;">
                        <!--Released under the-->
                        <!--<a href="https://github.com/quasarframework/quasar/blob/dev/LICENSE" target="_blank"-->
                        <!--rel="noopener noreferrer" class="doc-link">-->
                        <!--MIT LICENSE-->
                        <!--<i aria-hidden="true"-->
                        <!--class="q-icon material-icons">launch</i></a>-->
                        <!--| <a href="https://www.iubenda.com/privacy-policy/40685560" target="_blank"-->
                        <!--rel="noopener noreferrer" class="doc-link">Privacy Policy<i aria-hidden="true"-->
                        <!--class="q-icon material-icons">launch</i></a>-->
                    </div>

                </div>
            </section>
        </div>

    </q-page>
</template>
<script lang="ts" src="./malaga.ts">
</script>
<style lang="scss" scoped>
    @import './malaga.scss';
</style>
