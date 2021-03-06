import Vue from 'vue'
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import { CalendarStore, UserStore } from '@store'

import { Logo } from '../../components/logo/index'

import { Footer } from '../../components/Footer/index'

import { tools } from '../../store/Modules/tools'
import { toolsext, func_tools } from '@src/store/Modules/toolsext'
import { db_data } from '@src/db/db_data'
import { colors, Screen, Platform, date } from 'quasar'

import { CTitle } from '../../components/CTitle/index'
import { CImgText } from '../../components/CImgText/index'
import { CMySelect } from '../../components/CMySelect/index'
import { CMyEditor } from '../../components/CMyEditor/index'
import { stop, prevent, stopAndPrevent } from 'quasar/src/utils/event'

import { CTodo } from '@src/components/todos/CTodo'
import { SingleProject } from '@src/components/projects/SingleProject'
import { IEvents } from '@src/model'
import { IBookedEvent, IBookedEventPage, EState } from '@src/model/Calendar'
import { costanti } from '@src/store/Modules/costanti'
import router from '@router'
import { static_data } from '@src/db/static_data'
import translate from '@src/globalroutines/util'
import { lists } from '../../store/Modules/lists'
import { GlobalStore, MessageStore } from '../../store/Modules'
import { IMessagePage, IMessage, IIdentity, MsgDefault } from '../../model'
import MixinUsers from '../../mixins/mixin-users'
import MixinOperator from '../../mixins/mixin-operator'
import MixinEvents from '../../mixins/mixin-events'
import { CDateTime } from '../CDateTime'
import { CMyAvatar } from '../CMyAvatar'
import { CMySingleEvent } from '../CMySingleEvent'
import { CMyTeacher } from '../CMyTeacher'

@Component({
  mixins: [MixinOperator, MixinUsers, MixinEvents],
  name: 'CEventsCalendar',
  components: {
    Logo,
    Footer,
    CTitle,
    CImgText,
    CMySelect,
    CMyEditor,
    CDateTime,
    CMyAvatar,
    CMySingleEvent, CMyTeacher
  }
})
export default class CEventsCalendar extends MixinEvents {
  @Prop({ required: false, default: null }) public mysingleevent: IEvents
  @Prop({ required: false, default: 0 }) public showfirstN: number
  public $q
  public $t: any
  public calendarView = 'month'
  public selectedDate = ''
  public tabeditor: string = 'details'
  public showPrev: boolean = false
  public formDefault: IEvents = {
    title: '',
    details: '',
    bodytext: '',
    dateTimeStart: tools.getstrYYMMDDDateTime(tools.getDateNow()),
    dateTimeEnd: tools.getstrYYMMDDDateTime(tools.getDateNow()),
    icon: '',
    bgcolor: '#839ff2'
  }

  public formbookEventDefault: IBookedEvent = {
    userId: '',
    msgbooking: '',
    infoevent: '',
    numpeople: 1,
    numpeopleLunch: 0,
    numpeopleDinner: 0,
    numpeopleDinnerShared: 0,
    datebooked: tools.getDateNow(),
    booked: false,
    modified: false
  }

  public formAskForDefault: IMessage = {
    dest: {
      idapp: process.env.APP_ID,
      username: ''
    },
    origin: {
      idapp: process.env.APP_ID,
      username: ''
    },
    message: ''
  }

  public mioalert = false

  public dateFormatter: any = ''
  public titleFormatter: any = null

  public keyValue = 0
  public direction = 'forward'
  public weekdays = [1, 2, 3, 4, 5, 6, 0]
  public viewOptions = [
    { label: 'Day', value: 'day' },
    { label: '5 Day', value: '5day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' }
  ]
  public addEvent = false
  public bookEventpage: IBookedEventPage = {
    show: false,
    bookedevent: null,
    state: EState.None
  }
  public askInfopage: IMessagePage = {
    show: false,
    msg: null,
    state: EState.None
  }

