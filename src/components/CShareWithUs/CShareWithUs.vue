<template>
  <div>
    <div>
      <CTitleBanner v-if="listasharewithus && listasharewithus.length > 0" class="q-pa-xs"
                    :title="$t('pages.sharewithus')"
                    bgcolor="bg-white" clcolor="text-blue"
                    mystyle="" myclass="myshad" canopen="true">


        <div class="flex flex-center">

          <div class="row animazione justify-center q-gutter-xs">

            <q-item v-for="(shared, index) in listamyshare" :key="shared._id"
                    class="q-mb-xs animated clBorderShare q-pa-sm" v-ripple>

              <transition name="fade" mode="out-in"
                          appear
                          enter-active-class="animazione fadeIn"
                          leave-active-class="animazione fadeOut">

                <div class="row">
                  <q-item-section class="text-center">
                    <q-item-label class="title">{{ shared.description }}</q-item-label>
                    <!--<q-item-label class="title">Condiviso: {{ shared.numshared }}</q-item-label>
                    <q-item-label class="title">Rating: {{ shared.rating }}</q-item-label>-->
                  </q-item-section>
                  <!--<q-rating v-model="shared.rating" :max="5" size="16px" @input="change_rating(shared.rating, shared)"/>-->


                </div>
              </transition>
              <q-btn class="q-ml-sm" round icon="fas fa-times" color="white" text-color="grey" size="sm" @click="removeShared(shared)"></q-btn>

            </q-item>
          </div>
        </div>
      </CTitleBanner>
      Scrivi cosa vorresti fare con noi:<br>
      <div class="row no-wrap justify-between q-pa-md q-gutter-sm">

        <q-input v-model="mydescr" label="Cosa vorresti fare?" class="full-width">
        </q-input>
        <q-btn rounded label="Aggiungi" color="positive" @click="add_newshare(mydescr)" :disable="mydescr === ''"></q-btn>
      </div>

      <CTitleBanner v-if="listasharewithus && listasharewithus.length > 0" class="q-pa-xs"
                    title="Graduatoria Attuale"
                    bgcolor="bg-white" clcolor="text-blue"
                    mystyle="" myclass="myshad" canopen="true">


        <div class="flex flex-center text-center">

          <div class="animazione justify-center q-gutter-xs">

            <q-item v-for="(shared, index) in listasharewithus" :key="shared._id"
                    class="animated" style="padding: 4px;" v-ripple>

              <transition name="fade" mode="out-in"
                          appear
                          enter-active-class="animazione fadeIn"
                          leave-active-class="animazione fadeOut">

                <div class="row no-wrap">

                    <q-btn dense size="md" :color="mycolorbtn(shared)" rounded :icon="geticon(shared)" :label="shared.description + ` (` + (shared.numshared + 1) + `)`"
                    @click="add_newshare(shared.description)"></q-btn>
                    <!--<q-item-label class="title">Condiviso: {{ shared.numshared }}</q-item-label>
                    <q-item-label class="title">Rating: {{ shared.rating }}</q-item-label>-->
                  <!--<q-rating v-model="shared.rating" :max="5" size="16px" @input="change_rating(shared.rating, shared)"/>-->

                </div>
              </transition>

            </q-item>
          </div>
        </div>
      </CTitleBanner>


    </div>
  </div>
</template>

<script lang="ts" src="./CShareWithUs.ts">
</script>

<style lang="scss" scoped>
@import './CShareWithUs.scss';
</style>
