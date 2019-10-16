$t('
<template>
    <div class="landing">
        <CTitle imgbackground="../../statics/images/calendario_eventi.jpg"
                headtitle="Calendario Eventi" sizes="max-height: 120px"></CTitle>


        <q-page class="column">
            <!-- display an myevent -->
            <q-dialog v-model="displayEvent">
                <q-card v-if="myevent">
                    <q-toolbar :class="tools.displayClasses(myevent)"
                               :style="tools.displayStyles(myevent) + ` min-width: `+ tools.myheight_dialog() + `px;`">
                        <q-toolbar-title>
                            {{ $t('cal.event') }}
                        </q-toolbar-title>
                        <q-btn v-if="editable" flat round color="white" icon="delete" v-close-popup
                               @click="deleteEvent(myevent)"></q-btn>
                        <q-btn v-if="editable" flat round color="white" icon="edit" v-close-popup
                               @click="editEvent(myevent)"></q-btn>
                        <q-btn flat round color="white" icon="cancel" v-close-popup></q-btn>
                    </q-toolbar>
                    <q-card-section class="inset-shadow">
                        <q-img :src="`../../statics/`+myevent.img"
                               class="absolute-top"
                               style="height: 150px;">
                        </q-img>
                        <div style="margin-top: 150px;">
                            <div v-if="myevent.allDay" class="text-caption">{{ getEventDate(myevent) }}</div>

                            <div class="cal__title">{{myevent.title}}</div>
                            <div class="cal__details" v-html="myevent.details"></div>
                            <div v-if="myevent.teacher" class="cal__teacher">
                                    <span class="cal__teacher-title">{{$t('cal.teacher')}}: <span
                                            class="margin_with"></span></span>
                                <!--<span class="cal__teacher-content">{{myevent.teacher}}</span>-->
                                <span class="cal__teacher-content">
                                        <q-chip>
                                            <q-avatar>
                                                <img :src="`../../statics/images/avatar/` + myevent.avatar">
                                            </q-avatar>
                                            <span class="cal__teacher-content">{{myevent.teacher}}</span>
                                        </q-chip>
                                        <span v-if="myevent.avatar2 && myevent.teacher2" class="margin_avatar2"></span>
                                        <q-chip v-if="myevent.avatar2 && myevent.teacher2">
                                            <q-avatar>
                                                <img :src="`../../statics/images/avatar/` + myevent.avatar2">
                                            </q-avatar>
                                            <span class="cal__teacher-content">{{myevent.teacher2}}</span>
                                        </q-chip>
                                    </span>
                            </div>
                            <div v-if="myevent.where" class="cal__where">
                                <span v-if="tools.isMobile()"><br/></span>
                                <span class="cal__where-title">{{$t('cal.where')}}: </span>
                                <span class="cal__where-content">
                                        <q-chip>
                                            <q-avatar v-if="myevent.whereicon">
                                                <img :src="`../../statics/images/avatar/` + myevent.whereicon">
                                            </q-avatar>
                                            <q-avatar color="blue" font-size="20px" text-color="white" icon="home">
                                            </q-avatar>
                                            <span class="cal__teacher-content">{{myevent.where}}</span>
                                        </q-chip>
                                    </span>
                            </div>
                            <div v-if="myevent.date" class="cal__when">
                                <span class="cal__where-title">{{$t('cal.when')}}: </span>
                                <span class="cal__where-content">{{func_tools.getDateStr(myevent.date)}}</span>
                                <span v-if="myevent.days > 1" class="cal__where-content"> - {{func_tools.getDateStr(tools.addDays(myevent.date, myevent.days - 1))}}<br/></span>
                                <span v-if="myevent.infoextra" class="cal__hours">
                                        <span class="cal__hours-title">{{$t('cal.hours')}}: </span>
                                        <span class="cal__hours-content">{{ myevent.infoextra }}  </span>
                                    </span>
                                <span v-else>
                                        <span v-if="myevent.time" class="cal__hours">
                                             -
                                            <span class="cal__hours-title">{{$t('cal.hours')}}: </span>
                                            <span class="cal__hours-content">{{$t('cal.starttime')}} {{ myevent.time }} {{$t('cal.endtime')}}: {{
                                        getEndTime(myevent) }}</span>
                                        </span>
                                    </span>
                            </div>
                            <p v-if="myevent.linkpdf" style="margin-top: 10px; text-align: center">
                                <q-btn size="md" type="a" :href="`../../statics/` + myevent.linkpdf"
                                       target="_blank" rounded color="primary" icon="info" :label="$t('cal.showinfo')">
                                </q-btn>
                            </p>
                        </div>
                    </q-card-section>
                    <q-card-actions align="right">
                        <q-btn rounded v-if="!myevent.nobookable && static_data.functionality.BOOKING_EVENTS"
                               color="primary" @click="addBookEventMenu(myevent)" :disable="!isEventEnabled(myevent)"
                               :label="$t('cal.booking')">
                        </q-btn>
                        <q-btn v-else :label="$t('dialog.ok')" color="primary" v-close-popup></q-btn>
                    </q-card-actions>
                </q-card>
            </q-dialog>
            <!-- add/edit an myevent -->

            <q-dialog v-model="addEvent" no-backdrop-dismiss>
                <q-card v-if="addEvent" :style="`min-width: `+ tools.myheight_dialog() + `px;`">
                    <q-toolbar class="bg-primary text-white">
                        <q-toolbar-title>
                            {{ addOrUpdateEvent }} Event
                        </q-toolbar-title>
                        <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
                    </q-toolbar>
                    <q-card-section class="inset-shadow">
                        <q-form
                                v-if="contextDay"
                                ref='myevent'
                                class="q-gutter-md">
                            <q-input v-model="eventForm.title" autofocus label="Title"
                                     :rules="[v => v && v.length > 0 || 'Field cannot be empty']"></q-input>
                            <q-input type="textarea" v-model="eventForm.details"
                                     :label="$t('cal.details')"></q-input>
                            <q-checkbox v-model="eventForm.allDay" :label="$t('cal.alldayevent')"></q-checkbox>

                            <q-input v-if="eventForm.allDay" color="blue-6" filled
                                     v-model="eventForm.dateTimeStart"
                                     :label="$t('cal.enterdate')" mask="####-##-##">
                                <template #append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy v-model="showDateScrollerAllDay">
                                            <q-date-scroller
                                                    v-model="eventForm.dateTimeStart"
                                                    :locale="locale"
                                                    :hour24-format="true"
                                                    :rounded-borders="true"
                                                    border-color="#2196f3"
                                                    bar-color="#2196f3"
                                                    color="white"
                                                    background-color="primary"
                                                    inner-color="primary"
                                                    inner-background-color="white"
                                                    :style="scrollerPopupStyle160"
                                                    @close="() => { showDateScrollerAllDay = false }"
                                            />
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>

                            <div v-else class="q-gutter-sm">
                                <q-input color="blue-6" outlined v-model="eventForm.dateTimeStart"
                                         :label="$t('cal.enterdate')" mask="####-##-## ##:##">
                                    <template #append>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy v-model="showDateTimeScrollerStart">

                                                <q-date-time-scroller
                                                        v-model="eventForm.dateTimeStart"
                                                        :locale="locale"
                                                        :hour24-format="true"
                                                        :rounded-borders="true"
                                                        border-color="#2196f3"
                                                        bar-color="#2196f3"
                                                        color="white"
                                                        background-color="primary"
                                                        inner-color="primary"
                                                        inner-background-color="white"
                                                        :style="scrollerPopupStyle280"
                                                        @close="() => { showDateTimeScrollerStart = false }"
                                                />

                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                                <q-input color="blue-6" outlined v-model="eventForm.dateTimeEnd"
                                         :label="$t('cal.enterEndDateTime')" mask="####-##-## ##:##">
                                    <template #append>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy v-model="showDateTimeScrollerEnd">

                                                <q-date-time-scroller
                                                        v-model="eventForm.dateTimeEnd"
                                                        :locale="locale"
                                                        :hour24-format="true"
                                                        :rounded-borders="true"
                                                        border-color="#2196f3"
                                                        bar-color="#2196f3"
                                                        color="white"
                                                        background-color="primary"
                                                        inner-color="primary"
                                                        inner-background-color="white"
                                                        :style="scrollerPopupStyle280"
                                                        @close="() => { showDateTimeScrollerEnd = false }"
                                                />

                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>

                            <q-input v-model="eventForm.infoextra" :label="$t('cal.infoextra')"></q-input>

                            <q-input v-model="eventForm.icon" label="Icon"></q-input>
                            <q-input
                                    filled
                                    v-model="eventForm.bgcolor"
                            >
                                <template #append>
                                    <q-icon name="colorize" class="cursor-pointer">
                                        <q-popup-proxy>
                                            <q-color v-model="eventForm.bgcolor"></q-color>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </q-form>
                    </q-card-section>
                    <q-card-actions align="right">
                        <q-btn flat :label="$t('dialog.ok')" color="primary" @click="saveEvent"></q-btn>
                        <q-btn flat :label="$t('dialog.cancel')" color="primary" v-close-popup></q-btn>
                    </q-card-actions>
                </q-card>
            </q-dialog>

            <q-dialog v-model="bookEventpage.show" no-backdrop-dismiss>
                <q-card v-if="bookEventpage.show" :style="`min-width: `+ tools.myheight_dialog() + `px;`">
                    <q-toolbar class="bg-primary text-white">
                        <q-toolbar-title>
                            {{$t('cal.booking')}}
                        </q-toolbar-title>
                        <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
                    </q-toolbar>

                    <q-card-section class="inset-shadow">
                        <q-img :src="`../../statics/`+myevent.img"
                               class="absolute-top"
                               style="height: 150px;">
                        </q-img>
                        <div style="margin-top: 150px;">
                            <div v-if="myevent.allDay" class="text-caption">{{ getEventDate(myevent) }}</div>

                            <div class="cal__title">{{myevent.title}}</div>
                            <div v-if="myevent.date" class="cal__when">
                                <span class="cal__where-title">{{$t('cal.when')}}: </span>
                                <span class="cal__where-content">{{func_tools.getDateStr(myevent.date)}}</span>
                                <span v-if="myevent.days > 1" class="cal__where-content"> - {{func_tools.getDateStr(tools.addDays(myevent.date, myevent.days - 1))}}<br/></span>
                                <span v-if="myevent.infoextra" class="cal__hours">
                                        <span class="cal__hours-title">{{$t('cal.hours')}}: </span>
                                        <span class="cal__hours-content">{{ myevent.infoextra }}  </span>
                                    </span>
                                <span v-else>
                                        <span v-if="myevent.time" class="cal__hours">
                                             -
                                            <span class="cal__hours-title">{{$t('cal.hours')}}: </span>
                                            <span class="cal__hours-content"><span v-if="!tools.isMobile()">{{$t('cal.starttime')}} </span>{{ myevent.time }} <span v-if="!tools.isMobile()">{{$t('cal.endtime')}} </span><span v-else> - </span> {{
                                                getEndTime(myevent) }}</span>
                                        </span>
                                    </span>
                            </div>
                            <div class="q-pa-xs">
                                <q-card class="text-white windowcol">
                                    <q-card-section>
                                        <q-checkbox :disable="((bookEventpage.bookedevent && bookEventpage.bookedevent.booked) || (bookEventpage.bookedevent === undefined)) || !isEventEnabled(myevent)" style="color: black;" v-model="bookEventForm.booked" :label="$t('cal.bookingtextdefault')" color="green">
                                        </q-checkbox>

                                        <div v-if="bookEventForm.booked" class="q-gutter-md centermydiv" style="max-width: 150px; margin-top:10px;">
                                            <q-select
                                                    rounded outlined v-model="bookEventForm.numpeople"
                                                    :options="tools.SelectListNumPeople"
                                                    :label="$t('cal.selnumpeople')" emit-value map-options>
                                            </q-select>
                                        </div>

                                        <q-input v-model="bookEventForm.msgbooking" :label="$t('cal.msgbooking')+':'" autogrow>
                                        </q-input>
                                    </q-card-section>
                                </q-card>


                            </div>

                            <p v-if="myevent.linkpdf" style="margin-top: 10px; text-align: center">
                                <q-btn size="md" type="a" :href="`../../statics/` + myevent.linkpdf"
                                       target="_blank" rounded color="primary" icon="info" :label="$t('cal.showinfo')">
                                </q-btn>
                            </p>
                        </div>
                    </q-card-section>
                    <q-card-actions align="right">
                        <q-btn v-if="bookEventpage.state === EState.Modifying" flat :label="$t('cal.cancelbooking')"
                               color="negative" @click="tools.CancelBookingEvent(mythis, myevent, bookEventForm._id, true)"></q-btn>
                        <q-btn v-if="checkseinviaMsg" flat :label="$t('dialog.sendmsg')" color="primary" @click="sendMsg(myevent)"></q-btn>
                        <q-btn v-else flat :label="getTitleBtnBooking" color="primary" @click="saveBookEvent(myevent)"
                               :disable="!(bookEventpage.state === EState.Creating || hasModifiedBooking)"></q-btn>


                        <q-btn flat :label="$t('dialog.cancel')" color="primary" v-close-popup></q-btn>
                    </q-card-actions>
                </q-card>
            </q-dialog>

            <!--v-touch-swipe.mouse.left.right="handleSwipe" -->

            <!-- the calendar -->

            <div>
                <q-toolbar class="mytoolbar">
                    <q-btn color="primary" round icon="keyboard_arrow_left" @click="calendarPrev"/>
                    <q-btn color="primary" round icon="keyboard_arrow_right" @click="calendarNext"/>
                    <q-separator vertical/>
                    <q-btn color="primary" :label="$t('dialog.today')" class="q-mx-md" @click="SetToday"></q-btn>
                    <q-separator vertical/>
                    <q-btn label="GG" color="primary" @click="calendarView = 'day'"/>
                    <q-btn label="Set" color="primary" @click="calendarView = 'week'"/>
                    <q-btn label="Mese" color="primary" @click="calendarView = 'month'"/>
                    <q-space/>
                </q-toolbar>
                <q-separator/>
                <div class="text-center"><span
                        class="q-mr-xl q-toolbar__title nowrap text-blue">{{ title_cal }}</span>
                </div>

                <!--
                        :theme="theme"
                        :enable-themes="enableThemes === true"

                -->
                <q-calendar
                        ref="calendar"
                        class="calendar"
                        :key="keyValue"
                        v-model="selectedDate"
                        :locale="locale"
                        :maxDays="maxDays"
                        animated
                        transition-prev="slide-right"
                        transition-next="slide-left"
                        :dragOverFunc="onDragOver"
                        :dropFunc="onDrop"
                        :view="calendarView"
                        :weekdays="weekdays"
                        :interval-minutes="60 * intervalRangeStep"
                        :interval-start="intervalStart"
                        :interval-count="intervalCount"
                        :hour24-format="hour24Format"
                        :short-month-label="shortMonthLabel"
                        :show-day-of-year-label="showDayOfYearLabel"
                        :hide-header="hideHeader"
                        :no-scroll="noScroll"
                        :short-weekday-label="shortWeekdayLabel"
                        :short-interval-label="shortIntervalLabel"
                        :interval-height="intervalHeight"
                        :resource-height="resourceHeight"
                        :resource-width="resourceWidth"
                        :day-height="dayHeight"
                        :show-month-label="showMonthLabel"
                        :show-work-weeks="showWorkWeeks"
                        :resources="resources"
                        @change="onChanged"
                        @moved="onMoved"
                        @click:date="onDateChanged"
                        @click:interval="addEventMenu"
                        @click:time="addEventMenu"
                        @click:day="addEventMenu"
                        @click:week="addEventMenu"
                        @click:resource="resourceClicked"
                        @click:resource:day="resourceDayClicked"
                        dayPadding="35px 2px"
                >

                    <template #day="{ date }">
                        <template v-for="(event, index) in getEvents(date)">
                            <q-badge
                                    :key="index"
                                    style="width: 100%; cursor: pointer;"
                                    class="ellipsis"
                                    :class="badgeClasses(event, 'day')"
                                    :style="badgeStyles(event, 'day')"
                                    @click.stop.prevent="showEvent(event)"
                                    :draggable="true"
                                    @dragstart.native="(e) => onDragStart(e, event)"
                                    @dragend.native="(e) => onDragEnd(e, event)"
                                    @dragenter.native="(e) => onDragEnter(e, event)"
                                    @touchmove.native="(e) => {}"
                            >
                                <q-icon v-if="event.icon" :name="event.icon" class="q-mr-xs"></q-icon>
                                <span class="ellipsis">{{ event.title }}</span>
                            </q-badge>
                        </template>
                    </template>

                    <template #day-header="{ date }">
                        <div class="row justify-center">
                            <template v-for="(event, index) in eventsMap[date]">
                                <q-badge
                                        v-if="!event.time"
                                        :key="index"
                                        style="width: 100%; cursor: pointer;"
                                        class="ellipsis"
                                        :class="badgeClasses(event, 'header')"
                                        :style="badgeStyles(event, 'header')"
                                        @click.stop.prevent="showEvent(event)"
                                        :draggable="true"
                                        @dragstart.native="(e) => onDragStart(e, event)"
                                        @dragend.native="(e) => onDragEnd(e, event)"
                                        @dragenter.native="(e) => onDragEnter(e, event)"
                                        @touchmove.native="(e) => {}"
                                >
                                    <q-icon v-if="event.icon" :name="event.icon" class="q-mr-xs"></q-icon>
                                    <span class="ellipsis">{{ event.title }}</span>
                                </q-badge>
                                <q-badge
                                        v-else
                                        :key="index"
                                        class="q-ma-xs"
                                        :class="badgeClasses(event, 'header')"
                                        :style="badgeStyles(event, 'header')"
                                        style="width: 10px; max-width: 10px; height: 10px; max-height: 10px"
                                />
                            </template>
                        </div>
                    </template>
                    <template #day-body="{ date, timeStartPos, timeDurationHeight }">
                        <template v-for="(event, index) in getEvents(date)">
                            <q-badge
                                    v-if="event.time"
                                    :key="index"
                                    class="my-event justify-center ellipsis"
                                    :class="badgeClasses(event, 'body')"
                                    :style="badgeStyles(event, 'body', timeStartPos, timeDurationHeight)"
                                    @click.stop.prevent="showEvent(event)"
                                    :draggable="true"
                                    @dragstart.native="(e) => onDragStart(e, event)"
                                    @dragend.native="(e) => onDragEnd(e, event)"
                                    @dragenter.native="(e) => onDragEnter(e, event)"
                                    @touchmove.native="(e) => {}"
                            >
                                <q-icon v-if="event.icon" :name="event.icon" class="q-mr-xs"></q-icon>
                                <span class="ellipsis">{{ event.title }}</span>
                            </q-badge>
                        </template>
                    </template>
                </q-calendar>
            </div>

        </q-page>

        <div>
            <p class="text-subtitle1 text-red text-center">LISTA PROSSIMI EVENTI:</p>

            <q-markup-table wrap-cells bordered separator="horizontal" class="listaev__table">
                <tbody>
                <tr v-for="(event, index) in getEventList()" class="listaev listaev__table">
                    <td :class="clEvent(event)">
                        <p class="listaev__align_center_mobile">
                            <img :src="`../../statics/`+event.img"
                                 class="text-left padding_cell listaev__tdimg listaev__img">
                            <q-chip dense v-if="isAlreadyBooked(event)" class="cltexth4 chipbooked shadow-5"
                                    color="green" text-color="white"
                                    icon="event_available"
                                    dense>{{$t('cal.booked')}}
                            </q-chip>
                        </p>
                        <div class="listaev__date listaev__align_center_mobile">

                            <div v-if="event.infoextra">
                                    <span class="listaev__date">{{func_tools.getDateStr(event.date)}} - <span
                                            class="cal__hours-content">{{ event.infoextra }}</span> </span>
                            </div>
                            <div v-else>
                                <div v-if="event.date" class="listaev__date">
                                    {{func_tools.getDateStr(event.date)}}
                                    <span v-if="event.time" class="cal__hours-content"> - {{ event.time }} <span
                                            v-if="event.duration">- {{ getEndTime(event) }}</span></span>
                                    <span v-if="event.days > 1"><br/>{{func_tools.getDateStr(tools.addDays(event.date, event.days - 1))}}</span>
                                </div>
                            </div>

                        </div>

                        <div class="">

                            <div style="margin: 10px;"></div>

                            <div class="listaev__align_center_mobile">
                                <!-- Se c'è un link, allora -->
                                <q-btn v-if="event.linkpdf" size="md" type="a"
                                       :href="`../../statics/` + event.linkpdf"
                                       target="_blank"
                                       ripple rounded :label="event.title" :icon="event.icon"
                                       :color="event.bgcolor" text-color="white" glossy>

                                </q-btn>
                                <!-- altrimenti mostra solo Chip -->
                                <div v-else>
                                    <div v-if="tools.isMobile()" class="cltexth3"
                                         :style="`background-color: ${event.bgcolor} !important; color: white !important;`">
                                        {{event.title}}
                                    </div>
                                    <q-chip v-else class="cltexth3" :color="event.bgcolor" text-color="white"
                                            :icon="event.icon"
                                            dense>{{event.title}}
                                    </q-chip>
                                </div>
                            </div>

                            <div style="margin: 10px;"></div>

                            <p class="listaev__details" v-html="event.details"></p>
                            <div v-if="event.teacher" class="">
                                    <span class="cal__teacher-title">{{$t('cal.teacher')}}: <span
                                            class="margin_with"></span></span>

                                <q-chip>
                                    <q-avatar>
                                        <img :src="`../../statics/images/avatar/` + event.avatar">
                                    </q-avatar>
                                    <span class="cal__teacher-content">{{event.teacher}}</span>
                                </q-chip>
                                <span v-if="event.avatar2" class="margin_avatar2"></span>
                                <q-chip v-if="event.avatar2 && event.teacher2">
                                    <q-avatar>
                                        <img :src="`../../statics/images/avatar/` + event.avatar2">
                                    </q-avatar>
                                    <span class="cal__teacher-content">{{event.teacher2}}</span>
                                </q-chip>

                                <span v-if="event.where" class="">
                                        <span v-if="tools.isMobile()"><br/></span>
                                        <span class="cal__where-title">{{$t('cal.where')}}: </span>

                                        <q-chip>
                                            <q-avatar v-if="event.whereicon">
                                                <img :src="`../../statics/images/avatar/` + event.whereicon">
                                            </q-avatar>
                                            <q-avatar color="blue" font-size="20px" text-color="white" icon="home">
                                            </q-avatar>
                                            <span class="cal__teacher-content">{{event.where}}</span>
                                        </q-chip>
                                    </span>
                            </div>
                            <p class="text-center">
                                        <span v-if="event.linkpdf" class="">
                                            <q-btn size="md" type="a" :href="`../../statics/` + event.linkpdf"
                                                   target="_blank" rounded color="primary" icon="info"
                                                   :label="$t('cal.showinfo')">

                                            </q-btn>
                                        </span>
                            </p>
                            <div class="row justify-end">
                                <q-btn rounded outline
                                       v-if="!event.nobookable && !isAlreadyBooked(event) && static_data.functionality.BOOKING_EVENTS"
                                       color="primary" @click="addBookEventMenu(event)"
                                       :label="$t('cal.booking')" :disable="!isEventEnabled(event)">
                                </q-btn>
                                <q-btn rounded outline
                                       v-if="!event.nobookable && isAlreadyBooked(event) && static_data.functionality.BOOKING_EVENTS"
                                       text-color="red"
                                       @click.native="EditBookEvent(event)"
                                       :label="$t('cal.modifybooking')">
                                </q-btn>
                                <!--
                                                                    <q-btn push rounded v-if="!event.nobookable && isAlreadyBooked(event)" color="positive" @click="BookEvent(event)"
                                                                           :label="$t('cal.booked')">
                                                                    </q-btn>
                                -->

                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </q-markup-table>

            <!-- Example of a Dialog with a Card -->
            <!--
                            <q-dialog v-model="card">
                                <q-card>
                                    <q-img src="https://media-cdn.tripadvisor.com/media/photo-s/0a/47/a8/91/chicken-salad-sandwich.jpg" />

                                    <q-card-section>
                                        <q-btn
                                                fab
                                                color="primary"
                                                icon="place"
                                                class="absolute"
                                                style="top: 0; right: 12px; transform: translateY(-50%);"
                                        />

                                        <div class="row no-wrap items-center">
                                            <div class="col text-h6 ellipsis">Cafe Basilico</div>
                                            <div class="col-auto text-grey q-pt-md">
                                                <q-icon name="place" /> 250 ft
                                            </div>
                                        </div>

                                        <q-rating v-model="stars" :max="5" size="32px" />
                                    </q-card-section>

                                    <q-card-section>
                                        <div class="text-subtitle1">$・Italian, Cafe</div>
                                        <div class="text-subtitle2 text-grey">Small plates, salads & sandwiches in an intimate setting.</div>
                                    </q-card-section>

                                    <q-separator />

                                    <q-card-actions>
                                        <q-btn flat round icon="event" v-close-popup />
                                        <q-btn flat v-close-popup>5:30PM</q-btn>
                                        <q-btn flat v-close-popup>7:30PM</q-btn>
                                        <q-btn flat v-close-popup>9:00PM</q-btn>
                                        <q-btn flat color="primary" v-close-popup>Reserve</q-btn>
                                    </q-card-actions>
                                </q-card>
                            </q-dialog>
            -->
        </div>
    </div>
</template>
<script lang="ts" src="./CEventsCalendar.ts">
</script>
<style lang="scss" scoped>
    @import './CEventsCalendar.scss';
</style>