  public contextDay = null
  public eventForm: IEvents = { ...this.formDefault }
  public bookEventForm = { ...this.formbookEventDefault }
  public askInfoForm: IMessage = { ...this.formAskForDefault }
  public displayEvent = false
  public myevent = null
  // public events = []
  public gmt = ''
  public dragging = false
  public draggedEvent = null
  public ignoreNextSwipe = false

  get mythis() {
    return this
  }

  get lists() {
    return lists
  }

  set mythis(aa) {

  }

  public resources = []

  // public eventdata =
  //   [
  //     {
  //       id: 1,
  //       summary: 'Test myevent',
  //       description: 'Some extra info goes here',
  //       location: 'Office of the Divine Randomness, 1232 Main St., Denver, CO',
  //       start: {
  //         dateTime: '2019-07-09T14:00:00', // ISO 8601 formatted
  //         timeZone: 'America/New_York' // Timezone listed as a separate IANA code
  //       },
  //       end: {
  //         dateTime: '2019-07-11T16:30:00',
  //         timeZone: 'American/New_York'
  //       },
  //       color: 'positive',
  //       attendees: [
  //         {
  //           id: 5,
  //           email: 'somebody@somewhere.com',
  //           displayName: 'John Q. Public',
  //           organizer: false,
  //           self: false,
  //           resource: false
  //         }
  //       ]
  //     },
  //     {
  //       id: 2,
  //       summary: 'Test all-day myevent',
  //       description: 'Some extra info goes here',
  //       start: {
  //         date: '2018-02-16' // A date variable indicates an all-day myevent
  //       },
  //       end: {
  //         date: '2018-02-19'
  //       }
  //     },
  //     {
  //       id: 3,
  //       summary: 'Some other test myevent',
  //       description: 'Some extra info goes here',
  //       start: {
  //         dateTime: '2018-02-17T10:00:00+0500', // timezone embedded in dateTime
  //       },
  //       end: {
  //         dateTime: '2018-02-17T12:30:00+0500',
  //       }
  //     }
  //   ]

  get visuAllCal() {
    return this.mysingleevent === null
  }

  get title_cal() {
    if (this.titleFormatter && this.locale) {
      const mydate = new Date(this.selectedDate)
      return this.titleFormatter.format(mydate)
    }
    return ''
  }

  get intervalRangeStep() {
    return CalendarStore.state.intervalRangeStep
  }

  get resourceWidth() {
    return CalendarStore.state.resourceWidth
  }

  get intervalHeight() {
    return CalendarStore.state.intervalHeight
  }

  get shortIntervalLabel() {
    return CalendarStore.state.shortIntervalLabel
  }

  get shortWeekdayLabel() {
    return CalendarStore.state.shortWeekdayLabel
  }

  get hideHeader() {
    return CalendarStore.state.hideHeader
  }

  get showDayOfYearLabel() {
    return CalendarStore.state.showDayOfYearLabel
  }

  get shortMonthLabel() {
    return CalendarStore.state.shortMonthLabel
  }

  get enableThemes() {
    return CalendarStore.state.enableThemes
  }

  get resourceHeight() {
    return CalendarStore.state.resourceHeight
  }

  get noScroll() {
    return CalendarStore.state.noScroll
  }

  get maxDays() {
    return CalendarStore.state.maxDays
  }

  get hour24Format() {
    return CalendarStore.state.hour24Format
  }

  get showWorkWeeks() {
    return CalendarStore.state.showWorkWeeks
  }

  get dayHeight() {
    if (Screen.height < 410)
      return 80
    else if (Screen.height < 500)
      return 100
    if (Screen.height < 700)
      return 110
    else if (Screen.height < 800)
      return 120
    else
      return 140
  }

  get theme() {
    return CalendarStore.state.theme
  }

  get locale() {
    return CalendarStore.state.locale
  }

  get showMonthLabel() {
    return CalendarStore.state.showMonthLabel
  }

  get intervalStart() {
    return CalendarStore.state.intervalRange.min * (1 / CalendarStore.state.intervalRangeStep)
  }

  get intervalCount() {
    return (CalendarStore.state.intervalRange.max - CalendarStore.state.intervalRange.min) * (1 / CalendarStore.state.intervalRangeStep)
  }

