<template>
    <div>
        <q-avatar v-if="!myimgint" class="q-mb-sx center_img" :icon="myicon" :font-size="size">

        </q-avatar>
        <q-avatar v-if="myimgint" class="q-mb-sx center_img">
            <img :src="myimgint" :font-size="size" alt="my avatar">
        </q-avatar>
    </div>
</template>

<script lang="ts" src="./CMyAvatar.ts">
</script>

<style lang="scss" scoped>
    @import './CMyAvatar.scss';
</style>
