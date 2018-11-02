<template>
    <div class="mypanel">
        <q-alert color="primary q-title" style="text-align: center;">
            {{ $t('reg.title_verif_reg')}}
        </q-alert>
         <br>

        <transition
                enter-active-class="animated flipInX"
                leave-active-class="animated flipOutX"
                appear
        >
            <q-alert
                    v-if="giaverificato"
                    type="warning"
            >
                {{ risultato}}
            </q-alert>
            <q-alert
                    v-if="verificatook"
                    type="positive"
            >
                {{ risultato}}
            </q-alert>
        </transition>


    </div>
</template>

<script>

  import {mapActions} from 'vuex'
  import * as types from '../../store/mutation-types'
  import {ErroriMongoDb} from '../../store/modules/user'

  import {serv_constants} from '../../store/modules/serv_constants';


  export default {
    data() {
      return {
        risultato : '',
        riscode: 0
      }
    },
    created() {
      this.load();
    },
    computed:{
      giaverificato: function() {
        return this.riscode !== serv_constants.RIS_CODE_EMAIL_VERIFIED
      },
      verificatook: function() {
        return this.riscode === serv_constants.RIS_CODE_EMAIL_VERIFIED
      },
    },
    methods: {
      ...mapActions("user", {
        verifreg: types.USER_VREG,
      }),
      load: function () {
        this.verifreg(this.$route.query).then((ris) => {
          this.riscode = ris.code;
          this.risultato = ris.msg;
          console.log("RIS = ");
          console.log(ris);

          if (this.verificatook) {
            setTimeout(() => {
              this.$router.replace('/');
            }, 3000)
          }

        }).catch((err) => {
          console.log("ERR = " + err);
        });
      }
    },

  }

</script>

<style scoped>
    .mypanel {
        padding:10px;
        margin: 10px;

    }
</style>
