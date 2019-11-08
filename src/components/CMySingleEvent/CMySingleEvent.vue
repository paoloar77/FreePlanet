<template>
    <div>
        <CMyPage v-if="myevent" :imgbackground="myevent.img" :title="myevent.title" keywords="" description="">

            <div class="q-mx-md">
                <div class="listaev__align_chips q-ma-md">
                    <img :src="getImgEvent(myevent)"
                         @click="selectEvent(myevent)"
                         class="text-left padding_cell listaev__tdimg listaev__img cursor-pointer"
                         :style="getStyleByEvent(myevent, true)">
                    <q-chip dense v-if="isAlreadyBooked(myevent)" class="cltexth4 chipbooked shadow-5 q-mb-md"
                            color="green" text-color="white"
                            icon="event_available">{{$t('cal.booked')}}
                    </q-chip>
                    <div v-if="selected">
                        <q-chip v-if="editable" class="text-center shadow-5 glossy bg-blue chipmodif">

                            <q-btn v-if="editable" flat round color="white" icon="fas fa-copy">
                                <q-menu
                                        transition-show="flip-right"
                                        transition-hide="flip-left">
                                    <q-list style="min-width: 100px">
                                        <q-item clickable @click="duplicateEvent(myevent, 7)">
                                            <q-item-section>Tra 1 Settimana</q-item-section>
                                        </q-item>
                                        <q-item clickable @click="duplicateEvent(myevent, 14)">
                                            <q-item-section>Tra 2 Settimane</q-item-section>
                                        </q-item>
                                        <q-item clickable @click="duplicateEvent(myevent, 7, 4)">
                                            <q-item-section>4 Eventi ogni Settimana</q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-menu>
                            </q-btn>
                            <q-btn v-if="editable" flat round color="white" icon="delete" v-close-popup
                                   @click="deleteEvent(myevent)"></q-btn>
                            <q-btn v-if="editable" flat round color="white" icon="edit" v-close-popup
                                   @click="editEvent(myevent)"></q-btn>
                            <q-btn v-if="editable" flat round color="white" icon="cancel"
                                   @click="selectEvent(null)"></q-btn>
                        </q-chip>
                    </div>
                    <q-chip v-if="myevent.news" class="cltexth4 chipnews shadow-5 glossy text-right" color="red"
                            text-color="white" icon-right="star" icon="star" dense
                            style="">
                        {{$t('event.news')}}
                    </q-chip>

                </div>

                <div class="listaev__date listaev__align_center_mobile">
                    <span v-html="tools.getstrDateTimeEvent(mythis(), myevent, true)"></span>
                </div>

                <div class="listaev__align_center_mobile">

                    <div style="margin: 10px;"></div>

                    <div class="">
                        <!-- Se c'è un link, allora -->
                        <q-btn v-if="myevent.linkpdf" size="md" type="a"
                               :href="`../../statics/` + myevent.linkpdf"
                               target="_blank"
                               ripple rounded :label="myevent.title" :icon="myevent.icon"
                               :color="myevent.bgcolor" text-color="white" glossy>

                        </q-btn>
                        <!-- altrimenti mostra solo Chip -->
                        <div v-else>
                            <div v-if="tools.isMobile()" class="cltexth3 text-center"
                                 :style="`background-color: ${myevent.bgcolor} !important; color: white !important;`">
                                {{myevent.title}}
                            </div>
                            <q-chip v-else class="cltexth3 text-center"
                                    :style="`background-color: ${myevent.bgcolor} !important; color: white !important;`"
                                    text-color="white"
                                    :icon="myevent.icon"
                                    dense>{{myevent.title}}
                            </q-chip>
                        </div>
                    </div>

                    <div style="margin: 10px;"></div>

                    <p v-if="myevent.bodytext" class="listaev__details text-left q-mb-md" v-html="myevent.bodytext"></p>
                    <p v-else class="listaev__details" v-html="myevent.details"></p>

                    <div v-if="myevent.teacher" class="">
                                    <span class="cal__teacher-title">{{$t('cal.teacher')}}: <span
                                            class="margin_with"></span></span>

                        <q-chip>
                            <CMyAvatar :myimg="getImgTeacherByUsername(myevent.teacher)"></CMyAvatar>
                            <span class="cal__teacher-content">{{getTeacherByUsername(myevent.teacher)}}</span>
                        </q-chip>
                        <span v-if="getImgTeacherByUsername(myevent.teacher2) && isValidUsername(myevent.teacher2)"
                              class="margin_avatar2"></span>
                        <q-chip v-if="getImgTeacherByUsername(myevent.teacher2) && isValidUsername(myevent.teacher2)">
                            <CMyAvatar :myimg="getImgTeacherByUsername(myevent.teacher2)"></CMyAvatar>
                            <span class="cal__teacher-content">{{getTeacherByUsername(myevent.teacher2)}}</span>
                        </q-chip>

                        <span v-if="myevent.wherecode" class="q-ma-md">
                                        <span v-if="tools.isMobile()"><br/></span>
                                        <span class="cal__where-title">{{$t('cal.where')}}: </span>

                                        <q-chip>
                                            <q-avatar v-if="getWhereIcon(myevent.wherecode)">
                                                <img :src="`../../statics/images/avatar/` + getWhereIcon(myevent.wherecode)">
                                            </q-avatar>
                                            <q-avatar v-else color="blue" font-size="20px" text-color="white"
                                                      icon="home">
                                            </q-avatar>
                                            <span class="cal__teacher-content">{{getWhereName(myevent.wherecode)}}</span>
                                        </q-chip>
                                    </span>
                    </div>
                    <div v-if="myevent.contribtype" class="q-ma-sm">
                                <span class="cal__quota-title">{{$t('event.price')}}:<span
                                        class="margin_with"></span></span>
                        <span v-if="!isShowPrice(myevent)" class="">
                                    <q-chip class="glossy" color="orange" text-color="white">
                                        <span class="cal__quota-content">{{getContribtypeById(myevent.contribtype)}}</span>
                                    </q-chip>
                                </span>

                        <q-chip v-if="myevent.price && isShowPrice(myevent)" class="glossy" color="orange"
                                text-color="white" icon-right="star">
                            <span class="cal__quota-content">{{getPrice(myevent)}}</span>
                        </q-chip>
                    </div>


                    <div class="row justify-start q-ma-md">
                        <q-btn v-if="myevent.linkpdf"
                               size="md" type="a" :href="`../../statics/` + myevent.linkpdf"
                               target="_blank" rounded outline
                               color="primary" icon="info"
                               :label="$t('cal.showpdf')">

                        </q-btn>
                        <q-btn v-if="myevent.bodytext" rounded outline class="q-mx-sm"
                               color="primary"
                               :to="`/event/` + myevent._id"
                               :label="$t('event.showpage')">
                        </q-btn>
                    </div>
                    <div class="row justify-end q-mb-lg">
                        <q-btn rounded outline class="q-mx-sm"
                               color="primary" @click="askForInfoEventMenu(myevent)"
                               :label="$t('event.askinfo')">
                        </q-btn>
                        <q-btn rounded class="q-mx-sm"
                               v-if="!myevent.nobookable && !isAlreadyBooked(myevent) && static_data.functionality.BOOKING_EVENTS"
                               color="primary" @click="addBookEventMenu(myevent)"
                               :label="$t('cal.booking')" :disable="!isEventEnabled(myevent)">
                        </q-btn>
                        <q-btn rounded outline class="q-mx-sm"
                               v-if="!myevent.nobookable && isAlreadyBooked(myevent) && static_data.functionality.BOOKING_EVENTS"
                               text-color="red"
                               @click="EditBookEvent(myevent)"
                               :label="$t('cal.modifybooking')">
                        </q-btn>
                        <!--
                                                            <q-btn push rounded v-if="!myevent.nobookable && isAlreadyBooked(myevent)" color="positive" @click="BookEvent(myevent)"
                                                                   :label="$t('cal.booked')">
                                                            </q-btn>
                        -->

                    </div>
                </div>
            </div>
        </CMyPage>
    </div>
</template>
<script lang="ts" src="./CMySingleEvent.ts">
</script>
<style lang="scss" scoped>
    @import './CMySingleEvent.scss';
</style>
