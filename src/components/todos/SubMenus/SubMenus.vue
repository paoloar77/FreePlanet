<template>
    <q-list separator no-border class="todo-menu">
        <div v-for="field in menuPopupTodo" :key="field.value">
            <q-item v-close-popup clickable v-if="(field.value !== 130) && (field.value !== 120)" :icon="field.icon"
                    @click="clickMenu(field.value)">
                <q-item-section avatar>
                    <q-icon :name="field.icon"/>
                </q-item-section>

                <q-item-section label class="item-menu">
                    <q-item-label>{{field.label}}</q-item-label>
                </q-item-section>

                <q-item-section side top v-if="field.value === 101">
                    <q-checkbox v-model="itemtodo.enableExpiring"/>
                </q-item-section>
                <q-item-section side v-if="field.value === 110">
                    <q-checkbox v-model="itemtodo.status"/>
                </q-item-section>
            </q-item>
            <q-item clickable v-if="(field.value === 120)" :icon="field.icon"
                    @click="clickMenu(field.value)">
                <q-item-section avatar>
                    <q-icon :name="field.icon"/>
                </q-item-section>

                <q-item-section>
                    <q-slider label
                              :class="$parent.menuProgress"
                              v-model="itemtodo.progress"
                              :min="0"
                              :max="100"
                              :step="5" @change="val => { lazy = val }"
                    />

                </q-item-section>
                <q-item-section side>
                    <div>
                        <q-item-label style="color: blue">{{itemtodo.progress}} %</q-item-label>
                    </div>
                </q-item-section>
            </q-item>
            <q-item clickable v-if="(field.value === 130)">
                <q-item-section avatar>
                    <q-icon name="priority_high" inverted color="primary"/>
                </q-item-section>

                <q-item-section>{{field.label}}</q-item-section>
                <q-item-section side>
                    <q-icon name="keyboard_arrow_right"/>
                </q-item-section>

                <q-menu auto-close anchor="bottom middle" self="top middle">
                    <q-list dense>
                        <q-item side clickable :icon="field.icon"
                                @click="clickMenu(field.value)">

                            <q-item-section>
                                <q-list dense>
                                    <q-item clickable v-ripple v-for="fieldprior in selectPriority"
                                            :key="fieldprior.value"
                                            @click="setPriority(fieldprior.value)">
                                        <q-item-section avatar>
                                            <q-icon :name="fieldprior.icon" inverted color="primary"/>
                                        </q-item-section>
                                        <q-item-section>
                                            {{fieldprior.label}}
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-item>
        </div>
    </q-list>
</template>

<script lang="ts" src="./SubMenus.ts">
</script>

<style lang="scss" scoped>
    @import './SubMenus.scss';
</style>
