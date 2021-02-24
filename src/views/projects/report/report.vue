<template>
  <q-page>
    <div>
      <CTitleBanner title="Report"></CTitleBanner>
      <div v-for="filter in arrfilters">
        <q-toggle dark color="green" v-model="filter.ris" :label="filter.label"
                  @input="refreshFilter"></q-toggle>
      </div>

    </div>

    <q-calendar
      v-model="selectedDate"
      ref="calendar"
      view="week-scheduler"
      :weekdays="[1,2,3,4,5,6,0]"
      animated
      :resource-height="resourceHeight"
      :resource-width="60"
      transition-prev="slide-right"
      transition-next="slide-left"
      :resources="resources"
      :locale="toolsext.getLocale()"
    >
      <!-- eslint-disable vue/no-unused-vars -->
      <template #scheduler-resources-header>
        <div class="row justify-center items-center">
          <q-btn flat icon="fas fa-chevron-left" @click="calendarPrev"/>
          <q-btn flat icon="fas fa-chevron-right" @click="calendarNext"/>
        </div>

        <!--<div class="full-height row justify-center items-center">
          <q-btn label="here"/>
        </div>-->
      </template>

      <template #scheduler-resource-day="{ timestamp, /* index, */ resource }">
        <template v-for="(event, index) in getEvents(timestamp, resource)">
          <div v-if="event.totalhours > 0" class="centermydiv">
            <p
              :key="index"
              class="flex justify-center text-h7"
            >
              {{ event.totalhours }}
            </p>
          </div>
          <div v-if="event.totalacchours > 0" class="row justify-center items-center">
            <p
              :key="index"
              class="flex justify-center text-h7 boldhigh text-blue"
            >
              Tot: {{ event.totalacchours }}
            </p>
          </div>
          <div v-if="!!event.title">
            <q-badge
              :key="index"
              class="my-event justify-center ellipsis"
              :class="badgeClasses(event, 'body')"
              :style="badgeStyles(event)"
            >
              <span class="ellipsis">{{ event.title }}</span>
            </q-badge>
          </div>
          <!--<q-icon v-if="event.icon" :name="event.icon" class="q-mr-xs"></q-icon>-->
        </template>
      </template>

    </q-calendar>
    </div>
  </q-page>
</template>

<script lang="ts" src="./report.ts">
</script>
<style lang="scss" scoped>
@import './report';
</style>
