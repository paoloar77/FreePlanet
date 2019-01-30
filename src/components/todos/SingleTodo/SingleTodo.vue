<template>
    <div :class="getClassRow()">
        <q-context-menu ref="contextMenu">
            <SubMenus :menuPopupTodo="menuPopupTodo" :itemtodo="itemtodo" @clickMenu="clickMenu" @setPriority="setPriority"></SubMenus>
        </q-context-menu>

        <div v-if="isTodo()" class="flex-item pos-item" @mouseup.left="mouseUp" @mousedown="clickRiga">
            <q-btn flat
                   class="pos-item-popover"
                   icon="menu" >
                <q-popover self="top right">
                    <SubMenus :menuPopupTodo="menuPopupTodo" :itemtodo="itemtodo" @clickMenu="clickMenu" @setPriority="setPriority"></SubMenus>
                </q-popover>

            </q-btn>
        </div>

        <div v-if="isTodo()" class="flex-item completed-item">
            <q-btn push flat
                   :class="classCompleted"
                   :icon="iconCompleted"
                   @click.native="setCompleted">
            </q-btn>
        </div>

        <q-input type="textarea" ref="inputdescr" v-model="precDescr"
                 :class="classDescr" :max-height="50"
                 @keydown="keyDownArea" v-on:keydown.esc="exitEdit" @blur="exitEdit(true)" @click="editTodo()"/>

        <!--:after="[{icon: 'arrow_forward', content: true, handler () {}}]"-->

        <!--<div :class="classDescr" @mousedown.left="editTodo()">-->
        <!--<q-field>{{ itemtodo.descr }}</q-field>-->
        <!--</div>-->

        <div v-if="isTodo()" class="flex-item progress-item">
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


        <div v-if="itemtodo.enableExpiring">
            <div :class="classExpiring">
                <q-datetime
                        :class="classExpiringEx"
                        v-model="itemtodo.expiring_at"
                        class="myexpired">
                </q-datetime>
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
