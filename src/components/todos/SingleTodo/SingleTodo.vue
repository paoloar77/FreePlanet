<template>
    <div :class="getClassRow()" @click="clickRow">
        <!--<div v-if="isTodo()" class="flex-item counter-item">{{itemtodo.counter}}</div>-->
        <!--<div v-if="isFirst">-->
            <!--<q-context-menu ref="contextMenu">-->
                <!--<SubMenus :menuPopupTodo="menuPopupTodo" :itemtodo="itemtodo" @clickMenu="clickMenu" @setPriority="setPriority"></SubMenus>-->
            <!--</q-context-menu>-->
        <!--</div>-->

        <div v-if="isTodo()" class="flex-item completed-item">
            <q-btn push flat
                   :class="classCompleted"
                   :icon="iconCompleted"
                   @click.native="setCompleted">
            </q-btn>
        </div>

        <q-input v-if="sel && !itemtodo.completed" hide-underline type="textarea" ref="inputdescr" v-model.trim="precDescr"
                 :class="classDescrEdit" :max-height="50"
                 @keydown="keyDownArea" v-on:keydown.esc="exitEdit" @blur="exitEdit(true)" @click="editTodo()"/>

        <div v-else :class="classDescr"
             @keydown="keyDownRow">{{itemtodo.descr}}</div>

        <!--<q-field dark v-else :label="itemtodo.descr"-->
                 <!--:class="classDescr"-->
                 <!--@keydown="keyDownRow"></q-field>-->

        <!--:after="[{icon: 'arrow_forward', content: true, handler () {}}]"-->

        <!--<div :class="classDescr" @mousedown.left="editTodo()">-->
        <!--<q-field>{{ itemtodo.descr }}</q-field>-->
        <!--</div>-->

        <div v-if="isTodo() && (percentageProgress > 0) " class="flex-item progress-item">
            <q-progress
                    :percentage="percentageProgress"
                    class="progress-item"
                    :color="colProgress"
            >
            </q-progress>
            <div :class="percProgress">
                {{percentageProgress}}%
            </div>
        </div>


        <div v-if="itemtodo.enableExpiring" class="flex-item">
            <div :class="classExpiring">
                <q-datetime
                        type="date"
                        :class="classExpiringEx"
                        v-model="itemtodo.expiring_at"
                        class="myexpired"
                        format="DD/MM/YY"
                        @change="val => { model = val }" >

                </q-datetime>
            </div>
        </div>
        <div v-if="isTodo()" class="flex-item pos-item" @mouseup.left="mouseUp" @mousedown="clickRiga">
            <q-btn push
                   :class="clButtPopover"
                   icon="menu" >
                <q-popover v-if="sel" self="top right">
                    <SubMenus :menuPopupTodo="menuPopupTodo" :itemtodo="itemtodo" @clickMenu="clickMenu" @setPriority="setPriority"></SubMenus>
                </q-popover>

            </q-btn>
        </div>
        <!--clButtPopover: {{ clButtPopover }}-->
        <!--Sel: {{ sel }}-->
        <!--<div class="flex-item btn-item">-->
        <!--{{itemtodo.expiring_at}}-->
        <!--</div>-->
        <!--<div class="flex-item btn-item">-->
        <!--<q-btn class="mybtn" round color="" icon="delete" @click.native="removeitem(itemtodo._id)"></q-btn>-->
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
