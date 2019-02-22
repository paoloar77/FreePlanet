<template>
    <q-page>
        <div class="panel">
            <p class="caption"></p>

            <div class="divtitlecat">
                <div class="categorytitle">{{ getCategory() }}</div>
            </div>

            <q-input ref="insertTask" v-model="todotop" inverted :float-label="$t('todo.inserttop')"
                     :after="[{icon: 'arrow_forward', content: true, handler () {}}]"
                     v-on:keyup.enter="insertTodo(true)"/>

            <div style="display: none">{{ prior = 0, priorcomplet = false }}</div>
            <div>
                <!--<draggable v-model="todos_arr" :options="{draggable:'.myitemdrag'}"-->
                <!--@start="onStart" @end="onEnd" class="dragArea">-->
                <!--<transition-group :name="mytypetransgroup">-->
                <!--<div :id="getmyid(mytodo._id)" v-for="(mytodo, index) in todos_arr" :key="mytodo._id"  class="myitemdrag"-->
                <!--draggable="true" @dragstart="dragStart(index, $event)" @dragover.prevent @dragenter="dragEnter(index)"-->
                <!--@dragleave="dragLeave(index)" @dragend="dragEnd" @drop="dragFinish(index, $event)" >-->
                <q-infinite-scroll :handler="loadMoreTodo" :offset="7">
                    <div class="container" v-dragula="todos_arr" drake="first" :key="compKey3">
                        <div :id="getmyid(mytodo._id)" :index="index" v-for="(mytodo, index) in showingDataTodo"
                             :key="mytodo._id" class="myitemdrag">


                            <div v-if="(prior !== mytodo.priority) && !mytodo.completed"
                                 :class="getTitlePriority(mytodo.priority)" :key="compKey1">
                                <label>{{getPriorityByInd(mytodo.priority)}}</label>
                            </div>
                            <div v-if="(!priorcomplet && mytodo.completed)" class="titleCompleted" :key="compKey2">
                                <label>{{$t('todo.completed')}}</label>
                                <div style="display: none">{{ priorcomplet = true }}</div>
                            </div>
                            <SingleTodo ref="single" @deleteitem="deleteitem" @eventupdate="updateitem"
                                        @deselectAllRows="deselectAllRows" @onEnd="onEnd"
                                        :itemtodo='mytodo'/>

                            <!--<div :name="`REF${index}`" class="divdrag non-draggato"></div>-->

                            <div style="display: none">{{ prior = mytodo.priority, priorcomplet = mytodo.completed }}
                            </div>
                        </div>
                    </div>
                </q-infinite-scroll>
                <!--</transition-group>-->
                <!--</draggable>-->
            </div>


            <q-input v-if="todos_arr.length > 0" ref="insertTaskBottom" v-model="todobottom" inverted :float-label="$t('todo.insertbottom')"
                     :after="[{icon: 'arrow_forward', content: true, handler () {}}]"
                     v-on:keyup.enter="insertTodo(false)"/>

            <!--{{ tmpstrTodos }}-->
            <!--<br>-->

            <!--&lt;!&ndash;<div class="flex-item btn-item">&ndash;&gt;-->
            <!--<q-btn class="mybtn" round color="" icon="lock" @click="getArrTodos">Get Todo</q-btn>-->
            <!--<q-btn class="mybtn" round color="" icon="person" @click="setArrTodos">Set Todo</q-btn>-->
            <!--<q-btn class="mybtn" round color="" icon="list" @click="reload_fromServer++">Reload</q-btn>-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->

            <!--&lt;!&ndash;<q-input v-model="testPao" float-label="testPao"/>&ndash;&gt;-->
            <!--<q-input v-model="todos_changed" float-label="todos_changed"/>-->

            <!--<q-input v-model="reload_fromServer" float-label="reload_fromServer"/>-->

            <!--<div class="flex-item btn-item">-->
            <!--<q-btn class="mybtn" round color="" icon="lock" @click="clicktest()"></q-btn>-->
            <!--<q-btn class="mybtn" round color="" icon="person" @click="clicktest2()"></q-btn>-->
            <!--<q-btn class="mybtn" round color="" icon="list" @click="checkUpdate()"></q-btn>-->
            <!--</div>-->

        </div>
    </q-page>


</template>
<script lang="ts" src="./todo.ts">
</script>
<style lang="scss" scoped>
    @import './todo.scss';
</style>
