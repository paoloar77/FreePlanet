<template>
    <q-page>
        <div class="panel">
            <p class="caption"></p>

            <q-input v-model="todo" inverted float-label="Inserisci il Todo"
                     :after="[{icon: 'arrow_forward', content: true, handler () {}}]"
                     v-on:keyup.enter="insertTodo"/>


            <div class="flex-container">
                <draggable v-model="todos_arr" :options="{draggable:'.myitemdrag'}" @start="onStart" @end="onEnd">
                    <transition-group>
                        <SingleTodo @event="deleteitem" @eventupdate="updateitem" :itemtodo='mytodo'
                                    v-for="mytodo of todos_arr" :key="mytodo.id" class="myitemdrag">
                        </SingleTodo>
                    </transition-group>
                </draggable>
            </div>

            <!--<div v-for="element in todos_arr" :key="element.id">{{element.descr}}</div>-->

        </div>
    </q-page>


</template>
<script lang="ts" src="./todo.ts">
</script>
<style lang="scss" scoped>
    @import './todo.scss';
</style>
