<template>
    <div>
        <div id="profile" v-if="Username">
            <img :src="photo" style='height: 80px' class="inline-block">
            <img src="../img/avatar-1.svg" id="avatar" class="inline-block">
            <div id="user-name">
                <span class="text-white"> {{ Username }} </span>
                <hr>
                <span class="text-white" v-if="Verificato"> {{$t('reg.verificato')}} </span>
                <span class="text-white background-red" v-else> {{$t('reg.non_verificato')}} </span>
                <!-- <span class="text-white"> {{ Email }} </span>-->
            </div>
            <div id="user-actions">
                <q-btn round color="primary" icon="person"></q-btn>
                <q-btn round color="warning" icon="lock"></q-btn>
                <q-btn round color="secondary" icon="exit_to_app" @click='logoutHandler'></q-btn>
            </div>
        </div>


        <menu-one :links="links"></menu-one>

        <!--<footer>
            <small>- Small</small>
        </footer>-->

        <!--<div class="fixed-bottom text-center light text-italic">-->
            <!--Powered by Perseo-->
        <!--</div>-->

    </div>
</template>

<script lang="ts" src="./drawer.ts">
</script>
<style lang="scss" scoped>
    @import './drawer.scss';
</style>