  get containerStyle() {
    const styles = { height: '' }
    if (this.calendarView !== 'month' || (this.calendarView === 'month' && CalendarStore.state.dayHeight === 0)) {
      styles.height = `calc(100vh - ${CalendarStore.state.titlebarHeight}px)`
    }
    return styles
  }

  // convert the events into a map of lists keyed by date
  get eventsMap() {
    // console.log('eventsMap')
    const map = {}
    CalendarStore.state.eventlist.forEach((myevent) => (map[tools.getstrDateTime(myevent.dateTimeStart)] = map[tools.getstrDateTime(myevent.dateTimeStart)] || []).push(myevent))
    return map
  }

  get addOrUpdateEvent() {
    if (this.contextDay && this.contextDay.bgcolor) {
      return this.$t('dialog.update')
    }
    return this.$t('dialog.add')
  }

  get scrollerPopupStyle160() {
    if (this.$q.screen.lt.sm) {
      return {
        width: '100vw',
        height: '100vh'
      }
    } else {
      return {
        maxHeight: '400px',
        height: '400px',
        width: '160px'
      }
    }
  }

  get tools() {
    return tools
  }

  get toolsext() {
    return toolsext
  }

  get func_tools() {
    return func_tools
  }

  get hasModifiedBooking() {
    return (this.bookEventpage.bookedevent.numpeople !== this.bookEventForm.numpeople) ||
      (this.bookEventpage.bookedevent.numpeopleLunch !== this.bookEventForm.numpeopleLunch) ||
      (this.bookEventpage.bookedevent.numpeopleDinner !== this.bookEventForm.numpeopleDinner) ||
      (this.bookEventpage.bookedevent.numpeopleDinnerShared !== this.bookEventForm.numpeopleDinnerShared) ||
      (this.bookEventpage.bookedevent.msgbooking !== this.bookEventForm.msgbooking) ||
      (this.bookEventpage.bookedevent.booked !== this.bookEventForm.booked)
  }

  get static_data() {
    return static_data
  }

  get EState() {
    return EState
  }

  get checkseinviaMsg() {
    return (this.bookEventpage.state === EState.Creating) && (!this.bookEventForm.booked)
  }

  get getTitleBtnBooking() {
    if (this.bookEventpage.state === EState.Creating) {
      return this.$t('dialog.book')
    } else {
      return this.$t('dialog.update')
    }
  }

  public $refs: {
    calendar: any
  }

  @Watch('locale')
  public checkloc() {
    this.updateFormatters()
  }

  public mounted() {
    this.$root.$on('calendar:next', this.calendarNext)
    this.$root.$on('calendar:prev', this.calendarPrev)
    this.$root.$on('calendar:today', this.calendarToday)

    this.SetToday()
    // CalendarStore.state.eventlist = events
    this.updateFormatters()

  }

  public beforeMount() {
    // console.log('mounted')
    this.selectedDate = this.formatDate(tools.getDateNow())
    // console.log('this.selectedDate', this.selectedDate)

    CalendarStore.state.locale = toolsext.getLocale()
    this.updateFormatters()
  }

  public beforeDestroy() {
    this.$root.$off('calendar:next', this.calendarNext)
    this.$root.$off('calendar:prev', this.calendarPrev)
    this.$root.$off('calendar:today', this.calendarToday)
  }

  public showEvent(eventparam: IEvents) {
    // console.log('showEvent - INIZIO')
    this.myevent = eventparam
    this.displayEvent = true
    // console.log('showEvent - FINE ' + myevent)
  }

  public selectEvent(eventparam: IEvents) {
    if (this.myevent === eventparam)
      this.myevent = null
    else
      this.myevent = eventparam

  }

  public onDateChanged(mydate) {
    this.calendarView = 'day'
  }

  public resourceClicked(resource) {
    console.log('resource clicked:', resource)
  }

  public resourceDayClicked(resource) {
    console.log('resource:day clicked:', resource)
  }

