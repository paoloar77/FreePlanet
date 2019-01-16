<template>
    <div class="row flex-container2">
        <div class="flex-item pos-item">{{ itemtodo.pos }}ª</div>
        <div class="flex-item priority-item">
            <q-btn push
                   class="priority-item-popover"
                   :icon="iconPriority">
                <q-popover
                        v-model="popover"
                        self="top left"

                >
                    <q-list link>
                        <q-item v-for="field in selectPriority" :key="field.value"
                                @click.native="setPriority(field.value), popover = false">
                            <q-item-side :icon="field.icon" inverted color="primary"/>
                            <q-item-main>
                                <q-item-tile label>{{field.label}}</q-item-tile>
                            </q-item-main>
                        </q-item>
                    </q-list>
                </q-popover>
            </q-btn>
        </div>
        <div class="flex-item completed-item">
            <q-btn push
                   class="priority-item-popover"
                   :icon="iconCompleted"
                   @click.native="setCompleted">
            </q-btn>
            <!--<q-icon class=" mycols allleft icon_completed ScheduleStatus" :name="iconCompleted"
                    @click.native="setCompleted"/>-->
        </div>
        <div class="flex-item div_descr">
            {{ itemtodo.descr }}
        </div>

        <div class="flex-item data-item">
            <q-datetime
                    v-model="itemtodo.expiring_at"
                    class="myexpired"/>
        </div>
        <div class="flex-item btn-item">
            <q-btn class="mybtn" round color="" icon="delete" @click="remove(itemtodo.id)"></q-btn>
        </div>
    </div>

</template>

<script lang="ts" src="./SingleTodo.ts">
</script>

<style lang="scss" scoped>
    @import './SingleTodo.scss';
</style>
