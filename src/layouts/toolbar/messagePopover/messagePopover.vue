<template>
    <button class="relative-position animate-bounce">
        <i class="fa fa-2x fa-envelope-o"></i>
        <span class="floating label bg-dark">5</span>
        <q-menu self="top right">
            <q-list bordered class="rounded-borders" style="max-width: 350px; min-width: 250px;">
                <q-item-label header>{{$t('msgs.messages')}}</q-item-label>

                <q-separator inset="item"/>

                <div v-if="lasts_messages().length === 0">
                    <q-item>
                        {{$t('msgs.nomessage')}}

                    </q-item>
                </div>

                <q-item clickable v-ripple v-for="(msg, index) in lasts_messages()" :key="index">

                    <q-item-section avatar>
                        <q-avatar>
                            {{msg.origin.username}}
                            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                        </q-avatar>
                    </q-item-section>

                    <q-item-section>
                        <q-item-label lines="1">{{msg.message}}</q-item-label>
                        <q-item-label caption lines="2">

                        </q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                        {{tools.getstrDateTime(msg.datemsg)}}
                    </q-item-section>
                </q-item>

                <q-separator inset="item"/>
            </q-list>
        </q-menu>
    </button>
</template>

<script lang="ts" src="./messagePopover.ts">
</script>
