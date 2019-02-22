<template>
    <q-table
            :data="serverData"
            :columns="columns"
            :filter="filter"
            title="Configurazione Server"
            row-key="chiave"
    >
        <q-tr slot="body" slot-scope="props" :props="props">
            <q-td key="chiave" :props="props">
                {{ props.row.chiave }}
                <q-popup-edit v-model="props.row.chiave" disable>
                    <q-field count>
                        <q-input v-model="props.row.chiave" />
                    </q-field>
                </q-popup-edit>
            </q-td>
            <q-td key="valore" :props="props">
                {{ props.row.valore }}
                <q-popup-edit v-model="props.row.valore" title="Aggiorna Valore" buttons @save="SaveValue" @show="selItem(props.row)">
                    <q-input v-model="props.row.valore"/>
                </q-popup-edit>
            </q-td>
        </q-tr>
    </q-table>
</template>
<script lang="ts" src="./cfgServer.ts">
</script>

<style lang="scss" scoped>
    @import './cfgServer.scss';
</style>
