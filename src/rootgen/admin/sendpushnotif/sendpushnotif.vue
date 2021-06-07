<template>
    <CMyPage img="" title="Invio Push Notifiche" keywords="" description="">
        <div class="q-ma-sm">
            <div class="row center_img clBorderSteps" style="max-width: 600px;">
                <div class="row">
                    <q-input v-model="title" autofocus label="Titolo" style="width: 300px;"></q-input>
                </div>
                <div class="row">
                    <q-input v-model="content" type="textarea" autofocus label="Contenuto"
                             input-class="myinput-area"
                             style="height: 100px; width: 500px;"></q-input>
                </div>
                <div class="row">
                    <q-input v-model="openUrl" autofocus label="openUrl" style="width: 200px;"></q-input>
                    <q-input v-model="openUrl2" autofocus label="openUrl2" style="width: 200px;"></q-input>
                    <q-input v-model="tag" autofocus label="tag" style="width: 100px;"></q-input>
                </div>
                <q-select
                        rounded outlined v-model="actiontype"
                        :options="shared_consts.selectActions"
                        label="Tipo Msg" emit-value map-options>
                </q-select>
                <q-select
                        rounded outlined v-model="destination"
                        :options="shared_consts.selectDestination"
                        label="Destinazione" emit-value map-options>
                </q-select>
                <div v-if="actiontype === shared_consts.TypeMsg_Actions.OPZ1_2" class="row">
                    <q-input v-model="opz1" autofocus label="Opzione 1" style="width: 100px;"></q-input>
                    <q-input v-model="opz2" autofocus label="Opzione 2" style="width: 100px;"></q-input>
                </div>
                <br />
                <div class="">
                    <q-btn label="Invia Msg" color="primary" @click="SendMsgToAll()"></q-btn>
                </div>
            </div>
            <q-inner-loading id="spinner" :showing="incaricamento">
                <q-spinner-tail
                        color="primary"
                        size="4em">
                </q-spinner-tail>
            </q-inner-loading>
        </div>
    </CMyPage>
</template>
<script lang="ts" src="./sendpushnotif.ts">
</script>

<style lang="scss" scoped>
    @import './sendpushnotif.scss';
</style>
