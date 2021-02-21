<template>
  <q-page>
    <div>
      <CTitleBanner title="Report"></CTitleBanner>
      <q-calendar
        v-model="selectedDate"
        ref="calendar"
        view="week-scheduler"
        animated
        transition-prev="slide-right"
        transition-next="slide-left"
        :resources="resources"
        :locale="toolsext.getLocale()"
        >
        <!-- eslint-disable vue/no-unused-vars -->
        <template #scheduler-resources-header>
          <div class="row justify-center items-center">
            <q-btn flat icon="fas fa-chevron-left" @click="calendarPrev" />
            <q-btn flat icon="fas fa-chevron-right" @click="calendarNext" />
          </div>

          <!--<div class="full-height row justify-center items-center">
            <q-btn label="here"/>
          </div>-->
        </template>

        <template #scheduler-resource-day="{ timestamp, /* index, */ resource }">
          <template v-for="(event, index) in getEvents(timestamp, resource)">
            <q-badge
              :key="index"
              class="my-event justify-center ellipsis"
            >
              <!--<q-icon v-if="event.icon" :name="event.icon" class="q-mr-xs"></q-icon>-->
              <span class="ellipsis">{{ event.title }}</span>
            </q-badge>
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
