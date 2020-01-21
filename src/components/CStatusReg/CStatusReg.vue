<template>
  <div>
    <div v-if="visustat">
      <CTitleBanner class="q-pa-xs" :title="$t('pages.status')" bgcolor="bg-primary" clcolor="text-white"
                    mystyle="" myclass="myshad" canopen="true">


        <div class="flex flex-center">

          <CCardState :mytext="$t('pages.statusreg.reg')" :myval="datastat.num_reg" :myperc="100"></CCardState>
          <CCardState :mytext="$t('pages.statusreg.giainlista')" :isperc="true" :myval="datastat.num_reg_lista"
                      :myperc="perc_reg" :textadd="` / ` + datastat.num_tot_lista"></CCardState>
          <div class="column animazione">
            <div class="text-center">Nuove Registrazioni:</div>
            <transition-group name="fade" mode="out-in"
                              appear
                              enter-active-class="animazione fadeIn"
                              leave-active-class="animazione fadeOut">
              <q-item v-for="(user, index) in lastsreg" :key="user.username" class="q-mb-xs animated" v-ripple>

                <q-item-section avatar>
                  <q-avatar v-if="tools.geticon(user.profile.nationality)" :class="tools.geticon(user.profile.nationality)">

                  </q-avatar>
                  <q-avatar v-else color="primary" text-color="white" class="text-center">
                    {{ tools.capitalize(user.profile.nationality) }}
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ user.name }} {{ tools.firstchars_onedot(user.surname, 1) }}</q-item-label>
                  <q-item-label caption lines="1">{{ user.username }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label>{{ tools.getstrDateTimeShort(user.date_temp_reg) }}</q-item-label>
                  <q-chip outline color="green" text-color="white" icon-right="fas fa-user-plus" size="xs"></q-chip>
                </q-item-section>
              </q-item>
            </transition-group>
          </div>
        </div>
      </CTitleBanner>
    </div>
  </div>
</template>

<script lang="ts" src="./CStatusReg.ts">
</script>

<style lang="scss" scoped>
  @import './CStatusReg.scss';
</style>
