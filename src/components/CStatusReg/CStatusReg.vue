<template>
  <div>
    <div v-if="visustat">
      <CTitleBanner class="q-pa-xs" :title="$t('pages.status')" bgcolor="bg-primary" clcolor="text-white"
                    mystyle="" myclass="myshad" canopen="true">


        <div class="flex flex-center">

          <CCardState :mytext="$t('pages.statusreg.reg')" :myval="datastat.num_reg" :myperc="100"></CCardState>
          <CCardState :mytext="$t('pages.statusreg.giainlista')" :isperc="true" :myval="datastat.num_reg_lista"
                      :myperc="perc_reg" :textadd="` / ` + datastat.num_tot_lista"></CCardState>
          <div class="q-pa-xs ">
            <CCardStat mytext="Partecipato in Zoom" :myval="datastat.num_part_zoom"></CCardStat>
            <CCardStat mytext="Hanno scritto il Sogno" :myval="datastat.num_users_dream"></CCardStat>
            <CCardStat v-if="emailnonverif" mytext="Email non Verificate" :myval="emailnonverif"
                       mycol="negative"></CCardStat>
            <CCardStat v-if="telegnonattivi" mytext="Telegram Non Attivi" :myval="telegnonattivi"
                       mycol="negative"></CCardStat>
            <CCardStat v-if="datastat.num_teleg_pending > 0" mytext="Telegram Pendenti"
                       :myval="datastat.num_teleg_pending" mycol="negative"></CCardStat>
          </div>

          <div class="column animazione">
            <div class="text-center">{{$t('pages.statusreg.newreg')}}</div>
            <transition-group name="fade" mode="out-in"
                              appear
                              enter-active-class="animazione fadeIn"
                              leave-active-class="animazione fadeOut">
              <q-item v-for="(user, index) in lastsreg" :key="user.username" class="q-mb-xs animated" v-ripple>

                <q-item-section avatar>
                  <q-avatar v-if="tools.geticon(user.profile.nationality)"
                            :class="tools.geticon(user.profile.nationality)">

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

          <CGeoChart :mydata="datastat.arr_nations">

          </CGeoChart>
          <div class="row text-center justify-center">
            <CListNationality :mydata="datastat.arr_nations">

            </CListNationality>
            <CLineChart :mydata="datastat.reg_daily" title="Registrazioni Giornaliere">

            </CLineChart>
            <CLineChart :mydata="datastat.reg_daily" title="Registrazioni Totali" :sum="true"
                        :mycolors="['#0b0', '#666']">

            </CLineChart>
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
