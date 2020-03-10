<template>
    <q-page padding class="vreg">
        <div class="q-pa-md q-gutter-sm">
            <q-banner
                    rounded
                    class="bg-primary text-white"
                    color="primary q-title"
                    style="text-align: center;">
                <span class="mybanner">{{ $t('reg.title_verif_reg')}}</span>
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
                        v-if="giaverificato"
                >
                    <span class="mybanner">{{ myrisultato}}</span>
                </q-banner>
                <q-banner
                        class="bg-positive text-white"
                        style="text-align: center;"
                        rounded
                        v-if="verificatook"
                >
                    <span class="mybanner">{{ myrisultato}}</span>
                </q-banner>
            </transition>

          <div class="text-center q-mt-md">
            <q-btn rounded size="lg" color="primary" @click="openrighttoolbar">{{$t('login.enter')}}
            </q-btn>

          </div>

        </div>
    </q-page>
</template>

<script lang="ts" src="./vreg.ts">
</script>
