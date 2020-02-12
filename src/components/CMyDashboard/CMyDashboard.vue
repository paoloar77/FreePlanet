<template>
  <div class="q-ma-xs q-gutter-xs q-pa-xs" v-if="myusername !== ''">
    <CTitleBanner class="q-pa-xs" :title="$t('pages.dashboard')" bgcolor="bg-info" clcolor="text-white"
                  mystyle=" " myclass="myshad">

      <div v-if="!!dashboard.myself.name">


        <CMyRequirement :myseluser="dashboard.myself" :mydashboard="dashboard">

        </CMyRequirement>
      </div>

      <CTitleBanner class="shadow-2" :title="$t('reg.aportador_solidario')" bgcolor="bg-accent"
                    clcolor="text-white"
                    mystyle=" " myclass="myshad" :canopen="true">

        <CUserBadge v-if="!!dashboard.aportador" :user="dashboard.aportador" :index="0"
                    :numpeople="dashboard.numpeople_aportador"
                    mycolor="accent" @myclick="selectclick">

        </CUserBadge>
        <div v-else class="q-pa-sm text-center">
          Nessun Invitante
        </div>
      </CTitleBanner>

      <CTitleBanner class="shadow-2" :title="$t('reg.you')" bgcolor="bg-blue"
                    clcolor="text-white"
                    mystyle=" " myclass="myshad" :canopen="true">

        <CUserBadge v-if="!!dashboard.myself" :user="dashboard.myself" :index="0"
                    :numpeople="dashboard.downline.length"
                    @myclick="selectclick"
                    mycolor="blue">

        </CUserBadge>
      </CTitleBanner>

      <CTitleBanner class="shadow-2 rounded-borders" :title="$t('dashboard.downline')" bgcolor="bg-positive"
                    clcolor="text-white"
                    mystyle=" " myclass="myshad" :canopen="true">

        <q-list bordered v-if="!!dashboard.downline && dashboard.downline.length > 0" class="rounded-borders">
          <div v-for="(user, index) in dashboard.downline" :key="index">
            <CUserBadge :yourinvite="true" :user="user" mycolor="positive" :index="index"
                        :numpeople="dashboard.downbyuser[user.username].length"
                        @myclick="selectclick"
            >

            </CUserBadge>
            <div style="margin-left:10px;" v-for="(user2, index2) in dashboard.downbyuser[user.username]" :key="index2">
              <CUserBadge :yourinvite="false" :user="user2" mycolor="orange" :index="index2"
                          :numpeople="dashboard.downbyuser[user2.username].length"
                          @myclick="selectclick"
              >

              </CUserBadge>
            </div>
          </div>
        </q-list>
        <div v-else class="q-pa-sm text-center">
          Nessun Invitato
        </div>
      </CTitleBanner>

      <div class="row justify-center q-ma-sm">
        <q-btn push
               rounded
               color="primary"
               size="md"
               :label="$t('pages.invita')"
               icon="fas fa-user-plus"
               to="/invite">
        </q-btn>
      </div>

      <CTitleBanner v-if="invitatinotreg" class="shadow-2 rounded-borders" :title="$t('dashboard.downnotreg')"
                    bgcolor="bg-grey"
                    clcolor="text-white"
                    mystyle=" " myclass="myshad" :canopen="true">

        <q-list bordered v-if="!!dashboard.downnotreg" class="rounded-borders">
          <div v-for="(user, index) in dashboard.downnotreg" :key="index">
            <CUserBadge :yourinvite="true" :user="user" mycolor="grey" :index="index" :numpeople="user.num_invitati"
                        @myclick="selectclick">

            </CUserBadge>
          </div>
        </q-list>
      </CTitleBanner>

    </CTitleBanner>

    <!--
        <CTitleBanner class="q-pa-xs" :title="$t('text.dashboard.madegift')" bgcolor="bg-info" clcolor="text-white"
                      mystyle=" " myclass="myshad">
          <div class="q-pa-sm text-center">

            <div v-if="madegift" class="q-gutter-md">
              <q-icon name="fas fa-gift" size="lg" color="green"></q-icon>
              <q-icon name="fas fa-thumbs-up" size="lg" color="green"></q-icon>
            </div>
            <div v-else class="q-gutter-md">
              <q-icon name="fas fa-gift" size="lg" color="grey"></q-icon>
              <q-icon name="fas fa-exclamation-triangle" size="lg" color="orange"></q-icon>
            </div>

          </div>
        </CTitleBanner>
    -->

    <CCopyBtn :title="$t('reg.reflink')" :texttocopy="getRefLink">

    </CCopyBtn>

    <CTitleBanner class="shadow-2 rounded-borders" :title="$t('reg.legenda')"
                  bgcolor="bg-primary"
                  clcolor="text-white"
                  mystyle=" " myclass="myshad" :canopen="true">
      <p class="q-ml-sm">Clicca sul nome dell'invitato per vedere lo stato dei suoi Requisiti.</p>
      <q-list bordered class="rounded-borders row justify-between">
        <CLegenda icon="fab fa-telegram" :text="`Telegram ` + $t('pages.statusreg.verified')"></CLegenda>
        <CLegenda icon="fas fa-video" :text="$t('pages.statusreg.seezoom')"></CLegenda>
        <CLegenda icon="fas fa-user-friends" :text="$t('dashboard.numinvitati')"></CLegenda>
        <CLegenda icon="fab fa-whatsapp" :text="$t('dashboard.telefono_wa')"></CLegenda>

      </q-list>
    </CTitleBanner>
    <br>

    <q-dialog v-model="showuserinfo">
      <q-card v-if="seluser" :style="`min-width: `+ tools.myheight_dialog() + `px;` ">
        <q-toolbar class="bg-primary text-white" style="min-height: 30px;">
          <q-toolbar-title>
            {{$t('reg.requirement')}}
          </q-toolbar-title>
          <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
        </q-toolbar>
        <q-card-section class="inset-shadow" style="padding: 4px !important;">
          <CMyRequirement :myseluser="seluser" :mydashboard="dashboard" :notitle="false">

          </CMyRequirement>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts" src="./CMyDashboard.ts">
</script>
<style lang="scss" scoped>
  @import './CMyDashboard.scss';
</style>
