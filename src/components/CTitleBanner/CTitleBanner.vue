<template>
    <div>
        <q-banner
                class="q-my-md"
                rounded dense :class="bgcolor+` text-white`"
                :color="color+` q-title`" style="text-align: center;">
            <span class="mybanner">{{title}}</span>
        </q-banner>
    </div>
</template>

<script lang="ts" src="./CTitleBanner.ts">
</script>
<style lang="scss" scoped>
    @import './CTitleBanner.scss';
</style>
