<template>
  <div class="q-gutter-xs" v-if="myusername !== ''">
    <div>
      <q-tabs
        v-model="tab"
        dense
        class="bg-blue text-white shadow-2"
        indicator-color="white"
        align="center"
        narrow-indicator
        @input="changetab"
      >
        <q-tab name="requisiti" icon="fas fa-check" :label="$t('reg.requirement')"></q-tab>
        <q-tab name="invitati" icon="fas fa-users" :label="$t('dashboard.downline')"></q-tab>
        <q-tab name="navi" icon="fas fa-ship" :label="$t('otherpages.admin.navi')"></q-tab>

      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="requisiti">

          <div v-if="loading" class="q-ma-md text-center" style="height: 50px;">
            <q-spinner-gears size="50px" color="primary"/>
          </div>

          <div v-if="!!dashboard && !!dashboard.myself">
            <div v-if="!!dashboard.myself.name">


              <CMyRequirement :myseluser="dashboard.myself" :mydashboard="dashboard" :mydownline="downline"
                              @aggiorna="aggiorna"
              >

              </CMyRequirement>
            </div>
          </div>

        </q-tab-panel>
        <q-tab-panel name="invitati">

          <CTitleBanner class="shadow-2" :title="$t('reg.aportador_solidario')" bgcolor="bg-accent"
                        clcolor="text-white"
                        mystyle=" " myclass="myshad" :canopen="true">

            <CUserBadge v-if="!!dashboard.aportador" :user="dashboard.aportador" :index="0"
                        :showregalainv="false"
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
                        :showregalainv="false"
                        @myclick="selectclick"
                        mycolor="blue">

            </CUserBadge>
          </CTitleBanner>

          <CTitleBanner class="shadow-2 rounded-borders" :title="getstrinvitati" bgcolor="bg-positive"
                        clcolor="text-white"
                        mystyle=" " myclass="myshad" :canopen="true">

            <div v-if="loading_invitati" class="q-ma-md text-center" style="height: 50px;">
              <q-spinner-hourglass size="50px" color="primary"/>
            </div>

            <q-list bordered v-if="!!downline.downline && downline.downline.length > 0" class="rounded-borders">
              <div v-for="(user, index) in downline.downline" :key="index">
                <CUserBadge :yourinvite="true" :user="user" mycolor="positive" :index="index"
                            :showregalainv="false"
                            @myclick="selectclick"
                >

                </CUserBadge>
                <div v-if="user.username !== dashboard.myself.username">
                  <div style="margin-left:10px;" v-for="(user2, index2) in downline.downbyuser[user.username]"
                       :key="index2">
                    <CUserBadge :yourinvite="false" :user="user2" mycolor="orange" :index="index2"
                                :showregalainv="false"
                                @myclick="selectclick"
                    >

                    </CUserBadge>
                  </div>
                </div>
              </div>
            </q-list>
            <div v-else class="q-pa-sm text-center">
              <div v-if="!loading_invitati">
                {{ $t('dashboard.nessun_invitato')}}
              </div>
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

          <CTitleBanner class="shadow-2 rounded-borders" :title="$t('reg.legenda')"
                        bgcolor="bg-primary"
                        clcolor="text-white"
                        mystyle=" " myclass="myshad" :canopen="true">
            <p class="q-ml-sm">{{ $t('dashboard.legenda_title')}}</p>
            <q-list bordered class="rounded-borders justify-center q-pa-sm">
              <div class="row items-center q-pa-xs">
                <CCardState :mytext="$t('pages.statusreg.req')" :myval="5" :myperc="(5 / 7) * 100" size="50px"
                            size_mob="40px"
                            fontsize="0.75rem" myclass="my-card-small-stat" mycolor="orange">
                </CCardState>
                <div class="bg-blue text-white clBorderxs q-ml-sm">{{$t('pages.statusreg.req7')}}</div>
              </div>
              <div class="row items-center q-pa-xs">
                <CCardState :mytext="$t('pages.statusreg.req')" :myval="7" :myperc="100" size="50px" size_mob="40px"
                            fontsize="0.75rem" myclass="my-card-small-stat" mycolor="green"></CCardState>
                <div class="bg-blue text-white clBorderxs q-ml-sm">{{$t('pages.statusreg.req9', {sitename:
                  $t('ws.sitename')})}}
                </div>
              </div>
              <div class="row items-center q-pa-xs">
                <CCardState :mytext="$t('pages.statusreg.people')" :myval="2" :myperc="100" size="50px"
                            size_mob="40px"
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

        </q-tab-panel>
        <q-tab-panel name="navi">

          <div v-if="loading" class="q-ma-md text-center" style="height: 50px;">
            <q-spinner-gears size="50px" color="primary"/>
          </div>

          <div v-if="upgrade_graduatorie">
            <CRequisiti :statebool="false"
                        msgTrue=""
                        msgFalse="Aggiornamento in Corso - Updating in Progress - Reload Page Please">
            </CRequisiti>

          </div>

          <div v-if="!!dashboard && dashboard.myself && !loading & !upgrade_graduatorie">
            <div>
              <div v-if="!Completato9Req && !HasNave">
                <CTitleBanner icon="person" :canopen="true" class="q-pa-xs text-center"
                              :title="$t('pages.posizione_in_programmazione')" bgcolor="bg-blue"
                              clcolor="text-white" mystyle=" " myclass="myshad">
                  <CRequisiti :statebool="Completato7Req"
                              :msgTrue="$t('steps.enter_prog_requisiti_ok') + $t('steps.enter_prog_msg')"
                              :msgFalse="$t('steps.enter_prog_completa_requisiti')">
                  </CRequisiti>
                </CTitleBanner>
              </div>
            </div>

            <div v-if="dashboard.myself.qualified">

              <CTitleBanner class=""
                            v-if="imbarchipresenti()"
                            :title="$t('pages.posizione_in_programmazione')"
                            bgcolor="bg-primary"
                            clcolor="text-white"
                            mystyle="" myclass="myshad" canopen="true">
                <div class="row justify-between items-center" style="text-align: center;">
                  <div class="col-2 ">
                    {{ $t('dashboard.posizione') }}
                  </div>
                  <div class="col-1 ">
                    <q-icon color="blue" name="fas fa-ship"></q-icon>
                  </div>
                  <div class="col-2 ">
                    {{ $t('dashboard.data_rich') }}
                  </div>
                  <div class="col-3 ">
                    {{ $t('dashboard.invitante') }}
                  </div>
                  <div class="col-2 ">
                    {{ $t('dashboard.downline') }}
                  </div>
                  <div class="col-2">
                    {{ $t('dialog.delete') }}
                  </div>

                </div>

                <div v-for="(mioimbarco, index) in dashboard.arrimbarchi" :key="index">
                  <div v-if="!mioimbarco.added" class="row justify-between items-center ">
                    <!--<div class="col-2">
                      <div class="posizione_imbarco">{{ index }}</div>
                    </div>-->
                    <div class="col-2">
                      <div class="posizione_imbarco">{{getposiz(mioimbarco.posiz) }}</div>
                    </div>
                    <div class="col-1 text-center">
                      <div class="boldhigh">{{ mioimbarco.navestr }}</div>
                    </div>
                    <div class="col-2  text-center">
                      <div>{{ tools.getstrshortDate(mioimbarco.date_added) }}</div>
                    </div>
                    <div class="col-3">
                      <div class="posizione_imbarco">
                        <CUserBadge :yourinvite="false" :showsteps="false" :showregalainv="true"
                                    :user="dashboard.arrusers[mioimbarco.invitante_username]" mycolor="orange"
                                    :ind_order_ingr="mioimbarco.ind_order"
                                    :id_listaingr="mioimbarco._id"
                                    :index="index"
                                    :mydisabled="getifdisableInvitante(mioimbarco, index)"
                                    @myclick="selectclick">
                        </CUserBadge>
                      </div>
                    </div>
                    <div class="col-2">
                      <div class="posizione_imbarco">
                        <CCardState :mytext="$t('pages.statusreg.people')"
                                    :myval="getvalstrinv(mioimbarco.posiz)"
                                    :myperc="getnuminvperc(index, mioimbarco.posiz)" size="50px"
                                    size_mob="40px"
                                    fontsize="0.85rem" myclass="my-card-small-stat"
                                    :mycolor="getcolorinvitati(index, mioimbarco.posiz)"></CCardState>

                      </div>
                    </div>
                    <!--<div class="col-2">
                      <div class="posizione_imbarco">33 €</div>
                    </div>-->
                    <div class="col-2">
                      <div class="posizione_imbarco">
                        <q-btn flat round color="red" icon="fas fa-trash-alt" size="sm"
                               @click="cancellaImbarco(mioimbarco)"></q-btn>
                      </div>
                    </div>
                  </div>
                  <div class="full-width">
                    <q-item>
                      <q-item-section avatar>
                        <q-icon size="sm" name="fas fa-heart" color="red"></q-icon>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>

                          <q-input v-model="mioimbarco.note" :label="$t('reg.my_dream')"
                                   rounded outlined
                                   debounce="1000"
                                   autogrow
                                   dense
                                   style="font-size:0.75rem;"
                                   @input="change_mynote_imbarco(mioimbarco)">
                          </q-input>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>

                </div>

                <div class="centermydiv">
                  <CRequisiti :statebool="true"
                              :msgTrue="$t('steps.enter_prog_msg') + '<br><strong>' + $t('steps.enter_prog_msg_2') + '</strong>'"
                              msgFalse="">
                  </CRequisiti>
                </div>

              </CTitleBanner>

              <div v-if="!!dashboard.myself" class="q-pa-xs text-center">

                <div v-if="!!dashboard.myself.name">
                  <div v-if="!HasNave">
                    <CRequisiti :statebool="Completato9Req" :msgTrue="$t('steps.enter_nave_9req_ok', {sitename:
                  $t('ws.sitename')})"
                                :color_ko="true"
                                :msgFalse="$t('steps.enter_nave_9req_ko')">
                    </CRequisiti>
                  </div>

                  <div class="text-center">
                    <q-btn class="q-ma-md" rounded size="md"
                           icon="fas fa-ship"
                           color="positive" @click="shownuovoviaggio=true"
                           :label="$t('steps.nuovo_imbarco')">

                    </q-btn>
                  </div>


                  <q-card class="my-card-shadow yes_shadow">
                    <q-img
                      src="statics/images/listanavi.jpg"
                      style="width: 100%;"
                      native-context-menu>
                      <div class="absolute-bottom text-subtitle1 text-center">
                        {{$t('pages.posizione_in_nave')}}
                      </div>
                    </q-img>
                    <div class="q-ma-xs">&nbsp;</div>
                    <div v-for="(mianave, index) in dashboard.arrposizioni" :key="index">
                      <q-list dense>
                        <q-item>
                          <q-item-section avatar style="width: 70px; font-size: 0.75rem;">
                            {{ getnumtessstr(1, index) }}
                            - {{ tools.getrigacolstr(mianave)}}
                            <q-icon :color="getcolornave(mianave)" name="fas fa-ship"></q-icon>
                          </q-item-section>
                          <q-item-section>
                            <q-slider
                              :value="getmyrigaattuale(mianave)"
                              :label-text-color="gettextcolor(mianave)"
                              :label-value="getval7(mianave) + '/7'"
                              :color="getcolorbyval(mianave)"
                              markers
                              dense
                              label
                              label-always
                              readonly
                              :min="tools.getRiganave(mianave.riga)"
                              :max="tools.getRiganave(mianave.riga)+6">

                            </q-slider>
                          </q-item-section>
                          <q-item-section avatar>
                            <!--{{tools.getlastnavestr(dashboard.lastnave) }} &nbsp;-->
                            {{ getNaveSognatoreStr(mianave)}}
                            <q-icon color="purple" name="fas fa-ship"></q-icon>
                          </q-item-section>
                          <q-item-section avatar>
                            <q-icon color="blue" name="fas fa-flag-checkered"></q-icon>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </q-card>

                  <div v-for="(mianave, index) in dashboard.arrposizioni" :key="index"
                       class="q-pa-sm row items-start q-gutter-sm">

                    <q-card class="my-card-shadow yes_shadow">
                      <q-img
                        :src="`statics/images/nave${index+1}.jpg`"
                        style="width: 100%"
                        native-context-menu>
                        <div class="absolute-bottom text-subtitle1 text-center text-sobig">
                          {{ getnumtessstr(mianave.num_tess, index) }} - {{$t('dashboard.nave') + ' ' +
                          tools.getrigacolstr(mianave)}}
                        </div>
                      </q-img>
                      <div class="row justify-sm-start items-center rounded-borders">

                        <div class="row items-center justify-center q-ma-xs" style="width: 100%">
                          <q-chip class="glossy q-mx-md" :color="getcolorbynave(mianave)" text-color="white"
                                  icon="fas fa-ship">
                            {{ $t('dashboard.nave_in_partenza') + ' ' + datagiftchat(mianave) }}
                          </q-chip>
                          <q-chip v-if="datagiftchat(mianave) !== datanave(mianave)" class="glossy q-mx-md" color="blue"
                                  text-color="white"
                                  icon="fas fa-ship">
                            {{ $t('dashboard.nave_in_chiusura') + ' ' + datanave(mianave) }}
                          </q-chip>
                        </div>

                        <div v-if="isprovvisoria(mianave)" class="text-center centermydiv">
                          <CRequisiti :statebool="true"
                                      :msgTrue="$t('dashboard.nave_provvisoria') + `<br><strong>` + $t('steps.enter_prog_msg') + `</strong>`"
                                      msgFalse="">
                          </CRequisiti>
                        </div>


                        <div class="row items-center justify-between q-ma-xs" style="width: 100%;">
                          <div class="row items-center justify-between q-ma-xs no-wrap"
                               style="width: 100%; font-weight: bold; font-size: 1rem">
                            <div>{{$t('dashboard.donatore')}}</div>
                            <div>{{$t('dashboard.mediatore')}}</div>
                            <div>{{$t('dashboard.sognatore')}}</div>
                          </div>
                          <div class="row items-center justify-between q-ma-xs no-wrap" style="width: 100%;">
                            <div class="justify-center">
                              <q-chip class="glossy q-ma-sm" color="red" text-color="white"
                                      icon="fas fa-ship">
                                {{ tools.getrigacolstr(mianave) }}
                              </q-chip>
                              <div class="items-center">
                                <q-icon color="blue" size="md" name="fas fa-gift"></q-icon>
                              </div>
                            </div>
                            <div class="justify-center">
                              <q-chip class="glossy q-ma-sm" color="green" text-color="white"
                                      icon="fas fa-ship">
                                {{ getNaveMediatoreStr(mianave)}}
                              </q-chip>
                              <div class="items-center">
                                <q-icon color="blue" size="md" name="fas fa-user-check"></q-icon>
                              </div>
                            </div>
                            <div class="justify-center">
                              <q-chip class="glossy q-ma-sm" color="purple" text-color="white"
                                      icon="fas fa-ship">
                                {{ getNaveSognatoreStr(mianave)}}
                              </q-chip>
                              <div class="items-center">
                                <q-icon color="blue" size="md" name="fas fa-flag-checkered"></q-icon>
                              </div>
                            </div>
                            <!--<span v-for="index of 8">{{ getNaveSognatoreStr(mianave, index)}} - </span>-->
                          </div>
                        </div>

                        <div class="q-pa-md" style="width: 100%;">
                          <!--<q-badge color="primary">
                            {{$t('dashboard.nave')}} {{ myrigaattuale }}.{{ mycolattuale }}
                          </q-badge>-->
                          <q-list dense>
                            <q-item>
                              <q-item-section avatar>
                                <!--{{tools.getlastnavestr(dashboard.lastnave) }} &nbsp;-->
                                {{ tools.getrigacolstr(mianave)}}
                                <q-icon :color="getcolornave(mianave)" name="fas fa-ship"></q-icon>
                              </q-item-section>
                              <q-item-section>
                                <q-slider
                                  :value="getmyrigaattuale(mianave)"
                                  :label-text-color="gettextcolor(mianave)"
                                  :label-value="getval7(mianave) + '/7'"
                                  :color="getcolorbyval(mianave)"
                                  markers
                                  label
                                  label-always
                                  readonly
                                  :min="tools.getRiganave(mianave.riga)"
                                  :max="tools.getRiganave(mianave.riga)+6">

                                </q-slider>
                              </q-item-section>
                              <q-item-section avatar>
                                <!--{{tools.getlastnavestr(dashboard.lastnave) }} &nbsp;-->
                                {{ getNaveSognatoreStr(mianave)}}
                                <q-icon color="purple" name="fas fa-ship"></q-icon>
                              </q-item-section>
                            </q-item>
                            <q-item v-if="mianave.num_tess % 2 !== 0">
                              <q-item-section avatar>
                                <q-icon :color="colordono(mianave)" inverted size="sm" name="fas fa-gift"
                                        class="gift"></q-icon>
                              </q-item-section>

                              <q-item-section>
                                <q-item-label>
                                  <div v-if="mianave.made_gift">
                                    <q-chip class="glossy"
                                            size="md"
                                            color="green"
                                            text-color="white"
                                            icon="fas fa-gift">
                                      {{ $t('steps.dono') + ' ' + $t('dashboard.dono_ricevuto_2') }} !
                                    </q-chip>
                                  </div>
                                  <div v-else-if="!!mianave.date_made_gift">
                                    <q-chip class=""
                                            size="md"
                                            text-color="blue"
                                            color="white"
                                            icon="fas fa-gift">
                                      {{ $t('dashboard.ho_effettuato_il_dono') }}
                                    </q-chip>
                                  </div>
                                </q-item-label>
                              </q-item-section>
                            </q-item>
                            <q-item v-if="(mianave.num_tess % 2 !== 0) && !isprovvisoria(mianave)">
                              <q-item-section avatar>
                                <q-icon size="sm" name="fas fa-heart" color="red"></q-icon>
                              </q-item-section>
                              <q-item-section>
                                <q-item-label>

                                  <q-input v-model="mianave.note" :label="$t('reg.my_dream')"
                                           rounded outlined
                                           debounce="1000"
                                           autogrow
                                           dense
                                           style="width: 100%; font-size:0.75rem;"
                                           @input="change_mynote(mianave)">
                                  </q-input>
                                </q-item-label>
                              </q-item-section>
                            </q-item>
                            <q-item v-if="mianave.num_tess % 2 !== 0">
                              <q-item-section avatar>
                                <q-icon size="sm" name="fas fa-user" color="blue"></q-icon>
                              </q-item-section>
                              <q-item-section>
                                <q-item-label>
                                  <q-input v-model="mianave.invitante_username" :label="$t('dashboard.invitante')"
                                           rounded outlined
                                           readonly
                                           dense
                                           style="width: 100%; font-size:0.75rem;">
                                  </q-input>

                                </q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </div>
                      </div>
                      <div>
                        <CMyNave :posizprop="mianave" :key="index"
                                 :navi_partenzaprop="dashboard.navi_partenza" :listanavi="false" :dashboard="dashboard">

                        </CMyNave>
                      </div>

                      <!--<q-card-actions>
                        <q-btn flat>Action 1</q-btn>
                        <q-btn flat>Action 2</q-btn>
                      </q-card-actions>-->
                    </q-card>
                    <!--<div class="col-3">
                        <div>
                            <CCardState :isperc="true" size="50px" size_mob="40px" fontsize="0.75rem"
                                        :myperc="getposizioneattuale(mianave)"></CCardState>
                        </div>
                    </div>-->
                    <!--<div class="col-1">
                        <div>
                            {{ getposizioneattuale(mianave, true) }}
                        </div>
                    </div>-->

                  </div>

                </div>


              </div>

            </div>
          </div>

        </q-tab-panel>
      </q-tab-panels>
    </div>

    <div v-if="!!dashboard.myself">
      <div v-if="!!dashboard.myself.name">
        <div v-if="dashboard.myself.deleted">
          <span style="color: red;"> <h2><strong>UTENTE CANCELLATO (Nascosto: true) !</strong></h2></span>
        </div>

        <div v-if="dashboard.myself.sospeso">
          <span style="color: blue;"> <h2><strong>UTENTE SOSPESO !</strong></h2></span>
        </div>

      </div>


    </div>


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
          <CMyRequirement :id_listaingr="id_listaingr" :myseluser="seluser"
                          :showregalainv="getIfregalareInvitati(seluser, showregalainv)"
                          :mydashboard="dashboard" :mydownline="downline" :notitle="false" @aggiorna="aggiorna"
                          :ind_order_ingr="ind_order_ingr">

          </CMyRequirement>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="shownuovoviaggio">
      <q-card v-if="shownuovoviaggio" :style="`min-width: `+ tools.myheight_dialog() + `px;` ">
        <q-toolbar class="bg-primary text-white" style="min-height: 30px;">
          <q-toolbar-title>
            {{ $t('steps.nuovo_imbarco') }}
          </q-toolbar-title>
          <q-btn flat round color="white" icon="close" v-close-popup @click="shownuovoviaggio=false"></q-btn>
        </q-toolbar>
        <q-card-section class="inset-shadow" style="padding: 4px !important;">

          <div class="q-pa-sm">
            <div v-html="$t('steps.vuoi_entrare_nuova_nave')">

            </div>
            <br>
            <!--<div v-html="$t('steps.inserisci_invitante')" class="ins_invitante">

            </div>-->
            <br>


            <!--
            <div class="column q-gutter-sm justify-center text-center">
              <q-input
                bg-color="lightblue"
                v-model="invitante_username"
                rounded outlined
                @blur="$v.invitante_username.$touch"
                :error="$v.invitante_username.$error"
                @keydown.space="(event) => event.preventDefault()"
                :error-message="errorMsg('invitante_username', $v.invitante_username)"
                maxlength="20"
                debounce="1000"

                :label="$t('reg.username_regala_invitato')">

                <template v-slot:prepend>
                  <q-icon name="person"/>
                </template>

              </q-input>

              <q-toggle v-model="notifBot" :label="$t('dashboard.sendnotification')"/>
              -->

              <q-btn class="q-ma-md" rounded size="md"
                     icon="fas fa-ship"
                     :disabled='!allowSubmit'
                     color="positive" @click="addNuovoImbarco"
                     :label="$t('steps.nuovo_imbarco')">
              </q-btn>
          </div>
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
