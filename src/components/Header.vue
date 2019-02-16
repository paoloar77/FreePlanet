<template>
    <div>

        <!--
                <router-link :to="'/'" v-if="$router.currentRoute.meta.backButton">
                    <button>
                        <i>arrow_back</i>
                    </button>
                </router-link>
        -->
        <q-layout-header>
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


                <q-toolbar-title>
                    {{$t('msg.myAppName')}}
                    <div slot="subtitle">{{$t('msg.myDescriz')}} {{ getAppVersion() }}</div>
                </q-toolbar-title>

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
                        :label="langshort"
                >
                    <q-list link>
                        <q-item v-for="langrec in selectOpLang" :key="langrec.value" v-close-overlay
                                @click.native="lang = langrec.value">
                            <q-item-side>
                                <img :src="langrec.image" class="flagimg">
                            </q-item-side>
                            <q-item-main>
                                <q-item-tile sublabel>{{langrec.label}}</q-item-tile>
                            </q-item-main>
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

        </q-layout-header>

        <q-layout-drawer side="left"
                         v-model="leftDrawerOpen"
                         :content-class="['bg-grey-1', 'q-pa-sm']"
                         :content-style="{padding: '0px'}"
        >
            <drawer></drawer>

        </q-layout-drawer>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import drawer from '../layouts/drawer/drawer.vue'
  import messagePopover from '../layouts/toolbar/messagePopover/messagePopover.vue'

  import { GlobalStore, UserStore } from '@modules'
  import { rescodes } from '../store/Modules/rescodes'
  import QIcon from "quasar-framework/src/components/icon/QIcon"
  import { StateConnection } from "../model"
  import { Watch } from "vue-property-decorator"
  import QField from "quasar-framework/src/components/field/QField"

  @Component({
    components: {
      QField,
      QIcon,
      drawer,
      messagePopover,
    }
  })

  export default class Header extends Vue {
    public $t
    public $v
    public $q
    public isUserNotAuth: boolean = false
    public iconConn: string = 'wifi'
    public clIconConn: string = 'clIconOnline'
    public strConn: string = ''
    public langshort: string = ''

    get conn_changed() {
      return GlobalStore.state.stateConnection
    }

    @Watch('GlobalStore.state.stateConnection', { immediate: true, deep: true })
    changeconn(value: string, oldValue: string) {

      this.strConn = value

      // this.$q.notify({
      //   color : 'primary',
      //   icon: 'wifi',
      //   message: "CAMBIATOO! " + value
      // })

    }


    @Watch('conn_changed', { immediate: true, deep: true })
    changeconn_changed(value: string, oldValue: string) {
      if (value != oldValue) {

        // console.log('SSSSSSSS: ', value, oldValue)

        const color = (value === 'online') ? 'positive' : 'warning'

        if (oldValue !== undefined) {
          this.$q.notify({
            color,
            icon: 'wifi',
            message: this.$t('connection') + ` ${value}`
          })
        }

        // console.log('Todos.state.todos_changed CHANGED!', value, oldValue)
        this.changeIconConn()
      }
    }

    changeIconConn() {
      this.iconConn = GlobalStore.state.stateConnection === 'online' ? "wifi" : "wifi_off"
      this.clIconConn = GlobalStore.state.stateConnection === 'online' ? 'clIconOnline' : 'clIconOffline'
    }

    public selectOpLang = [
      { label: 'English', icon: 'fa-flag-us', value: 'enUs', image: '../statics/images/gb.png', short: 'EN' },
      { label: 'German', icon: 'fa-flag-de', value: 'de', image: '../statics/images/de.png', short: 'DE' },
      { label: 'Italian', icon: 'fa-facebook', value: 'it', image: '../statics/images/it.png', short: 'IT' },
      { label: 'Spanish', icon: 'fa-flag-es', value: 'es', image: '../statics/images/es.png', short: 'SP' }
    ]

    get leftDrawerOpen() {
      return GlobalStore.state.leftDrawerOpen
    }

    set leftDrawerOpen(value) {
      GlobalStore.state.leftDrawerOpen = value
      localStorage.setItem(rescodes.localStorage.leftDrawerOpen, value.toString())
    }

    getAppVersion() {
      // return "AA"
      return "[" + process.env.APP_VERSION + "]"
    }

    get lang() {
      return this.$q.i18n.lang
    }


    setshortlang (lang) {
      for (let indrec in this.selectOpLang) {
        if (this.selectOpLang[indrec].value === lang) {
          // console.log('this.selectOpLang[indrec].short', this.selectOpLang[indrec].short, this.selectOpLang[indrec].value)
          this.langshort = this.selectOpLang[indrec].short
          return
        }
      }

    }

    set lang(lang) {
      this.$i18n.locale = this.snakeToCamel(lang)
      // this.$q.notify('IMPOSTA LANG= ' + this.$i18n.locale)
      // console.log('IMPOSTA LANG= ' + this.$i18n.locale)

      UserStore.mutations.setlang(this.$i18n.locale)

      let mylangtopass = lang

      this.setshortlang(mylangtopass)

      if (mylangtopass === 'enUs')
        mylangtopass = 'en-us'

      // dynamic import, so loading on demand only
      import(`quasar-framework/i18n/${mylangtopass}`).then(lang => {
        this.$q.i18n.set(lang.default)
        import(`src/statics/i18n`).then(function () {
        })
      })
    }

    getLangAtt() {
      return this.$q.i18n.lang
    }

    setLangAtt(mylang) {
      this.$q.i18n.lang = mylang
    }

    beforeMount() {
      // Estrai la Lang dal Localstorage

      let my = this.getLangAtt()
      // this.$q.notify('prima: ' + String(my))

      let mylang = localStorage.getItem(rescodes.localStorage.lang)
      if (mylang.toLowerCase() === 'enus')
        mylang = 'enUs'
      if (mylang.toLowerCase() === 'enuk')
        mylang = 'enUk'

      if (!mylang)
        mylang = process.env.LANG_DEFAULT


      this.setLangAtt(mylang)
      this.setshortlang(mylang)
      // this.$q.notify('Dopo: ' + String(this.getLangAtt()))

    }

    mounted() {


      // Test this by running the code snippet below and then
      // use the "Offline" checkbox in DevTools Network panel

      let mythis = this
      // console.log('Event LOAD')
      if (window) {
        window.addEventListener('load', function () {
          // console.log('2) ENTERING Event LOAD')

          function updateOnlineStatus(event) {
            if (navigator.onLine) {
              // console.log('EVENT ONLINE!')
              // handle online status
              GlobalStore.mutations.setStateConnection('online')
              mythis.changeIconConn()
            } else {
              // console.log('EVENT OFFLINE!')
              // handle offline status
              GlobalStore.mutations.setStateConnection('offline')
              mythis.changeIconConn()
            }
          }

          window.addEventListener('online', updateOnlineStatus)
          window.addEventListener('offline', updateOnlineStatus)
        })
      }
    }

    public snakeToCamel(str) {
      return str.replace(/(-\w)/g, m => {
        return m[1].toUpperCase()
      })
    }
  }


