<template>
    <div :class="getClassRow()">
        <q-context-menu ref="popover">
            <q-list link separator no-border class="todo-menu">
                <div v-for="field in menuPopupTodo" :key="field.value">
                    <q-item v-if="(field.value !== 130)" :icon="field.icon"
                            @click.native="clickMenu(field.value)">
                        <q-item-side :icon="field.icon"/>

                        <q-item-main v-if="field.value !== 120">
                            <q-item-tile label class="item-menu">{{field.label}}</q-item-tile>
                        </q-item-main>

                        <q-item-side v-if="field.value === 101">
                            <q-checkbox v-model="itemtodo.enableExpiring"/>
                        </q-item-side>
                        <q-item-side v-if="field.value === 110">
                            <q-checkbox v-model="itemtodo.completed"/>
                        </q-item-side>

                        <q-item-main v-if="field.value === 120">
                            <q-slider :class="menuProgress" v-model="itemtodo.progress" :min="0" :max="100"/>
                        </q-item-main>
                        <q-item-side v-if="field.value === 120">
                            <div :class="percProgress">
                                {{getPercentageProgress()}}%
                            </div>
                        </q-item-side>

                    </q-item>
                    <q-item v-else :icon="field.icon"
                            @click.native="clickMenu(field.value)">

                        <q-item-side :icon="iconPriority"/>

                        <q-item-main>
                            <q-btn-dropdown ref="dropdown_priority" flat :label="field.label"
                            >
                                <q-list link>
                                    <q-item v-close-overlay v-for="field in selectPriority" :key="field.value"
                                            @click.native="setPriority(field.value)">
                                        <q-item-side :icon="field.icon" inverted color="primary"/>
                                        <q-item-main>
                                            <q-item-tile label>{{field.label}}</q-item-tile>
                                        </q-item-main>
                                    </q-item>
                                </q-list>
                            </q-btn-dropdown>
                        </q-item-main>

                    </q-item>
                </div>
            </q-list>
        </q-context-menu>

        <div v-if="isTodo()" class="flex-item pos-item" @mouseup.left="mouseUp" @mousedown="clickRiga">
            <q-btn flat
                   class="pos-item-popover"
                   icon="menu"
                   @click.native="$refs.popover.$refs.popup.show()"

            >

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

        <q-input type="textarea" ref="inputdescr" v-model="precDescr"
                 :class="classDescr" :max-height="50"
                 @keydown="keyDownArea" v-on:keydown.esc="exitEdit" @blur="exitEdit(true)" @click="editTodo()"/>

        <!--:after="[{icon: 'arrow_forward', content: true, handler () {}}]"-->

        <!--<div :class="classDescr" @mousedown.left="editTodo()">-->
        <!--<q-field>{{ itemtodo.descr }}</q-field>-->
        <!--</div>-->

        <div v-if="isTodo()" class="flex-item progress-item">
            <q-progress
                    :percentage="getPercentageProgress()"
                    class="progress-item"
                    :color="colProgress"
            >
            </q-progress>
            <div :class="percProgress">
                {{getPercentageProgress()}}%
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
