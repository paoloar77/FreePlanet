<template>
    <q-page>
        <div class="panel">
            <p class="caption">Singlecat:</p>

            <q-input v-model="category" inverted float-label="Inserisci la Categoria"
                     :after="[{icon: 'arrow_forward', content: true, handler () {}}]"
                     v-on:keyup.enter="insertCategory"/>

            <q-table
                    title="Categories"
                    :data="categories_arr"
                    :columns="columns"
                    row-key="id"
                    selection="multiple"
                    color="secondary"
                    :selected.sync="selectedSecond">


                <!--

                <q-tr slot="body" slot-scope="props" :props="props">
                    <q-td key="desc" :props="props">
                      {{ props.row.name }}
                      <q-popup-edit v-model="props.row.name">
                        <q-field count>
                          <q-input v-model="props.row.name" />
                        </q-field>
                      </q-popup-edit>
                    </q-td>
                    <q-td key="calories" :props="props">
                      {{ props.row.calories }}
                      <q-popup-edit v-model="props.row.calories" title="Update calories" buttons>
                        <q-input type="number" v-model="props.row.calories" />
                      </q-popup-edit>
                    </q-td>
                    <q-td key="fat" :props="props">{{ props.row.fat }}</q-td>
                    <q-td key="carbs" :props="props">{{ props.row.carbs }}</q-td>
                    <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
                    <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
                    <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
                    <q-td key="iron" :props="props">{{ props.row.iron }}</q-td>
                  </q-tr>
                    -->

                <!-- gets displayed only when there's at least one row selected -->
                <template slot="top-selection" slot-scope="props">
                    <!--<q-btn color="secondary" flat label="Action 1" class="q-mr-sm"/>
                    <q-btn color="secondary" flat label="Action 2"/>-->
                    <div class="col"/>
                    <q-btn color="negative" flat round delete icon="delete" @click="deleteRow"/>
                </template>
            </q-table>


            <!-- <SingleTodo :itemcat='mycat' v-for="mycat of categories_arr" :key="mycat._id"/> -->
        </div>
    </q-page>


</template>
<script lang="ts" src="./category.ts">
</script>

<style lang="scss" scoped>
    @import './category.scss';
</style>
