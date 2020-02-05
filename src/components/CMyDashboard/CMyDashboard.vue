<template>
  <div class="q-ma-xs q-gutter-xs q-pa-xs" v-if="myusername !== ''">
    <CTitleBanner class="q-pa-xs" :title="$t('pages.dashboard')" bgcolor="bg-info" clcolor="text-white"
                  mystyle=" " myclass="myshad">


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
      <q-list bordered class="rounded-borders row justify-between">
        <CLegenda icon="fab fa-telegram" :text="`Telegram ` + $t('pages.statusreg.verified')"></CLegenda>
        <CLegenda icon="fas fa-video" :text="$t('pages.statusreg.seezoom')"></CLegenda>
        <CLegenda icon="fas fa-user-friends" :text="$t('dashboard.numinvitati')"></CLegenda>
        <CLegenda icon="fab fa-whatsapp" :text="$t('dashboard.telefono_wa')"></CLegenda>

      </q-list>
    </CTitleBanner>
    <br>

    <q-dialog v-model="showuserinfo">
      <q-card v-if="seluser" :style="`min-width: `+ tools.myheight_dialog() + `px;`">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>
            Info:
          </q-toolbar-title>
          <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
        </q-toolbar>
        <q-card-section class="inset-shadow">
          <CTitleBanner class="shadow-2 rounded-borders" :title="seluser.name + ` ` + seluser.surname"
                        bgcolor="bg-primary"
                        clcolor="text-white"
                        mystyle=" " myclass="myshad" :canopen="true">


            <div v-if="!ismyinvited_notreg(seluser)" class="text-center">

              <div v-if="!isextralist(seluser)">
                <div v-for="req of arrrequisiti">
                  <CRequisito :icon="req.icon" :text="$t(req.textlang) + req.textadd(seluser)" :isok="req.isok(seluser)"
                              :info="req.info"></CRequisito>
                </div>

              </div>

              <div v-if="ismydownline(seluser)">
                <CTitleBanner class="shadow-2 rounded-borders" :title="$t('reg.regala_invitato')"
                              bgcolor="bg-positive"
                              clcolor="text-white"
                              :visible="false"
                              mystyle=" " myclass="myshad" :canopen="true">

                  <div class="column q-gutter-sm justify-center text-center">
                    <q-input
                      bg-color="lightblue"
                      v-model="aportador_solidario"
                      rounded outlined
                      @blur="$v.aportador_solidario.$touch"
                      :error="$v.aportador_solidario.$error"
                      :error-message="errorMsg('aportador_solidario', $v.aportador_solidario)"
                      maxlength="20"
                      debounce="1000"

                      :label="$t('reg.username_regala_invitato')">

                      <template v-slot:prepend>
                        <q-icon name="person"/>
                      </template>

                    </q-input>

                    <q-toggle v-model="notifBot" :label="$t('dashboard.sendnotification')"/>

                    <q-btn class="q-ma-sm" rounded color="positive" text-color="white" icon="fas fa-gift"
                           :label="$t('reg.regala_invitato')"
                           :disabled='!allowSubmit'
                           @click="RegalaInvitato(seluser, aportador_solidario, getnotifBotTxt)"></q-btn>
                  </div>
                </CTitleBanner>

                <CTitleBanner v-if="ismydownline(seluser) && (seluser.numinvitati <= 0)" class="shadow-2 rounded-borders text-center"
                              :title="$t('reg.cancella_invitato')"
                              bgcolor="bg-negative"
                              clcolor="text-white"
                              :visible="false"
                              mystyle=" " myclass="myshad" :canopen="true">

                  <q-btn rounded text-color="red" icon="delete"
                         :label="$t('reg.cancella_invitato')"
                         @click="deleteUserFromUsersList(seluser)"></q-btn>
                </CTitleBanner>

              </div>

            </div>
            <div v-else>
              <div class="column justify-center q-gutter-sm q-pa-sm">

                <CRequisito icon="fas fa-user" :text="$t('dashboard.notreg')" :isok="false"
                            info=""></CRequisito>

                <CTitleBanner class="shadow-2 rounded-borders text-center"
                              :title="$t('reg.cancella_invitato')"
                              bgcolor="bg-negative"
                              clcolor="text-white"
                              :visible="false"
                              mystyle=" " myclass="myshad" :canopen="true">
                  <q-btn rounded text-color="red" icon="delete" :label="$t('reg.cancella_invitato')"
                         @click="deleteUserFromExtraList(seluser)"></q-btn>
                </CTitleBanner>

              </div>
            </div>


          </CTitleBanner>
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
