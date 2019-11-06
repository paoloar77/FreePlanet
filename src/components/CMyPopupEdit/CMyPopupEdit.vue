<template>
    <div :class="getclassCol(col)">
        <div v-if="col.fieldtype === tools.FieldType.date">
            <CDateTime
                    :label="col.label"
                    class="cursor-pointer"
                    :valueDate="myvalue"
                    :readonly="false"
                    :dense="true"
                    :canEdit="canEdit"
                    @savetoclose="SaveValueInt"
                    @show="OpenEdit">
            </CDateTime>
        </div>
        <div v-else>
            <div v-if="col.fieldtype === tools.FieldType.binary">
                <CMyChipList
                        :value="myvalue"
                        :options="db_fieldsTable.getTableJoinByName(col.jointable)"
                        :optval="db_fieldsTable.getKeyByTable(col.jointable)"
                        :optlab="db_fieldsTable.getLabelByTable(col.jointable)"
                        :opticon="db_fieldsTable.getIconByTable(col.jointable)"></CMyChipList>
            </div>
            <!-- Show Value -->
            <div v-else>
                {{ visuValByType(myvalue, col, row) }}
            </div>

            <!--<q-select v-model="myvalue"-->
            <!--rounded-->
            <!--outlined-->
            <!--dense-->
            <!--:options="db_fieldsTable.getTableJoinByName(col.jointable)"-->
            <!--:display-value="db_fieldsTable.getLabelByTable(col.jointable)"-->
            <!--emit-value-->
            <!--@input="SaveValueInt"-->
            <!--&gt;-->
            <!--</q-select>-->

            <!-- Edit Value -->
            <q-popup-edit
                    v-if="canEdit"
                    v-model="myvalue"
                    :disable="col.disable"
                    :title="col.title"
                    buttons
                    @save="SaveValueInt"
                    @show="OpenEdit">

                <div v-if="col.fieldtype === tools.FieldType.boolean">
                    <q-checkbox v-model="myvalue" :label="col.title">
                    </q-checkbox>
                    {{ visuValByType(myvalue, col, row) }}
                </div>
                <div v-else-if="col.fieldtype === tools.FieldType.string">
                    <q-input v-model="myvalue"
                             autogrow
                             autofocus>

                    </q-input>
                </div>
                <div v-else-if="col.fieldtype === tools.FieldType.number">
                    <q-input v-model="myvalue" type="number"
                             autofocus>

                    </q-input>
                </div>
                <div v-else-if="col.fieldtype === tools.FieldType.binary">
                    <CMyToggleList :label="col.title"
                                   :options="db_fieldsTable.getTableJoinByName(col.jointable)"
                                   :value.sync="myvalue"
                                   :optval="db_fieldsTable.getKeyByTable(col.jointable)"
                                   :optlab="db_fieldsTable.getLabelByTable(col.jointable)">
                    </CMyToggleList>
                </div>
                <div v-else-if="col.fieldtype === tools.FieldType.html">
                    <q-input v-model="myvalue"
                             autofocus
                             @keyup.enter.stop
                             type="textarea"></q-input>
                </div>
                <div v-else-if="col.fieldtype === tools.FieldType.select">
                    <CMySelect :label="col.title"
                               :value.sync="myvalue"
                               :optval="db_fieldsTable.getKeyByTable(col.jointable)"
                               :optlab="db_fieldsTable.getLabelByTable(col.jointable)"
                               :options="db_fieldsTable.getTableJoinByName(col.jointable)"
                               :useinput="false">
                    </CMySelect>
                </div>

            </q-popup-edit>
        </div>
    </div>

</template>

<script lang="ts" src="./CMyPopupEdit.ts">
</script>

<style lang="scss" scoped>
    @import './CMyPopupEdit.scss';
</style>
