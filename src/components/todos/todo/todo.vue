<template>
    <q-page>
        <div class="panel">
            <p class="caption"></p>

            <q-input v-model="todo" inverted float-label="Inserisci il Todo"
                     :after="[{icon: 'arrow_forward', content: true, handler () {}}]"
                     v-on:keyup.enter="insertTodo"/>

            <SingleTodo @event="deleteitem" @eventupdate="updateitem" :itemtodo='mytodo' v-for="mytodo of todos_arr" :key="mytodo.id">

            </SingleTodo>

        </div>
    </q-page>


</template>
<script lang="ts" src="./todo.ts">
</script>
