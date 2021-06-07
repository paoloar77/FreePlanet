<template>
  <q-page>
    <div>
      <CTitleBanner title="Report"></CTitleBanner>
      <div class="flex-container">
        <div v-for="filter in arrfilters">
          <q-toggle dark color="green" v-model="filter.ris" :label="filter.label"
                    @input="refreshFilter(true)"></q-toggle>
        </div>

        <q-select v-model="myView" :options="optView" emit-value map-options style="max-width: 150px"
                  @input="refreshFilter(true)"></q-select>
      </div>

    </div>

    <q-inner-loading :showing="spinner_visible">
      <q-spinner-tail size="2em" color="primary"/>
    </q-inner-loading>

    <div class="row justify-center items-center">
      <div class="items-lg-start row">
        <q-btn flat dense icon="fas fa-chevron-left" @click="calendarPrev"/>
        <q-separator vertical/>
        <q-btn flat dense icon="fas fa-chevron-right" @click="calendarNext"/>
      </div>
      <div class="text-center"><span
        class="q-mr-xl q-toolbar__title nowrap text-blue">{{ title_cal }}</span>
      </div>
    </div>


    <q-calendar
      v-model="selectedDate"
      ref="calendar"
      :column-header-after="true"
      :view="myView"
      :weekdays="[1,2,3,4,5,6,0]"
      animated
      :day-height="resourceHeight"
      :resource-height="resourceHeight"
      :resource-width="60"
      transition-prev="slide-right"
      transition-next="slide-left"
      :resources="resources"
      :locale="toolsext.getLocale()"
    >
      <!-- eslint-disable vue/no-unused-vars -->
      <!--<template #scheduler-resources-header>
        <div class="row justify-center items-center">
          <q-btn flat icon="fas fa-chevron-left" @click="calendarPrev"/>
          <q-btn flat icon="fas fa-chevron-right" @click="calendarNext"/>
        </div>

        <div class="full-height row justify-center items-center">
          <q-btn label="here"/>
        </div>
      </template>-->

      <template #scheduler-resource-day="{ timestamp, /* index, */ resource }">
        <template v-for="(event, index) in getEvents(timestamp, resource)">
          <div v-if="event.totalhours > 0" class="centermydiv">
            <p
              :key="index"
              class="flex justify-center text-h7"
            >
              <q-chip dense color="primary" text-color="white" >{{ event.totalhours }}</q-chip>
            </p>
          </div>
          <div v-if="event.totalacchours > 0" class="row justify-center items-center">
            <p
              :key="index"
              class="flex justify-center text-h7 boldhigh text-blue"
            >
              <q-chip dense :color="event.totalacchours > 24 ? 'positive' : 'negative'" text-color="white">[{{ event.totalacchours }}]</q-chip>
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


      <template #day="{ timestamp }">
        <template v-for="(event, index) in getEvents(timestamp, myresource)">
          <div v-if="event.totalhours > 0" class="centermydiv">
            <p
              :key="index"
              class="flex justify-center text-h7"
            >
              <q-chip dense color="primary" text-color="white" >{{ event.totalhours }}</q-chip>
            </p>
          </div>
          <div v-if="event.totalacchours > 0" class="row justify-center items-center">
            <p
              :key="index"
              class="flex justify-center text-h7 boldhigh text-blue"
            >
              <q-chip dense :color="event.totalacchours > 24 ? 'positive' : 'negative'" text-color="white">[{{ event.totalacchours }}]</q-chip>
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

        </template>
      </template>

      <template #column-header-after="{ timestamp, index2 }">

        <template v-for="(event, index) in getEvents(timestamp, myresource)">
          <div v-if="event.totalhours > 0" class="centermydiv">
            <p
              :key="index"
              class="flex justify-center text-h7"
            >
              <q-chip dense color="primary" text-color="white" >{{ event.totalhours }}</q-chip>
            </p>
          </div>
          <div v-if="event.totalacchours > 0" class="row justify-center items-center">
            <p
              :key="index"
              class="flex justify-center text-h7 boldhigh text-blue"
            >
              <q-chip dense :color="event.totalacchours > 24 ? 'positive' : 'negative'" text-color="white">[{{ event.totalacchours }}]</q-chip>
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

        </template>
      </template>
    </q-calendar>
    <div v-if="myView === 'month'">
      <CTitleBanner :title="'Ore Mensili: ' + getOreMensili"></CTitleBanner>

    </div>

  </q-page>
</template>

<script lang="ts" src="./report.ts">
</script>
<style lang="scss" scoped>
@import './report';
</style>
