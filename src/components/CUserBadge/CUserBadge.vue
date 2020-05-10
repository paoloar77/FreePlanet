<template>
  <div v-if="!!user">
    <q-item class="q-my-sm q-pa-sm myuserbadge shadow-5" clickable v-ripple @click="execclick(user)">
      <q-item-section avatar v-if="showsteps">
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
          <br><!--<span v-if="isextralist(user)" class="notreg">{{ $t('dashboard.notreg') }}</span>-->
        </q-item-label>
        <!--<q-item-label caption lines="1">{{ user.email }}</q-item-label>-->
      </q-item-section>


      <q-item-section side v-if="showsteps">
        <div class="row q-gutter-xs justify-center items-center">
          <div>
            <CCardState :mytext="$t('pages.statusreg.req')" :myval="getnumreq(user)" :myperc="getnumperc(user)" size="50px" size_mob="40px" fontsize="0.75rem" myclass="my-card-small-stat" :mycolor="getcolor(user)"></CCardState>
          </div>

          <!--<q-icon v-if="!isextralist(user)" size="sm" name="fab fa-telegram" :color="getstatecolor(user)"></q-icon>
          <q-icon v-if="!isextralist(user)" size="sm" name="fas fa-video" :color="getzoomcolor(user)"></q-icon>-->
          <div>
            <CCardState :mytext="$t('pages.statusreg.people')" :myval="getnumpeople(user)" :myperc="getnumpercpeople(user)" size="50px" size_mob="40px" fontsize="0.75rem" myclass="my-card-small-stat" :mycolor="getcolorpeople(user)"></CCardState>
          </div>
          <div>
            <q-btn
              fab-mini
              icon="fab fa-whatsapp"
              color="white" text-color="green" type="a"
              size="sm"
              :href="tools.getHttpForWhatsapp(user.profile.cell)" target="__blank">
            </q-btn>
          </div>
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
