<template>
    <div class="no-border">
        <q-list class="rounded-borders text-primary">
            <template v-for="(parent, index) in getmenu">
                <!--<div class="q-list-header">{{replaceUnderlineToSpace(index)}}</div>-->
                <div v-for="myitemmenu in static_data.routes">
                    <div v-if="!!myitemmenu.routes2 && myitemmenu.inmenu">
                        <q-expansion-item
                                :header-inset-level="myitemmenu.level_parent"
                                :content-inset-level="myitemmenu.level_parent"
                                :label="getLabelByItem(myitemmenu)"
                                :icon="myitemmenu.materialIcon"
                                expand-icon-class="my-menu-separat"
                                header-class="my-menu"
                                active-class="my-menu-active">

                            <q-expansion-item v-for="(child2, index) in myitemmenu.routes2"
                                              :key="index"
                                              :to="child2.path"
                                              :header-inset-level="child2.level_child"
                                              :duration="300"
                                              :icon="child2.materialIcon"
                                              active-class="my-menu-active"
                                              expand-icon-class="my-menu-icon-none"
                                              class="item item-link drawer-closer cursor-pointer my-menu"
                                              :label="getLabelByItem(child2)">
                                <q-expansion-item v-if="!!child2.routes2" v-for="(child3, index) in child2.routes2"
                                                  :key="index"
                                                  :to="child3.path"
                                                  :header-inset-level="child3.level_child"
                                                  :duration="300"
                                                  :icon="child3.materialIcon"
                                                  :expand-icon="child3.icon"
                                                  expand-icon-class="my-menu-separat"
                                                  active-class="my-menu-active"
                                                  class="item item-link drawer-closer cursor-pointer my-menu"
                                                  :label="getLabelByItem(child3)">
                                </q-expansion-item>

                            </q-expansion-item>

                        </q-expansion-item>
                    </div>
                    <div v-else>
                        <div v-if="myitemmenu.inmenu && !myitemmenu.submenu">
                            <q-slide-transition :duration=200>
                                <div v-show="true">
                                    <q-expansion-item
                                            :to="myitemmenu.path"
                                            :header-inset-level="myitemmenu.level_parent"
                                            :content-inset-level="myitemmenu.level_parent"
                                            :label="getLabelByItem(myitemmenu)"
                                            :icon="myitemmenu.materialIcon"
                                            expand-icon="none"
                                            header-class="my-menu"
                                            active-class="my-menu-active">
                                    </q-expansion-item>


                                    <!--
                                <q-item
                                        clickable
                                        v-ripple
                                        exact
                                        :to="myitemmenu.route"
                                        active-class="my-menu-active">
                                    <q-item-section avatar class="my-menu-icon">
                                        <q-icon :name="myitemmenu.materialIcon"/>
                                    </q-item-section>

                                    <q-item-section class="my-menu">
                                        {{$t(myitemmenu.name)}}
                                    </q-item-section>
                                </q-item>
-->
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

