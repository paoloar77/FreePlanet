<template>
  <div v-if="!!user">
    <q-item class="q-my-sm q-pa-sm myuserbadge shadow-5" clickable v-ripple @click="execclick(user)">
      <q-item-section avatar>
        <div class="row" style="margin-left: 4px;">
          <q-avatar v-if="yourinvite" :text-color="mycolor" size="md">
            {{ getnumber(user, index + 1) }}°
          </q-avatar>
          <q-avatar :color="mycolor" text-color="white" size="md">
            {{ getletter(user) }}
          </q-avatar>
        </div>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ user.name }} {{ user.surname }} {{ getindorder(user) }}<br>
          <span class="text-grey">({{ getusername(user) }})</span>
          <br><span v-if="isextralist(user)" class="notreg">{{$t('dashboard.notreg')}}</span>
        </q-item-label>
        <!--<q-item-label caption lines="1">{{ user.email }}</q-item-label>-->
      </q-item-section>

      <q-item-section side>
        <div class="row q-gutter-xs justify-center items-center">
          <q-btn v-if="isextralist(user)" fab-mini
                 icon="fab fa-whatsapp"
                 color="green" type="a"
                 size="sm"
                 :href="tools.getHttpForWhatsapp(user.cell_complete)" target="__blank">
          </q-btn>
          <q-icon v-if="!isextralist(user)" size="sm" name="fab fa-telegram" :color="getstatecolor(user)"></q-icon>
          <q-icon v-if="!isextralist(user)" size="sm" name="fas fa-video" :color="getzoomcolor(user)"></q-icon>
          <q-avatar :text-color="mycolor" size="md">
            {{ getnumpeople() }}
          </q-avatar>
          <q-icon size="xs" name="fas fa-user-friends" :color="get2peoplecolor(user)"></q-icon>
        </div>
      </q-item-section>
    </q-item>

  </div>
</template>

<script lang="ts" src="./CUserBadge.ts">
</script>

<style lang="scss" scoped>
  @import './CUserBadge.scss';
</style>
