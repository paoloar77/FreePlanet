<template>
    <div :class="getClassRow()" @click="clickRow">
        <div v-if="isTodo()" class="flex-item completed-item donotdrag">
            <q-btn push flat
                   :class="classCompleted"
                   :icon="iconCompleted"
                   :readonly="!CanIModifyTodo"
                   :disable="!CanIModifyTodo"
                   @click="setCompleted">
            </q-btn>
        </div>

        <div class="flex-item donotdrag divdescrTot">
            <q-input v-if="sel && itemtodo.statustodo !== tools.Status.COMPLETED" hide-underline type="textarea" ref="inputdescr"
                     v-model.trim="precDescr"
                     autogrow
                     borderless
                     :readonly="!CanIModifyTodo"
                     dense
                     :class="classDescrEdit" :max-height="100"
                     @keydown="keyDownArea" v-on:keydown.esc="exitEdit" @blur="exitEdit(true)" @click="editTodo()"></q-input>

            <div v-else :class="classDescr"
                 @keydown="keyDownRow">{{itemtodo.descr}}
            </div>

        </div>

        <!--<q-field dark v-else :label="itemtodo.descr"-->
        <!--:class="classDescr"-->
        <!--@keydown="keyDownRow"></q-field>-->

        <!--:after="[{icon: 'arrow_forward', content: true, handler () {}}]"-->

        <!--<div :class="classDescr" @mousedown.left="editTodo()">-->
        <!--<q-field>{{ itemtodo.descr }}</q-field>-->
        <!--</div>-->

        <div v-if="isTodo() && (itemtodo.progress > 0) " class="flex-item progress-item shadow-1">
            <q-linear-progress
                    stripe
                    rounded
                    :readonly="!CanIModifyTodo"
                    :value="percentageProgress / 100"
                    class="progrbar-item"
                    :color="colProgress"
            >
            </q-linear-progress>
            <div :class="percProgress">
                {{percentageProgress}}%
                <q-popup-edit v-if="CanIModifyTodo" v-model="percentageProgress" title="Progress" buttons class="editProgress"
                              @change="val => { model = val }"
                              :readonly="!CanIModifyTodo"
                              @save="aggiornaProgress"
                >
                    <q-input dense autofocus type="number" v-model="percentageProgress" :max="100" :min="0"/>
                </q-popup-edit>

            </div>
        </div>


        <div v-if="itemtodo.enableExpiring" :class="classExpiring">
            <CDate :mydate="itemtodo.expiring_at" @input="itemtodo.expiring_at = new Date(arguments[0])"
                   data_class="data_string" :readonly="!CanIModifyTodo">
            </CDate>
        </div>
        <div v-if="isTodo()" :class="classMenuBtn" @mousedown="clickRiga">
            <q-btn flat
                   :class="clButtPopover"
                   :readonly="!CanIModifyTodo"
                   icon="menu">
                <q-menu v-if="CanIModifyTodo" ref="popmenu" self="top right">
                    <SubMenus :menuPopupTodo="menuPopupTodo" :itemtodo="itemtodo" @clickMenu="clickMenu"
                              @setPriority="setPriority"></SubMenus>
                </q-menu>

            </q-btn>
        </div>
    </div>

</template>

<script lang="ts" src="./SingleTodo.ts">
</script>

<style lang="scss" scoped>
    @import './SingleTodo.scss';
</style>
