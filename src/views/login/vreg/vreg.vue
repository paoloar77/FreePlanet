<template>
    <q-page padding class="vreg">
        <div class="mypanel">
            <q-banner color="primary q-title" style="text-align: center;">
                {{ $t('reg.title_verif_reg')}}
            </q-banner>
            <br>

            <transition
                    enter-active-class="animated flipInX"
                    leave-active-class="animated flipOutX"
                    appear
            >
            <span>
                <q-banner
                        v-if="giaverificato"
                        type="warning"
                >
                    {{ myrisultato}}
                </q-banner>
                <q-banner
                        v-if="verificatook"
                        type="positive"
                >
                    {{ myrisultato}}
                </q-banner>
            </span>
            </transition>


        </div>
    </q-page>
</template>

<script lang="ts" src="./vreg.ts">
</script>
