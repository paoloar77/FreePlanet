<template>
    <div :class="getClassRow()" @mouseup.left="mouseUp" @mousedown="clickRiga">
        <q-context-menu>
            <q-list link separator no-border class="todo-menu">
                <q-item v-for="field in menuPopupTodo" :key="field.value"
                        v-close-overlay
                        @click.native="clickMenu(field.value), popover_menu = false">
                    <q-item-side :icon="field.icon"/>
                    <q-item-main>
                        <q-item-tile label>{{field.label}}</q-item-tile>
                    </q-item-main>

                    <q-item-side v-if="field.value === 101">
                        <q-checkbox v-model="itemtodo.enableExpiring"/>
                    </q-item-side>
                </q-item>
            </q-list>
        </q-context-menu>
        <div v-if="isTodo()" class="flex-item pos-item" >
            <q-btn flat
                   class="pos-item-popover"
                   icon="menu">

                <q-popover
                        v-model="popover_menu"
                        self="top left">
                    <q-list link separator no-border class="todo-menu">
                        <q-item v-for="field in menuPopupTodo" :key="field.value"
                                v-close-overlay
                                @click.native="clickMenu(field.value), popover_menu = false">
                            <q-item-side :icon="field.icon"/>
                            <q-item-main>
                                <q-item-tile label>{{field.label}}</q-item-tile>
                            </q-item-main>
                            <q-item-side v-if="field.value === 101">
                                <q-checkbox v-model="itemtodo.enableExpiring"/>
                            </q-item-side>
                        </q-item>
                    </q-list>
                </q-popover>
            </q-btn>
        </div>
        <!--<div class="flex-item pos-item">[{{ itemtodo.pos }}]</div>-->
        <div v-if="isTodo()" class="flex-item priority-item">
            <q-btn push flat
                   class="priority-item-popover"
                   :icon="iconPriority">
                <q-popover
                        v-model="popover"
                        self="top left"

                >
                    <q-list link>
                        <q-item-tile label inverted class="menuTitlePriority">{{$t('todo.titleprioritymenu')}}
                        </q-item-tile>
                        <q-item v-for="field in selectPriority" :key="field.value"
                                @click.native="setPriority(field.value), popover = false">
                            <q-item-side :icon="field.icon" inverted color="primary"/>
                            <q-item-main>
                                <q-item-tile label>{{field.label}}</q-item-tile>
                            </q-item-main>
                        </q-item>
                    </q-list>
                </q-popover>
            </q-btn>
        </div>
        <div v-if="isTodo()" class="flex-item completed-item">
            <q-btn push flat
                   :class="classCompleted"
                   :icon="iconCompleted"
                   @click.native="setCompleted">
            </q-btn>
            <!--<q-icon class=" mycols allleft icon_completed ScheduleStatus" :name="iconCompleted"
                    @click.native="setCompleted"/>-->
        </div>

        <q-input autofocus ref="inputdescr" :value="descrtoEdit" @change="val => descrtoEdit = val"
                 :class="classDescrEdit"
                 v-on:keyup.enter="updateTodo" v-on:keydown.esc="exitEdit"/>


        <div :class="classDescr" @click="editTodo()">
            {{ itemtodo.descr }}
        </div>


        <div v-if="itemtodo.enableExpiring">
            <div :class="classExpiring">
                <q-datetime
                        :class="classExpiringEx"
                        v-model="itemtodo.expiring_at"
                        class="myexpired"/>
            </div>
        </div>
        <!--<div class="flex-item btn-item">-->
        <!--{{classPosItemPopup}}-->
        <!--</div>-->
        <!--<div class="flex-item btn-item">-->
        <!--<q-btn class="mybtn" round color="" icon="delete" @click.native="removeitem(itemtodo.id)"></q-btn>-->
        <!--</div>-->
        <!--<div class="flex-item">-->
        <!--[{{ itemtodo.id_prev}} - {{ itemtodo.id_next}}]-->
        <!--</div>-->
    </div>

</template>

<script lang="ts" src="./SingleTodo.ts">
</script>

<style lang="scss" scoped>
    @import './SingleTodo.scss';
</style>
