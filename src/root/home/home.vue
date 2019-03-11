<template>
    <q-page class="text-white">
        <div :class="firstClassSection">
            <section>
                <div class="landing__hero">
                    <div class="landing__header"></div>
                    <div class="landing__hero-content row justify-center q-gutter-xl">
                        <div class="row">
                            <logo></logo>
                        </div>
                        <div class="flex justify-end">
                            <div class="q-gutter-sm testo-banda">
                                <div class="text-h1 shadow-max">FreePlanet</div>
                                <div class="text-subtitle1 shadow text-italic q-pl-sm">{{$t('msg.sottoTitoloApp')}}
                                </div>
                                <div class="text-subtitle1 shadow-max big text-italic q-pl-sm"><strong>{{$t('msg.sottoTitoloApp2')}}</strong>
                                </div>
                                <div class="text-subtitle2 shadow text-italic q-pl-sm">
                                    {{$t('msg.sottoTitoloApp3')}}
                                </div>

                                <div class="text-subtitle3 shadow text-italic q-pl-sm ">
                                    {{$t('msg.sottoTitoloApp4')}}
                                </div>


                                <!--
                                                                <q-btn>

                                                                    Canale Telegram: <a href="https://t.me/freeplanet_channel" target="_blank"
                                                                                        style="color: white;">
                                                                    <q-icon class="fab fa-telegram" size="2rem"/>
                                                                    </a>
                                                                </q-btn>
                                -->

                                <div v-if="isInCostruction" style="margin: 5px;">
                                    <q-banner
                                            type="info"
                                            class="q-mb-sm">
                                        {{$t('msg.underconstruction')}}
                                    </q-banner>
                                    <br>
                                </div>
                                <div v-else>
                                    <div v-if="!isLogged" style="margin: 5px; padding: 5px;" class="home">
                                        <q-btn rounded size="lg" color="primary" @click="PagLogin"
                                               class="btn-start">
                                            {{$t('login.enter')}}
                                        </q-btn>
                                        <q-btn rounded size="lg" color="positive" @click="PagReg" class="btn-start">
                                            {{$t('reg.submit')}}
                                        </q-btn>
                                    </div>
                                </div>

                                <div v-if="isLogged">
                                    <div>
                                        <!--<q-field-->
                                        <!--v-if="getPermission() === 'granted'"-->
                                        <!--icon="notifications"-->
                                        <!--class="shadow"-->
                                        <!--:label="$t('notification.titlegranted')"-->
                                        <!--:helper="$t('notification.statusnot')">-->
                                        <!--</q-field>-->
                                        <q-field
                                                v-if="NotServiceWorker()"
                                                class="shadow"
                                                icon="notifications"
                                                label="Service Worker not present"
                                        >
                                        </q-field>
                                    </div>

                                    <div>
                                        <q-btn v-if="getPermission() !== 'granted'"
                                               class="enable-notifications shadow"
                                               color="primary" rounded
                                               size="md"
                                               icon="notifications" @click="askfornotification"
                                               :label="$t('notification.ask')"/>
                                        <!--<q-btn v-if="getPermission() === 'granted'" class="enable-notifications" color="primary" rounded size="lg" icon="notifications" @click="showNotificationExample" label="Send Notification"/>-->
                                        <!--<q-btn v-if="getPermission() === 'granted'" class="enable-notifications" color="secondary" rounded size="lg" icon="notifications" @click="createPushSubscription" label="Create Push Subscription !"/>-->

                                    </div>
                                </div>


                                <div class="q-pt-md q-pl-sm">
                                    <div class="text-body2">Ver. {{getenv('APP_VERSION')}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="landing__arrow absolute-bottom text-center">
                        <i aria-hidden="true" class="q-icon text-h2 text-white material-icons">expand_more</i>
                    </div>
                </div>
            </section>

            <section class="padding bg-white text-grey-10 text-center" v-scroll-reveal.reset>
                <div class="landing__features row items-start q-col-gutter-xl">
                    <div class="col-12 text-center">
                        <div class="feature-item q-mx-md"><img src="statics/images/group-together.jpg"
                                                               class="doc-img"></div>
                    </div>
                    <div class="col-12 text-center"><h4>{{$t('homepage.descrapp_title1')}}</h4>
                        <p v-html="$t('homepage.descrapp_pag1')"></p>
                        <p v-html="$t('homepage.descrapp_pag2')"></p>
                    </div>
                </div>
            </section>
            <section class="padding bg-primary landing__swirl-bg" v-scroll-reveal.reset>
                <div class="landing__features row justify-between items-start q-col-gutter-xl">
                    <div class="col-12 col-sm-5">
                        <div class="feature-item"><i aria-hidden="true"
                                                     class="q-icon fas fa-users"> </i><h4>
                            {{$t('homepage.freesocial.title')}}</h4>
                            <p class="feat-descr" v-html="$t('homepage.freesocial.descr')"></p></div>
                    </div>
                    <div class="col-12 col-sm-5">
                        <div class="feature-item"><i aria-hidden="true"
                                                     class="q-icon fas fa-user-clock"> </i><h4>
                            {{$t('homepage.freetalent.title')}}</h4>
                            <p class="feat-descr" v-html="$t('homepage.freetalent.descr')"></p></div>
                    </div>
                    <div class="col-12 col-sm-5">
                        <div class="feature-item"><i aria-hidden="true"
                                                                                             class="q-icon fas fa-apple-alt"> </i><h4>
                            {{$t('homepage.freegas.title')}}</h4>
                            <p class="feat-descr" v-html="$t('homepage.freegas.descr')"></p></div>
                    </div>
                    <div class="col-12 col-sm-5">
                        <div class="feature-item"><i aria-hidden="true"
                                                     class="q-icon fas fa-home"> </i><h4>
                            {{$t('homepage.freeliving.title')}}</h4>
                            <p class="feat-descr" v-html="$t('homepage.freeliving.descr')"></p></div>
                    </div>
                </div>
            </section>
            <section class="padding bg-indigo-8" v-scroll-reveal.reset>
                <div class="landing__features row justify-between items-start q-col-gutter-xl">
                    <div class="col-12 col-sm-5">
                        <div class="feature-item"><i aria-hidden="true"
                                                     class="q-icon fas fa-people-carry"> </i><h4>
                            {{$t('homepage.freecollabora.title')}}</h4>
                            <p class="feat-descr" v-html="$t('homepage.freecollabora.descr')"></p></div>
                    </div>
                    <div class="col-12 col-sm-5">
                        <div class="feature-item"><i aria-hidden="true"
                                                     class="q-icon fas fa-hands-helping"> </i><h4>
                            {{$t('homepage.freesostieni.title')}}</h4>
                            <p class="feat-descr" v-html="$t('homepage.freesostieni.descr')"></p></div>
                    </div>
                    <div class="col-12 col-sm-5">
                        <div class="feature-item"><i aria-hidden="true"
                                                     class="q-icon fas fa-browser"> </i>
                            <div class="q-gutter-sm"><i aria-hidden="true"
                                                        class="q-icon fas fa-browser"> </i><i
                                    aria-hidden="true" class="q-icon fab fa-chrome"> </i><i
                                    aria-hidden="true" class="q-icon fab fa-firefox"> </i><i
                                    aria-hidden="true" class="q-icon fab fa-safari"> </i><i
                                    aria-hidden="true" class="q-icon fab fa-edge"> </i></div>

                            <h4>{{$t('homepage.multiplatform.title')}}</h4>
                            <p class="feat-descr" v-html="$t('homepage.multiplatform.descr')"></p></div>
                    </div>
                    <div class="col-12 col-sm-5">
                        <div class="feature-item"><i aria-hidden="true"
                                                     class="q-icon fas fa-universal-access"> </i><h4>
                            {{$t('homepage.free.title')}}</h4>
                            <p class="feat-descr" v-html="$t('homepage.free.descr')"></p></div>
                    </div>
                </div>
            </section>
            <section class="landing__footer">
                <div class="text-center">
                    <div class="landing__footer-icons row flex-center">
                        <a href="https://www.facebook.com/freeplanetapp" target="_blank">
                            <i aria-hidden="true" class="q-icon fab fa-facebook-f"> </i></a>

                        <a :href="TelegramSupport" target="_blank">
                            <i aria-hidden="true" class="q-icon fab fa-telegram"></i></a>


                        <!--<a href="" target="_blank"><i aria-hidden="true" class="q-icon fab fa-github"> </i></a>-->
                        <!--<a href="https://twitter.com/" target="_blank"><i aria-hidden="true" class="q-icon fab fa-twitter"> </i></a>-->
                        <!--<a href="https://discord.gg/5TDhbDg" target="_blank"><i aria-hidden="true"-->
                        <!--class="q-icon fab fa-discord"> </i></a><a-->
                        <!--href="https://forum.quasar-framework.org/" target="_blank"><i aria-hidden="true"-->
                        <!--class="q-icon fas fa-comments"> </i></a><a-->
                        <!--href="https://www.patreon.com/quasarframework" target="_blank"><i aria-hidden="true"-->
                        <!--class="q-icon fab fa-patreon"> </i></a>-->
                    </div>

                    <div class="q-mt-md">Released under the
                        <!--<a href="https://github.com/quasarframework/quasar/blob/dev/LICENSE" target="_blank"-->
                        <!--rel="noopener noreferrer" class="doc-link">-->
                        MIT LICENSE
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
<script lang="ts" src="./home.ts">
</script>
<style lang="scss" scoped>
    @import './home.scss';
</style>
