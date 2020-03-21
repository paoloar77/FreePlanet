<template>
    <q-page padding class="vreg">
        <div class="q-pa-md q-gutter-sm">
            <q-banner
                    rounded
                    class="bg-primary text-white"
                    color="primary q-title"
                    style="text-align: center;">
                <span class="mybanner">{{ $t('components.authentication.email_verification.title_unsubscribe')}}: {{email}}</span>
            </q-banner>
            <br>

            <transition
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut"
                    appear

            >

                <q-banner
                        rounded
                        class="bg-warning text-black"
                        style="text-align: center;"
                        v-if="errore"
                >
                    <span class="mybanner">{{ myrisultato}}</span>
                </q-banner>
                <q-banner
                        class="bg-positive text-white"
                        style="text-align: center;"
                        rounded
                        v-if="disiscritto"
                >
                    <span class="mybanner">{{ $t('components.authentication.email_verification.title_unsubscribe_done') }}</span>
                </q-banner>
            </transition>


        </div>
    </q-page>
</template>

<script lang="ts" src="./unsubscribe.ts">
</script>

<style lang="scss" scoped>
    @import './unsubscribe.scss';
</style>
