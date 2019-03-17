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
                                                                <q-item clickable v-ripple v-for="opt in listOptionShowTask"
                                                                        :key="opt.value"
                                                                        @click="showtype = opt.value">
                                                                    <q-item-section avatar>
                                                                        <q-icon :name="opt.icon" inverted color="primary"/>
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

            <q-input ref="insertTask" color="blue-12" v-model="todotop" :label="$t('todo.inserttop')"
                     style="margin-left: 6px;"
                     :after="[{icon: 'arrow_forward', content: true, handler () {}}]"
                     v-on:keyup.enter="insertTodo(true)">
                <template v-slot:prepend>
                    <q-icon name="add"/>
                </template>
            </q-input>

            <div style="display: none">{{ prior = 0, priorcomplet = false }}</div>
            <div>
                <!--<q-infinite-scroll :handler="loadMoreTodo" :offset="7">-->
                <div class="container" v-dragula="todos_dacompletare(categoryAtt)" drake="first">
                    <div :id="getmyid(mytodo._id)" :index="index"
                         v-for="(mytodo, index) in todos_dacompletare(categoryAtt)"
                         :key="mytodo._id" class="myitemdrag">

                        <div v-if="(prior !== mytodo.priority) && !mytodo.completed"
                             :class="getTitlePriority(mytodo.priority)">
                            <label>{{getPriorityByInd(mytodo.priority)}}</label>
                        </div>
                        <SingleTodo ref="single" @deleteItem="mydeleteItem(mytodo._id)" @eventupdate="updateitem"
                                    @deselectAllRows="deselectAllRows" @onEnd="onEnd"
                                    :itemtodo='mytodo'/>

                        <!--<div :name="`REF${index}`" class="divdrag non-draggato"></div>-->

                        <div style="display: none">{{ prior = mytodo.priority, priorcomplet = mytodo.completed }}
                        </div>
                    </div>
                </div>
                <!--</q-infinite-scroll>-->

                <div v-if="doneTodosCount > 0" class="titleCompleted">
                    <label>{{$t('todo.completed')}}</label>
                </div>

                <!--<q-infinite-scroll :handler="loadMoreTodo" :offset="7">-->
                <div class="container">
                    <div :id="getmyid(mytodo._id)" :index="index"
                         v-for="(mytodo, index) in todos_completati(categoryAtt)"
                         :key="mytodo._id" class="myitemdrag">

                        <SingleTodo ref="single" @deleteItem="mydeleteItem(mytodo._id)" @eventupdate="updateitem"
                                    @deselectAllRows="deselectAllRows" @onEnd="onEnd"
                                    :itemtodo='mytodo'/>

                        <!--<div :name="`REF${index}`" class="divdrag non-draggato"></div>-->

                        <div style="display: none">{{ prior = mytodo.priority, priorcomplet = mytodo.completed }}
                        </div>
                    </div>
                </div>
                <!--</q-infinite-scroll>-->
            </div>


            <q-input v-if="TodosCount > 0" ref="insertTaskBottom" v-model="todobottom"
                     style="margin-left: 6px;"
                     color="blue-12"
                     :label="$t('todo.insertbottom')"
                     :after="[{icon: 'arrow_forward', content: true, handler () {}}]"
                     v-on:keyup.enter="insertTodo(false)"/>

            <br>

            <!--{{ tmpstrTodos }}-->

            <!--<div class="flex-item btn-item">-->
            <!--<q-btn class="mybtn" round color="" icon="lock" @click="getArrTodos">Get Todo</q-btn>-->
            <!--&lt;!&ndash;<q-btn class="mybtn" round color="" icon="person" @click="setArrTodos">Set Todo</q-btn>&ndash;&gt;-->
            <!--&lt;!&ndash;<q-btn class="mybtn" round color="" icon="list" @click="reload_fromServer++">Reload</q-btn>&ndash;&gt;-->
            <!--</div>-->

            <!--
            <!--&lt;!&ndash;<q-input v-model="testPao" float-label="testPao"/>&ndash;&gt;-->
            <!--<q-input v-model="todos_changed" float-label="todos_changed"/>-->

            <!--<q-input v-model="reload_fromServer" float-label="reload_fromServer"/>-->

            <!--<div class="flex-item btn-item">-->
            <!--<q-btn class="mybtn" round color="" icon="lock" @click="clicktest()"></q-btn>-->
            <!--<q-btn class="mybtn" round color="" icon="person" @click="clicktest2()"></q-btn>-->
            <!--<q-btn class="mybtn" round color="" icon="list" @click="checkUpdate()"></q-btn>-->
            <!--</div>-->
            <!--&ndash;&gt;-->

            <!--<q-btn class="mybtn" round color="" icon="lock" @click="clickaggshowtype()"></q-btn>-->


            <!--<span style="white-space: pre;">{{ todos_vista }}</span>-->
        </div>
    </q-page>


</template>
<script lang="ts" src="./todo.ts">
</script>
<style lang="scss" scoped>
    @import './todo.scss';
</style>