</script>

<style lang="scss">
    .layout-padding {
        padding: 1em 4em;
    }

    .item-content {
        font-size: 0.8rem;
        font-weight: 350;
    }

    @media screen and (max-width: 600px) {
        .layout-padding {
            padding: 1.5em .5em;
        }
    }

    .fixed-left:hover {
        cursor: ew-resize;
    }

    /*
    @-webkit-keyframes moveFromLeftFade {
        from {
            opacity: 0.3;
            -webkit-transform: translateX(-100%);
        }
    }

    @keyframes moveFromLeftFade {
        from {
            opacity: 0.3;
            -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
        }
    }

    @-webkit-keyframes moveFromTopFade {
        from {
            opacity: 0.3;
            -webkit-transform: translateY(0%);
        }
    }
    @keyframes moveFromTopFade {
        from {
            opacity: 0.3;
            -webkit-transform: translateY(0%);
            transform: translateY(-50%);
        }
    }


    @-webkit-keyframes moveToRight {
        from {
        }
        to {
            -webkit-transform: translateX(100%);
        }
    }

    @keyframes cartOut {
        from {
            transform: translate(0px, 0px);
        }
        to {
            transform: translate(1200px, 0px);
            animation-timing-function: ease-out;
        }

    }

    @-webkit-keyframes moveToLeft {
        from {
        }
        to {
            opacity: .5;
            -webkit-transform: translateX(-100%);
        }
    }

    @keyframes moveToLeft {
        from {
        }
        to {
            opacity: .5;
            -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
        }
    }

    @-webkit-keyframes moveToBottom {
        from {
        }
        to {
            opacity: .5;
            -webkit-transform: translateY(-100%);
        }
    }

    @keyframes moveToBottom {
        from {
        }
        to {
            opacity: .5;
            -webkit-transform: translateY(-100%);
            transform: translateY(-100%);
        }
    }

    @-webkit-keyframes moveFromRight {
        from {
            opacity: .7;
            -webkit-transform: translateX(100%);
        }
    }

    @keyframes moveFromRight {
        from {
            opacity: .7;
            -webkit-transform: translateX(100%);
            transform: translateX(100%);
        }
    }
    */

    .drawer-closer .item-content {
        margin-left: 20px !important;
    }

    .drawer-content .list-label {
        line-height: 25px;
    }

    .drawer-content .item {
        height: 25px;
    }

    .router-link-active .item-primary {
        color: #027be3;
    }

    .q-picker-textfield .q-picker-textfield-label {
        color: inherit !important;
    }

    .label-success .q-picker-textfield-label {
        color: #4caf50 !important;
    }

    .label-error .q-picker-textfield-label {
        color: #f44336 !important;
    }

    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: 1px;
        text-overflow: '';
    }

    .label-success .q-picker-textfield:after, .label-error .q-picker-textfield:after {
        content: "" !important;
    }

    #android-preview iframe {
        margin-top: 64px;
        width: 357px;
        height: 590px;
        background: #fff;
    }

    #ios-preview iframe {
        margin-top: 64px;
        width: 320px;
        height: 590px;
        background: #fff;
    }

    canvas {
        width: 270px !important;
    }

    @media only screen and (min-width: 601px) {
        .adv-form-one .timeline-badge {
            right: auto !important;
            left: auto !important;
        }

        .adv-form-one .timeline-content {
            margin-left: 3.9rem;
        }

        .adv-form-one .timeline-item {
            width: 100% !important;
        }

        .adv-form-one .timeline-title {
            text-align: inherit !important;
            margin-left: 3.9rem;
        }

        .timeline:before {
            left: 1.6rem;
        }
    }

    .adv-form-one .timeline-content .group .primary {
        display: none !important;
    }

    .underline {
        text-decoration: underline;
    }

    .toolbar {
        min-height: 30px;
    }

    .right-itens a, .right-itens button {
        margin-right: 10px;
    }

    .sel_lang {
        padding: 5px;
        color: white;
    }

    .fa-facebook:before {
        content: url('../statics/icons/flag_it.svg');
    }

    .fa-flag-it:before {
        content: url('../statics/icons/flag_it.svg');
    }

    .clIconOnline {
        color: white;
    }

    .clIconOffline {
        color: red;
    }

    .flagimg {
        width: 30px;
        height: 24px;
    }

</style>

