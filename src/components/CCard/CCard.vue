<template>
  <div>
    <q-card class="my-card text-center">

      <q-img :src="`statics/images/` + myop.img" class="myimg">
        <div class="absolute-bottom text-spacetrans text-shadow">
          <div class="text-h6 text-trans">{{ myop.name }} {{ myop.surname }}</div>
          <div class="text-subtitle-carica text-trans">{{ myop.qualification }}</div>
        </div>
      </q-img>

      <q-tabs v-model="tab" class="text-teal">
        <q-tab label="Info" name="one"></q-tab>
        <q-tab v-if="myop.intro" label="Biografia" name="two"></q-tab>
      </q-tabs>

      <q-separator></q-separator>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          <div class="text-subtitle-carica">{{ myop.disciplines }}</div>
          <div v-if="myop.certifications" class="text-subtitle-certificato">{{ myop.certifications }}</div>
          <div class="op__cell">
            <q-icon class="flex-icon" name="mobile_friendly"></q-icon>
            <span class="q-ma-sm">{{ myop.cell }}</span>

            <div class="row justify-center margin_buttons q-gutter-lg">
              <q-btn v-if="myop.email" fab-mini icon="fas fa-envelope"
                     color="blue-grey-6" type="a"
                     size="sm"
                     :href="tools.getemailto(myop.email)" target="__blank">
              </q-btn>
              <q-btn v-if="tools.getHttpForWhatsapp(myop.cell)" fab-mini icon="fab fa-whatsapp"
                     color="green" type="a"
                     size="sm"
                     :href="tools.getHttpForWhatsapp(myop.cell)" target="__blank">
              </q-btn>

              <q-btn v-if="tools.getHttpForTelegram(myop.usertelegram)" fab-mini icon="fab fa-telegram"
                     color="blue" type="a"
                     size="sm"
                     :href="tools.getHttpForTelegram(myop.usertelegram)" target="__blank">
              </q-btn>
            </div>
          </div>
          <div class="op__email">
            <q-icon class="flex-icon" name="contact_mail"></q-icon>&nbsp;
            <a :href="tools.getemailto(myop.email)" target="_blank">{{ myop.email }}
            </a>
          </div>

          <div class="op__facebook" v-if="myop.paginafb">
            <a :href="myop.paginafb" target="_blank">
              <i aria-hidden="true" class="q-icon fab fa-facebook-f icon_contact links"></i> Pagina Facebook
            </a>
          </div>


          <div class="op__storia" v-html="myop.intro"></div>
          <q-btn v-if="myop.intro" rounded size="sm" color="secondary" @click="clicca()">Continua ...</q-btn>
        </q-tab-panel>

        <q-tab-panel name="two">
          <div class="op__storia" v-html="myop.info"></div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script lang="ts" src="./CCard.ts">
</script>

<style lang="scss" scoped>
  @import './CCard.scss';
</style>
