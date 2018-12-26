<template>
    <div>
        User: {{ Username}}
        <div id="profile" v-if="Username">
            <img :src="photo" style='height: 80px' class="inline-block">
            <img src="../img/avatar-1.svg" id="avatar" class="inline-block">
            <div id="user-name">
                <span class="text-white"> {{ Username }} </span>
                <hr>
                <span class="text-white" v-if="Verificato"> {{$t('reg.verificato')}} </span>
                <span class="text-white" v-else> {{$t('reg.non_verificato')}} </span>
                <span class="text-white"> {{ Email }} </span>
            </div>
            <div id="user-actions">
                <q-btn round color="primary" icon="person"></q-btn>
                <q-btn round color="warning" icon="lock"></q-btn>
                <q-btn round color="secondary" icon="exit_to_app" @click='logoutHandler'></q-btn>
            </div>
        </div>

        <menu-one :links="links"></menu-one>

        <div class="fixed-bottom text-center light text-italic">
            Powered by Perseo
        </div>

    </div>
</template>

<script lang="ts">
  import menuOne from './menuOne.vue'

  import Vue from 'vue'
  import { Component, Watch, Prop } from 'vue-property-decorator'
  import {Store} from 'vuex'
  import { UserStore } from '@modules';
  import { GlobalStore } from '@modules'


  @Component({
    components: {
      menuOne,
    }
  })
  export default class Drawer extends Vue {
    public $q
    $t: any;

    created () {
      console.log('Drawer created...')
    }


    photo = ''
    user = null
    links = {
      Dashboard: {
        routes: [
          {route: '/', faIcon: 'fa fa-home', materialIcon: 'home', name: 'pages.home'},
          {route: '/signup', faIcon: 'fa fa-signup', materialIcon: 'login', name: 'pages.SignUp'},
          {route: '/signin', faIcon: 'fa fa-login', materialIcon: 'login', name: 'pages.SignIn'},
          ],
        show: true
      },
      Forms: {
        routes: [
          {route: '/prec', faIcon: 'fa fa-search', materialIcon: 'search', name: 'pages.Test'},
          ],
        show: false
      },
    }

    get MenuCollapse () {
      return GlobalStore.state.menuCollapse
      // return true
    }
    get Username () {
      return UserStore.state.username
    }

    get Verificato () {
      return UserStore.state.verifiedEmail
    }

    get Email () {
      return UserStore.state.email
    }

    logoutHandler() {
      UserStore.actions.logout()
      this.$q.notify(this.$t('logout.uscito'))
    }
  }
</script>
<style scoped>
    .fixed-bottom {
        margin-bottom: 1%;
    }

    .fixed-bottom a img {
        width: 25px;
        height: 25px;
    }

    #avatar {
        padding: 20px;
    }

    #profile {
        height: 130px;
        background-color: #009688;
    }

    #user-name {
        left: 90px;
        bottom: 77px;
        position: relative;
        width: 159px;
    }

    #user-actions {
        left: 90px;
        bottom: 71px;
        position: relative;
        width: 171px;
    }

    #menu-collapse {
        margin-top: 5%;
    }
</style>
