<template>
  <div class="q-my-xs q-gutter-xs q-py-xs" v-if="myusername !== ''">
    <CTitleBanner class="q-pa-xs text-center" :title="$t('pages.statoattuale')" bgcolor="bg-red" clcolor="text-white"
                  mystyle=" " myclass="myshad">
      <div v-if="!!dashboard.myself.name">

        <div v-if="!Completato9Req && !HasNave">
          <CTitleBanner icon="person" :canopen="true" class="q-pa-xs text-center"
                        :title="$t('pages.posizione_in_programmazione')" bgcolor="bg-blue"
                        clcolor="text-white" mystyle=" " myclass="myshad">
            <CRequisiti :statebool="Completato7Req" :msgTrue="$t('steps.enter_prog_requisiti_ok')"
                        :msgFalse="$t('steps.enter_prog_completa_requisiti')">
            </CRequisiti>
          </CTitleBanner>
        </div>

        <CTitleBanner icon="fas fa-gift" :canopen="true" class="q-pa-xs text-center"
                      :title="$t('pages.posizione_in_nave')" bgcolor="bg-green"
                      clcolor="text-white" mystyle=" " myclass="myshad">

          <div v-if="!HasNave">
            <CRequisiti :statebool="Completato9Req" :msgTrue="$t('steps.enter_nave_9req_ok')"
                        :color_ko="true"
                        :msgFalse="$t('steps.enter_nave_9req_ko')">
            </CRequisiti>
          </div>

          <CMyNave v-for="(mianave, index) in dashboard.arrposizioni" :posizprop="mianave" :key="index"
                   :navi_partenzaprop="dashboard.navi_partenza" :listanavi="false">

          </CMyNave>
        </CTitleBanner>

      </div>

    </CTitleBanner>
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
          {{ $t('dashboard.nessun_invitante')}}
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
          {{ $t('dashboard.nessun_invitato')}}
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

      <!--<CTitleBanner v-if="invitatinotreg" class="shadow-2 rounded-borders" :title="$t('dashboard.downnotreg')"
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
      </CTitleBanner>-->

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
      <p class="q-ml-sm">{{ $t('dashboard.legenda_title')}}</p>
      <q-list bordered class="rounded-borders justify-center q-pa-sm">
        <div class="row items-center q-pa-xs">
          <CCardState :mytext="$t('pages.statusreg.req')" :myval="7" :myperc="(7 / 9) * 100" size="50px" size_mob="40px"
                      fontsize="0.75rem" myclass="my-card-small-stat" mycolor="orange">
          </CCardState>
          <div class="bg-blue text-white clBorderxs q-ml-sm">{{$t('pages.statusreg.req7')}}</div>
        </div>
        <div class="row items-center q-pa-xs">
          <CCardState :mytext="$t('pages.statusreg.req')" :myval="9" :myperc="100" size="50px" size_mob="40px"
                      fontsize="0.75rem" myclass="my-card-small-stat" mycolor="green"></CCardState>
          <div class="bg-blue text-white clBorderxs q-ml-sm">{{$t('pages.statusreg.req9')}}</div>
        </div>
        <div class="row items-center q-pa-xs">
          <CCardState :mytext="$t('pages.statusreg.people')" :myval="2" :myperc="100" size="50px" size_mob="40px"
                      fontsize="0.75rem" myclass="my-card-small-stat" mycolor="green"></CCardState>
          <div class="bg-blue text-white clBorderxs q-ml-sm">{{$t('pages.statusreg.peoplelegend')}}</div>
        </div>
        <!--<CLegenda icon="fab fa-telegram" :text="`Telegram ` + $t('pages.statusreg.verified')"></CLegenda>
        <CLegenda icon="fas fa-video" :text="$t('stat.zoom')"></CLegenda>
        <CLegenda icon="fas fa-user-friends" :text="$t('dashboard.numinvitati')"></CLegenda>-->
        <div class="row items-center q-pa-xs q-ml-sm">
          <q-btn
            fab-mini
            icon="fab fa-whatsapp"
            color="white" text-color="green"
            size="sm">
          </q-btn>
          <div class="bg-blue text-white clBorderxs q-ml-sm">{{$t('dashboard.telefono_wa')}}</div>
        </div>
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
