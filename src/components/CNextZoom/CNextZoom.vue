<template>
  <div>
    <div>
      <CTitleBanner class="q-pa-xs" :title="$t('pages.nextzoom')" bgcolor="bg-primary" clcolor="text-white"
                    mystyle="" myclass="myshad" canopen="true">


        <div class="flex flex-center">

          <div class="column animazione">
            <transition-group name="fade" mode="out-in"
                              appear
                              enter-active-class="animazione fadeIn"
                              leave-active-class="animazione fadeOut">
              <q-item v-for="(confer, index) in listacalzoom" :key="confer._id" class="q-mb-xs animated" v-ripple>

                <q-item-section avatar>
                  <q-avatar v-if="tools.geticon(confer.lang)" :class="tools.geticon(confer.lang)" size="xs">
                  </q-avatar>
                  <q-avatar v-else color="primary" text-color="white" class="text-center">
                    {{ tools.capitalize(confer.lang) }}
                  </q-avatar>
                </q-item-section>

                <q-item-section class="text-center">
                  <q-item-label class="title">{{ confer.title }}</q-item-label>
                  <q-item-label class="id_conf">ID: {{ confer.id_conf_zoom }}</q-item-label>
                  <q-item-label class="note">
                    <q-chip
                      style="background-color: lightblue !important;"
                      text-color="black"

                    >{{ confer.note }}
                    </q-chip>
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label class="zoom_data">{{ tools.getstrDateMonthTimeShort(confer.date_start) }}</q-item-label>
                  <!--<q-item-label class="zoom_data">{{ tools.getstrTime(confer.date_end) }}</q-item-label>-->
                </q-item-section>
              </q-item>
            </transition-group>
          </div>
        </div>
      </CTitleBanner>
    </div>
  </div>
</template>

<script lang="ts" src="./CNextZoom.ts">
</script>

<style lang="scss" scoped>
  @import './CNextZoom.scss';
</style>
