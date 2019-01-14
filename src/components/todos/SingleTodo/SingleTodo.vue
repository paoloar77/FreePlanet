<template>
    <div id="appsingletodo" class="flex-container">

        <div class="doc-container">
            <div class="row">
                <div class="flex-item mycols">P: {{ itemtodo.pos }}</div>
                <q-checkbox class="flex-item mycols" v-model="itemtodo.completed" :label="itemtodo.descr" />
                <div class="flex-item mycols">
                <q-select
                        v-model="itemtodo.priority"
                        float-label=""
                        radio
                        :options="selectPriority"
                />
                </div>

                <div class="flex-item mycols"><q-datetime
                        v-model="itemtodo.expiring_at"/></div>
                <div class="flex-item mycols">
                    <q-btn class="mybtn" round color="" icon="delete" @click="remove(itemtodo.id)"></q-btn>
                </div>

            </div>
        </div>

    </div>
</template>

<script lang="ts" src="./SingleTodo.ts">
</script>
