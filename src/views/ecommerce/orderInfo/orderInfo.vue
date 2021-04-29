<template>
  <q-page>
    <CTitleBanner title="Ordini"></CTitleBanner>
    <div class="panel">
      <q-tabs
        v-model="taborders"
        inline-label
        class="text-blue"
      >
        <q-tab class="text-black" v-if="this.arrnumstatus[2] > 0" name="incorso" icon="fas fa-tasks" :label="`(` + this.arrnumstatus[2]  +`) in Corso`"/>
        <q-tab class="text-blue" v-if="this.arrnumstatus[3] > 0" name="confermati" icon="fas fa-calendar" :label="`(` + this.arrnumstatus[3]  +`) Confermati`"/>
        <q-tab class="text-green" v-if="this.arrnumstatus[4] > 0" name="pagati" icon="fas fa-calendar" :label="`(` + this.arrnumstatus[4]  +`) Pagati`"/>
        <q-tab class="text-blue-grey-8" v-if="this.arrnumstatus[6] > 0" name="completati" icon="fas fa-check" :label="`(` + this.arrnumstatus[6]  +`) Completati`"/>
        <q-tab class="text-red" v-if="this.arrnumstatus[10] > 0" name="cancellati" icon="delete" :label="`(` + this.arrnumstatus[10]  +`) Cancellati`"/>
      </q-tabs>

      <div class="q-pa-sm">
        <q-table
          :grid="$q.screen.lt.sm"
          :hide-header="$q.screen.lt.sm"
          :columns="columns"
          row-key="numorder"
          :data="getOrdersCart">

          <template v-if="$q.screen.lt.sm" v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <q-card class="my-card-shadow yes_shadow">
                <q-list dense>
                  <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                    <q-item-section>
                      <q-item-label>{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label v-if="col.name === 'created_at'" caption>{{
                          tools.getstrDateTime(col.value)
                        }}
                        <span v-if="taborders === 'completati'">
                          <br>Completato il: {{ tools.getstrDateTime(props.row.completed_at) }}
                        </span>
                      </q-item-label>
                      <q-item-label v-else-if="col.name === 'items'" caption>
                        <div v-for="item of props.row.items">
                          <div v-if="!!item.order.product">
                            {{ item.order.product.name }} ({{ item.order.quantity }})<br>
                          </div>
                        </div>
                      </q-item-label>
                      <q-item-label v-else-if="col.name === 'totalPrice'" caption>
                        {{ props.row.totalPrice }} €
                      </q-item-label>
                      <q-item-label v-else-if="col.name === 'status'" caption>
                        {{ shared_consts.getStatusStr(props.row.status) }}
                      </q-item-label>
                      <q-item-label v-else caption>{{ col.value }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </template>
          <template v-else v-slot:body="props">
            <q-tr :props="props">
              <q-td key="numorder" :props="props">
                &nbsp; n. {{ props.row.numorder }}
              </q-td>
              <q-td key="nameSurname" :props="props">
                {{ props.row.nameSurname }}
              </q-td>
              <q-td key="created_at" :props="props">
                {{ tools.getstrDateTime(props.row.created_at) }}
                <span v-if="taborders === 'completati'">
                          <br>Completato il:<br>{{ tools.getstrDateTime(props.row.completed_at) }}
                </span>
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
                <span :class="props.row.status">{{ shared_consts.getStatusStr(props.row.status) }}</span>
              </q-td>
              <q-td key="comandi" :props="props">
                <div v-if="tools.isManager()" class="q-pa-sm">

                  <q-btn-dropdown rounded dense label="Azioni">
                    <q-list class="text-primary">
                      <q-item clickable v-close-popup
                              @click="clickFunz(props.row, shared_consts.OrderStatus.ORDER_CONFIRMED)">
                        <q-item-section avatar>
                          <q-avatar icon="fas fa-list-ol" color="grey" text-color="white"/>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Inviato</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup
                              @click="clickFunz(props.row, shared_consts.OrderStatus.ORDER_CONFIRMED)">
                        <q-item-section avatar>
                          <q-avatar icon="fas fa-calendar-check" color="secondary" text-color="white"/>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Confermato</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup @click="clickFunz(props.row, shared_consts.OrderStatus.PAYED)"
                              color="blue">
                        <q-item-section avatar>
                          <q-avatar icon="money" color="positive" text-color="white"/>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Pagato</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup @click="clickFunz(props.row, shared_consts.OrderStatus.RECEIVED)"
                              color="blue">
                        <q-item-section avatar>
                          <q-avatar icon="fas fa-check" color="primary" text-color="white"/>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Completato</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup @click="clickFunz(props.row, shared_consts.OrderStatus.CANCELED)"
                              color="blue">
                        <q-item-section avatar>
                          <q-avatar icon="delete" color="negative" text-color="white"/>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Cancellato</q-item-label>
                        </q-item-section>
                      </q-item>

                    </q-list>
                  </q-btn-dropdown>
                </div>
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
