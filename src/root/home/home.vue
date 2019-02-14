<template >
    <q-page class="flex flex-center">
        <logo></logo>

        <q-btn v-if="getPermission() !== 'granted'" class="enable-notifications" color="primary" rounded size="lg" icon="notifications" @click="askfornotification" :label="$t('notification.ask')"/>
        <q-btn v-if="getPermission() === 'granted'" class="enable-notifications" color="primary" rounded size="lg" icon="notifications" @click="showNotificationExample" label="Send Notification"/>
        <!--<q-btn v-if="getPermission() === 'granted'" class="enable-notifications" color="secondary" rounded size="lg" icon="notifications" @click="createPushSubscription" label="Create Push Subscription !"/>-->


        <br>
        <div>
            <q-chip square color="secondary">
                Status:
            </q-chip>
            <q-field
                    v-if="getPermission() === 'granted'"
                    icon="notifications"
                    :label="$t('notification.titlegranted')"
                    helper="Stato Notifiche">
            </q-field>
            <q-field
                    v-if="NotServiceWorker()"
                    icon="notifications"
                    label="Service Worker not present"
                    >
            </q-field>
        </div>

    </q-page>


</template>
<script lang="ts" src="./home.ts">
</script>
<style lang="scss" scoped>
    @import './home.scss';
</style>
