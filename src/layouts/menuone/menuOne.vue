<template>
    <div class="no-border">
        <q-list class="rounded-borders text-primary">
            <template v-for="(parent, index) in getmenu">
                <!--<div class="q-list-header">{{replaceUnderlineToSpace(index)}}</div>-->
                <div v-for="item in parent.routes">
                    <div v-if="item.routes2">
                        <q-expansion-item
                                :header-inset-level="item.level_parent"
                                :content-inset-level="item.level_parent"
                                :label="$t(item.name)"
                                :icon="item.materialIcon"
                                expand-icon-class="my-menu-separat"
                                header-class="my-menu"
                                active-class="my-menu-active"
                        >

                            <q-expansion-item v-for="(child2, index) in item.routes2" :to="child2.route" :key="index"
                                              :header-inset-level="item.level_child"
                                              :duration="300"
                                              expand-icon="map"
                                              active-class="my-menu-active"
                                              class="item item-link drawer-closer cursor-pointer my-menu"
                                              :label="$t(child2.name)">
                            </q-expansion-item>

                        </q-expansion-item>
                    </div>
                    <div v-else>
                        <q-slide-transition :duration=200>
                            <div v-show="true">
                                <q-item
                                        clickable
                                        v-ripple
                                        exact
                                        :to="item.route"
                                        active-class="my-menu-active"
                                >
                                    <q-item-section avatar class="my-menu-icon">
                                        <q-icon :name="item.materialIcon"/>
                                    </q-item-section>

                                    <q-item-section class="my-menu">
                                        {{$t(item.name)}}
                                    </q-item-section>
                                </q-item>

                            </div>
                        </q-slide-transition>
                    </div>

                    <!--<q-separator spaced />-->

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

