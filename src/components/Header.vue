<template>
    <div>

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
                    <div slot="subtitle">{{$t('msg.myDescriz')}}</div>
                </q-toolbar-title>

                <q-select class="sel_lang" v-model="lang" stack-label="" :options="selectOpLang"/>

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

  import { GlobalStore } from '@modules'
  import { rescodes } from '../store/Modules/rescodes'

  @Component({
    components: {
      drawer,
      messagePopover,
    }
  })

  export default class Header extends Vue {
    public $v
    public $q

    public selectOpLang = [
      { label: 'English (UK)', icon: 'fa-flag-us', value: 'en-uk' },
      { label: 'German', icon: 'fa-flag-de', value: 'de' },
      { label: 'Spanish', icon: 'fa-flag-es', value: 'es' },
      { label: 'Italian', icon: 'fa-facebook', value: 'it' }
    ]

    get leftDrawerOpen() {
      return GlobalStore.state.leftDrawerOpen
    }

    set leftDrawerOpen(value) {
      GlobalStore.state.leftDrawerOpen = value
      localStorage.setItem(rescodes.localStorage.leftDrawerOpen, value.toString())
    }

    get lang() {
      return this.$q.i18n.lang
    }

    set lang(lang) {
      this.$i18n.locale = this.snakeToCamel(lang)

      // dynamic import, so loading on demand only
      import(`quasar-framework/i18n/${lang}`).then(lang => {
        this.$q.i18n.set(lang.default)
        import(`src/i18n`).then(function () {
        })
      })
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

    .fixed-left:hover{
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

</style>

