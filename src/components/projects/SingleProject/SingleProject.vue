<template>
  <q-item @click="clickProject" clickable>


    <q-item-section avatar>
      <q-btn
        v-if="isProject()"
        :class="(itemproject.respUsername !== '' && itemproject.viceRespUsername !== '') ? 'clresp' : 'clrespempty' + ' clButtPopover pos-item'"
        :readonly="!CanIModifyProject"
        size="sm"
        dense
        flat
        @mousedown="clickRiga"
        :disable="!CanIModifyProject"
        icon="menu">
        <q-menu ref="popmenu" self="top right">
          <SubMenusProj :menuPopupProj="menuPopupProj" :itemproject="itemproject" @clickMenu="clickMenu"
                        @selectSubMenu="selectSubMenu"></SubMenusProj>
        </q-menu>
      </q-btn>
    </q-item-section>
    <q-item-section>

      <div :class="getClassRow()">
        <!--<div :class="(itemproject.respUsername !== '' && itemproject.viceRespUsername !== '') ? 'clresp' : 'clrespempty' + ' pos-group flex-item'">
          <q-icon class="" name="fas fa-user-friends"></q-icon>
        </div>-->
        <!--<div class="q-mx-xs"></div>-->

        <q-item-label>
          <div class="flex-item donotdrag">
            <q-input v-if="(sel && inEdit)" hide-underline type="textarea" ref="inputprojdescr"
                     v-model.trim="precDescr"
                     autogrow
                     borderless
                     :label="getlabeltext"
                     dense
                     @focus="getFocus($event)"
                     :class="classDescrEdit" :max-height="100"
                     @keydown="keyDownArea" v-on:keydown.esc="exitEdit" @blur="exitEdit(true)" @click="editProject()">
            </q-input>

            <div v-else :class="classDescr"
                 @keydown="keyDownRow">

              <!--<div class="clpos">{{ itemproject.pos }}.</div> -->
              {{ itemproject.descr }}
            </div>
          </div>
        </q-item-label>

        <q-item-label v-if="getTipovisuByProjParent === TipoVisu.responsabili" caption lines="2">
          <span v-if="getResp()">Responsabile: <span class="clResp">{{ getResp() }}</span><br></span>
          <span v-if="getViceResp()">ViceResponsabile: <span class="clViceResp">{{ getViceResp() }}</span></span>
        </q-item-label>

        <!--<div>
          {{ tools.getGroupById(itemproject.groupId) }}
        </div>-->


        <div v-if="itemproject.enableExpiring" :class="classExpiring">
          <CDate :mydate="itemproject.expiring_at" @input="itemproject.expiring_at = new Date(arguments[0])"
                 data_class="data_string">
          </CDate>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <q-item-label caption>
        <div v-if="isProject() && itemproject.tipovisu === TipoVisu.taskProgress && percentageProgress > 0"
             class="donotdrag progress-item shadow-1">
          <q-linear-progress
            stripe
            rounded
            :value="percentageProgress / 100"
            class="progrbar-item"
            :color="colProgress"
          >
          </q-linear-progress>
          <div :class="percProgress">
            {{ percentageProgress }}%
          </div>
        </div>
        <q-btn :disable="isDisable" class="pos-go" size="sm" push color="primary" round
               icon="arrow_forward"
               :to="getrouteto">

        </q-btn>
      </q-item-label>
    </q-item-section>

  </q-item>

</template>

<script lang="ts" src="./SingleProject.ts">
</script>

<style lang="scss" scoped>
@import './SingleProject.scss';
</style>
