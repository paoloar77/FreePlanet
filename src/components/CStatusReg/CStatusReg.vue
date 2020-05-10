<template>
    <div>
        <div v-if="visustat">
            <CTitleBanner class="q-pa-xs" :title="$t('pages.status')" bgcolor="bg-primary" clcolor="text-white"
                          mystyle="" myclass="myshad" canopen="true">


                <div class="flex flex-center">

                    <CCardState :mytext="$t('pages.statusreg.reg')" :myval="datastat.num_reg"
                                :myperc="100"></CCardState>

                    <CCardState :mytext="$t('pages.statusreg.passeggeri')"
                                mycolor="blue"
                                size="150px"
                                size_mob="130px"
                                :myval="datastat.num_passeggeri"
                                :myperc="100"></CCardState>

                    <!--<CCardState :mytext="$t('statusreg.imbarcati')"
                                size="150px"
                                size_mob="130px"
                                mycolor="blue" :myval="datastat.num_imbarcati"
                                :myperc="100"></CCardState>-->

                    <!--<CCardState v-if="datastat.num_part_accepted > 1"
                                :mytext="$t('stat.requisiti')" :isperc="true" :myval="datastat.num_requisiti"
                                :myperc="calcperc(datastat.num_requisiti, datastat.num_reg) "
                                mycolor="blue"
                                :textadd="` / ` + datastat.num_reg"></CCardState>-->

                    <div class="q-pa-xs" v-if="datastat.num_part_accepted > 1">
                        <CCardStat :mytext="$t('stat.accepted')" :myval="datastat.num_part_accepted"></CCardStat>
                        <CCardStat :mytext="$t('stat.zoom')" :myval="datastat.num_part_zoom"></CCardStat>
                        <CCardStat :mytext="$t('stat.imbarcati')" :myval="datastat.num_imbarcati"></CCardStat>
                        <!--<CCardStat :mytext="$t('stat.modalita_pagamento')"
                                   :myval="datastat.num_modalita_pagamento"></CCardStat>-->
                        <!--<CCardStat :mytext="$t('stat.requisiti')" :myval="datastat.num_requisiti"></CCardStat>-->
                        <!--<CCardStat :mytext="$t('stat.qualificati')" :myval="datastat.num_qualificati"></CCardStat>-->
                        <!--<CCardStat v-if="emailnonverif" :mytext="$t('stat.email_not_verif')" :myval="emailnonverif"
                                   mycol="negative"></CCardStat>
                        <CCardStat v-if="telegnonattivi" :mytext="$t('stat.telegram_non_attivi')"
                                   :myval="telegnonattivi"
                                   mycol="negative"></CCardStat>
                        <CCardStat v-if="datastat.num_teleg_pending > 0" :mytext="$t('stat.telegram_pendenti')"
                                   :myval="datastat.num_teleg_pending" mycol="negative"></CCardStat>-->
                    </div>

                    <div class="column animazione">
                        <div class="text-center">{{$t('pages.statusreg.newreg')}}</div>
                        <transition-group name="fade" mode="out-in"
                                          appear
                                          enter-active-class="animazione fadeIn"
                                          leave-active-class="animazione fadeOut">

                            <q-item v-for="(user, index) in lastsreg" :key="user.username" class="q-mb-xs animated"
                                    v-ripple>

                                <q-item-section avatar>
                                    <q-avatar v-if="tools.geticon(user.profile.nationality)"
                                              :class="tools.geticon(user.profile.nationality)">

                                    </q-avatar>
                                    <q-avatar v-else color="primary" text-color="white" class="text-center">
                                        {{ tools.capitalize(user.profile.nationality) }}
                                    </q-avatar>
                                </q-item-section>

                                <q-item-section>
                                    <q-item-label>{{ user.name }} {{ tools.firstchars_onedot(user.surname, 1) }}
                                    </q-item-label>
                                    <q-item-label caption lines="1">{{ user.username }}</q-item-label>
                                </q-item-section>

                                <q-item-section side>
                                    <q-item-label>{{ tools.getstrDateTimeShort(user.date_temp_reg) }}</q-item-label>
                                    <q-chip outline color="green" text-color="white" icon-right="fas fa-user-plus"
                                            size="xs"></q-chip>
                                </q-item-section>
                            </q-item>
                        </transition-group>
                    </div>

                    <CGeoChart :mydata="datastat.arr_nations">

                    </CGeoChart>
                    <div class="row text-center justify-center">
                        <CListNationality :mydata="datastat.arr_nations">

                        </CListNationality>
                        <CLineChart :mydata="datastat.reg_daily" :title="$t('stat.reg_daily')">

                        </CLineChart>
                        <CLineChart :mydata="datastat.reg_weekly" :title="$t('stat.reg_weekly')">

                        </CLineChart>
                        <CLineChart :mydata="datastat.reg_daily" :title="$t('stat.reg_total')"
                                    :offset="datastat.numreg_untilday" :sum="true"
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
