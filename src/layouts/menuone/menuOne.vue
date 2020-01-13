<template>
  <div class="no-border" v-if="isfinishLoading">
    <q-list class="rounded-borders text-primary">
      <template v-for="(parent, index) in getmenu">
        <!--<div class="q-list-header">{{replaceUnderlineToSpace(index)}}</div>-->
        <div v-for="myitemmenu in static_data.routes" v-if="myitemmenu.active">
          <div v-if="!!myitemmenu.routes2 && myitemmenu.inmenu && tools.visumenu(myitemmenu)">
            <span v-if="myitemmenu.isseparator">
              <q-separator></q-separator>
            </span>
            <span v-else>

              <q-expansion-item
                :header-inset-level="myitemmenu.level_parent"
                :content-inset-level="myitemmenu.level_parent"
                :label="tools.getLabelByItem(myitemmenu, mythis)"
                :icon="myitemmenu.materialIcon"
                expand-icon-class="my-menu-separat"
                :header-class="getmymenuclass(myitemmenu)"
                active-class="my-menu-active">

                  <div v-for="(child2, index) in myitemmenu.routes2" :key="index" v-if="child2.active">
                      <span v-if="child2.isseparator">
                        <q-separator></q-separator>
                      </span>
                      <span v-else>
                        <q-expansion-item
                          v-if="!child2.routes2"
                          :to="getroute(child2)"
                          :header-inset-level="child2.level_child"
                          :duration="300"
                          :icon="child2.materialIcon"
                          active-class="my-menu-active"
                          expand-icon-class="my-menu-icon-none"
                          :class="`item item-link drawer-closer cursor-pointer ` + clBaseint"
                          :label="tools.getLabelByItem(child2, mythis)">

                            <template v-slot:header>
                                 <q-item-section avatar>

                                   <q-avatar v-if="child2.img" :icon="`img:`+child2.img" class="imgicon" font-size="2rem"></q-avatar>
                                   <q-avatar v-else :icon="child2.materialIcon" color="primary" class="clicon" text-color="white"></q-avatar>
                                  </q-item-section>

                                  <q-item-section>
                                    {{ tools.getLabelByItem(child2, mythis) }}
                                  </q-item-section>

                              </template>

                            <q-expansion-item v-if="!!child2.routes2 && child3.active"
                                              v-for="(child3, index) in child2.routes2"
                                              :key="index"
                                              :to="getroute(child3)"
                                              :header-inset-level="child3.level_child"
                                              :duration="300"
                                              :icon="child3.materialIcon"
                                              :expand-icon="child3.icon"
                                              expand-icon-class="my-menu-separat"
                                              active-class="my-menu-active"
                                              :class="`item item-link drawer-closer cursor-pointer ` + clBaseint"
                                              :label="tools.getLabelByItem(child3, mythis)">

                            </q-expansion-item>
                        </q-expansion-item>
                        <q-expansion-item
                          v-else
                          :header-inset-level="child2.level_parent"
                          :content-inset-level="child2.level_parent"
                          :label="tools.getLabelByItem(child2, mythis)"
                          :icon="child2.materialIcon"
                          expand-icon-class="my-menu-separat"
                          :header-class="getmymenuclass(child2)"
                          active-class="my-menu-active">
                            <div v-for="(child3, index) in child2.routes2" :key="index" v-if="child3.active">
                                <q-expansion-item
                                  :to="getroute(child3)"
                                  :header-inset-level="child3.level_child"
                                  :duration="300"
                                  :icon="child3.materialIcon"
                                  active-class="my-menu-active"
                                  expand-icon-class="my-menu-icon-none"
                                  :class="`item item-link drawer-closer cursor-pointer ` + clBaseint"
                                  :label="tools.getLabelByItem(child3, mythis)">
                                    <q-expansion-item v-if="!!child3.routes2 && child3.active"
                                                      v-for="(child4, index) in child3.routes2"
                                                      :key="index"
                                                      :to="getroute(child4)"
                                                      :header-inset-level="child4.level_child"
                                                      :duration="300"
                                                      :icon="child4.materialIcon"
                                                      :expand-icon="child4.icon"
                                                      expand-icon-class="my-menu-separat"
                                                      active-class="my-menu-active"
                                                      :class="`item item-link drawer-closer cursor-pointer ` + clBaseint"
                                                      :label="tools.getLabelByItem(child4, mythis)">
                                  </q-expansion-item>
                                </q-expansion-item>
                            </div>
                        </q-expansion-item>
                      </span>
                  </div>
              </q-expansion-item>
            </span>
          </div>
          <div v-else>
            <div v-if="myitemmenu.inmenu && !myitemmenu.submenu && tools.visumenu(myitemmenu)">
              <q-slide-transition :duration=200>
                <div v-show="true">
                  <span v-if="myitemmenu.isseparator">
                    <q-separator inset></q-separator>
                  </span>
                  <span v-else>
                    <q-expansion-item
                      :to="getroute(myitemmenu)"
                      :header-inset-level="myitemmenu.level_parent"
                      :content-inset-level="myitemmenu.level_parent"
                      :label="tools.getLabelByItem(myitemmenu, mythis)"
                      :icon="myitemmenu.materialIcon"
                      expand-icon="none"
                      :header-class="clBaseint"
                      active-class="my-menu-active">
                    </q-expansion-item>
                  </span>
                </div>
              </q-slide-transition>
            </div>
          </div>
        </div>
      </template>
    </q-list>
  </div>
</template>

<script lang="ts" src="./menuOne.ts">
</script>

<style lang="scss" scoped>
  @import './menuOne.scss';
</style>

