<template>
    <q-page>
        <div class="panel">
            <p class="caption"></p>

            <div class="divtitlecat">
                <div class="categorytitle">{{ getCategory() }}</div>
            </div>


            <div style="display: none">{{ prior = 0, priorcomplet = false }}</div>
            <div class="drag">
                <draggable v-model="todos_arr" :options="{draggable:'.myitemdrag'}"
                           @start="onStart" @end="onEnd" class="dragArea">
                    <transition-group :name="mytypetransgroup">
                        <div :id="getmyid(mytodo._id)" :key="mytodo._id" v-for="mytodo in todos_arr" class="myitemdrag">

                            <div v-if="(prior !== mytodo.priority) && !mytodo.completed" :class="getTitlePriority(mytodo.priority)">
                                <label>{{getPriorityByInd(mytodo.priority)}}</label>
                            </div>
                            <div v-if="(!priorcomplet && mytodo.completed)" class="titleCompleted">
                                <label>{{$t('todo.completed')}}</label>
                                <div style="display: none">{{ priorcomplet = true }}</div>
                            </div>
                            <SingleTodo ref="single" @deleteitem="deleteitem" @eventupdate="updateitem"
                                        @deselectAllRows="deselectAllRows"
                                        :itemtodo='mytodo' />

                            <div style="display: none">{{ prior = mytodo.priority, priorcomplet = mytodo.completed }}</div>
                        </div>
                    </transition-group>
                </draggable>
            </div>
            <q-input ref="insertTask" v-model="todo" inverted :float-label="$t('todo.insert')"
                     :after="[{icon: 'arrow_forward', content: true, handler () {}}]"
                     v-on:keyup.enter="insertTodo"/>

            {{ tmpstrTodos }}

            <div class="flex-item btn-item">
                <q-btn class="mybtn" round color="" icon="lock" @click="getArrTodos">Get Todo</q-btn>
                <q-btn class="mybtn" round color="" icon="person" @click="setArrTodos">Set Todo</q-btn>
                <q-btn class="mybtn" round color="" icon="list" @click="reload_fromServer++">Reload</q-btn>
            </div>

            <!--<q-input v-model="testPao" float-label="testPao"/>-->
            <q-input v-model="todos_changed" float-label="todos_changed"/>

            <q-input v-model="reload_fromServer" float-label="reload_fromServer"/>

            <!--<div class="flex-item btn-item">-->
                <!--&lt;!&ndash;<q-btn class="mybtn" round color="" icon="lock" @click="clicktest()"></q-btn>&ndash;&gt;-->
                <!--&lt;!&ndash;<q-btn class="mybtn" round color="" icon="person" @click="clicktest2()"></q-btn>&ndash;&gt;-->
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
