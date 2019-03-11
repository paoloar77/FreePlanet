<template>
    <div>
        <q-list link separator no-border class="todo-menu">
            <div v-for="field in menuPopupTodo" :key="field.value">
                <q-item clickable v-ripple v-if="(field.value !== 130) && (field.value !== 100)" :icon="field.icon"
                        @click.native="clickMenu(field.value)">
                    <q-item-section avatar>
                        <q-icon :name="field.icon"/>
                    </q-item-section>

                    <q-item-section v-if="field.value !== 120" label class="item-menu">{{field.label}}</q-item-section>

                    <q-item-section side top v-if="field.value === 101">
                        <q-checkbox v-model="itemtodo.enableExpiring"/>
                    </q-item-section>
                    <q-item-section v-if="field.value === 110">
                        <q-checkbox v-model="itemtodo.completed"/>
                    </q-item-section>


                    <!--<q-item tag="label" v-ripple>-->
                        <!--<q-item-section side top>-->
                            <!--<q-checkbox v-model="check1" />-->
                        <!--</q-item-section>-->

                        <!--<q-item-section>-->
                            <!--<q-item-label>Notifications</q-item-label>-->
                            <!--<q-item-label caption>-->
                                <!--Notify me about updates to apps or games that I downloaded-->
                            <!--</q-item-label>-->
                        <!--</q-item-section>-->
                    <!--</q-item>-->

                    <!--<q-item tag="label" v-ripple>-->
                        <!--<q-item-section side top>-->
                            <!--<q-checkbox v-model="check2" />-->
                        <!--</q-item-section>-->

                        <!--<q-item-section>-->
                            <!--<q-item-label>Sound</q-item-label>-->
                            <!--<q-item-label caption>-->
                                <!--Auto-update apps at anytime. Data charges may apply-->
                            <!--</q-item-label>-->
                        <!--</q-item-section>-->
                    <!--</q-item>-->

                    <q-item-section v-if="field.value === 120">
                        <q-slider :class="$parent.menuProgress" v-model="itemtodo.progress" :min="0" :max="100"
                                  :step="5"/>

                    </q-item-section>
                    <q-item-section v-if="field.value === 120">
                        <div>
                            <q-input v-model="itemtodo.progress"
                                     class="menuInputProgress"
                                     type="number"
                                     suffix="%"
                                     @change="val => { model = val }"
                                     @keydown="KeychangeProgress"
                            />
                        </div>
                    </q-item-section>
                </q-item>
                <q-item v-if="(field.value === 100)" :icon="field.icon"
                        @click.native="clickMenu(field.value)">
                    <q-item-section avatar>
                        <q-icon :name="field.icon" inverted color="primary"/>
                    </q-item-section>
                    <q-item-section class="item-menu">
                        {{field.label}}
                    </q-item-section>
                </q-item>
                <q-item clickable v-if="(field.value === 130)" :icon="field.icon"
                        @click.native="clickMenu(field.value)">

                    <q-item-section avatar>
                        <q-icon :name="$parent.iconPriority" inverted color="primary"/>
                    </q-item-section>

                    <q-item-section>
                        <q-btn-dropdown ref="dropdown_priority" flat :label="field.label"
                        >
                            <q-list bordered>
                                <q-item clickable v-ripple v-for="field in selectPriority" :key="field.value"
                                        @click.native="setPriority(field.value)">
                                    <q-item-section avatar>
                                        <q-icon :name="field.icon" inverted color="primary"/>
                                    </q-item-section>
                                    <q-item-section>
                                        {{field.label}}
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                    </q-item-section>

                </q-item>
            </div>
        </q-list>
    </div>
</template>

<script lang="ts" src="./SubMenus.ts">
</script>

<style lang="scss">
    @import './SubMenus.scss';
</style>
