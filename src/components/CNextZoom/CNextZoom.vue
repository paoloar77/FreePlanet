<template>
  <div>
    <div>
      <CTitleBanner v-if="listacalzoom.length > 0" class="q-pa-xs" :title="$t('pages.nextzoom')"
                    bgcolor="bg-primary" clcolor="text-white"
                    mystyle="" myclass="myshad" canopen="true">


        <div class="flex flex-center">

          <div class="row animazione justify-center q-gutter-md">

            <q-btn v-if="showzoom" size="md" type="a" :href="tools.getLinkZoom()"
                   target="_blank" rounded color="white" text-color="primary" icon="fas fa-video"
                   :label="$t('steps.entra_zoom')">
            </q-btn>

            <transition-group name="fade" mode="out-in"
                              appear
                              enter-active-class="animazione fadeIn"
                              leave-active-class="animazione fadeOut">
              <q-item v-for="(confer, index) in listacalzoom" :key="confer._id"
                      class="q-mb-xs animated clBorderZoom q-pa-sm" v-ripple>

                <q-item-section avatar>
                  <q-avatar v-if="tools.geticon(confer.lang)" :class="tools.geticon(confer.lang)"
                            size="sm">
                  </q-avatar>
                  <q-avatar v-else color="primary" text-color="white" class="text-center">
                    {{ tools.capitalize(confer.lang) }}
                  </q-avatar>
                </q-item-section>

                <q-item-section class="text-center">
                  <q-item-label class="title">{{ confer.title }}</q-item-label>
                  <q-item-label class="text-center">
                    <q-icon v-if="confer.benvenuto" name="fas fa-check" size="md" color="blue"></q-icon>
                    <q-icon v-if="!!confer.icon" :name="confer.icon" size="md" inverted :color="confer.color"></q-icon>
                  </q-item-label>
                  <q-item-label class="zoom_data">{{
                    tools.getstrDateMonthWeekTimeShort(confer.date_start) }}
                  </q-item-label>
                  <q-item-label class="note">
                    <q-chip
                      style="background-color: lightblue !important;"
                      text-color="black"

                    >{{ confer.note }}
                    </q-chip>
                  </q-item-label>
                  <q-item-label class="link">
                    <a :href="getlinkzoom(confer)" target="_blank">{{getlinkzoom(confer)}}</a>
                  </q-item-label>
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
