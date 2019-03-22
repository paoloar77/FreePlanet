<template>
    <q-page>
        <div class="panel">
            <div class="divtitlecat">
                <div class="flex-container">
                    <div class="flex-item categorytitle">{{categoryAtt | capitalize}}</div>
                    <div class="flex-item">
                        <q-btn push
                               icon="settings">
                            <q-menu id="popconfig" self="top right">
                                <q-list link separator no-border class="todo-menu">
                                    <q-item clickable v-for="field in menuPopupConfigTodo" :key="field.value">
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
                <div class="container" v-dragula="projs_dacompletare(categoryAtt)" drake="second">
                    <div :id="getmyid(myproj._id)" :index="index"
                         v-for="(myproj, index) in projs_dacompletare(categoryAtt)"
                         :key="myproj._id" class="myitemdrag">

                        <div v-if="(prior !== myproj.priority) && !myproj.completed"
                             :class="getTitlePriority(myproj.priority)">
                            <label>{{getPriorityByInd(myproj.priority)}}</label>
                        </div>
                        <SingleTodo ref="single" @deleteItem="mydeleteItem(myproj._id)" @eventupdate="updateitem"
                                    @deselectAllRows="deselectAllRows" @onEnd="onEnd"
                                    :itemtodo='myproj'/>

                        <!--<div :name="`REF${index}`" class="divdrag non-draggato"></div>-->

                        <div style="display: none">{{ prior = myproj.priority, priorcomplet = myproj.completed }}
                        </div>
                    </div>
                </div>
                <!--</q-infinite-scroll>-->


                <q-input v-if="ProjectsCount > 0" ref="insertTaskBottom" v-model="todobottom"
                         style="margin-left: 6px;"
                         color="blue-12"
                         :label="$t('todo.insertbottom')"
                         :after="[{icon: 'arrow_forward', content: true, handler () {}}]"
                         v-on:keyup.enter="insertProject(false)"/>

                <br>

            </div>
        </div>
    </q-page>


</template>
<script lang="ts" src="./proj-list.ts">
</script>
<style lang="scss" scoped>
    @import './proj-list';
</style>
