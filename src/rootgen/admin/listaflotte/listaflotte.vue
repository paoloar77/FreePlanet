<template>
  <div>
    <div class="q-my-xs q-gutter-xs q-py-xs text-center">
      <CTitleBanner class="q-pa-xs"
                    title="Flotte"
                    bgcolor="bg-primary"
                    clcolor="text-white"
                    mystyle="" myclass="myshad" canopen="true">

        <q-toggle v-model="tutteleflotte"
                  label="Tutte le Flotte">

        </q-toggle>

        <q-toggle v-model="mostratemporanee"
                  label="Flotte Temporanee">

        </q-toggle>

        <div v-for="(flotta, index) in arrflotte" :key="index">

          <div v-if="!tutteleflotte && ((flotta.DoniTotali !== flotta.DoniConfermati) || (flotta.DoniTotali === 0 && !flotta.provvisoria)) || tutteleflotte || (mostratemporanee && flotta.provvisoria)">

            <CMyFlotta :flottaprop="flotta">

            </CMyFlotta>
          </div>

        </div>

      </CTitleBanner>
    </div>
  </div>
</template>
<script lang="ts" src="./listaflotte.ts">
</script>
<style lang="scss" scoped>
  @import './listaflotte.scss';
</style>
