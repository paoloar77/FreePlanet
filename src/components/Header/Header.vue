<template>
    <div>

        <!--
                <router-link :to="'/'" v-if="$router.currentRoute.meta.backButton">
                    <button>
                        <i>arrow_back</i>
                    </button>
                </router-link>
        -->
        <q-header elevated>
            <q-toolbar
                    color="primary"
                    :glossy="$q.theme === 'mat'"
                    :inverted="$q.theme === 'ios'"
                    class="toolbar"
            >

                <q-btn
                        flat
                        dense
                        round
                        @click="leftDrawerOpen = !leftDrawerOpen"
                        aria-label="Menu"
                >
                    <q-icon name="menu"/>
                </q-btn>


                <div v-if="$q.platform.is.desktop">
                    <!--I'm only rendered on desktop!-->
                </div>

                <div v-if="$q.platform.is.mobile">
                    <!--I'm only rendered on mobile!-->
                </div>

                <div v-if="$q.platform.is.electron">
                    <!--I'm only rendered on Electron!-->
                </div>

                <q-btn id="newvers" v-if="isNewVersionAvailable" color="secondary" rounded icon="refresh"
                       class="btnNewVersShow" @click="RefreshApp" :label="$t('notification.newVersionAvailable')"/>


                <q-toolbar-title>
                    {{$t('msg.myAppName')}}
                    <div slot="subtitle">{{$t('msg.myDescriz')}} {{ getAppVersion() }}</div>
                </q-toolbar-title>

                <div v-if="isAdmin">
                    <q-btn flat dense round aria-label="">
                        <q-icon :class="clCloudUpload" name="cloud_upload"></q-icon>
                    </q-btn>

                    <q-btn flat dense round aria-label="">
                        <q-icon :class="clCloudUp_Indexeddb" name="arrow_upward"></q-icon>
                    </q-btn>

                </div>

                <q-btn
                        flat
                        dense
                        round
                        @click=""
                        aria-label="Connection"
                >
                    <q-icon :name="iconConn" :class="clIconConn"></q-icon>
                    <q-icon v-if="isUserNotAuth" name="device_unknown"></q-icon>
                </q-btn>


                <q-btn-dropdown
                        stretch
                        flat
                        :label="langshort"
                        auto-close
                >
                    <q-list bordered>
                        <q-item clickable v-ripple

                                v-for="langrec in selectOpLang" :key="langrec.value"
                                @click="lang = langrec.value">
                            <q-item-section avatar>
                                <img :src="langrec.image" class="flagimg">
                            </q-item-section>
                            <q-item-section>
                                {{langrec.label}}
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>


                <!--
                <message-popover></message-popover>
                -->

                <!--
                <div class="right-itens">
                    <label>{{ $t('msg.hello') }}</label> <span v-model="prova"></span> !
                </div>-->


            </q-toolbar>

        </q-header>

        <q-drawer side="left"
                         v-model="leftDrawerOpen"
                         :content-class="['bg-grey-1', 'q-pa-sm']"
                         :content-style="{padding: '0px'}"
        >
            <drawer></drawer>

        </q-drawer>
    </div>
</template>

<script lang="ts" src="./Header.ts">
</script>

<style lang="scss" scoped>
    @import './Header.scss';
</style>

