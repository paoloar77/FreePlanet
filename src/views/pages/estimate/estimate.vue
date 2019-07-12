<template>
    <div>
        <q-list bordered padding>
            <q-item-label header class="text-subtitle1 text-red">Presupuesto</q-item-label>

            <div style="text-align: right;">
                <span class="est__totale_text">Pagine:</span>
                <span class="est__totale_numpag">{{getNumpagTotal()}}</span>
                <span style="margin-left: 20px;"></span>
                <span class="est__totale_text">Totale:</span>
                <span class="est__totale_price">{{getTotal()}} €</span>
            </div>

            <q-item tag="label" v-for="rec in arrEstimateit" :key="rec.title">
                <q-item-section avatar top>
                    <q-avatar :icon="rec.icon" :color="getColor(rec)" text-color="white"/>
                </q-item-section>

                <q-item-section>
                    <q-item-label>{{rec.title}}</q-item-label>
                    <q-item-label caption v-html="rec.description"></q-item-label>
                    <q-item-label>
                        <span class="est__price">{{getPrice(rec)}} €</span>
                    </q-item-label>
                </q-item-section>
                <q-item-section side top>
                    <q-checkbox v-model="rec.checksel"/>
                </q-item-section>
            </q-item>

        </q-list>

        <div class="q-ml-md">
            <span class="est__totale_text">Pagine:</span>
            <span class="est__totale_numpag">{{getNumpagTotal()}}</span>
            <span style="padding-left: 20px;"></span>
            <span class="est__totale_text">Totale:</span>
            <span class="est__totale_price">{{getTotal()}} €</span>
        </div>

    </div>
</template>
<script lang="ts" src="./estimate.ts">
</script>

<style lang="scss" scoped>
    @import './estimate';
</style>
