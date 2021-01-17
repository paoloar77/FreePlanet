<template>
  <q-page>
    <CTitleBanner title="Ordini"></CTitleBanner>
    <div class="panel">
      <q-tabs
        v-model="taborders"
        inline-label
        class="text-blue"
      >
        <q-tab name="incorso" icon="fas fa-tasks" label="Ordini in Corso"/>
        <q-tab name="recenti" icon="fas fa-calendar" label="Ordini Recenti"/>
      </q-tabs>

      <div class="q-pa-sm">
        <q-table
          :columns="columns"
          row-key="numorder"
          :data="getOrdersCart">

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="numorder" :props="props">
                &nbsp; n. {{ props.row.numorder }}
              </q-td>
              <q-td key="created_at" :props="props">
                 {{ tools.getstrDateTime(props.row.created_at) }}
              </q-td>
              <q-td key="items" :props="props">
                <div v-for="item of props.row.items">
                  <div v-if="!!item.order.product">
                    {{ item.order.product.name }} ({{ item.order.quantity }})<br>
                  </div>
                </div>

              </q-td>
              <q-td key="totalPrice" :props="props">
                {{ props.row.totalPrice }} €
              </q-td>
              <q-td key="status" :props="props">
                {{ props.row.status }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>

      <!--
      <div v-for="(ordercart, index) in getOrdersCart" :key="index">

        <div>
          {{ ordercart.numorder }}<br>
        </div>

        <div class="container">
          <div class="q-pa-sm col items-start q-gutter-xs" v-for="(itemorder, index) in ordercart.items" :key="index">

            <CSingleCart :order="itemorder.order" :showall="true" :nomodif="true"/>
          </div>
        </div>
        <q-separator></q-separator>
        <div class="col-6 q-mr-sm" style="text-align: right">
          <span class="text-grey q-mr-xs">Totale:</span> <span
          class="text-subtitle1 q-mr-sm ">€ {{ ordercart.totalPrice.toFixed(2) }}</span>
        </div>

        <q-input v-model="ordercart.note" style="max-width: 400px;" label="Note aggiuntive:"
                 filled dense
                 debounce="1000"
                 autogrow
                 @input="change_field(ordercart.id, 'note')">
        </q-input>

        <br>
      </div>
      -->


    </div>
  </q-page>
</template>

<script lang="ts" src="./orderInfo.ts">

</script>

<style lang="scss" scoped>
@import './orderInfo';
</style>
