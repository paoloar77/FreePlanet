<template>
    <div>
        <q-layout-header>
            <q-toolbar
                    color="primary"
                    :glossy="$q.theme === 'mat'"
                    :inverted="$q.theme === 'ios'"
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

                <q-select
                        stack-label=""
                        :options="[
      { label: 'Italian',              value: 'it' },
      { label: 'English (US)',         value: 'en-us' },
      { label: 'Spanish',              value: 'es' },
      { label: 'German',               value: 'de' },

    ]"
                        v-model="lang"
                />


                <!--{{ $q.i18n.label.close }}-->

                <p>{{ $t('msg.hello') }}</p>

            </q-toolbar>

        </q-layout-header>

        <q-layout-drawer
                v-model="leftDrawerOpen"
                :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
        >
            <q-list
                    no-border
                    link
                    inset-delimiter
            >
                <q-list-header>Essential Links</q-list-header>
                <q-item @click.native="openURL('http://quasar-framework.org')">
                    <q-item-side icon="school"/>
                    <q-item-main label="Docs" sublabel="quasar-framework.org"/>
                </q-item>
            </q-list>
        </q-layout-drawer>
    </div>
</template>

<script>
  import {openURL} from 'quasar';

  import {Quasar} from 'quasar';

  export default {
    created() {
      //this.$store.dispatch('initStocks');
    },
    methods: {
      openURL,
    },
    data: function () {
      return {
        lang: this.$q.i18n.lang,
        leftDrawerOpen: this.$q.platform.is.desktop
      }
    },
    watch: {
      lang(lang) {
        this.$i18n.locale = snakeToCamel(lang);
        console.log("LANG LOCALE = " + this.$i18n.locale);

        // dynamic import, so loading on demand only
        import(`quasar-framework/i18n/${lang}`).then(lang => {
          //console.log("lang prima = " + this.$q.i18n.lang);
          this.$q.i18n.set(lang.default);
          var mylang = this.$q.i18n.lang;
          console.log("lang = " + this.$q.i18n.lang);
          //console.log("lang DOPO = " + this.$q.i18n.lang);
          import(`src/i18n`).then(function () {

          });
        });

        // dynamic import, so loading on demand only
      }
    }
  }

  function snakeToCamel(str) {
    return str.replace(/(-\w)/g, m => {
      return m[1].toUpperCase()
    })
  }

</script>
