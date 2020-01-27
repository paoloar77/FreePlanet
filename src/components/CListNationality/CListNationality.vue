<template>
  <div class="row">
    <div class="column animazione">
      <div class="text-center">{{$t('pages.statusreg.nationality')}}</div>
      <transition-group name="fade" mode="out-in"
                        appear
                        enter-active-class="animazione fadeIn"
                        leave-active-class="animazione fadeOut">
        <q-item v-for="(nat, index) in mydata" :key="nat._id" class="clitemnat">
            <q-item-section avatar>
              <q-avatar v-if="tools.geticon(nat._id)"
                        :class="tools.geticon(nat._id)" class="flag_icon">

              </q-avatar>
              <q-avatar v-else color="primary" text-color="white" class="text-center">
                {{ tools.capitalize(nat._id) }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ tools.getNationsByNationality(nat._id) }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label class="label_count">
                <div class="justify-center">{{ nat.count }}
                  <q-chip outline color="green" text-color="white" icon-right="fas fa-user-plus" size="xs"></q-chip>
                </div>
              </q-item-label>

            </q-item-section>
        </q-item>

      </transition-group>
    </div>

  </div>
</template>

<script lang="ts" src="./CListNationality.ts">
</script>

<style lang="scss" scoped>
  @import './CListNationality.scss';
</style>
