<template>
    <div>
        <q-input dense v-model="mydate" mask="date" :hint="myhint">
            <!--<span class="data_string">{{tools.getstrDate(itemsel.begin_development)}}</span>-->
            <q-icon name="event" class="cursor-pointer" style="font-size: 1.5rem;">
                <!--<q-popup-proxy>-->
                    <!--<q-date v-model="mydate" today-btn/>-->
                <!--</q-popup-proxy>-->
            </q-icon>
        </q-input>
    </div>
</template>

<script lang="ts" src="./CDate.ts">
</script>

<style lang="scss" scoped>
    @import './CDate.scss';
</style>
