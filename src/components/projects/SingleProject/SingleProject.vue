<template>
    <div :class="getClassRow()" @click="clickProject" >

        <q-btn class="flex-item donotdrag " size="sm" push color="primary" round icon="arrow_forward"
        :to="getrouteto"/>

        <div class="flex-item donotdrag divdescrTot">
            <q-input v-if="(sel && inEdit)" hide-underline type="textarea" ref="inputdescr"
                     v-model.trim="precDescr"
                     autogrow
                     borderless
                     :label="getlabeltext"
                     dense
                     @focus="getFocus($event)"
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
            <CDate :mydate="itemproject.expiring_at" @input="itemproject.expiring_at = new Date(arguments[0])"
                   data_class="data_string">
            </CDate>
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

    </div>
</template>

<script lang="ts" src="./SingleProject.ts">
</script>

<style lang="scss" scoped>
    @import './SingleProject.scss';
</style>
