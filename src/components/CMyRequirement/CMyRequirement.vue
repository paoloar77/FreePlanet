<template>
  <div>
    <CTitleBanner class="shadow-2 rounded-borders"
                  :title="$t('reg.requirement') + ` - ` + seluser.name + ` ` + seluser.surname + ``"
                  bgcolor="bg-primary"
                  clcolor="text-white"
                  mystyle=" " myclass="myshad" :canopen="true">


      <div :class="myclassreq">

        <div v-if="!isextralist(seluser)">
          <div v-for="(req, index) of arrrequisiti">
            <CRequisito :icon="req.icon" :text="(index + 1) + `. ` + $t(req.textlang, {botname: $t('ws.botname')}) + req.textadd(seluser)"
                        :icon_error="geticonerror(true)"
                        :no_check="false"
                        :isok="req.isok(seluser)"
                        :info="req.info"></CRequisito>
          </div>

        </div>

        <CTitleBanner class="shadow-2 rounded-borders"
                      :title="$t('steps.sharemovement') + ` - ` + seluser.name + ` ` + seluser.surname + ``"
                      bgcolor="bg-secondary"
                      clcolor="text-white"
                      mystyle=" " myclass="myshad" :canopen="true">

          <div :class="myclassreq">

            <div v-if="!isextralist(seluser)">
              <div v-for="(req, index) of arrrequisiti_liberi">
                <CRequisito :icon="req.icon" :text="$t(req.textlang, {botname: $t('ws.botname')}) + req.textadd(seluser)"
                            :icon_error="geticonerror(false)"
                            :no_check="true"
                            :isok="req.isok(seluser)"
                            :info="req.info"></CRequisito>
              </div>

            </div>

          </div>
        </CTitleBanner>

        <div v-if="(ismydownline(seluser) && seluser.username !== mydashboard.myself.username) || showregalainv">

          <CTitleBanner class="shadow-2 rounded-borders" :title="gettitleregala()"
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
                @keydown.space="(event) => event.preventDefault()"
                :error-message="errorMsg('aportador_solidario', $v.aportador_solidario)"
                maxlength="20"
                debounce="1000"

                :label="$t('reg.username_regala_invitato')">

                <template v-slot:prepend>
                  <q-icon name="person"/>
                </template>

              </q-input>

              <q-toggle v-model="notifBot" :label="$t('dashboard.sendnotification')"/>

              <q-btn v-if="isregalainvitante()" class="q-ma-sm" rounded color="positive" text-color="white" icon="fas fa-gift"
                     :label="$t('reg.regala_invitante')"
                     :disabled='!allowSubmit'
                     @click="RegalaInvitante(seluser, aportador_solidario, ind_order_ingr, id_listaingr, getnotifBotTxtInvitante)"></q-btn>

              <q-btn v-else class="q-ma-sm" rounded color="positive" text-color="white" icon="fas fa-gift"
                     :label="$t('reg.regala_invitato')"
                     :disabled='!allowSubmit'
                     @click="RegalaInvitato(seluser, aportador_solidario, getnotifBotTxt)"></q-btn>
            </div>
          </CTitleBanner>

          <CTitleBanner v-if="ismydownline(seluser) && (seluser.numinvitati <= 0)"
                        class="shadow-2 rounded-borders text-center"
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
      <!--<div v-else>
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
      </div>-->


    </CTitleBanner>
  </div>
</template>

<script lang="ts" src="./CMyRequirement.ts">
</script>
<style lang="scss" scoped>
  @import './CMyRequirement.scss';
</style>
