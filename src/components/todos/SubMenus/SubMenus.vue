<template>
    <div>
        <q-list link separator no-border class="todo-menu">
            <div v-for="field in menuPopupTodo" :key="field.value">
                <q-item v-if="(field.value !== 130) && (field.value !== 100)" :icon="field.icon"
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
                        <q-slider :class="$parent.menuProgress" v-model="itemtodo.progress" :min="0" :max="100"/>
                    </q-item-main>
                    <q-item-side v-if="field.value === 120">
                        <div :class="$parent.percProgress">
                            {{$parent.percentageProgress}}%
                        </div>
                    </q-item-side>

                </q-item>
                <q-item v-if="(field.value === 100)" :icon="field.icon" v-close-overlay
                        @click.native="clickMenu(field.value)">
                    <q-item-side :icon="field.icon"/>
                    <q-item-main label class="item-menu">{{field.label}}</q-item-main>
                </q-item>
                <q-item v-if="(field.value === 130)" :icon="field.icon"
                        @click.native="clickMenu(field.value)">

                    <q-item-side :icon="$parent.iconPriority"/>

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
    </div>
</template>

<script lang="ts" src="./SubMenus.ts">
</script>

<style lang="scss" scoped>
    @import './SubMenus.scss';
</style>
