<template>
    <div class="no-border" v-if="isfinishLoading">
        <q-list class="rounded-borders text-primary">
            <template v-for="(parent, index) in getmenu">
                <!--<div class="q-list-header">{{replaceUnderlineToSpace(index)}}</div>-->
                <div v-for="myitemmenu in static_data.routes">
                    <div v-if="!!myitemmenu.routes2 && myitemmenu.inmenu && tools.visumenu(myitemmenu)">
                        <q-expansion-item
                                :header-inset-level="myitemmenu.level_parent"
                                :content-inset-level="myitemmenu.level_parent"
                                :label="tools.getLabelByItem(myitemmenu, mythis)"
                                :icon="myitemmenu.materialIcon"
                                expand-icon-class="my-menu-separat"
                                :header-class="getmymenuclass(myitemmenu)"
                                active-class="my-menu-active">

                            <div v-for="(child2, index) in myitemmenu.routes2" :key="index">

                                <q-expansion-item
                                        v-if="!child2.routes2"
                                        :to="getroute(child2)"
                                        :header-inset-level="child2.level_child"
                                        :duration="300"
                                        :icon="child2.materialIcon"
                                        active-class="my-menu-active"
                                        expand-icon-class="my-menu-icon-none"
                                        class="item item-link drawer-closer cursor-pointer my-menu"
                                        :label="tools.getLabelByItem(child2, mythis)">
                                    <q-expansion-item v-if="!!child2.routes2" v-for="(child3, index) in child2.routes2"
                                                      :key="index"
                                                      :to="getroute(child3)"
                                                      :header-inset-level="child3.level_child"
                                                      :duration="300"
                                                      :icon="child3.materialIcon"
                                                      :expand-icon="child3.icon"
                                                      expand-icon-class="my-menu-separat"
                                                      active-class="my-menu-active"
                                                      class="item item-link drawer-closer cursor-pointer my-menu"
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
                                    <div v-for="(child3, index) in child2.routes2" :key="index">
                                        <q-expansion-item
                                                :to="getroute(child3)"
                                                :header-inset-level="child3.level_child"
                                                :duration="300"
                                                :icon="child3.materialIcon"
                                                active-class="my-menu-active"
                                                expand-icon-class="my-menu-icon-none"
                                                class="item item-link drawer-closer cursor-pointer my-menu"
                                                :label="tools.getLabelByItem(child3, mythis)">
                                            <q-expansion-item v-if="!!child3.routes2" v-for="(child3, index) in child3.routes2"
                                                              :key="index"
                                                              :to="getroute(child3)"
                                                              :header-inset-level="child3.level_child"
                                                              :duration="300"
                                                              :icon="child3.materialIcon"
                                                              :expand-icon="child3.icon"
                                                              expand-icon-class="my-menu-separat"
                                                              active-class="my-menu-active"
                                                              class="item item-link drawer-closer cursor-pointer my-menu"
                                                              :label="tools.getLabelByItem(child3, mythis)">
                                            </q-expansion-item>
                                        </q-expansion-item>
                                    </div>
                                </q-expansion-item>
                            </div>
                        </q-expansion-item>
                    </div>
                    <div v-else>
                        <div v-if="myitemmenu.inmenu && !myitemmenu.submenu && tools.visumenu(myitemmenu)">
                            <q-slide-transition :duration=200>
                                <div v-show="true">
                                    <q-expansion-item
                                            :to="getroute(myitemmenu)"
                                            :header-inset-level="myitemmenu.level_parent"
                                            :content-inset-level="myitemmenu.level_parent"
                                            :label="tools.getLabelByItem(myitemmenu, mythis)"
                                            :icon="myitemmenu.materialIcon"
                                            expand-icon="none"
                                            header-class="my-menu"
                                            active-class="my-menu-active">
                                    </q-expansion-item>
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