  public resetForm() {
    this.eventForm = { ...this.formDefault }
  }

  public addEventMenu(day) {
    console.log('addeventmenu', day)
    if (this.calendarView === 'scheduler' || this.calendarView === 'week-scheduler' || this.calendarView === 'month-scheduler' || !this.editable) {
      return
    }
    this.resetForm()
    this.contextDay = { ...day.scope }

    this.eventForm.dateTimeStart = tools.getstrYYMMDDDateTime(day.scope.timestamp.date + ' 21:00:00')
    this.eventForm.dateTimeEnd = tools.getstrYYMMDDDateTime(day.scope.timestamp.date + ' 22:00:00')

    console.log('eventForm', this.eventForm)

    this.addEvent = true // show dialog
  }

  public addBookEventMenu(eventparam) {
    if (!UserStore.state.isLogged || !UserStore.state.my.verified_email) {
      // Visu right Toolbar to make SignIn
      GlobalStore.state.rightDrawerOpen = true
      tools.showNeutralNotif(this.$q, this.$t('login.needlogin'))
      tools.scrollToTop()
      // window.scrollTo(0, 0)

      // this.$router.push('/signin')
    } else {
      console.log('addBookEventMenu')
      this.resetForm()
      this.myevent = eventparam
      this.bookEventForm.msgbooking = ''
      this.bookEventForm.numpeople = 1
      this.bookEventForm.numpeopleLunch = 0
      this.bookEventForm.numpeopleDinner = 0
      this.bookEventForm.numpeopleDinnerShared = 0
      this.bookEventForm.booked = true
      this.bookEventpage.state = EState.Creating

      this.displayEvent = false
      this.bookEventpage.show = true // show dialog
    }
  }

  public askForInfoEventMenu(eventparam) {
    if (!UserStore.state.isLogged || !UserStore.state.my.verified_email) {
      // Visu right Toolbar to make SignIn
      GlobalStore.state.rightDrawerOpen = true

      tools.showNeutralNotif(this.$q, this.$t('login.needlogin'))
      tools.scrollToTop()

      // this.$router.push('/signin')
    } else {
      console.log('askForInfoEventMenu')
      this.askInfoForm = { ...this.formAskForDefault }

      this.myevent = eventparam

      this.askInfoForm = {
        message: ''
      }

      this.askInfopage.state = EState.Creating

      this.displayEvent = false
      this.askInfopage.show = true // show dialog
    }
  }

  public clEvent(event: IEvents) {
    return (this.isAlreadyBooked(event) ? 'text-left bg-light-green-1' : 'text-left')
  }

  public checkFieldUndef() {
    if (this.eventForm.bodytext === undefined)
      this.eventForm.bodytext = ''
    if (this.eventForm.details === undefined)
      this.eventForm.details = ''
  }

  public editEvent(eventparam) {
    console.log('editEvent - INIZIO')
    this.resetForm()

    this.contextDay = { ...eventparam }

    this.eventForm = { ...eventparam }

    this.checkFieldUndef()

    this.eventForm.dateTimeStart = tools.getstrYYMMDDDateTime(eventparam.dateTimeStart)
    this.eventForm.dateTimeEnd = tools.getstrYYMMDDDateTime(eventparam.dateTimeEnd)

    this.addEvent = true // show dialog
  }

  public deleteEvent(eventparam) {
    tools.CancelEvent(this, eventparam)
  }

  public duplicateEvent(eventparam, numgg, numev: number = 1) {
    for (let i = 0; i < numev; ++i) {
      GlobalStore.actions.DuplicateRec({ table: tools.TABEVENTS, id: eventparam._id }).then((rec) => {
        if (rec) {
          rec.dateTimeStart = tools.addDays(new Date(rec.dateTimeStart), numgg * (i + 1))
          rec.dateTimeEnd = tools.addDays(new Date(rec.dateTimeEnd), numgg * (i + 1))
          CalendarStore.state.eventlist.push(rec)
          this.editEvent(rec)
        }
      })
    }
    // tools.ActionRecTable(this, lists.MenuAction.DUPLICATE_RECTABLE, tools.TABEVENTS, eventparam._id, eventparam, 'db.duplicatedrecord')
  }

