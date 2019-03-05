<template>
    <q-page padding class="docs-table">
        <p class="caption">TableOnlyView</p>
        <q-table
                ref="table"
                color="primary"
                title="Parametri di Configurazione Server"
                :data="serverData"
                :columns="columns"
                :filter="filter"
                selection="multiple"
                :selected.sync="selected"
                row-key="chiave"
                :pagination.sync="serverPagination"
                @request="request"
                :loading="loading"
        >
            <template slot="top-right" slot-scope="props">
                <q-search hide-underline v-model="filter" />
            </template>
        </q-table>
    </q-page>
</template>
<script lang="ts" src="./tableOnlyView.ts">
</script>

<style lang="scss" scoped>
    @import './tableOnlyView.scss';
</style>
