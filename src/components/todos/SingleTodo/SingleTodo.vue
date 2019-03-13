<template>
    <div :class="getClassRow()" @click="clickRow">
        <!--<div v-if="isTodo()" class="flex-item counter-item dragula-container">{{itemtodo.pos}}</div>-->
        <!--<div v-if="isFirst">-->
        <!--<q-context-menu ref="contextMenu">-->
        <!--<SubMenus :menuPopupTodo="menuPopupTodo" :itemtodo="itemtodo" @clickMenu="clickMenu" @setPriority="setPriority"></SubMenus>-->
        <!--</q-context-menu>-->
        <!--</div>-->

        <div v-if="isTodo()" class="flex-item completed-item donotdrag">
            <q-btn push flat
                   :class="classCompleted"
                   :icon="iconCompleted"
                   @click.native="setCompleted">
            </q-btn>
        </div>

        <div class="flex-item donotdrag divdescrTot">
            <q-input v-if="sel && !itemtodo.completed" hide-underline type="textarea" ref="inputdescr"
                     v-model.trim="precDescr"
                     autogrow
                     dense
                     :class="classDescrEdit" :max-height="100"
                     @keydown="keyDownArea" v-on:keydown.esc="exitEdit" @blur="exitEdit(true)" @click="editTodo()"/>

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
                    :percentage="percentageProgress"
                    class="progrbar-item"
                    :color="colProgress"
            >
            </q-linear-progress>
            <div :class="percProgress">
                {{percentageProgress}}%
                <q-popup-edit v-model="percentageProgress" title="Progress" buttons class="editProgress"
                              @change="val => { model = val }"
                              @save="aggiornaProgress"
                >
                    <q-input dense autofocus type="number" v-model="percentageProgress" :max="100" :min="0"/>
                </q-popup-edit>

            </div>
        </div>


        <div v-if="itemtodo.enableExpiring" :class="classExpiring">
            {{getstrDate(itemtodo.expiring_at)}}
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy>
                    <q-date v-model="itemtodo.expiring_at" today-btn/>
                </q-popup-proxy>
            </q-icon>
            <!--<q-icon name="event" class="cursor-pointer" />-->
            <!--<q-popup-edit v-model="itemtodo.expiring_at"-->
            <!--title="Edit"-->
            <!--buttons class="">-->
            <!--<q-input-->
            <!--filled-->
            <!--v-model="itemtodo.expiring_at"-->
            <!--type="date"-->
            <!--class="myexpired"-->
            <!--format="DD/MM/YYYY"-->
            <!--&gt;-->
            <!--</q-input>-->
            <!--</q-popup-edit>-->
        </div>
        <div v-if="isTodo()" class="flex-item pos-item " @mousedown="clickRiga">
            <q-btn push
                   :class="clButtPopover"
                   icon="menu">
                <q-menu id="popmenu" v-if="true" self="top right">
                    <SubMenus :menuPopupTodo="menuPopupTodo" :itemtodo="itemtodo" @clickMenu="clickMenu"
                              @setPriority="setPriority"></SubMenus>
                </q-menu>

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
    </div>

</template>

<script lang="ts" src="./SingleTodo.ts">
</script>

<style lang="scss" scoped>
    @import './SingleTodo.scss';
</style>
