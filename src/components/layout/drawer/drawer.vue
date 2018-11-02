<template>
    <div>
        <div id="profile" v-if="getUsername">
            <img :src="photo" style='height: 80px' class="inline-block">
            <img src="../img/avatar-1.svg" id="avatar" class="inline-block">
            <div id="user-name">
                <span class="text-white"> {{ getUsername }} </span>
                <hr>
                <span class="text-white" v-if="getVerificato"> {{$t('reg.verificato')}} </span>
                <span class="text-white" v-else> {{$t('reg.non_verificato')}} </span>
                <span class="text-white"> {{ getEmail }} </span>
            </div>
            <div id="user-actions">
                <q-btn round color="primary" icon="person"></q-btn>
                <q-btn round color="warning" icon="lock"></q-btn>
                <q-btn round color="secondary" icon="exit_to_app" @click='logoutHandler'></q-btn>
            </div>
        </div>

        <menu-one v-if="getMenuCollapse" :links="links"></menu-one>
        <menu-two v-else :links="links"></menu-two>

        <div class="fixed-bottom text-center light text-italic">
            Powered by Perseo
        </div>

    </div>
</template>
<script type="text/javascript">
  import menuOne from './menuOne.vue'
  import menuTwo from './menuTwo.vue'

  import * as types from '../../../store/mutation-types'

  import {mapGetters, mapActions} from 'vuex'

  export default {
    data() {
      return {
        photo: '',
        user: null,
        links: {
          Dashboard: {
            routes: [
              {route: '/', faIcon: 'fa fa-home', materialIcon: 'home', name: 'Dashboard One'},
              {route: '/signup', faIcon: 'fa fa-signup', materialIcon: 'login', name: 'SignUp'},
              {route: '/signin', faIcon: 'fa fa-login', materialIcon: 'login', name: 'Login'},
            ],
            show: true
          },
          Forms: {
            routes: [
              {route: '/prec', faIcon: 'fa fa-search', materialIcon: 'search', name: 'Prec'},
              {route: '/simpleform', faIcon: 'fa fa-search', materialIcon: 'search', name: 'Simpleform'},
              { route: '/embeeded', faIcon: 'fa fa-check', materialIcon: 'check', name: 'Embeeded validations' },
              //{ route: '/advanced-form-one', faIcon: 'fa fa-hdd-o', materialIcon: 'filter_1', name: 'Adv. Form One' }
            ],
            show: false
          },
          Pages: {
            routes: [
              {route: '/login', faIcon: 'fa fa-unlock-alt', materialIcon: 'lock_open', name: 'Login'},
              //{ route: '/pricing', faIcon: 'fa fa-money', materialIcon: 'attach_money', name: 'Pricing' },
              //{ route: '/drag-and-drop', faIcon: 'fa fa-arrows', materialIcon: 'move_to_inbox', name: 'Drag and Drop' },
              //{ route: '/server-side-data-table', faIcon: 'fa fa-list-alt', materialIcon: 'list_compact', name: 'Server Side Data Table' }
            ],
            show: false
          }
        }
      }
    },
    created() {
      var vm = this
      /*firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          vm.user = user
          vm.name = vm.user.displayName
          vm.email = vm.user.email
          vm.photo = vm.user.photoURL
          vm.userId = vm.user.uid
        }
      })*/
    },
    methods:{
      ...mapActions("user", ["logout"]),
      logoutHandler() {
        this.logout({router: this.$router});
        this.$q.notify(this.$t('logout.uscito'));
      }
    },
    computed: {
      ...mapGetters("glob", ['getLayoutNeeded', 'getMenuCollapse']),
      ...mapGetters("user", ['getUsername', 'getVerificato', 'getEmail']),
    },
    components: {
      menuOne,
      menuTwo
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
