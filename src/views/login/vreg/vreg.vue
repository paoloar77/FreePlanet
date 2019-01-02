<template>
    <q-page padding class="vreg">
        <div class="mypanel">
            <q-alert color="primary q-title" style="text-align: center;">
                {{ $t('reg.title_verif_reg')}}
            </q-alert>
            <br>

            <transition
                    enter-active-class="animated flipInX"
                    leave-active-class="animated flipOutX"
                    appear
            >
            <span>
                <q-alert
                        v-if="giaverificato"
                        type="warning"
                >
                    {{ myrisultato}}
                </q-alert>
                <q-alert
                        v-if="verificatook"
                        type="positive"
                >
                    {{ myrisultato}}
                </q-alert>
            </span>
            </transition>


        </div>
    </q-page>
</template>

<script lang="ts" src="./vreg.ts">
</script>