  public findEventIndex(eventparam) {
    for (let i = 0; i < CalendarStore.state.eventlist.length; ++i) {
      if (eventparam) {
        if (eventparam.title === CalendarStore.state.eventlist[i].title &&
          eventparam.details === CalendarStore.state.eventlist[i].details &&
          eventparam.dateTimeStart === CalendarStore.state.eventlist[i].dateTimeStart &&
          eventparam.dateTimeEnd === CalendarStore.state.eventlist[i].dateTimeEnd) {
          return i
        }
      }
    }
  }

  public formatDate(mydate: any) {
    let d = void 0

    if (mydate !== void 0) {
      d = new Date(mydate)
    } else {
      d = new Date()
    }
    const month = '' + (d.getMonth() + 1)
    const day = '' + d.getDate()
    const year = d.getFullYear()

    return [year, tools.padTime(month), tools.padTime(day)].join('-')
  }

  public formatTime(mydate) {
    const d = mydate !== void 0 ? new Date(mydate) : new Date(),
      hours = '' + d.getHours(),
      minutes = '' + d.getMinutes()

    return [tools.padTime(hours), tools.padTime(minutes)].join(':')
  }

  public getDuration(dateTimeStart, dateTimeEnd, unit) {
    const start = new Date(dateTimeStart)
    const end = new Date(dateTimeEnd)
    const diff = date.getDateDiff(end, start, unit)
    return diff
  }

  public UpdateDbByFields(myrec, undo?) {
    const self = this

    const mydatatosave = {
      id: myrec._id,
      table: tools.TABEVENTS,
      fieldsvalue: myrec
    }

    GlobalStore.actions.saveFieldValue(mydatatosave).then((esito) => {
      if (esito) {
        tools.showPositiveNotif(this.$q, this.$t('db.recupdated'))
      } else {
        tools.showNegativeNotif(this.$q, this.$t('db.recfailed'))
        // Undo...
        if (undo) {
          const index = self.findEventIndex(self.contextDay)
          if (index >= 0) {
            // @ts-ignore
            CalendarStore.state.eventlist.splice(index, 1, { ...self.contextDay })
          }
        }
      }
    })

  }

  public saveEvent() {
    const self = this

    // ++Todo VALIDATE this.$refs.myevent

    if (true) {
      // close the dialog
      self.addEvent = false
      const form = { ...self.eventForm }
      let update = false
      if (self.contextDay._id) {
        // an update
        update = true
      } else {
        // an add
      }
      const data = { ...form }

      // ++Save into the Database
      const mydatatosave = {
        id: data._id,
        table: tools.TABEVENTS,
        fieldsvalue: data
      }

      if (update === true) {
        this.UpdateDbByFields(data, true)
      } else {
        const mydataadd = {
          table: tools.TABEVENTS,
          data
        }

        GlobalStore.actions.saveTable(mydataadd).then((record) => {
          if (record) {
            tools.showPositiveNotif(this.$q, this.$t('db.recupdated'))

            if (update === true) {
              const index = self.findEventIndex(self.contextDay)
              if (index >= 0) {
                // @ts-ignore
                CalendarStore.state.eventlist.splice(index, 1, { ...data })
              }
            } else {
              data._id = record._id
              // add to events array
              // @ts-ignore
              CalendarStore.state.eventlist.push(data)
            }

          } else {
            tools.showNegativeNotif(this.$q, this.$t('db.recfailed'))
            // Undo...
            const index = self.findEventIndex(self.contextDay)
            if (index >= 0) {
              // @ts-ignore
              CalendarStore.state.eventlist.splice(index, 1, { ...self.contextDay })
            }
          }
        })
      }

      self.contextDay = null
    }
  }

