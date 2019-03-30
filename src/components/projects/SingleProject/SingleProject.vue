<template>
    <div :class="getClassRow()" @click="clickProject">

        <q-btn class="flex-item donotdrag " size="sm" push color="primary" round icon="arrow_forward"
        :to="getrouteto" />

        <div class="flex-item donotdrag divdescrTot">
            <q-input v-if="(sel && inEdit)" hide-underline type="textarea" ref="inputdescr"
                     v-model.trim="precDescr"
                     autogrow
                     borderless
                     dense
                     :class="classDescrEdit" :max-height="100"
                     @keydown="keyDownArea" v-on:keydown.esc="exitEdit" @blur="exitEdit(true)" @click="editProject()"/>

            <div v-else :class="classDescr"
                 @keydown="keyDownRow">{{itemproject.descr}}
            </div>

        </div>

        <div v-if="isProject()" class="flex-item progress-item shadow-1">
            <q-linear-progress
                    stripe
                    rounded
                    :value="percentageProgress / 100"
                    class="progrbar-item"
                    :color="colProgress"
            >
            </q-linear-progress>
            <div :class="percProgress">
                {{percentageProgress}}%
            </div>
        </div>


        <div v-if="itemproject.enableExpiring" :class="classExpiring">
            <span class="data_string">{{getstrDate(itemproject.expiring_at)}}</span>
            <q-icon name="event" class="cursor-pointer" style="padding: 2px;">
                <q-popup-proxy>
                    <q-date v-model="itemproject.expiring_at" today-btn/>
                </q-popup-proxy>
            </q-icon>
            <!--<q-icon name="event" class="cursor-pointer" />-->
            <!--<q-popup-edit v-model="itemproject.expiring_at"-->
            <!--title="Edit"-->
            <!--buttons class="">-->
            <!--<q-input-->
            <!--filled-->
            <!--v-model="itemproject.expiring_at"-->
            <!--type="date"-->
            <!--class="myexpired"-->
            <!--format="DD/MM/YYYY"-->
            <!--&gt;-->
            <!--</q-input>-->
            <!--</q-popup-edit>-->
        </div>
        <div v-if="isProject()" class="flex-item pos-item " @mousedown="clickRiga">
            <q-btn flat
                   :class="clButtPopover"
                   icon="menu">
                <q-menu ref="popmenu" self="top right">
                    <SubMenusProj :menuPopupProj="menuPopupProj" :itemproject="itemproject" @clickMenu="clickMenu"
                              @setPriority="setPriority"></SubMenusProj>
                </q-menu>

            </q-btn>
        </div>
        <!--clButtPopover: {{ clButtPopover }}-->
        <!--Sel: {{ sel }}-->
        <!--<div class="flex-item btn-item">-->
        <!--{{itemproject.expiring_at}}-->
        <!--</div>-->
        <!--<div class="flex-item btn-item">-->
        <!--<q-btn class="mybtn" round color="" icon="delete" @click.native="removeitem(itemproject._id)"></q-btn>-->
        <!--</div>-->
    </div>

</template>

<script lang="ts" src="./SingleProject.ts">
</script>

<style lang="scss" scoped>
    @import './SingleProject.scss';
</style>
