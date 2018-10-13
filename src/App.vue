<template>
    <div id="q-app">
        <q-layout :style="{ backgroundColor: backgroundColor}">
            <app-header></app-header>
            <div class="layout-view">
                <q-ajax-bar></q-ajax-bar>
                <q-page-container>
                    <transition name="fade" mode="out-in">
                        <router-view/>
                    </transition>
                </q-page-container>
            </div>
        </q-layout>
        <!--<appsignup v-show="true" @close="myshowModal=false"></appsignup>-->

    </div>
</template>
<script type="text/javascript">
  import Header from './components/Header.vue';

  import {mapGetters} from 'vuex'

  export default {
    name: 'app',
    data() {
      return {
        backgroundColor: 'whitesmoke'
      }
    },
    computed: {
      ...mapGetters("glob", ['getLayoutNeeded', 'getMobileMode'])
    },
    components: {
      appHeader: Header,
    },
    created(){
      console.info(process.env);
    }
  }
</script>

<style>

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

    .slide-enter {
    }

    .slide-enter-active {
        animation: slide-in 0.2s ease-out forwards;
    }

    .slide-leave {
    }

    .slide-leave-active {
        animation: slide-out 0.5s ease-out forwards;
    }

    @keyframes slide-in {
        from {
            transform: translateX(-500px);
        }
        to {
            transform: translateX(0);
        }
    }

    @keyframes slide-out {
        from {
            transform: translateX(0);
        }

        to {
            transform: translateX(1600px);
        }
    }

</style>
