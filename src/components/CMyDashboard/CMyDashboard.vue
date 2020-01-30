<template>
  <div class="q-ma-xs q-gutter-xs q-pa-xs" v-if="username !== ''">
    <CTitleBanner class="q-pa-xs" :title="$t('pages.dashboard') +` (`+ username + `)`" bgcolor="bg-info" clcolor="text-white"
                  mystyle=" " myclass="myshad">

      <CCopyBtn :title="$t('reg.reflink')" :texttocopy="getRefLink">

      </CCopyBtn>

      <CTitleBanner class="shadow-2" :title="$t('reg.aportador_solidario')" bgcolor="bg-accent"
                    clcolor="text-white"
                    mystyle=" " myclass="myshad" :canopen="true">

        <CUserBadge v-if="!!dashboard.aportador.name" :user="dashboard.aportador" :index="0" :numpeople="dashboard.numpeople_aportador"
                    mycolor="accent">

        </CUserBadge>
        <div v-else class="q-pa-sm text-center">
          Nessun Invitante
        </div>
      </CTitleBanner>

      <CTitleBanner class="shadow-2 rounded-borders" :title="$t('dashboard.downline')" bgcolor="bg-positive"
                    clcolor="text-white"
                    mystyle=" " myclass="myshad" :canopen="true">

        <q-list bordered v-if="!!dashboard.downline && dashboard.downline.length > 0" class="rounded-borders">
          <div v-for="(user, index) in dashboard.downline" :key="index">
            <CUserBadge :yourinvite="true" :user="user" mycolor="primary" :index="index" :numpeople="dashboard.downbyuser[user.username].length">

            </CUserBadge>
            <div style="margin-left:10px;" v-for="(user2, index2) in dashboard.downbyuser[user.username]" :key="index2">
              <CUserBadge :yourinvite="false" :user="user2" mycolor="orange" :index="index2" :numpeople="dashboard.downbyuser[user2.username].length">

              </CUserBadge>
            </div>
          </div>
        </q-list>
        <div v-else class="q-pa-sm text-center">
          Nessun Invitato
        </div>
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
  </div>
</template>

<script lang="ts" src="./CMyDashboard.ts">
</script>
<style lang="scss" scoped>
  @import './CMyDashboard.scss';
</style>
