<template>
  <!--<div class="q-pa-md items-start " style="display: inline-flex; width: 800px;"> -->
  <div>
    <div v-if="!edit">
      <div v-for="(mygallery, index) in listimages" :key="index" v-if="index === 0">
        <div class="q-pa-md q-gutter-md">
          <q-card :class="getclass">
            <q-img :src="`statics/upload/` + gall.directory + `/` + mygallery.imagefile" :class="getclimg"
                   :alt="mygallery.alt">
              <div class="absolute-bottom text-shadow">
                {{listimages.length}} immagini
              </div>
            </q-img>
          </q-card>
        </div>
      </div>
    </div>
    <div v-else>
      <div class=" row">
        <!--<q-draggable-rows
                v-model="order">-->
        <div v-for="(mygallery, index) in getlistimages" :key="index">
          <div class="q-pa-sm q-gutter-sm"
               @dragenter="onDragEnter"
               @dragleave="onDragLeave"

               @dragover="onDragOver">
            <q-card :id="mygallery._id" :class="getclass"
                    draggable="true"
                    @dragstart="onDragStart"
                    @drop="onDrop"
            >

              <q-img :src="`statics/upload/` + gall.directory + `/` + mygallery.imagefile"
                     :class="getclimg"
                     :alt="mygallery.alt">
                <div class="absolute-bottom text-shadow">
                  <!-- <div class="text-h6 text-trans">{{ mygallery.description }} </div> -->
                  <div class="text-subtitle-carica text-trans">{{mygallery.description}}</div>
                </div>
              </q-img>

              <!--Order: {{mygallery.order}} -->
              <q-input v-model="mygallery.alt"
                       label="Alt"
                       dense
                       @keyup.enter.stop
                       @input="save"
                       debounce="1000"
                       autofocus>
              </q-input>

              <q-input v-model="mygallery.description"
                       dense
                       label="Description"
                       @keyup.enter.stop
                       @input="save"
                       debounce="1000"
                       autofocus>
              </q-input>

              <q-card-actions align="center">
                <q-btn flat round color="red" icon="fas fa-trash-alt" size="sm"
                       @click="deleteFile(mygallery)"></q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
        <div class="q-pa-sm">
          <div v-if="edit" class="q-gutter-sm " style="max-height: 200px; width: 208px;">
            <q-uploader
              label="Aggiungi Immagine"
              accept=".jpg, image/*"
              :url="tools.geturlupload()+`/` + gall.directory"
              :headers="tools.getheaders()"
              :max-file-size="2000000"
              multiple
              auto-upload
              hide-upload-btn
              no-thumbnails
              @uploaded="uploaded"
              style="width: 208px"
            ></q-uploader>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" src="./CGallery.ts">
</script>

<style lang="scss" scoped>
  @import './CGallery.scss';
</style>
