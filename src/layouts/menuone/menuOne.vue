<template>
    <div class="list no-border platform-delimiter light-paragraph">
        <q-icon name="action"/>

        <q-list bordered class="rounded-borders text-primary">
            <template v-for="(parent, index) in getmenu">
                <div class="q-list-header">{{replaceUnderlineToSpace(index)}}</div>
                <div v-for="item in parent.routes">
                    <div v-if="item.routes2">
                        <q-expansion-item
                                :header-inset-level="1"
                                :content-inset-level="1"
                                :label="$t(item.name)"
                                :icon="item.materialIcon"
                                class="titleSubMenu"
                        >

                            <q-expansion-item v-for="(child2, index) in item.routes2" :to="child2.route" :key="index"
                                              :header-inset-level="1.1"
                                              :duration="300"
                                              expand-icon="map"
                                              :active="child2.label === 'Outbox'"
                                              class="item item-link drawer-closer cursor-pointer"
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
                                        active-class="my-menu-link">
                                    <q-item-section avatar>
                                        <q-icon :name="item.materialIcon"/>
                                    </q-item-section>

                                    <q-item-section>
                                        {{$t(item.name)}}
                                    </q-item-section>
                                </q-item>

                            </div>
                        </q-slide-transition>
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