  public EditBookEvent(myevent: IEvents) {
    this.myevent = myevent
    const bookedevent = CalendarStore.getters.findEventBooked(myevent, false)

    console.log('bookedevent', bookedevent)

    if (bookedevent) {
      this.bookEventForm._id = bookedevent._id
      this.bookEventForm.numpeople = bookedevent.numpeople
      this.bookEventForm.numpeopleLunch = bookedevent.numpeopleLunch
      this.bookEventForm.numpeopleDinner = bookedevent.numpeopleDinner
      this.bookEventForm.numpeopleDinnerShared = bookedevent.numpeopleDinnerShared
      this.bookEventForm.infoevent = bookedevent.infoevent
      this.bookEventForm.msgbooking = bookedevent.msgbooking
      this.bookEventForm.booked = bookedevent.booked
      this.bookEventForm.datebooked = bookedevent.datebooked
    }

    this.bookEventpage.state = EState.Modifying
    this.bookEventpage.bookedevent = bookedevent
    this.bookEventpage.show = true
  }

  public sendMsg(myevent: IEvents) {
    const self = this
    this.askInfopage.show = false

    const data: IMessage = {
      source: {
        event_id: myevent._id,
        infoevent: tools.gettextevent(this, myevent)
      },
      dest: {
        idapp: process.env.APP_ID,
        username: myevent.teacher
      },
      message: this.askInfoForm.message
    }

    MessageStore.actions.SendMsgEvent(data).then((ris) => {
      self.contextDay = null
      if (ris)
        tools.showPositiveNotif(self.$q, self.$t('cal.sendmsg_sent'))
      else
        tools.showNegativeNotif(self.$q, self.$t('cal.sendmsg_error'))
    })

  }

  public saveBookEvent(myevent: IEvents) {
    const self = this

    // ++Todo VALIDATE this.$refs.myevent

    if (true) {
      // close the dialog
      self.bookEventpage.show = false

      // self.bookEventForm.booked = self.bookEventForm.bookedcheck

      const data: IBookedEvent = {
        userId: UserStore.state.my._id,
        id_bookedevent: myevent._id,
        numpeople: self.bookEventForm.numpeople,
        numpeopleLunch: self.bookEventForm.numpeopleLunch,
        numpeopleDinner: self.bookEventForm.numpeopleDinner,
        numpeopleDinnerShared: self.bookEventForm.numpeopleDinnerShared,
        infoevent: tools.gettextevent(self, myevent),
        msgbooking: self.bookEventForm.msgbooking,
        booked: self.bookEventForm.booked,
        datebooked: tools.getDateNow(),
        modified: (self.bookEventpage.state !== EState.Creating)
      }

      this.BookEvent(data).then((ris) => {
        console.log('ris uscita di BookEvent', ris)
        if (ris)
          tools.showPositiveNotif(self.$q, self.$t('cal.booked') + ' ' + self.$t('cal.event') + ' "' + myevent.title + '"')
        else
          tools.showNegativeNotif(self.$q, self.$t('cal.booked_error'))
      })

      self.contextDay = null
    }
  }

  public adjustTimestamp(day) {
    day.minute = day.minute < 15 || day.minute >= 45 ? 0 : 30
    return day
  }

  // public getTimestamp(day) {
  //   return day.date + ' ' + tools.padTime(day.hour) + ':' + tools.padTime(day.minute) + ':00.000'
  // }

  public updateFormatters() {
    try {
      // console.log('tools.getLocale() =', tools.getLocale())
      // console.log('Calendar', CalendarStore.state.locale)
      this.dateFormatter = new Intl.DateTimeFormat(tools.getLocale() || void 0, {
        weekday: CalendarStore.state.shortWeekdayLabel ? 'short' : 'long',
        month: CalendarStore.state.shortMonthLabel ? 'short' : 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
      })
      this.titleFormatter = new Intl.DateTimeFormat(this.locale || void 0, {
        month: this.shortMonthLabel ? 'short' : 'long',
        year: 'numeric',
        timeZone: 'UTC'
      })

    } catch (e) {
      console.error('Intl.DateTimeFormat not supported')
      this.dateFormatter = void 0
    }
  }

