<template>
    <q-page class="text-white">
        <div class="landing">
            <section>
                <div class="landing__hero">
                    <div class="landing__header"></div>
                    <div class="landing__hero-content row justify-center q-gutter-xl">
                        <div class="row">
                            <logo></logo>
                        </div>
                        <div class="flex justify-end">
                            <div class="q-gutter-sm">
                                <div class="text-h1 shadow-max">FreePlanet</div>
                                <div class="text-subtitle1 shadow text-italic q-pl-sm">{{$t('msg.sottoTitoloApp')}}
                                </div>
                                <div class="text-subtitle1 shadow big text-italic q-pl-sm"><strong>{{$t('msg.sottoTitoloApp2')}}</strong>
                                </div>
                                <div class="text-subtitle2 shadow text-italic q-pl-sm ">{{$t('msg.sottoTitoloApp3')}}
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
                                    <q-alert
                                            type="info"
                                            class="q-mb-sm">
                                        {{$t('msg.underconstruction')}}
                                    </q-alert>
                                    <br>
                                </div>
                                <div v-else>
                                    <div v-if="!isLogged" style="margin: 5px; padding: 5px;" class="home">
                                        <q-btn rounded size="lg" color="primary" @click="PagLogin" class="btn-start">
                                            {{$t('login.enter')}}
                                        </q-btn>
                                        <q-btn rounded size="lg" color="positive" @click="PagReg" class="btn-start">
                                            {{$t('reg.submit')}}
                                        </q-btn>
                                    </div>
                                </div>

                                <div>
                                    <q-field
                                            v-if="getPermission() === 'granted'"
                                            icon="notifications"
                                            class="shadow"
                                            :label="$t('notification.titlegranted')"
                                            :helper="$t('notification.statusnot')">
                                    </q-field>
                                    <q-field
                                            v-if="NotServiceWorker()"
                                            class="shadow"
                                            icon="notifications"
                                            label="Service Worker not present"
                                    >
                                    </q-field>
                                </div>

                                <div>
                                    <q-btn v-if="getPermission() !== 'granted'" class="enable-notifications shadow"
                                           color="primary" rounded
                                           size="lg"
                                           icon="notifications" @click="askfornotification"
                                           :label="$t('notification.ask')"/>
                                    <!--<q-btn v-if="getPermission() === 'granted'" class="enable-notifications" color="primary" rounded size="lg" icon="notifications" @click="showNotificationExample" label="Send Notification"/>-->
                                    <!--<q-btn v-if="getPermission() === 'granted'" class="enable-notifications" color="secondary" rounded size="lg" icon="notifications" @click="createPushSubscription" label="Create Push Subscription !"/>-->

                                </div>

                                <!--<div class="q-pt-md q-pl-sm">-->
                                <!--<div class="landing__hero-btns q-gutter-md row items-center"><a tabindex="0"-->
                                <!--type="button"-->
                                <!--href="/introduction-to-quasar"-->
                                <!--class="q-btn inline relative-position q-btn-item non-selectable q-btn&#45;&#45;rectangle bg-white text-primary q-focusable q-hoverable q-btn&#45;&#45;push">-->
                                <!--<div class="q-focus-helper"></div>-->
                                <!--<div class="q-btn__content text-center col items-center q-anchor&#45;&#45;skip justify-center row">-->
                                <!--<div>About</div>-->
                                <!--</div>-->
                                <!--</a><a tabindex="0" type="button" href="/start"-->
                                <!--class="q-btn inline relative-position q-btn-item non-selectable q-btn&#45;&#45;rectangle bg-white text-primary q-focusable q-hoverable q-btn&#45;&#45;push">-->
                                <!--<div class="q-focus-helper"></div>-->
                                <!--<div class="q-btn__content text-center col items-center q-anchor&#45;&#45;skip justify-center row">-->
                                <!--<div>Get started</div>-->
                                <!--</div>-->
                                <!--</a>-->
                                <!--<div class="text-body2">v1.0.0-beta.4</div>-->
                                <!--</div>-->
                                <!--</div>-->
                            </div>
                        </div>
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
