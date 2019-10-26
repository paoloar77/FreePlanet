<template>
    <div>
        <q-layout view="hHh Lpr lff" container :style="`height: ` + getheight + `px`"
                  class="shadow-2 rounded-borders messages_page">
            <q-drawer
                    v-model="mydrawer"

                    :mini="!mydrawer || miniState"
                    @click.capture="drawerClick"

                    :width="300"
                    :breakpoint="300"
                    bordered
                    content-class="bg-grey-3">

                <q-scroll-area class="fit">
                    <q-list bordered class="rounded-borders chat-list">
                        <q-item-label header class="title_msg">{{$t('msgs.messages')}}</q-item-label>

                        <q-separator/>

                        <div v-if="getNumMsg === 0">
                            <q-item>
                                {{$t('msgs.nomessage')}}

                            </q-item>
                        </div>

                        <q-item clickable

                                :active="isMenuActive(msg.dest.username)"
                                active-class="active-user"
                                v-for="(msg, index) in lasts_messages()"
                                :key="index"
                                @click="selChat(msg)">

                            <q-item-section avatar>
                                <q-avatar>
                                    <img :src="getImgByUsername(msg.dest.username)">
                                </q-avatar>
                            </q-item-section>

                            <q-item-section>
                                <q-item-label lines="1">{{getUserByUsername(msg.dest.username)}}</q-item-label>
                                <q-item-label caption lines="2">
                                    {{msg.message}}
                                </q-item-label>
                            </q-item-section>

                            <q-item-section side top>
                                {{tools.getstrDateTimeShort(msg.datemsg)}}
                            </q-item-section>
                        </q-item>

                        <q-separator/>
                    </q-list>
                </q-scroll-area>

                <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
                    <q-btn
                            dense
                            round
                            unelevated
                            color="accent"
                            icon="chevron_left"
                            @click="miniState = true">
                    </q-btn>
                </div>
            </q-drawer>

            <q-page-container>
                <q-page class="q-px-lg q-py-md">
                    <div>
                        <q-item clickable v-if="!!chatsel.username">

                            <q-item-section avatar>
                                <q-avatar>
                                    <img :src="getImgByUsername(chatsel.username)">
                                </q-avatar>
                            </q-item-section>

                            <q-item-section>
                                <q-item-label lines="1">{{getUserByUsername(chatsel.username)}}</q-item-label>
                                <q-item-label caption lines="2">
                                    {{func_tools.getDateTimeShortStr(chatsel.lasttimeActive)}}
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </div>
                    <q-separator/>
                    <div class="q-pa-md row" style="flex-direction: column;">
                        <q-item clickable v-for="(msg, index) in msgchat_records()" :key="index" v-if="msg.dest">
                            <div class="chat_dest" v-if="msg.dest.username === getMyUsername()">
                                <q-chat-message
                                        :name="getUserByUsername(msg.origin.username)"
                                        :text="getMsgText(msg)"
                                        :stamp="tools.getstrDateTimeShort(msg.datemsg)"
                                        text-color="black"
                                        bg-color="grey-2">
                                    <template v-slot:avatar>
                                        <q-avatar size="sm">
                                            <img :src="getImgByUsername(msg.origin.username)">
                                        </q-avatar>
                                    </template>
                                </q-chat-message>
                            </div>
                            <div class="chat_my" v-else>
                                <q-chat-message
                                        name="me"
                                        :text="getMsgText(msg)"
                                        :stamp="tools.getstrDateTimeShort(msg.datemsg)"
                                        sent
                                        bg-color="blue-2">
                                    <template v-slot:avatar>
                                        <q-avatar size="sm">
                                            <img :src="getMyImg">
                                        </q-avatar>
                                    </template>

                                </q-chat-message>
                            </div>

                        </q-item>
                    </div>
                </q-page>
            </q-page-container>
        </q-layout>
    </div>
</template>

<script lang="ts" src="./messages.ts">
</script>

<style lang="scss" scoped>
    @import './messages.scss';
</style>
