<template>
  <div class="landing">
    <div v-if="!tools.IsLogged()">
      <div class="centermydiv">
        <q-banner class="bg-secondary text-white">
          Il Calendario sarà visibile solo dopo aver effettuato l'accesso
        </q-banner>

      </div>
    </div>
    <div v-else>
      <!-- display an myevent -->
      <q-dialog v-model="displayEvent">
        <q-card v-if="myevent" :style="`min-width: ` + tools.myheight_dialog() + `px;`">
          <q-toolbar class="bg-primary text-white">
            <!--<q-toolbar :class="tools.displayClasses(myevent)"-->
            <!--:style="tools.displayStyles(myevent) + ` min-width: `+ tools.myheight_dialog() + `px;`">-->
            <q-toolbar-title>
              {{ $t('cal.event') }}
            </q-toolbar-title>
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
            <q-btn flat round color="white" icon="cancel" v-close-popup
                   @click="myevent = null; displayEvent = false"></q-btn>
          </q-toolbar>
          <q-card-section class="inset-shadow">
            <q-img :src="getImgEvent(myevent)"
                   class="absolute-top"
                   style="height: 150px;"
                   :alt="myevent.title">
            </q-img>
            <div style="margin-top: 150px;">
              <!--<div v-if="myevent.allday" class="text-caption">{{ getEventDate(myevent) }}</div>-->


              <q-chip
                :style="`background-color: ${myevent.bgcolor} !important; color: white !important;`"
                text-color="white"
                class="shadow-5 q-mb-md" dense>
                {{ myevent.title }}
              </q-chip>
              <div class="cal__details" v-html="myevent.details"></div>
              <div v-if="myevent.teacher" class="cal__teacher">
                            <span class="cal__teacher-title">{{ $t('cal.teacher') }}: <span
                              class="margin_with"></span></span>
                <!--<span class="cal__teacher-content">{{myevent.teacher}}</span>-->
                <CMyTeacher :username="myevent.teacher"></CMyTeacher>
                <CMyTeacher :username="myevent.teacher2"></CMyTeacher>
              </div>
              <div v-if="myevent.wherecode" class="cal__where">
                <!--<span v-if="tools.isMobile()"><br/></span>-->
                <span class="cal__where-title">{{ $t('cal.where') }}: </span>
                <span class="cal__where-content">
                                    <q-chip>
                                        <q-avatar v-if="getWhereIcon(myevent.wherecode)">
                                            <img :src="`../../statics/images/avatar/` + getWhereIcon(myevent.wherecode)"
                                                 alt="Località">
                                        </q-avatar>
                                        <q-avatar v-else color="blue" font-size="20px" text-color="white" icon="home">
                                        </q-avatar>
                                        <span class="cal__teacher-content">{{ getWhereName(myevent.wherecode) }}</span>
                                    </q-chip>
                                </span>
              </div>
              <div v-if="myevent.price && isShowPrice(myevent)" class="cal__quota">
                <span class="cal__quota-title">{{ $t('event.price') }}:</span>
                <q-chip>
                  <span class="cal__quota-content">{{ getPrice(myevent) }}</span>
                </q-chip>
              </div>
              <div v-if="myevent.dateTimeStart" class="cal__when">
                                <span class="cal__where-title">{{ $t('cal.when') }}:
                                    <span v-html="tools.getstrDateTimeEvent(mythis, myevent, true)"></span>
                                </span>
              </div>
              <p v-if="myevent.linkpdf" style="margin-top: 10px; text-align: center">
                <q-btn size="md" type="a" :href="`../../statics/` + myevent.linkpdf"
                       target="_blank" rounded color="primary" icon="info" :label="$t('cal.showpdf')">
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
      <!-- id_bookedeventadd/edit an myevent -->

      <q-dialog v-model="addEvent" no-backdrop-dismiss>
        <q-card v-if="addEvent" :style="`min-width: `+ tools.myheight_dialog() + `px;`">
          <q-toolbar class="bg-primary text-white">
            <q-toolbar-title>
              {{ addOrUpdateEvent }} {{ $t('cal.event') }}
            </q-toolbar-title>
            <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
          </q-toolbar>
          <q-card-section class="inset-shadow">
            <q-form
              v-if="contextDay"
              ref='myevent'
              class="q-gutter-sm">

              <CMySelect :label="$t('event.typol')" :value.sync="eventForm.typol" optval="typol_code"
                         optlab="label"
                         :options="getDisciplines" :useinput="false">
              </CMySelect>

              <q-input color="grey-1" v-model="eventForm.short_tit" autofocus
                       :input-style="`background-color: ${eventForm.bgcolor} !important; color: white !important; font-weight: bold; `"
                       borderless rounded dense :label="$t('event.short_tit')"
              ></q-input>

              <q-input color="grey-1" v-model="eventForm.title" autofocus
                       :input-style="`background-color: ${eventForm.bgcolor} !important; color: white !important; font-weight: bold; `"
                       borderless rounded dense :label="$t('event.title')"
                       :rules="[v => v && v.length > 0 || $t('event.notempty')]"></q-input>


              <q-tabs
                v-model="tabeditor"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <q-tab name="details" label="Descrizione"/>
                <q-tab name="container" label="Contenuto"/>
              </q-tabs>


              <q-tab-panels v-model="tabeditor" animated>
                <q-tab-panel name="details">
                  <CMyEditor :value.sync="eventForm.details">

                  </CMyEditor>
                </q-tab-panel>
                <q-tab-panel name="container">
                  <CMyEditor :value.sync="eventForm.bodytext">

                  </CMyEditor>
                </q-tab-panel>

              </q-tab-panels>


              <!--<q-checkbox v-model="eventForm.allday" :label="$t('cal.alldayevent')"></q-checkbox>-->

              <div class="q-gutter-sm row myflex">
                <CDateTime
                  :value.sync="eventForm.dateTimeStart"
                  :label="$t('cal.eventstartdatetime')"
                  :readonly="false">
                </CDateTime>
                <CDateTime
                  :value.sync="eventForm.dateTimeEnd"
                  :label="$t('cal.enterEndDateTime')"
                  :readonly="false">
                </CDateTime>
                <q-input dense v-model="eventForm.infoextra" :label="$t('cal.infoextra')"></q-input>
              </div>

              <div class="q-gutter-sm myflex">

                <CMySelect myclass="myflex" :label="$t('cal.teacher') + ' 1°'"
                           :value.sync="eventForm.teacher"
                           optval="username" :optlab="(item) => item.name + ' ' + item.surname"
                           :options="getTeachersArr" :useinput="false">
                </CMySelect>
                <CMySelect myclass="myflex" :label="$t('cal.teacher') + ' 2°'"
                           :value.sync="eventForm.teacher2"
                           optval="username" :optlab="(item) => item.name + ' ' + item.surname"
                           :options="getTeachersArr" :useinput="false">
                </CMySelect>
              </div>

              <div class="q-gutter-sm myflex wrap">
                <CMySelect :label="$t('cal.where')" :value.sync="eventForm.wherecode" optval="code"
                           optlab="placename"
                           :options="getWhereArr" :useinput="false">
                </CMySelect>
                <q-checkbox class="myflex wrap" dense v-model="eventForm.internal"
                            :label="$t('event.internal')"></q-checkbox>
                <q-checkbox class="myflex wrap" dense v-model="eventForm.lunchAvailable"
                            :label="$t('event.lunchAvailable')"></q-checkbox>
                <q-checkbox class="myflex wrap" dense v-model="eventForm.dinnerAvailable"
                            :label="$t('event.dinnerAvailable')"></q-checkbox>
                <q-checkbox class="myflex wrap" dense v-model="eventForm.news"
                            :label="$t('event.news')"></q-checkbox>
                <q-checkbox class="myflex wrap" dense v-model="eventForm.nobookable"
                            :label="$t('event.nobookable')"></q-checkbox>
                <q-checkbox class="myflex wrap" dense v-model="eventForm.canceled"
                            :label="$t('event.canceled')"></q-checkbox>
              </div>

              <div class="q-gutter-sm row items-start">

              </div>

              <div class="q-gutter-sm myflex">

                <q-input class="myflex" dense v-model="eventForm.img"
                         :label="$t('event.img')"></q-input>
                <q-input class="myflex" dense v-model="eventForm.img_small"
                         :label="$t('event.img_small')"></q-input>

              </div>

              <div class="q-gutter-sm myflex">

                <q-input
                  class="myflex"
                  :style="`background-color: ${eventForm.bgcolor} !important; color: white !important;`"
                  filled
                  color="white"
                  dense
                  :label="$t('event.bgcolor')"
                  v-model="eventForm.bgcolor">
                  <template #append>
                    <q-icon name="colorize" class="cursor-pointer" color="white">
                      <q-popup-proxy>
                        <q-color format-model="hex" v-model="eventForm.bgcolor"></q-color>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <q-input class="myflex" dense v-model="eventForm.icon"
                         :label="$t('event.icon')"></q-input>
              </div>

              <div class="q-gutter-sm myflex">

                <CMySelect :label="$t('event.contribtype')" :value.sync="eventForm.contribtype"
                           optval="_id" optlab="label"
                           :useinput="false"
                           :newvaluefunc="createContribType" :options="getContribTypeArr">
                </CMySelect>

                <div v-if="isShowPrice(eventForm)">
                  <q-input dense type="number" v-model="eventForm.price"
                           :label="$t('event.price')"></q-input>
                  <q-input dense v-model="eventForm.infoafterprice"
                           :label="$t('event.infoafterprice')"></q-input>
                </div>
              </div>

              <div class="q-gutter-sm myflex">
                <q-input class="myflex" dense v-model="eventForm.linkpage"
                         :label="$t('event.linkpage')"></q-input>
                <q-input class="myflex" dense v-model="eventForm.linkpdf"
                         :label="$t('event.linkpdf')"></q-input>
              </div>

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
              {{ $t('cal.booking') }}
            </q-toolbar-title>
            <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
          </q-toolbar>

          <q-card-section class="inset-shadow">
            <q-img :src="getImgEvent(myevent)"
                   class="absolute-top"
                   style="height: 150px;"
                   :alt="myevent.title">
            </q-img>
            <div style="margin-top: 150px;">

              <q-chip
                :style="`background-color: ${myevent.bgcolor} !important; color: white !important;`"
                text-color="white"
                class="shadow-5 q-mb-md" dense>
                {{ myevent.title }}
              </q-chip>
              <div v-if="myevent.dateTimeStart" class="cal__when">
                                <span class="cal__where-title">{{ $t('cal.when') }}:
                                    <span v-html="tools.getstrDateTimeEvent(mythis, myevent, true)"></span>
                                </span>
              </div>
              <div class="q-pa-xs">
                <q-card class="text-white windowcol" style="display: block; ">
                  <q-card-section class="q-pa-xs">

                    <div style="display: inline-flex; " class="q-px-xs centermydiv">
                      <q-checkbox
                        :disable="((bookEventpage.bookedevent && bookEventpage.bookedevent.booked) || (bookEventpage.bookedevent === undefined)) || !isEventEnabled(myevent)"
                        style="color: black;" v-model="bookEventForm.booked"
                        :label="$t('cal.bookingtextdefault')" color="green">
                      </q-checkbox>

                      <div v-if="bookEventForm.booked" class="q-gutter-xs q-mx-xs"
                           style="min-width: 140px;">
                        <q-select
                          rounded outlined v-model="bookEventForm.numpeople"
                          :options="tools.SelectListNumPeople"
                          :label="$t('cal.selnumpeople')" emit-value map-options>
                        </q-select>
                      </div>
                    </div>
                    <div v-if="myevent.lunchAvailable" class="q-px-xs centermydiv" style="display: inline-flex; ">
                      <div style="display: inline-flex; " class="q-px-xs centermydiv">
                        <div class="itemprenota">{{ $t('cal.selnumpeopleLunch') }}</div>
                        <div class="q-gutter-xs"
                             style="min-width: 140px; margin-left: 10px;">
                          <q-select
                            rounded outlined v-model="bookEventForm.numpeopleLunch"
                            :options="tools.SelectListNumPeople"
                            :label="$t('cal.Lunch')" emit-value map-options>
                          </q-select>
                        </div>
                      </div>
                    </div>
                    <br>
                    <div v-if="myevent.dinnerAvailable" class="q-px-xs centermydiv" style="display: inline-flex; ">
                      <div style="display: inline-flex; " class="q-px-xs centermydiv">
                        <div class="itemprenota">{{ $t('cal.selnumpeopleDinner') }}</div>
                        <div class="q-gutter-xs " style="min-width: 140px; margin-left: 10px;">
                          <q-select
                            rounded outlined v-model="bookEventForm.numpeopleDinner"
                            :options="tools.SelectListNumPeople"
                            :label="$t('cal.Dinner')" emit-value map-options>
                          </q-select>
                        </div>
                      </div>
                    </div>

                    <q-input v-model="bookEventForm.msgbooking" :label="$t('cal.msgbooking')+':'"
                             type="textarea" debounce="500"
                             input-class="myinput-area"
                    >
                    </q-input>
                  </q-card-section>
                </q-card>


              </div>

              <p v-if="myevent.linkpdf" style="margin-top: 10px; text-align: center">
                <q-btn size="md" type="a" :href="`../../statics/` + myevent.linkpdf"
                       target="_blank" rounded color="primary" icon="info" :label="$t('cal.showpdf')">
                </q-btn>
              </p>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn v-if="bookEventpage.state === EState.Modifying" flat :label="$t('cal.cancelbooking')"
                   color="negative"
                   @click="tools.CancelBookingEvent(mythis, myevent, bookEventForm._id, true)"></q-btn>
            <q-btn v-if="checkseinviaMsg" flat :label="$t('dialog.sendonlymsg')" color="primary"
                   @click="sendMsg(myevent)"></q-btn>
            <q-btn v-else flat :label="getTitleBtnBooking" color="primary" @click="saveBookEvent(myevent)"
                   :disable="!(bookEventpage.state === EState.Creating || hasModifiedBooking)"></q-btn>


            <q-btn flat :label="$t('dialog.cancel')" color="primary" v-close-popup></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="askInfopage.show" no-backdrop-dismiss>
        <q-card v-if="askInfopage.show" :style="`min-width: `+ tools.myheight_dialog() + `px;`">
          <q-toolbar class="bg-primary text-white">
            <q-toolbar-title>
              {{ $t('cal.booking') }}
            </q-toolbar-title>
            <q-btn flat round color="white" icon="close" v-close-popup></q-btn>
          </q-toolbar>

          <q-card-section class="inset-shadow">
            <q-img :src="getImgEvent(myevent)"
                   class="absolute-top"
                   style="height: 150px;"
                   :alt="myevent.title">
            </q-img>
            <div style="margin-top: 150px;">

              <q-chip
                :style="`background-color: ${myevent.bgcolor} !important; color: white !important;`"
                text-color="white"
                class="shadow-5 q-mb-md" dense>
                {{ myevent.title }}
              </q-chip>
              <div v-if="myevent.dateTimeStart" class="cal__when">
                                <span class="cal__where-title">{{ $t('cal.when') }}:
                                    <span v-html="tools.getstrDateTimeEvent(mythis, myevent, true)"></span>
                                </span>
              </div>
              <div class="q-pa-xs">
                <q-card class="text-white windowcol">
                  <q-card-section>
                    <q-input v-model="askInfoForm.message" :label="$t('cal.msgbooking')+':'"
                             autofocus debounce="500" type="textarea"
                             input-class="myinput-area">
                    </q-input>
                  </q-card-section>
                </q-card>

              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat :label="$t('dialog.sendmsg')" color="primary"
                   @click="sendMsg(myevent)"></q-btn>
            <q-btn flat :label="$t('dialog.cancel')" color="primary" v-close-popup></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!--v-touch-swipe.mouse.left.right="handleSwipe" -->

      <!-- the calendar -->
      <q-page v-if="visuAllCal && showfirstN === 0" class="column" style="min-height: 200px !important;">

        <div>
          <q-toolbar class="mytoolbar">
            <q-btn color="primary" round icon="keyboard_arrow_left" @click="calendarPrev"/>
            <q-btn color="primary" round icon="keyboard_arrow_right" @click="calendarNext"/>
            <q-separator vertical/>
            <!--<q-btn color="primary" :label="$t('dialog.today')" class="q-mx-md" @click="SetToday"></q-btn>-->
            <q-separator vertical/>
            <!--<q-btn label="GG" color="primary" @click="calendarView = 'day'"/>
            <q-btn label="Set" color="primary" @click="calendarView = 'week'"/>-->
            <q-btn label="5 GG" color="primary" @click="calendarView = '5day-agenda'"/>
            <q-btn label="Sett" color="primary" @click="calendarView = 'week-agenda'"/>
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
            v-if="visuAllCal"
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
                  :class="badgeClasses(event, 'day')"
                  :style="badgeStyles(event, 'day')"
                  @click.stop.prevent="showEvent(event)"
                  :draggable="tools.isManager()"
                  @dragstart.native="(e) => onDragStart(e, event)"
                  @dragend.native="(e) => onDragEnd(e, event)"
                  @dragenter.native="(e) => onDragEnter(e, event)"
                  @touchmove.native="(e) => {}"
                >

                  <span class="">{{ getTitleEv(event) }}</span>
                </q-badge>
                <div class="text-center"><img :src="getImgEvent(event)"
                                              class="text-center listaev__tdimg_small" :alt="event.title">
                </div>
              </template>
            </template>

            <template #day-header="{ date }">
              <div class="row justify-center">
                <template v-for="(event, index) in eventsMap[date]">
                  <q-badge
                    :key="index"
                    class="q-ma-xs"
                    :class="badgeClasses(event, 'header')"
                    :style="badgeStyles(event, 'header')"
                    style="width: 10px; max-width: 10px; height: 10px; max-height: 10px"
                  ></q-badge>
                </template>
              </div>
            </template>
            <template #day-body="{ date, timeStartPos, timeDurationHeight }">
              <template v-for="(event, index) in getEvents(date)">
                <div
                  :key="index"
                  :label="tools.getstrTime(event.dateTimeStart)"
                  class="justify-start q-ma-sm shadow-5 bg-blue-grey-6"
                >
                  <div v-if="getImgEvent(event)" class="row justify-center"
                       style="margin-top: 30px; width: 100%;">
                    <q-avatar
                      style="margin-top: -25px; margin-bottom: 10px; font-size: 60px; max-height: 50px;">
                      <img :src="getImgEvent(event)" style="border: #a4edf6 solid 5px;">
                    </q-avatar>
                  </div>
                  <div class="col-12 q-px-xs text-white">
                    <strong>{{ tools.getstrTime(event.dateTimeStart) }}</strong>
                  </div>
                  <div v-if="getTitleEv(event)" class="col-12 q-px-xs text-white"
                       style="font-size: 0.75rem;">
                    <q-badge
                      :key="index"
                      multi-line
                      class="my-event-rel justify-center rounded-borders"
                      :class="badgeClasses(event, 'body')"
                      :style="badgeStyles(event, 'body', timeStartPos, timeDurationHeight)"
                      @click.stop.prevent="showEvent(event)"
                      :draggable="tools.isManager()"
                      @dragstart.native="(e) => onDragStart(e, event)"
                      @dragend.native="(e) => onDragEnd(e, event)"
                      @dragenter.native="(e) => onDragEnter(e, event)"
                      @touchmove.native="(e) => {}"
                    >
                      <span class="">{{ getTitleEv(event) }}</span> <br>

                    </q-badge>
                  </div>
                </div>
                <!--
                <q-badge
                        :key="index"
                        class="my-event justify-center"
                        :class="badgeClasses(event, 'body')"
                        :style="badgeStyles(event, 'body', timeStartPos, timeDurationHeight)"
                        @click.stop.prevent="showEvent(event)"
                        :draggable="tools.isManager()"
                        @dragstart.native="(e) => onDragStart(e, event)"
                        @dragend.native="(e) => onDragEnd(e, event)"
                        @dragenter.native="(e) => onDragEnter(e, event)"
                        @touchmove.native="(e) => {}"
                >
                    <q-icon v-if="event.icon" :name="event.icon" class="q-mr-xs"></q-icon>
                    <p class="">{{ getTitleEv(event) }}</p> <br>
                    <div class="text-center"><img :src="getImgEvent(event)"
                                                  class="text-center listaev__tdimg_small"
                                                  :alt="event.title">
                    </div>


                </q-badge> -->
              </template>
            </template>
          </q-calendar>
        </div>

      </q-page>

      <div class="q-mt-md">
        <div v-if="!mysingleevent">
          <p class="text-subtitle1 text-red bg-amber text-center ">LISTA PROSSIMI <span
            v-if="showfirstN > 0">{{ showfirstN }}</span>
            EVENTI:</p>
          <q-markup-table wrap-cells bordered separator="horizontal" class="listaev__table">
            <tbody>
            <tr v-for="(event, index) in getEventList()" class="listaev listaev__table">
              <td :class="clEvent(event)">
                <div class="listaev__align_chips">
                  <img :src="getImgEvent(event)"
                       @click="selectEvent(event)"
                       class="text-left padding_cell listaev__tdimg listaev__img cursor-pointer q-mx-sm"
                       :style="getStyleByEvent(event, event === myevent)"
                       :alt="event.title">
                  <q-chip dense v-if="isAlreadyBooked(event)" class="cltexth4 chipbooked shadow-5 q-mb-md"
                          color="green" text-color="white"
                          icon="event_available">{{ $t('cal.booked') }}
                  </q-chip>

                  <q-chip v-if="event === myevent && !displayEvent && editable"
                          class="text-center shadow-5 glossy bg-blue chipmodif">

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
                  <q-chip v-if="event.news" class="cltexth4 chipnews shadow-5 glossy text-right"
                          color="red"
                          text-color="white" icon-right="star" icon="star" dense
                          style="">
                    {{ $t('event.news') }}
                  </q-chip>

                </div>

                <div class="listaev__date listaev__align_center_mobile">
                  <span v-html="tools.getstrDateTimeEvent(mythis, event, true)"></span>
                </div>

                <div class="listaev__align_center_mobile">

                  <div style="margin: 10px;"></div>

                  <div class="">
                    <!-- Se c'è un link, allora -->
                    <q-btn size="md" type="a"
                           :to="`/event/${event.typol}/${event._id}`"
                           target="_blank"
                           :style="`background-color: ${event.bgcolor} !important; color: white !important;`"
                           ripple
                           rounded
                           :label="event.title" :icon="event.icon"
                           :color="event.bgcolor" text-color="white" glossy>

                    </q-btn>
                    <!--<div v-if="tools.isMobile()" class="cltexth3 text-center"-->
                    <!--:style="`background-color: ${event.bgcolor} !important; color: white !important;`">-->
                    <!--{{event.title}}-->
                    <!--</div>-->
                    <!--<q-chip v-else class="cltexth3 text-center"-->
                    <!--:style="`background-color: ${event.bgcolor} !important; color: white !important;`"-->
                    <!--text-color="white"-->
                    <!--:icon="event.icon"-->
                    <!--dense>{{event.title}}-->
                    <!--</q-chip>-->
                  </div>

                  <div style="margin: 10px;"></div>

                  <p class="listaev__details" v-html="event.details"></p>
                  <div v-if="event.teacher" class="">
                                    <span class="cal__teacher-title">{{ $t('cal.teacher') }}: <span
                                      class="margin_with"></span></span>

                    <CMyTeacher :username="event.teacher"></CMyTeacher>
                    <CMyTeacher :username="event.teacher2"></CMyTeacher>

                    <span v-if="event.wherecode" class="">
                                        <span v-if="tools.isMobile()"><br/></span>
                                        <span class="cal__where-title">{{ $t('cal.where') }}: </span>

                                        <q-chip>
                                            <q-avatar v-if="getWhereIcon(event.wherecode)">
                                                <img
                                                  :src="`../../statics/images/avatar/` + getWhereIcon(event.wherecode)"
                                                  :alt="event.wherecode">
                                            </q-avatar>
                                            <q-avatar color="blue" font-size="20px" text-color="white" icon="home">
                                            </q-avatar>
                                            <span
                                              class="cal__teacher-content">{{ getWhereName(event.wherecode) }}</span>
                                        </q-chip>
                                    </span>
                  </div>
                  <div v-if="event.contribtype" class="">
                                <span class="cal__quota-title">{{ $t('event.price') }}:<span
                                  class="margin_with"></span></span>
                    <span v-if="!isShowPrice(event)" class="">
                                    <q-chip class="glossy" color="orange" text-color="white">
                                        <span
                                          class="cal__quota-content">{{ getContribtypeById(event.contribtype) }}</span>
                                    </q-chip>
                                </span>

                    <q-chip v-if="event.price && isShowPrice(event)" class="glossy" color="orange"
                            text-color="white" icon-right="star">
                      <span class="cal__quota-content">{{ getPrice(event) }}</span>
                    </q-chip>
                  </div>


                  <div class="row justify-end">
                    <q-btn v-if="event.linkpdf" size="md" type="a"
                           :href="`../../statics/` + event.linkpdf"
                           target="_blank" rounded color="primary" icon="info"
                           class="q-ma-sm"
                           :label="$t('cal.showpdf')">

                    </q-btn>
                    <q-btn v-if="event.bodytext" rounded outline
                           class="q-ma-sm"
                           color="primary"
                           :to="`/event/${event.typol}/${event._id}`"
                           :label="$t('event.showpage')">
                    </q-btn>
                    <q-btn rounded outline class="q-ma-sm"
                           color="primary" @click="askForInfoEventMenu(event)"
                           :label="$t('event.askinfo')">
                    </q-btn>
                    <q-btn rounded outline class="q-ma-sm"
                           v-if="!event.nobookable && !isAlreadyBooked(event) && static_data.functionality.BOOKING_EVENTS"
                           color="primary" @click="addBookEventMenu(event)"
                           :label="$t('cal.booking')" :disable="!isEventEnabled(event)">
                    </q-btn>
                    <q-btn rounded outline class="q-ma-sm"
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

          <div class="q-ma-lg text-center">
            <q-btn rounded type="a" to="/calendario-eventi" color="primary" icon="event" size="lg"
                   :label="$t('cal.showlastschedule')">
            </q-btn>

          </div>

        </div>
        <div v-else>
          <CMySingleEvent :myevent="mysingleevent" calendarView="month" :iseditable="editable"
                          @duplicateEvent="duplicateEvent"
                          @askForInfoEventMenu="askForInfoEventMenu"
                          @deleteEvent="deleteEvent"
                          @editEvent="editEvent"
                          @addBookEventMenu="addBookEventMenu"
                          @EditBookEvent="EditBookEvent">

          </CMySingleEvent>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./CEventsCalendar.ts">
</script>
<style lang="scss" scoped>
@import './CEventsCalendar.scss';
</style>
