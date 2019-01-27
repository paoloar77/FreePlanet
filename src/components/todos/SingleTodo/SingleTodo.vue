<template>
    <div :class="getClassRow()" @mousedown="clickRiga" @mouseup="mouseUp">
        <div class="flex-item pos-item">
            <q-btn flat
                   class="pos-item-popover"
                   icon="menu"
            >
                <q-popover
                        v-model="popover_menu"
                        self="top left">
                    <q-context-menu>
                        <q-list link separator no-border class="todo-menu">
                            <q-item v-for="field in menuPopupTodo" :key="field.value"
                                    v-close-overlay
                                    @click.native="clickMenu(field.value), popover_menu = false">
                                <q-item-side :icon="field.icon"/>
                                <q-item-main>
                                    <q-item-tile label>{{field.label}}</q-item-tile>
                                </q-item-main>
                            </q-item>
                        </q-list>
                    </q-context-menu>
                </q-popover>
            </q-btn>
        </div>
        <!--<div class="flex-item pos-item">[{{ itemtodo.pos }}]</div>-->
        <div class="flex-item priority-item">
            <q-btn push
                   class="priority-item-popover"
                   :icon="iconPriority">
                <q-popover
                        v-model="popover"
                        self="top left"

                >
                    <q-list link>
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
        <div class="flex-item completed-item">
            <q-btn push
                   :class="classCompleted"
                   :icon="iconCompleted"
                   @click.native="setCompleted">
            </q-btn>
            <!--<q-icon class=" mycols allleft icon_completed ScheduleStatus" :name="iconCompleted"
                    @click.native="setCompleted"/>-->
        </div>
        <div :class="classDescr">
            {{ itemtodo.descr }}
        </div>

        <div :class="classExpiring">
            <q-datetime
                    :class="classExpiringEx"
                    v-model="itemtodo.expiring_at"
                    class="myexpired"/>
        </div>
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
