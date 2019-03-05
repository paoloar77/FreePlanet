<template>
    <q-page class="landing text-white">
        <section>
            <div class="landing__hero">
                <div style="height: 28vh;"></div>
                <div class="landing__hero-content row justify-center q-gutter-xl">
                    <div class="row"><img src="https://cdn.quasar-framework.org/logo/svg/quasar-logo.svg"
                                          class="landing__logo"></div>
                    <div class="flex justify-end">
                        <div class="q-gutter-sm">
                            <div class="text-h1">
                                <div class="text-weight-bold">Quasar</div>
                                <div>Framework</div>
                            </div>
                            <div class="text-subtitle1 text-italic q-pl-sm">High performance, <strong>Material
                                Design
                                2</strong>, full front end stack with <strong>Vuejs</strong></div>
                            <div class="q-pt-md q-pl-sm">
                                <div class="landing__hero-btns q-gutter-md row items-center"><a tabindex="0"
                                                                                                type="button"
                                                                                                href="/introduction-to-quasar"
                                                                                                class="q-btn inline relative-position q-btn-item non-selectable q-btn--rectangle bg-white text-primary q-focusable q-hoverable q-btn--push">
                                    <div class="q-focus-helper"></div>
                                    <div class="q-btn__content text-center col items-center q-anchor--skip justify-center row">
                                        <div>About</div>
                                    </div>
                                </a><a tabindex="0" type="button" href="/start"
                                       class="q-btn inline relative-position q-btn-item non-selectable q-btn--rectangle bg-white text-primary q-focusable q-hoverable q-btn--push">
                                    <div class="q-focus-helper"></div>
                                    <div class="q-btn__content text-center col items-center q-anchor--skip justify-center row">
                                        <div>Get started</div>
                                    </div>
                                </a>
                                    <div class="text-body2">v1.0.0-beta.4</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="landing__arrow absolute-bottom text-center"><i aria-hidden="true"
                                                                           class="q-icon text-h2 text-white material-icons">expand_more</i>
                </div>
            </div>

            <!--<div>-->
                <!--<logo></logo>-->

            <!--</div>-->

            <!--<div>-->
                <!--&lt;!&ndash; the row with a type of gutter &ndash;&gt;-->
                <!--<q-alert-->
                        <!--avatar="statics/boy-avatar.png"-->
                        <!--color="primary"-->
                        <!--message="Jack"-->
                        <!--detail="Per un mondo più Consapevole"-->
                <!--/>-->
            <!--</div>-->

            <!--<div>-->
                <!--<q-btn v-if="getPermission() !== 'granted'" class="enable-notifications" color="primary" rounded-->
                       <!--size="lg"-->
                       <!--icon="notifications" @click="askfornotification" :label="$t('notification.ask')"/>-->
                <!--&lt;!&ndash;<q-btn v-if="getPermission() === 'granted'" class="enable-notifications" color="primary" rounded size="lg" icon="notifications" @click="showNotificationExample" label="Send Notification"/>&ndash;&gt;-->
                <!--&lt;!&ndash;<q-btn v-if="getPermission() === 'granted'" class="enable-notifications" color="secondary" rounded size="lg" icon="notifications" @click="createPushSubscription" label="Create Push Subscription !"/>&ndash;&gt;-->

            <!--</div>-->

            <!--<div>-->
                <!--<q-chip square color="secondary">-->
                    <!--{{$t('notification.status')}}-->
                <!--</q-chip>-->
            <!--</div>-->
            <!--<div>-->
                <!--<q-field-->
                        <!--v-if="getPermission() === 'granted'"-->
                        <!--icon="notifications"-->
                        <!--:label="$t('notification.titlegranted')"-->
                        <!--helper="Stato Notifiche">-->
                <!--</q-field>-->
                <!--<q-field-->
                        <!--v-if="NotServiceWorker()"-->
                        <!--icon="notifications"-->
                        <!--label="Service Worker not present"-->
                <!--&gt;-->
                <!--</q-field>-->
            <!--</div>-->
        </section>

    </q-page>


</template>
<script lang="ts" src="./home.ts">
</script>
<style lang="scss" scoped>
    @import './home.scss';
</style>
