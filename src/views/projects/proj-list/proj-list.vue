<template>
  <q-page>
    <div class="panel">
      <q-splitter
        v-model="splitterModel"
        :horizontal="isHorizontal"
        :style="myStyle"
        :limits="[50, 100]"
      >

        <template v-slot:before>
          <div>
            <!-- idProjAtt: {{ idProjAtt }} -->
            <div class="divtitlecat clMain">
              <div class="flex-container clMain">
                <q-btn v-if="!!getIdParent && CanISeeProjectParent" size="sm" push color="secondary" round
                       icon="arrow_back"
                       :to="getrouteup">

                </q-btn>

                <div :class="classTitle">{{ descrProject | capitalize }}</div>

                <div class="flex-item">
                  <q-btn push
                         size="sm"
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
              </div>
            </div>

            <div style="display: none">{{ prior = 0, priorcomplet = false }}</div>

            <div>
              <!--<q-infinite-scroll :handler="loadMoreTodo" :offset="7">-->
              <div class="container" v-dragula="projs_dacompletare(idProjAtt, tipoProj)" drake="second">
                <div :id="tools.getmyid(myproj._id)" :index="index"
                     v-for="(myproj, index) in projs_dacompletare(idProjAtt, tipoProj)"
                     :key="myproj._id" class="myitemdrag">

                  <SingleProject ref="singleproject" @deleteItemproj="mydeleteitemproj(myproj._id)"
                                 @eventupdateproj="updateitemproj"
                                 @idsel="setidsel"
                                 @deselectAllRowsproj="deselectAllRowsproj"
                                 @deselectAllRowstodo="deselectAllRowstodo" @onEnd="onEndproj"
                                 :itemproject='myproj'>

                  </SingleProject>

                </div>
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
        </template>
        <template v-if="(whatisSel === tools.WHAT_PROJECT) && (!!itemselproj.descr)" v-slot:after>

          <q-tabs
            v-model="tabproj"
            dense
            class="bg-blue text-white shadow-2"
            indicator-color="white"
            align="center"
            narrow-indicator
          >
            <q-tab name="info" icon="fas fa-check" :label="$t('dashboard.info')"></q-tab>
            <q-tab name="stat" icon="fas fa-chart-line" :label="$t('pages.status')"></q-tab>

          </q-tabs>

          <div class="q-pa-xs clMain">

            <div class="flex-container clMain">

              <!--<q-rating-->
              <!--v-model="itemselproj.favourite"-->
              <!--class="flex-item flex-icon"-->
              <!--size="2em"-->
              <!--:max="1"-->
              <!--color="primary">-->

              <!--</q-rating>-->
              <q-icon class="flex-item flex-icon" name="format_align_center"/>
              <div :class="classTitleProjSel">
                {{ itemselproj.descr }}
              </div>

            </div>


            <q-tab-panels v-model="tabproj" animated>
              <q-tab-panel name="info">
                <div class="flex-container clMain">
                  <q-icon class="flex-item flex-icon" name="border_color"/>
                  <div class="flex-item itemdescr">
                    <q-input
                      ref="input"
                      v-model="itemselproj.longdescr"
                      :label="$t('proj.longdescr')"
                      outlined
                      debounce="1000"
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
                              :label="$t('proj.group')" emit-value map-options>
                    </q-select>
                  </div>
                </div>
                <div v-if="CanISeeProjectSel" class="flex-container clMain">
                  <q-icon class="flex-item flex-icon" name="lock"/>
                  <div class="flex-item itemstatus">
                    <q-select style="min-width: 200px"
                              :readonly="readonly_PanelPrivacySel"
                              rounded outlined v-model="itemselproj.privacyread" :options="selectPrivacy"
                              :label="$t('proj.privacyread')" emit-value map-options>
                    </q-select>
                  </div>
                </div>
                <div v-if="CanISeeProjectSel" class="flex-container clMain">
                  <q-icon class="flex-item flex-icon" name="edit"/>
                  <div class="flex-item itemstatus">
                    <q-select style="min-width: 200px" :readonly="readonly_PanelPrivacySel" rounded outlined
                              v-model="itemselproj.privacywrite" :options="selectPrivacy"
                              :label="$t('proj.privacywrite')" emit-value map-options>
                    </q-select>
                  </div>
                </div>

              </q-tab-panel>
              <q-tab-panel name="stat">
                <div v-if="CanISeeProjectSel">
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
                             @input="itemselproj.begin_development = new Date(arguments[0])"
                             :label="$t('proj.begin_development')">
                      </CDate>
                    </div>
                    <div style="margin: 10px;"></div>
                    <div class="flex-item itemdata">
                      <CDate :readonly="readonly_PanelPrivacySel" :mydate="itemselproj.begin_test"
                             @input="itemselproj.begin_test = new Date(arguments[0])"
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
                                :label="$t('proj.actualphase')" emit-value map-options>
                      </q-select>
                    </div>
                    <q-icon class="flex-item flex-icon" name="outlined_flag"/>
                    <div class="flex-item itemstatus">
                      <q-select style="min-width: 150px"
                                :readonly="readonly_PanelPrivacySel" rounded outlined v-model="itemselproj.totalphases"
                                :options="selectPhase"
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
              </q-tab-panel>
            </q-tab-panels>
          </div>

        </template>
        <template v-else-if="(whatisSel === tools.WHAT_TODO) && (!!itemtodosel.descr)" v-slot:after>
          <q-tabs
            v-model="tabproj"
            dense
            class="bg-blue text-white shadow-2"
            indicator-color="white"
            align="center"
            narrow-indicator
          >
            <q-tab name="info" icon="fas fa-check" :label="$t('dashboard.info')"></q-tab>
            <q-tab name="stat" icon="fas fa-chart-line" :label="$t('pages.status')"></q-tab>

          </q-tabs>

          <div class="q-pa-xs clMain">

            <div class="flex-container clMain">
              <q-icon class="flex-item flex-icon" name="format_align_center"/>
              <div :class="classTitleProjSel">
                {{ itemtodosel.descr }}
              </div>
            </div>

            <q-tab-panels v-model="tabproj" animated>
              <q-tab-panel name="info">
                <div class="flex-container clMain">
                  <q-icon class="flex-item flex-icon" name="border_color"/>
                  <div class="flex-item itemdescr">
                    <q-input
                      ref="input4"
                      v-model="itemtodosel.descr"
                      :class="classTitleTodoSel"
                      :label="$t('proj.longdescr')"
                      outlined
                      :readonly="readonly_PanelPrivacy"
                      debounce="1000"
                      autogrow>

                    </q-input>
                    <q-icon size="md" :name="iconPriority" color="primary"/>
                  </div>
                </div>

                <div class="flex-container clMain">
                  <q-icon class="flex-item flex-icon" name="fas fa-sort-amount-up-alt"/>
                  <div class="flex-item itemdescr">
                    <q-input
                      v-model="itemtodosel.pos"
                      type="number"
                      debounce="500"
                      rounded outlined
                      style="max-width: 100px;"
                      :label="$t('dashboard.posizione')"></q-input>
                  </div>
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
                  <q-icon class="flex-item flex-icon" name="outlined_flag"/>
                  <div class="flex-item itemstatus">
                    <q-select rounded outlined v-model="itemtodosel.phase" :options="selectPhase"
                              :readonly="readonly_PanelPrivacy"
                              :label="$t('todo.phase')" emit-value map-options>
                    </q-select>
                  </div>
                </div>
              </q-tab-panel>
              <q-tab-panel name="stat">
                <div class="flex-container clMain">
                  <q-icon class="flex-item flex-icon" name="work_outline"/>
                  <div class="flex-item itemdescr">
                    <q-input
                      ref="input5"
                      :readonly="readonly_PanelPrivacy"
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
                           @input="itemtodosel.start_date = new Date(arguments[0])"
                           :label="$t('todo.start_date')">

                    </CDate>
                  </div>
                  <div style="margin: 10px;"></div>
                  <q-icon class="flex-item flex-icon" name="event"/>
                  <div class="flex-item itemdata">
                    <CDate :readonly="((itemtodosel.statustodo !== tools.Status.COMPLETED) || readonly_PanelPrivacy)"
                           :mydate="itemtodosel.completed_at"
                           @input="itemtodosel.completed_at = new Date(arguments[0])"
                           :label="$t('todo.completed_at')">
                    </CDate>
                  </div>
                </div>

              </q-tab-panel>
            </q-tab-panels>
          </div>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script lang="ts" src="./proj-list.ts">
</script>
<style lang="scss" scoped>
@import './proj-list';
</style>
