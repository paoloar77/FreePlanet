<template>
    <div>
        <section class="landing__footer">
            <div class="row justify-between items-start q-col-gutter-xs">
                <div class="col-12 col-sm-4 ">
                    <p style="text-align: center">
                        <logo></logo>
                    </p>
                    <!--<span v-html="$t('homepage.footer.description')">-->
                    <!--</span>-->


                    <FormNewsletter v-if="static_data.functionality.SHOW_NEWSLETTER" :idwebsite="tools.appid()"
                                    :locale="tools.getLocale()">
                    </FormNewsletter>

                    <!--<div class="q-mt-xs copyrights">-->
                    <!--<p class="mycontacts_text" v-html="$t('homepage.copyrights')"></p>-->
                    <!--</div>-->

                </div>
                <div class="col-12 col-sm-4">
                    <div class="text-center">

                        <div class="q-mt-xs mycontacts">
                            <p class="mycontacts_title">{{$t('homepage.titlecontatti')}}</p>


                            <p class="mycontacts_text" v-html="$t('homepage.contacts')"></p>
                        </div>
                        <div class="landing__footer-icons row flex-center">
                            <a v-if="!!FBPage" :href="FBPage" target="_blank">
                                <i aria-hidden="true" class="q-icon fab fa-facebook-f icon_contact links"> </i></a>

                            <a v-if="!!InstagramPage" :href="InstagramPage" target="_blank">
                                <i aria-hidden="true" class="q-icon fab fa-instagram icon_contact links"> </i></a>

                            <a v-if="!!TelegramSupport" :href="TelegramSupport" target="_blank">
                                <i aria-hidden="true" class="q-icon fab fa-telegram icon_contact links"></i></a>


                            <!--<a href="" target="_blank"><i aria-hidden="true" class="q-icon fab fa-github"> </i></a>-->
                            <!--<a href="https://twitter.com/" target="_blank"><i aria-hidden="true" class="q-icon fab fa-twitter"> </i></a>-->
                            <!--<a href="https://discord.gg/5TDhbDg" target="_blank"><i aria-hidden="true"-->
                            <!--class="q-icon fab fa-discord"> </i></a><a-->
                            <!--href="https://forum.quasar-framework.org/" target="_blank"><i aria-hidden="true"-->
                            <!--class="q-icon fas fa-comments"> </i></a><a-->
                            <!--href="https://www.patreon.com/quasarframework" target="_blank"><i aria-hidden="true"-->
                            <!--class="q-icon fab fa-patreon"> </i></a>-->
                        </div>

                    </div>

                    <p class="text-center">
                        <router-link v-if="static_data.functionality.SHOW_ONLY_POLICY" to="/policy"><span class="footer_link">{{$t('privacy_policy')}}</span></router-link>
                    </p>

                </div>

                <div class="col-12 col-sm-4 q-pa-md" v-for="">
                    <div v-for="myitemmenu in static_data.routes">
                        <div v-if="myitemmenu.infooter">

                            <div v-if="myitemmenu.solotitle">
                                <span class="footer_link">{{tools.getLabelByItem(myitemmenu, mythis)}}</span><br/>
                            </div>
                            <div v-else>
                                <router-link :to="myitemmenu.path">
                                    <span class="footer_link"><span
                                            v-if="myitemmenu.level_child > 0">&nbsp;&nbsp;&nbsp;</span>
                                        {{tools.getLabelByItem(myitemmenu, mythis)}}</span><br/>
                                </router-link>
                            </div>
                            <!--<a :href="myitemmenu.path"><span class="footer_link">{{tools.getLabelByItem(myitemmenu, mythis)}}</span></a><br/>-->
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <q-page-scroller position="bottom-right" :scroll-offset="850" :offset="[18, 18]" style="opacity: 0.3">
            <q-btn fab icon="keyboard_arrow_up" color="accent"/>
        </q-page-scroller>
        <q-page-sticky position="bottom-right" :offset="[18, 78]">
            <q-btn fab icon="fab fa-whatsapp" color="green" />
        </q-page-sticky>
    </div>
</template>

<script lang="ts" src="./Footer.ts">
</script>

<style lang="scss" scoped>
    @import './Footer.scss';
</style>
