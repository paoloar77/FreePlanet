<template>
  <div>
    <q-header reveal elevated :class="getClassColorHeader">
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
        class="toolbar">

        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu">
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

        <q-btn ripple
               size="md"
               id="newvers" v-if="isNewVersionAvailable" color="secondary" rounded icon="refresh"
               class="btnNewVersShow" @click="RefreshApp" :label="$t('notification.newVersionAvailable')"/>


        <q-toolbar-title class="row items-center">
          <q-avatar>
            <img :src="imglogo" height="27" alt="Immagine Logo">
          </q-avatar>
          <div class="q-mx-sm">{{getappname}}</div>
          <div slot="subtitle">{{$t('msg.myDescriz')}} {{ getAppVersion() }}</div>
        </q-toolbar-title>


        <!--
                        <div v-if="isAdmin">
                            <q-btn flat dense round aria-label="">
                                <q-icon :class="clCloudUpload" nametranslate="cloud_upload"></q-icon>
                            </q-btn>

                            <q-btn flat dense round aria-label="">
                                <q-icon :class="clCloudUp_Indexeddb" nametranslate="arrow_upward"></q-icon>
                            </q-btn>

                        </div>
        -->

        <q-btn
          v-if="!isonline && static_data.functionality.SHOW_IF_IS_SERVER_CONNECTION"
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
          v-if="static_data.lang_available.length > 1"
          flat
          :label="langshort"
          auto-close
        >
          <q-list bordered>
            <q-item clickable v-ripple

                    v-for="langrec in static_data.lang_available" :key="langrec.value"
                    @click="lang = langrec.value">
              <q-item-section avatar>
                <img :src="langrec.image" class="flagimg" alt="flag">
              </q-item-section>
              <q-item-section>
                {{langrec.label}}
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <div v-if="static_data.functionality.SHOW_MESSAGES">
          <message-popover></message-popover>
        </div>

        <!--
        <div class="right-itens">
            <label>{{ $t('msg.hello') }}</label> <span v-model="prova"></span> !
        </div>-->

        <!-- BUTTON USER BAR -->

        <q-btn class="q-mx-xs" v-if="static_data.functionality.SHOW_USER_MENU && !isLogged" dense flat round
               icon="menu"
               @click="rightDrawerOpen = !rightDrawerOpen">
        </q-btn>
        <q-btn class="q-mx-xs" v-if="static_data.functionality.SHOW_USER_MENU && isLogged" round dense flat
               @click="rightDrawerOpen = !rightDrawerOpen">
          <CMyAvatar :myimg="getMyImg"></CMyAvatar>
        </q-btn>

      </q-toolbar>

    </q-header>

    <q-drawer side="left"
              bordered
              show-if-above
              :breakpoint="500"
              v-model="leftDrawerOpen"
              :content-class="['bg-grey-1', 'q-pa-sm']"
              :content-style="{padding: '0px'}"
    >
      <drawer :clBase="clBase"></drawer>

    </q-drawer>

    <!-- USER BAR -->
    <q-drawer v-if="static_data.functionality.SHOW_USER_MENU" v-model="rightDrawerOpen" side="right" elevated>
      <div id="profile">
        <q-img class="absolute-top" src="../../statics/images/landing_first_section.png"
               style="height: 150px" alt="section page">
        </q-img>
        <div class="absolute-top bg-transparent text-black center_img" style="margin-top: 10px;">

          <CMyAvatar :myimg="getMyImg"></CMyAvatar>

          <q-btn class="absolute-top-right" style="margin-right: 10px; color: white;"
                 dense flat round icon="close" @click="rightDrawerOpen = !rightDrawerOpen">
          </q-btn>
          <div v-if="isLogged" class="text-weight-bold text-user">{{ Username }} - {{ myName }} <span
            v-if="isAdmin"> [Admin]</span><span v-if="isManager"> [Manager]</span></div>
          <div v-else class="text-user text-italic bg-red">
            {{ $t('user.loggati') }}
          </div>

          <div v-if="isLogged && !isEmailVerified" class="text-verified">{{
            $t('components.authentication.email_verification.verify_email') }}
          </div>

          <!--<span class="text-white" v-if="Verificato"> {{$t('reg.verificato')}} </span>-->
          <!--<span class="text-white background-red" v-else> {{$t('reg.non_verificato')}} </span>-->

          <div v-if="isLogged" id="user-actions" class="column justify-center q-gutter-sm q-ma-sm center-150">
            <q-btn rounded color="primary" icon="person" to="/profile">{{$t('pages.profile')}}</q-btn>
            <!--<q-btn round color="warning" icon="lock"></q-btn>-->
            <q-btn rounded color="negative" icon="exit_to_app" @click='logoutHandler'>{{$t('login.esci')}}</q-btn>
          </div>

        </div>
        <div style="margin-top:120px;"></div>
        <div v-show="!isLogged">
          <div class="q-ma-md" style="">
            <CSigninNoreg :showregbutt="static_data.functionality.SHOW_REG_BUTTON">

            </CSigninNoreg>
          </div>
        </div>

      </div>
      <div v-if="isLogged" class="q-mt-lg"><br><br></div>

      <slot></slot>

    </q-drawer>
  </div>
</template>

<script lang="ts" src="./Header.ts">
</script>

<style lang="scss" scoped>
  @import './Header.scss';
</style>