  public handleSwipe({ evt, ...info }) {
    if (this.dragging === false) {
      if (info.dur >= 30 && this.ignoreNextSwipe === false) {
        if (info.direction === 'right') {
          this.calendarPrev()
        } else if (info.direction === 'left') {
          this.calendarNext()
        }
      } else {
        this.ignoreNextSwipe = false
      }
    }
    stopAndPrevent(evt)
  }

  public onDragEnter(ev, eventparam) {
    prevent(ev)
  }

  public onDragStart(ev, eventparam) {
    this.dragging = true
    this.draggedEvent = eventparam
    stop(ev)
  }

  public onDragEnd(ev, eventparam) {
    stopAndPrevent(ev)
    this.resetDrag()
  }

  public onDragOver(ev, day, type) {
    if (type === 'day') {
      stopAndPrevent(ev)
      return this.draggedEvent.dateTimeStart !== day.dateTimeStart
    } else if (type === 'interval') {
      stopAndPrevent(ev)
      // return this.draggedEvent.date !== day.date && this.draggedEvent.time !== day.time
      return this.draggedEvent.dateTimeStart !== day.dateTimeStart
    }
  }

  public onDrop(ev, day, type) {
    ev.preventDefault()
    ev.stopPropagation()
    console.log('day.dateTimeStart', day.dateTimeStart, day.date, 'day.time', day.time)
    if (type === 'day') {
      this.draggedEvent.dateTimeStart = day.date + ' ' + tools.getstrTime(this.draggedEvent.dateTimeStart)
      this.draggedEvent.dateTimeEnd = day.date + ' ' + tools.getstrTime(this.draggedEvent.dateTimeEnd)
      this.draggedEvent.side = void 0
    } else if (type === 'interval') {
      const mins = date.getDateDiff(this.draggedEvent.dateTimeEnd, this.draggedEvent.dateTimeStart, 'minutes')
      this.draggedEvent.dateTimeStart = day.date + ' ' + day.time
      const mystart = new Date(this.draggedEvent.dateTimeStart)
      this.draggedEvent.dateTimeEnd = tools.addMinutes(mystart, mins)
      // this.draggedEvent.dateTimeEnd = day.dateTimeEnd
      // this.draggedEvent.time = day.time
      this.draggedEvent.side = void 0
    }
    // console.log('Start', this.draggedEvent.dateTimeStart, 'End', this.draggedEvent.dateTimeEnd)

    // Save Date
    this.UpdateDbByFields({
      _id: this.draggedEvent._id,
      dateTimeStart: this.draggedEvent.dateTimeStart,
      dateTimeEnd: this.draggedEvent.dateTimeEnd
    }, true)

  }

  public resetDrag() {
    this.draggedEvent = void 0
    this.dragging = false
    if (Platform.is.desktop) {
      this.ignoreNextSwipe = true
    }
  }

  public async BookEvent(eventparam: IBookedEvent) {
    return await CalendarStore.actions.BookEvent(eventparam)
  }

  get getContribTypeArr() {
    return CalendarStore.state.contribtype
  }

  get getTeachersArr() {
    return CalendarStore.state.operators
  }

  get getInternalPagesArr() {
    return CalendarStore.state.internalpages
  }

  get getWhereArr() {
    return CalendarStore.state.wheres
  }

  get getDisciplines() {
    return GlobalStore.state.disciplines
  }

  public createContribType(value) {
    console.log('createContribType', value)
    tools.createNewRecord(this, 'contribtype', { label: value }).then((myrec) => {
      // console.log('myrec')
      CalendarStore.state.contribtype.push(myrec)
    })
  }

  public getEventDate(eventparam) {
    const parts = eventparam.dateTimeStart.split('-')
    const mydate = new Date(parts[0], parts[1] - 1, parts[2])
    return this.dateFormatter.format(mydate)
  }

  public badgeClasses(eventparam, type) {
    const cssColor = tools.isCssColor(eventparam.bgcolor)
    const isHeader = type === 'header'
    return {
      [`text-white bg-${eventparam.bgcolor}`]: !cssColor,
      'full-width': !isHeader && (!eventparam.side || eventparam.side === 'full'),
      'left-side': !isHeader && eventparam.side === 'left',
      'right-side': !isHeader && eventparam.side === 'right'
    }
  }

