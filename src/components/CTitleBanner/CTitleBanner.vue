<template>
    <div>
        <q-banner
                inline-actions
                rounded dense
                :class="bgcolor+` q-my-md `+clcolor+ ` ` + myclass"
                style="text-align: center; "
                @click="myvisible = !myvisible"
        >
            <template v-slot:avatar>
                <q-icon v-if="canopen" :name="icon" color="white" />
            </template>
            <template v-slot:action>
                <q-icon v-if="canopen" :name="iconopen" color="white" />
            </template>
            <span :class="`mybanner `+ myclasstext" :style="mystyle">{{title}}</span>
        </q-banner>

        <q-slide-transition>
            <div v-show="myvisible">
                <slot></slot>
            </div>
        </q-slide-transition>

    </div>
</template>

<script lang="ts" src="./CTitleBanner.ts">
</script>
<style lang="scss" scoped>
    @import './CTitleBanner.scss';
</style>
