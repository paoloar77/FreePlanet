<template>
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
                                <q-btn v-if="!!idProjParentAtt" size="sm" push color="secondary" round
                                       icon="arrow_back"
                                       :to="getrouteup"/>
                                <div class="flex-item categorytitle shadow-4">{{descrProject | capitalize}}</div>
                                <div class="flex-item">
                                    <q-btn push
                                           size="sm"
                                           icon="settings">
                                        <q-menu id="popconfig" self="top right">
                                            <q-list link separator no-border class="todo-menu">
                                                <q-item clickable v-for="field in menuPopupConfigProject"
                                                        :key="field.value">
                                                    <q-item-section avatar>
                                                        <q-icon :name="field.icon"/>
                                                    </q-item-section>

                                                    <q-item-section>{{field.label}}</q-item-section>

                                                    <q-item-section side v-if="showTask(field.value)">
                                                        <q-item-section side>
                                                            <q-icon name="keyboard_arrow_right"/>
                                                        </q-item-section>

                                                        <q-menu auto-close anchor="bottom middle" self="top middle">
                                                            <q-list dense>
                                                                <q-item side :icon="field.icon">

                                                                    <q-item-section>
                                                                        <q-list dense>
                                                                            <q-item clickable v-ripple
                                                                                    v-for="opt in listOptionShowTask"
                                                                                    :key="opt.value"
                                                                                    @click="showtype = opt.value">
                                                                                <q-item-section avatar>
                                                                                    <q-icon :name="opt.icon"
                                                                                            inverted
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
                                                    </q-item-section>
                                                </q-item>
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
                                <div :id="getmyid(myproj._id)" :index="index"
                                     v-for="(myproj, index) in items_dacompletare(idProjAtt)"
                                     :key="myproj._id" class="myitemdrag">

                                    <SingleProject ref="single" @deleteItem="mydeleteItem(myproj._id)"
                                                   @eventupdate="updateitem"
                                                   @idsel="setidsel"
                                                   @deselectAllRows="deselectAllRows" @onEnd="onEnd2"
                                                   :itemproject='myproj'/>

                                </div>
                            </div>
                            <!--</q-infinite-scroll>-->


                            <q-input ref="insertProjectBottom" v-model="projbottom"
                                     style="margin-left: 6px;"
                                     color="blue-12"
                                     :label="$t('todo.insertbottom')"
                                     :after="[{icon: 'arrow_forward', content: true, handler () {}}]"
                                     v-on:keyup.enter="dbInsert(false)"/>

                            <br>
                        </div>
                    </div>
                </template>
                <template v-if="!!itemsel.descr" v-slot:after>
                    <div class="q-pa-xs clMain">
                        <div class="flex-container clMain">
                            <q-icon class="flex-item flex-icon" name="format_align_center"/>
                            <div class="flex-item projecttitle shadow-4">
                                {{itemsel.descr}}
                            </div>
                        </div>
                        <q-separator/>
                        <div class="flex-container clMain">
                            <q-icon class="flex-item flex-icon" name="border_color"/>
                            <div class="flex-item itemdescr">
                                <q-input
                                        ref="input"
                                        v-model="itemsel.longdescr"
                                        :label="$t('proj.longdescr')"
                                        outlined
                                        debounce="500"
                                        autogrow
                                />

                            </div>
                        </div>
                        <div class="flex-container clMain">
                            <q-icon class="flex-item flex-icon" name="work_outline"/>
                            <div class="flex-item itemdescr">
                                <q-input
                                        ref="input"
                                        v-model="itemsel.hoursworked"
                                        type="number"
                                        rounded outlined
                                        :label="$t('proj.hoursworked')"
                                        debounce="500"
                                />
                                <CProgress descr="" :progressval="getCalcHoursWorked"></CProgress>

                            </div>
                            <q-icon class="flex-item flex-icon" name="watch_later"/>
                            <div class="flex-item itemdescr content-center">
                                <q-input
                                        ref="input"
                                        type="number"
                                        v-model="itemsel.hoursplanned"
                                        rounded outlined
                                        :label="$t('proj.hoursplanned')"
                                        debounce="500"
                                />
                                <CProgress :descr="$t('proj.progresstask')" :progressval="itemsel.progressCalc"></CProgress>
                            </div>
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