  public badgeStyles(eventparam, type, timeStartPos, timeDurationHeight) {
    const s = { color: '', top: '', height: '', opacity: 1 }

    if (tools.isCssColor(eventparam.bgcolor)) {
      s['background-color'] = eventparam.bgcolor
      s.color = colors.luminosity(eventparam.bgcolor) > 0.5 ? 'black' : 'white'
    }
    if (timeStartPos) {
      s.top = timeStartPos(tools.getstrTime(eventparam.dateTimeStart)) + 'px'
    }
    if (timeDurationHeight) {
      s.height = timeDurationHeight(this.func_tools.getMinutesDuration(eventparam.dateTimeStart, eventparam.dateTimeEnd)) + 'px'
    }

    if (!this.isEventEnabled(eventparam)) {
      s.opacity = 0.5
    }

    s['align-items'] = 'flex-start'
    return s
  }

  public calendarNext() {
    this.$refs.calendar.next()
  }

  public calendarPrev() {
    this.$refs.calendar.prev()
  }

  public calendarToday(today) {
    this.selectedDate = today
  }

  public SetToday() {
    this.$root.$emit('calendar:today', this.formatDate(tools.getDateNow()))
  }

  public onChanged(data) {
    // uncomment to see data in console
    // let { start, end } = data
    // console.log('onChanged:', start, end)
  }

  public onMoved(moved) {
    // uncomment to see data in console
    // console.log('onMoved:', moved)
  }

  public getEventList() {
    const mylist = CalendarStore.state.eventlist.filter((rec) => (new Date(rec.dateTimeEnd) >= tools.getDateNowEvent()))
    if (this.showfirstN > 0)
      return mylist.slice(0, this.showfirstN)
    else
      return mylist
  }

  public getEvents(dt) {
    const eventsloc = []
    // console.log('dt', dt)

    for (let i = 0; i < CalendarStore.state.eventlist.length; ++i) {
      let added = false
      if (tools.getstrYYMMDDDate(CalendarStore.state.eventlist[i].dateTimeStart) === dt) {
        if (eventsloc.length > 0) {
          // check for overlapping times
          const startTime = CalendarStore.state.eventlist[i].dateTimeStart
          const endTime = CalendarStore.state.eventlist[i].dateTimeEnd
          for (const item of eventsloc) {
            const startTime2 = item.dateTimeStart
            const endTime2 = item.dateTimeEnd
            if (date.isBetweenDates(startTime, startTime2, endTime2) || date.isBetweenDates(endTime, startTime2, endTime2)) {
              item.side = 'left'
              eventsloc.push(CalendarStore.state.eventlist[i])
              added = true
              break
            }
          }
        }
        // }
        if (!added) {
          // CalendarStore.state.eventlist[i].side = void 0
          eventsloc.push(CalendarStore.state.eventlist[i])
        }
      } else if (tools.hasManyDays(CalendarStore.state.eventlist[i].dateTimeStart, CalendarStore.state.eventlist[i].dateTimeEnd)) {
        // check for overlapping dates
        if (date.isBetweenDates(dt, CalendarStore.state.eventlist[i].dateTimeStart, CalendarStore.state.eventlist[i].dateTimeEnd)) {
          eventsloc.push(CalendarStore.state.eventlist[i])
          added = true
        }
      }
    }
    // if (eventsloc.length > 0)
      // console.log('eventsloc', eventsloc)
    return eventsloc
  }

  public isEventEnabled(myevent) {
    // check if event is in the past
    const datenow = tools.addDays(tools.getDateNow(), -1)

    // console.log('datenow', datenow, 'end', myevent.dateTimeEnd)

    return (new Date(myevent.dateTimeEnd) >= datenow)
  }

  public getTitleEv(event: IEvents) {
    return (!!event.short_tit) ? event.short_tit : event.title
  }
  public getLongTitleEv(event: IEvents) {
    return event.title
  }

}
