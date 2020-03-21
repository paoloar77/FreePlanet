<template>
    <div class="q-pa-md">
        <div class="q-gutter-sm row items-start">
            <q-uploader
                    label="Galleria Home"
                    accept=".jpg, image/*"
                    :url="tools.geturlupload()+`/gallery_home`"
                    :headers="tools.getheaders()"
                    :max-file-size="2000000"
                    multiple
                    style="max-width: 300px"
            ></q-uploader>

            <q-uploader
                    label="Immagini"
                    accept=".jpg, image/*"
                    :url="tools.geturlupload()+`/img`"
                    :headers="tools.getheaders()"
                    :max-file-size="1000000"
                    multiple
                    style="max-width: 300px"
            ></q-uploader>

            <q-uploader
                    label="Invia PDF"
                    accept=".pdf"
                    :url="tools.geturlupload()+`/pdf`"
                    :headers="tools.getheaders()"
                    multiple
                    style="max-width: 300px"
            ></q-uploader>
        </div>
    </div>
</template>
<script lang="ts" src="./uploader.ts">

</script>
<style lang="scss" scoped>
    @import 'uploader';
</style>
