<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <q-page>
        <div class="panel">

            <q-splitter
                    v-model="splitterModel"
                    :limits="[50, 100]"
            >

                <template v-slot:before class="clMain">
                    <div>
                        <div class="divtitlecat clMain">
                            <div class="flex-container clMain">
                                <q-btn v-if="!!getidProjParentAtt" size="sm" push color="secondary" round
                                       icon="arrow_back"
                                       :to="getrouteup">

                                </q-btn>
                                <div class="flex-item categorytitle shadow-4">{{descrProject | capitalize}}</div>
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

                                                        <q-item-section>{{field.label}}</q-item-section>
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
                                                                                    {{opt.label}}
                                                                                </q-item-section>
                                                                            </q-item>
                                                                        </q-list>
                                                                    </q-item-section>
                                                                </q-item>
                                                            </q-list>
                                                        </q-menu>
                                                    </q-item>
                                                    <q-item v-else v-close-popup clickable :icon="field.icon"
                                                            @click="clickMenuProjList(field.value)">

                                                        <q-item-section avatar>
                                                            <q-icon :name="field.icon"/>
                                                        </q-item-section>

                                                        <q-item-section>{{field.label}}</q-item-section>
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
                            <div class="container" v-dragula="items_dacompletare(idProjAtt)" drake="second">
                                <div :id="tools.getmyid(myproj._id)" :index="index"
                                     v-for="(myproj, index) in items_dacompletare(idProjAtt)"
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

                        <CTodo ref="ctodo" @setitemsel="setitemsel" :categoryAtt="idProjAtt" title="" backcolor="white"
                               forecolor="black" :viewtaskTop="false" @deselectAllRowsproj="deselectAllRowsproj"
                               @deselectAllRowstodo="deselectAllRowstodo"
                        >
                        </CTodo>

                    </div>
                </template>
                <template v-if="(whatisSel === tools.WHAT_PROJECT) && (!!itemselproj.descr)" v-slot:after>
                    <div class="q-pa-xs clMain">
                        <div class="flex-container clMain">
                            <q-icon class="flex-item flex-icon" name="format_align_center"/>
                            <div class="flex-item projecttitle shadow-4">
                                {{itemselproj.descr}}
                            </div>
                        </div>
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
                                />

                            </div>
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
                                <CProgress descr="" :progressval="getCalcHoursWorked"></CProgress>
                            </div>
                            <q-icon class="flex-item flex-icon" name="watch_later"/>
                            <div class="flex-item itemdata content-center">
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
                                <CDate :mydate="itemselproj.begin_development"
                                       @input="itemselproj.begin_development = new Date(arguments[0])"
                                       :label="$t('proj.begin_development')">
                                </CDate>
                            </div>
                            <div style="margin: 10px;"></div>
                            <div class="flex-item itemdata">
                                <CDate :mydate="itemselproj.begin_test" @input="itemselproj.begin_test = new Date(arguments[0])"
                                       :label="$t('proj.begin_test')">
                                </CDate>
                            </div>
                        </div>
                        <div class="flex-container clMain">
                            <q-icon class="flex-item flex-icon" name="outlined_flag"/>
                            <div class="flex-item itemstatus">
                                <q-select rounded outlined v-model="itemselproj.actualphase" :options="selectPhase"
                                          :label="$t('proj.actualphase')" emit-value map-options>
                                </q-select>
                            </div>
                            <q-icon class="flex-item flex-icon" name="outlined_flag"/>
                            <div class="flex-item itemstatus">
                                <q-select rounded outlined v-model="itemselproj.totalphases" :options="selectPhase"
                                          :label="$t('proj.totalphases')" emit-value map-options>
                                </q-select>
                            </div>
                        </div>

                        <div class="flex-container clMain">
                            <q-icon class="flex-item flex-icon" name="watch_later"/>
                            <div class="flex-item itemdata content-center">
                                <q-input
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

                </template>
                <template v-else-if="(whatisSel === tools.WHAT_TODO) && (!!itemtodosel.descr)" v-slot:after>
                    <div class="q-pa-xs clMain">
                        <div class="flex-container clMain">
                            <q-icon class="flex-item flex-icon" name="border_color"/>
                            <div class="flex-item itemdescr">
                                <q-input
                                        ref="input4"
                                        v-model="itemtodosel.descr"
                                        :label="$t('proj.longdescr')"
                                        outlined
                                        debounce="1000"
                                        autogrow>

                                </q-input>
                            </div>
                        </div>
                    </div>
                    <div class="flex-container clMain">
                        <q-icon class="flex-item flex-icon" name="done_outline"/>
                        <div class="flex-item itemstatus">
                            <q-select rounded outlined v-model="itemtodosel.statustodo" :options="selectStatus"
                                      :label="$t('todo.status')" emit-value map-options
                                      @input="modifyfieldtodo('statustodo')">
                            </q-select>
                        </div>
                        <q-icon class="flex-item flex-icon" name="outlined_flag"/>
                        <div class="flex-item itemstatus">
                            <q-select rounded outlined v-model="itemtodosel.phase" :options="selectPhase"
                                      :label="$t('todo.phase')" emit-value map-options>
                            </q-select>
                        </div>
                    </div>
                    <div class="flex-container clMain">
                        <q-icon class="flex-item flex-icon" name="work_outline"/>
                        <div class="flex-item itemdescr">
                            <q-input
                                    ref="input5"
                                    v-model="itemtodosel.hoursworked"
                                    type="number"
                                    rounded outlined
                                    :label="$t('proj.hoursworked')"
                                    debounce="500">

                            </q-input>
                            <CProgress descr="" :progressval="getCalcTodoHoursWorked"></CProgress>
                        </div>
                        <q-icon class="flex-item flex-icon" name="watch_later"/>
                        <div class="flex-item itemdata content-center">
                            <q-input
                                    ref="input6"
                                    type="number"
                                    v-model="itemtodosel.hoursplanned"
                                    rounded outlined
                                    :label="$t('proj.hoursplanned')"
                                    debounce="500">

                            </q-input>

                            <CProgress :descr="$t('proj.progresstask')"
                                       :progressval="itemtodosel.progress"
                                       :slider="true" @input="itemtodosel.progress = arguments[0]"></CProgress>
                        </div>
                    </div>
                    <div class="flex-container clMain">
                        <q-icon class="flex-item flex-icon" name="developer_mode"/>
                        <div class="flex-item itemdata">
                            <CDate :mydate="itemtodosel.start_date"
                                   @input="itemtodosel.start_date = new Date(arguments[0])"
                                   :label="$t('todo.start_date')">

                            </CDate>
                        </div>
                        <div style="margin: 10px;"></div>
                        <q-icon class="flex-item flex-icon" name="event"/>
                        <div class="flex-item itemdata">
                            <CDate :readonly="itemtodosel.statustodo !== tools.Status.COMPLETED"
                                   :mydate="itemtodosel.completed_at"
                                   @input="itemtodosel.completed_at = new Date(arguments[0])"
                                   :label="$t('todo.completed_at')">
                            </CDate>
                        </div>
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
