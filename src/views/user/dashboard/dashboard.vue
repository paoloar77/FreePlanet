<template>
  <div class="q-ma-xs q-gutter-xs q-pa-xs">

    <CTitleBanner class="q-pa-xs" :title="$t('pages.dashboard')" bgcolor="bg-info" clcolor="text-white"
                  mystyle=" " myclass="myshad">

      <q-field outlined bottom-slots :label="$t('reg.reflink')" stack-label class="text-center">
        <template v-slot:prepend>
          <q-btn round dense flat icon="far fa-copy" @click="copylink"/>
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline text-center wrapword" tabindex="0">{{getRefLink}}</div>
        </template>
      </q-field>

      <!--<q-toolbar class="bg-primary text-white shadow-2">-->
        <!--<q-toolbar-title class="text-center">{{ $t('reg.aportador_solidario')}}</q-toolbar-title>-->
      <!--</q-toolbar>-->

<!--
      <q-list bordered v-if="!!dashboard.aportador.name">
        <q-item class="q-my-sm" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ getletter(dashboard.aportador) }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ dashboard.aportador.username }} ({{ dashboard.aportador.name }} {{ dashboard.aportador.surname }})</q-item-label>
            <q-item-label caption lines="1">{{ dashboard.aportador.email }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="fas fa-user-check" color="green"></q-icon>
          </q-item-section>
        </q-item>
      </q-list>
      <div v-else class="q-pa-md text-center">
        Nessun Dato
      </div>
-->

      <q-toolbar class="bg-positive text-white shadow-2">
        <q-toolbar-title class="text-center">{{ $t('dashboard.downline')}}</q-toolbar-title>
      </q-toolbar>

      <q-list bordered v-if="!!dashboard.downline && dashboard.downline.length > 0">
        <q-item class="q-my-sm" clickable v-ripple v-for="(user, index) in dashboard.downline" :key="index">
          <q-item-section avatar>
            <div class="row">
              <q-avatar text-color="primary">
                {{ getnumber(user, index + 1) }}°
              </q-avatar>
              <q-avatar color="primary" text-color="white">
                {{ getletter(user) }}
              </q-avatar>
            </div>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ user.username }} ({{ user.name }} {{ user.surname }})</q-item-label>
            <q-item-label caption lines="1">{{ user.email }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="row q-gutter-md justify-center items-center">
              <q-icon size="sm" name="fas fa-user-check" :color="getstatecolor(user)"></q-icon>
              <q-icon size="sm" name="fas fa-gift" :color="getmoneycolor(user)"></q-icon>
              <q-avatar text-color="primary">
                {{ getnumpeople(user) }}
              </q-avatar>
              <q-icon size="sm" name="fas fa-user-friends" :color="get2peoplecolor(user)"></q-icon>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
      <div v-else class="q-pa-md text-center">
        Nessun Dato
      </div>

    </CTitleBanner>

<!--
    <CTitleBanner class="q-pa-xs" :title="$t('text.dashboard.madegift')" bgcolor="bg-info" clcolor="text-white"
                  mystyle=" " myclass="myshad">
      <div class="q-pa-sm text-center">

        <div v-if="madegift" class="q-gutter-md">
          <q-icon name="fas fa-gift" size="lg" color="green"></q-icon>
          <q-icon name="fas fa-thumbs-up" size="lg" color="green"></q-icon>
        </div>
        <div v-else class="q-gutter-md">
          <q-icon name="fas fa-gift" size="lg" color="grey"></q-icon>
          <q-icon name="fas fa-exclamation-triangle" size="lg" color="orange"></q-icon>
        </div>

      </div>
    </CTitleBanner>
-->
  </div>
</template>

<script lang="ts" src="./dashboard.ts">
</script>
<style lang="scss" scoped>
  @import './dashboard.scss';
</style>
