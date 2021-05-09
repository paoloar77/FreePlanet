<template>
  <q-page>
    <div class="panel">

      <q-dialog v-model="shownewsubproj">
        <q-card :style="`min-width: `+ tools.myheight_dialog() + `px;`">
          <q-toolbar class="bg-primary text-white">
            <q-toolbar-title>
              Nuovo
            </q-toolbar-title>
            <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
          </q-toolbar>
          <q-card-section class="inset-shadow">
            <q-input color="blue-12" v-model="newSubProj" label="Inserisci il Nuovo sotto Progetto:"
                     style="margin-left: 6px;"
                     autofocus
                     :after="[{icon: 'arrow_forward', content: true, handler () {}}]">
              <template v-slot:prepend>
                <q-icon name="add"/>
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn rounded color="primary" v-close-popup label="Aggiungi"
                   @click="insertSubProj()"></q-btn>
            <q-btn flat rounded color="negative" v-close-popup label="Annulla"></q-btn>
          </q-card-actions>
        </q-card>

      </q-dialog>

      <div>
        <div class="flex-container clMain">

          <div class="q-ml-md">
            <div v-if="canShow">
              <q-btn v-if="!isRootProjectAtt" size="md" push
                     color="secondary" round
                     icon="arrow_back"
                     @click="clickrouteup"
                     :to="getrouteup">

              </q-btn>
            </div>
          </div>
          <div :class="classTitleProjSelBread">

            <div v-if="canShow">
              <q-breadcrumbs gutter="xs">
                <q-breadcrumbs-el v-for="(crumb, index) in listacrumb"
                                  :key="index"
                                  :label="crumb.description"
                                  :to="getroutebyid(crumb.idelem)"/>
              </q-breadcrumbs>
            </div>
            <div v-else>
              Progetti:
            </div>

          </div>
          <q-btn push
                 size="md"
                 icon="settings">
            <q-menu id="popconfig" self="top right">
              <q-list link separator no-border class="todo-menu">
                <div v-for="field in menuPopupConfigProject" :key="field.value">
                  <q-item clickable v-if="(field.value === 150)">
                    <q-item-section avatar>
                      <q-icon :name="field.icon"/>
                    </q-item-section>

                    <q-item-section>{{ field.label }}</q-item-section>
                    <q-item-section side>
                      <q-icon name="keyboard_arrow_right"/>
                    </q-item-section>

                    <q-menu auto-close anchor="bottom middle" self="top middle">
                      <q-list dense>
                        <q-item side clickable :icon="field.icon">

                          <q-item-section>
                            <q-list dense>
                              <q-item clickable v-ripple
                                      v-for="opt in listOptionShowTask"
                                      :key="opt.value"
                                      @click="showtype = opt.value">
                                <q-item-section avatar>
                                  <q-icon :name="opt.icon" inverted
                                          color="primary"/>
                                </q-item-section>
                                <q-item-section>
                                  {{ opt.label }}
                                </q-item-section>
                              </q-item>
                            </q-list>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-item>
                  <q-item v-else v-close-popup clickable :icon="field.icon" :disable="field.disable"
                          @click="clickMenuProjList(field.value)">

                    <q-item-section avatar>
                      <q-icon :name="field.icon"/>
                    </q-item-section>

                    <q-item-section>{{ field.label }}</q-item-section>
                  </q-item>
                </div>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <div class="flex-item categorytitle" v-if="(whatisSel === tools.WHAT_TODO)"> {{ showDescr }}</div>
      </div>
    </div>

    <!--<q-splitter
      v-model="splitterModel"
      :horizontal="isHorizontal"
      :style="myStyle"
      :limits="[50, 100]"
      <template v-slot:before>
    >-->

    <q-tab-panels v-model="tabproj" animated>
      <q-tab-panel name="lista">
        <div>
          <!--idProjAtt: {{ idProjAtt }}-->
          <div style="display: none">{{ prior = 0, priorcomplet = false }}</div>

          <div>
            <!--<q-infinite-scroll :handler="loadMoreTodo" :offset="7">-->
            <!--<div class="container" v-dragula="projs_dacompletare(idProjAtt, gettipoProj)" drake="second"> -->
            <div class="container">
              <q-list bordered>
                <div :id="tools.getmyid(myproj._id)" :index="index"
                     v-for="(myproj, index) in projs_dacompletare(idProjAtt, gettipoProj)"
                     :key="myproj._id" class="myitemdrag">

                  <SingleProject ref="singleproject" @deleteItemproj="mydeleteitemproj(myproj._id)"
                                 @eventupdateproj="updateitemproj"
                                 @idsel="setidsel"
                                 @deselectAllRowsproj="deselectAllRowsproj"
                                 @deselectAllRowstodo="deselectAllRowstodo" @onEnd="onEndproj"
                                 :itemproject='myproj'>

                  </SingleProject>

                </div>
              </q-list>
            </div>
          </div>
          <q-separator></q-separator>

          <!--<q-input v-model="projbottom"
                   style="margin-left: 6px;"
                   color="blue-12"
                   :label="$t('proj.insertbottom')"
                   :after="[{icon: 'arrow_forward', content: true, handler () {}}]"
          >

          </q-input>

          <br>
          <q-separator></q-separator>
          -->


          <!--CanIModifyPanelPrivacy = {{CanIModifyPanelPrivacy}}<br>-->
          <!--CanIModifyPanelPrivacySel = {{CanIModifyPanelPrivacySel}}<br>-->
          <!--CanISeeProject = {{CanISeeProject}}<br>-->
          <!--CanISeeProjectSel = {{CanISeeProjectSel}}-->

          <CTodo ref="ctodo" @setitemsel="setitemsel" :categoryAtt="idProjAtt" title="" backcolor="white"
                 forecolor="black" :viewtaskTop="false" @deselectAllRowsproj="deselectAllRowsproj"
                 @deselectAllRowstodo="deselectAllRowstodo"
                 :CanIModifyTodo="CanIModifyPanelPrivacy"
          >
          </CTodo>

        </div>
      </q-tab-panel>
      <q-tab-panel name="info">
        <div v-if="(whatisSel === tools.WHAT_PROJECT) && (!!itemselproj.descr)">
          <div class="q-pa-xs q-mb-xl clMain">

            <div class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="border_color"/>
              <div class="flex-item itemdescr">
                <q-input
                  ref="input"
                  v-model="itemselproj.longdescr"
                  :label="$t('proj.longdescr')"
                  outlined
                  debounce="1000"
                  @input="modifyfieldproj('privacywrite')"
                  autogrow
                  style="flex: auto">
                </q-input>
              </div>
            </div>


            <div v-if="CanISeeProjectSel" class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="fas fa-sort-amount-up-alt"/>
              <div class="flex-item itemdescr">
                <q-input
                  v-model="itemselproj.pos"
                  type="number"
                  rounded outlined
                  debounce="500"
                  style="max-width: 100px;"
                  :label="$t('dashboard.posizione')"></q-input>
              </div>
            </div>

            <div v-if="CanISeeProjectSel" class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="group"/>
              <div class="flex-item itemstatus">
                <q-select style="min-width: 200px"
                          :readonly="readonly_PanelPrivacySel"
                          rounded outlined v-model="itemselproj.groupId" :options="selectGroup"
                          :label="$t('proj.group')" emit-value map-options
                          @input="modifyfieldproj('groupId')">
                </q-select>
              </div>
            </div>
            <div v-if="CanISeeProjectSel" class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="border_color"/>
              <div class="flex-item itemstatus">
                <q-select style="min-width: 200px"
                          :readonly="readonly_PanelPrivacySel"
                          rounded outlined v-model="itemselproj.respUsername" :options="selectResp"
                          :label="$t('proj.respUsername')" emit-value map-options
                          @input="modifyfieldproj('respUsername')">
                </q-select>
              </div>
            </div>
            <div v-if="CanISeeProjectSel" class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="border_color"/>
              <div class="flex-item itemdescr">
                <q-select style="min-width: 200px"
                          :readonly="readonly_PanelPrivacySel"
                          rounded outlined v-model="itemselproj.viceRespUsername" :options="selectResp"
                          :label="$t('proj.viceRespUsername')" emit-value map-options
                          @input="modifyfieldproj('viceRespUsername')">
                </q-select>
                <q-select style="min-width: 200px"
                          :readonly="readonly_PanelPrivacySel"
                          rounded outlined v-model="itemselproj.vice2RespUsername" :options="selectResp"
                          :label="$t('proj.vice2RespUsername')" emit-value map-options
                          @input="modifyfieldproj('vice2RespUsername')">
                </q-select>
              </div>
            </div>
            <div class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="outlined_flag"/>
              <div class="flex-item itemstatus">
                <q-select style="min-width: 150px" :readonly="readonly_PanelPrivacySel" rounded outlined
                          v-model="itemselproj.tipovisu"
                          :options="selectTipoVisu"
                          @input="modifyfieldproj('tipovisu')"
                          :label="$t('proj.tipovisu')" emit-value map-options>
                </q-select>
              </div>
            </div>
            <div v-if="CanISeeProjectSel" class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="lock"/>
              <div class="flex-item itemstatus">
                <q-select style="min-width: 200px"
                          :readonly="readonly_PanelPrivacySel"
                          rounded outlined v-model="itemselproj.privacyread" :options="selectPrivacy"
                          :label="$t('proj.privacyread')" emit-value map-options
                          @input="modifyfieldproj('privacyread')">
                </q-select>
              </div>
            </div>
            <div v-if="CanISeeProjectSel" class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="edit"/>
              <div class="flex-item itemstatus">
                <q-select style="min-width: 200px" :readonly="readonly_PanelPrivacySel" rounded outlined
                          v-model="itemselproj.privacywrite" :options="selectPrivacy"
                          :label="$t('proj.privacywrite')" emit-value map-options
                          @input="modifyfieldproj('privacywrite')">
                </q-select>
              </div>
            </div>
            <div v-if="CanISeeProjectSel" class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="edit"/>
              <div class="flex-item itemstatus">

                {{ $t('proj.createdby') }} {{ getCreatedBy(itemselproj) }}
              </div>
            </div>


          </div>
        </div>
        <div v-else-if="(whatisSel === tools.WHAT_TODO) && (!!itemtodosel.descr)">
          <div class="q-pa-xs q-mb-xl clMain">

            <div class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="border_color"/>
              <div class="flex-item itemdescr">
                <!--<q-icon size="md" :name="iconPriority" color="primary"/>-->
                <q-input
                  ref="input4"
                  v-model="itemtodosel.descr"
                  :class="classTitleTodoSel"
                  :label="$t('proj.longdescr')"
                  outlined
                  :readonly="readonly_PanelPrivacy"
                  @input="modifyfieldtodo('descr')"
                  debounce="1000"
                  autogrow
                  style="flex: auto">

                </q-input>
              </div>
            </div>

            <div class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="border_color"/>
              <div class="flex-item itemdescr">
                <!--<q-icon size="md" :name="iconPriority" color="primary"/>-->
                <q-input
                  ref="input4"
                  v-model="itemtodosel.note"
                  :label="$t('proj.note')"
                  outlined
                  :readonly="readonly_PanelPrivacy"
                  @input="modifyfieldtodo('note')"
                  debounce="1000"
                  autogrow
                  style="flex: auto">

                </q-input>
              </div>
            </div>

            <div class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="fas fa-sort-amount-up-alt"/>
              <div class="flex-item itemdescr">
                <q-input
                  v-model="itemtodosel.pos"
                  type="number"
                  debounce="500"
                  @input="modifyfieldtodo('pos')"
                  rounded outlined
                  style="max-width: 100px;"
                  :label="$t('dashboard.posizione')">

                </q-input>
              </div>
            </div>

            <div class="flex-item itemstatus">
              <q-select style="min-width: 200px"
                        :readonly="readonly_PanelPrivacy"
                        @input="modifyfieldtodo('assigned_to_userId')"
                        rounded outlined v-model="itemtodosel.assigned_to_userId" :options="selectWorkers"
                        :label="$t('todo.assigned_to_userId')" emit-value map-options>
              </q-select>
            </div>
            <div class="flex-item itemstatus">
              <CMyFieldDb :title="$t('todo.workers')"
                          :id="itemtodosel._id"
                          :idmain="itemtodosel.category"
                          table="todos"
                          mykey="assignedToUsers"
                          @input="modifyfieldtodo('assignedToUsers')"
                          :type="tools.FieldType.multiselect"
                          jointable="workers">
              </CMyFieldDb>
            </div>

            <div class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="done_outline"/>
              <div class="flex-item itemstatus">
                <q-select rounded outlined v-model="itemtodosel.statustodo" :options="selectStatus"
                          :readonly="readonly_PanelPrivacy"
                          :label="$t('todo.status')" emit-value map-options
                          @input="modifyfieldtodo('statustodo')">

                </q-select>
              </div>
            </div>

          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="ore">
        <div v-if="(whatisSel === tools.WHAT_TODO) && (!!itemtodosel.descr)">
          <!--<CHours v-if="!!itemtodosel" :todoId="itemtodosel._id"></CHours>-->

          <div v-if="!!itemtodosel">
            <CGridTableRec prop_mytable="hours"
                           prop_mytitle="Lista Ore"
                           :prop_mycolumns="getcolHours"
                           prop_colkey="descr"
                           nodataLabel="Nessuna Lista Ore"
                           noresultLabel="Il filtro selezionato non ha trovato nessun risultato"
                           :arrfilters="myarrfilterand"
                           :filterdef="myfilterdef"
                           :prop_codeId="itemtodosel._id"
                           :defaultnewrec="getdefaultnewrec"
                           labelBtnAddRow="Aggiungi Ore"
                           :extraparams="extraparams">
            </CGridTableRec>
          </div>
        </div>
        <div v-else-if="(whatisSel === tools.WHAT_PROJECT) && (!!itemselproj.descr)">
          <!--<CHours v-if="!!itemtodosel" :todoId="itemtodosel._id"></CHours>-->

          <div v-if="!!itemselproj">
            <CGridTableRec prop_mytable="hours"
                           prop_mytitle="Lista Ore"
                           :prop_mycolumns="getcolHours"
                           prop_colkey="descr"
                           nodataLabel="Nessuna Lista Ore"
                           noresultLabel="Il filtro selezionato non ha trovato nessun risultato"
                           :arrfilters="myarrfilterand"
                           :filterdef="myfilterdef"
                           :prop_codeId="itemselproj._id"
                           :defaultnewrec="getdefaultnewrec"
                           labelBtnAddRow="Aggiungi Ore"
                           :extraparams="extraparams">

            </CGridTableRec>
          </div>
        </div>
        <div class="q-ma-lg"></div>
      </q-tab-panel>
      <q-tab-panel name="stat">
        <div v-if="(whatisSel === tools.WHAT_PROJECT) && (!!itemselproj.descr)">
          <div v-if="CanISeeProjectSel">
            <div v-if="!!itemselproj">
              <!-- itemselproj._id: {{ itemselproj._id }} -->
            </div>
            <div class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="work_outline"/>
              <div class="flex-item itemdescr">
                <q-input
                  ref="input2"
                  readonly
                  v-model="itemselproj.hoursworked"
                  type="number"
                  rounded outlined
                  :label="$t('proj.hoursworked')"
                  debounce="500"></q-input>
                <CProgress descr="Fatte" :progressval="getCalcHoursWorked"></CProgress>
              </div>
            </div>
            <div v-if="CanISeeProjectSel" class="flex-item items-center">
              <q-icon class="flex-item flex-icon" name="watch_later"/>
              <div class="flex-item itemdata content-center q-mx-sm">
                <q-input
                  ref="input3"
                  type="number"
                  readonly
                  v-model="itemselproj.hoursplanned"
                  rounded outlined
                  @input="modifyfieldproj('hoursplanned')"
                  :label="$t('proj.hoursplanned')"
                  debounce="500">

                </q-input>
                <CProgress :descr="$t('proj.progresstask')"
                           :progressval="itemselproj.progressCalc"></CProgress>
              </div>
            </div>
            <div class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="developer_mode"/>
              <div class="flex-item itemdata">
                <CDate :readonly="readonly_PanelPrivacySel" :mydate="itemselproj.begin_development"
                       @input="itemselproj.begin_development = new Date(arguments[0]); modifyfieldproj('begin_development')"
                       :label="$t('proj.begin_development')">
                </CDate>
              </div>
              <div style="margin: 10px;"></div>
              <div class="flex-item itemdata">
                <CDate :readonly="readonly_PanelPrivacySel" :mydate="itemselproj.begin_test"
                       @input="itemselproj.begin_test = new Date(arguments[0]); modifyfieldproj('begin_test')"
                       :label="$t('proj.begin_test')">
                </CDate>
              </div>
            </div>
            <div class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="outlined_flag"/>
              <div class="flex-item itemstatus">
                <q-select style="min-width: 150px" :readonly="readonly_PanelPrivacySel" rounded outlined
                          v-model="itemselproj.actualphase"
                          :options="selectPhase"
                          @input="modifyfieldproj('actualphase')"
                          :label="$t('proj.actualphase')" emit-value map-options>
                </q-select>
              </div>
              <q-icon class="flex-item flex-icon" name="outlined_flag"/>
              <div class="flex-item itemstatus">
                <q-select style="min-width: 150px"
                          :readonly="readonly_PanelPrivacySel" rounded outlined v-model="itemselproj.totalphases"
                          :options="selectPhase"
                          @input="modifyfieldproj('totalphases')"
                          :label="$t('proj.totalphases')" emit-value map-options>
                </q-select>
              </div>
            </div>

            <div class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="watch_later"/>
              <div class="flex-item itemdata content-center">
                <q-input
                  :readonly="readonly_PanelPrivacySel"
                  ref="input3"
                  type="number"
                  v-model="itemselproj.hoursweeky_plannedtowork"
                  rounded outlined
                  maxlength="2"
                  :label="$t('proj.hoursweeky_plannedtowork')"
                  debounce="500">

                </q-input>
                <CProgress :progressval="calcprogressWeekly"></CProgress>
              </div>
              <q-icon class="flex-item flex-icon" name="developer_mode"/>
              <div class="flex-item itemdata">
                <CDate color="green-2" :mydate="calcEndWork_Estimate" :readonly="true"
                       :label="$t('proj.endwork_estimate')">
                </CDate>
              </div>
            </div>
          </div>

        </div>
        <div v-else-if="(whatisSel === tools.WHAT_TODO) && (!!itemtodosel.descr)">
          <div>
            <div class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="work_outline"/>
              <div class="flex-item itemdescr">
                <q-input
                  ref="input5"
                  :readonly="true"
                  v-model="itemtodosel.hoursworked"
                  type="number"
                  rounded outlined
                  :label="$t('proj.hoursworked')"
                  debounce="500">

                </q-input>
                <CProgress descr="" :progressval="getCalcTodoHoursWorked"></CProgress>
              </div>
            </div>
            <div class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="watch_later"/>
              <div class="flex-item itemdata content-center">
                <q-input
                  ref="input6"
                  :readonly="readonly_PanelPrivacy"
                  type="number"
                  v-model="itemtodosel.hoursplanned"
                  rounded outlined
                  :label="$t('proj.hoursplanned')"
                  debounce="500">

                </q-input>

                <CProgress :descr="$t('proj.progresstask')"
                           :readonly="readonly_PanelPrivacy"
                           :progressval="itemtodosel.progress"
                           :slider="true" @input="itemtodosel.progress = arguments[0]"></CProgress>
              </div>
            </div>
            <div class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="developer_mode"/>
              <div class="flex-item itemdata">
                <CDate :mydate="itemtodosel.start_date"
                       :readonly="readonly_PanelPrivacy"
                       @input="itemtodosel.start_date = new Date(arguments[0]); modifyfieldtodo('start_date')"
                       :label="$t('todo.start_date')">

                </CDate>
              </div>
              <div style="margin: 10px;"></div>
              <q-icon class="flex-item flex-icon" name="event"/>
              <div class="flex-item itemdata">
                <CDate :readonly="((itemtodosel.statustodo !== tools.Status.COMPLETED) || readonly_PanelPrivacy)"
                       :mydate="itemtodosel.completed_at"
                       @input="itemtodosel.completed_at = new Date(arguments[0]); modifyfieldtodo('completed_at')"
                       :label="$t('todo.completed_at')">
                </CDate>
              </div>
            </div>
            <div class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="outlined_flag"/>
              <div class="flex-item itemstatus">
                <q-select rounded outlined v-model="itemtodosel.phase" :options="selectPhase"
                          :readonly="readonly_PanelPrivacy"
                          @input="modifyfieldtodo('phase')"
                          :label="$t('todo.phase')" emit-value map-options>
                </q-select>
              </div>
            </div>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>

    <q-page-sticky position="bottom-right" :offset="[9, 9]" padding="md">
      <q-btn fab icon="fas fa-list-alt" color="orange" @click="tabproj = 'lista'"
             :disable="!whatisSel && !isRootProjectAtt"/>
      <q-btn fab icon="fas fa-info" color="blue" @click="tabproj = 'info'"
             :disable="!whatisSel && !isRootProjectAtt"/>
      <q-btn fab icon="fas fa-hourglass" color="green" @click="tabproj = 'ore'"
             :disable="!whatisSel && !isRootProjectAtt"/>
      <q-btn fab icon="fas fa-chart-line" color="accent" @click="tabproj = 'stat'"
             :disable="!whatisSel && !isRootProjectAtt"/>
      <q-btn fab icon="add" color="blue" @click="tabproj = 'lista'; clickMenuProjList(200)"/>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts" src="./proj-list.ts">
</script>
<style lang="scss" scoped>
@import './proj-list';
</style>
