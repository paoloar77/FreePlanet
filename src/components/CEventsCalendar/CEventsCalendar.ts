import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { CalendarStore, UserStore } from '@store'

import { Logo } from '../../components/logo/index'

import { Footer } from '../../components/Footer/index'

import { tools } from '../../store/Modules/tools'
import { toolsext, func_tools } from '@src/store/Modules/toolsext'
import { db_data } from '@src/db/db_data'
import { colors, Screen, Platform, date } from 'quasar'

import { CTitle } from '../../components/CTitle/index'
import { CImgText } from '../../components/CImgText/index'
import { stop, prevent, stopAndPrevent } from 'quasar/src/utils/event'

import QDateScroller from '@quasar/quasar-app-extension-qscroller/src/component/QDateScroller'
import QDateTimeScroller from '@quasar/quasar-app-extension-qscroller/src/component/QDateTimeScroller'
import { CTodo } from '@src/components/todos/CTodo'
import { SingleProject } from '@src/components/projects/SingleProject'
import { IEvents } from '@src/model'
import { IBookedEvent, IBookedEventPage, EState } from '@src/model/Calendar'
import { costanti } from '@src/store/Modules/costanti'
import router from '@router'
import { static_data } from '@src/db/static_data'
import translate from '@src/globalroutines/util'
import { lists } from '../../store/Modules/lists'

@Component({
  name: 'CEventsCalendar',
  components: { Logo, Footer, CTitle, CImgText, QDateTimeScroller, QDateScroller }
})
export default class CEventsCalendar extends Vue {
  public $t: any
  public $q
  public calendarView = 'month'
  public selectedDate = '2019-04-01'
  public formDefault = {
    title: '',
    details: '',
    allDay: false,
    dateTimeStart: '',
    dateTimeEnd: '',
    icon: '',
    bgcolor: '#0000FF'
  }

  public formbookEventDefault: IBookedEvent = {
    userId: '',
    msgbooking: '',
    infoevent: '',
    numpeople: 1,
    datebooked: tools.getDateNow(),
    booked: false,
    modified: false
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

  public contextDay = null
  public eventForm = { ...this.formDefault }
  public bookEventForm = { ...this.formbookEventDefault }
  public displayEvent = false
  public myevent = null
  // public events = []
  public gmt = ''
  public dragging = false
  public draggedEvent = null
  public ignoreNextSwipe = false
  public showDateScrollerAllDay = false
  public showDateTimeScrollerStart = false
  public showDateTimeScrollerEnd = false

  @Watch('locale')
  public checkloc() {
    this.updateFormatters()
  }

  public resources = [
    {
      label: 'John'
    },
    {
      label: 'Mary'
    },
    {
      label: 'Susan'
    },
    {
      label: 'Olivia'
    },
    {
      label: 'Board Room'
    },
    {
      label: 'Room-1'
    },
    {
      label: 'Room-2'
    }
  ]

  public $refs: {
    calendar: any
  }

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
    return CalendarStore.state.dayHeight
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

  get editable() {
    return CalendarStore.state.editable
  }

  public mounted() {
    this.selectedDate = this.formatDate(tools.getDateNow())
    this.$root.$on('calendar:next', this.calendarNext)
    this.$root.$on('calendar:prev', this.calendarPrev)
    this.$root.$on('calendar:today', this.calendarToday)
    // CalendarStore.state.eventlist = events
    this.updateFormatters()
  }

  public beforeMount() {
    CalendarStore.state.locale = toolsext.getLocale()
    this.updateFormatters()
  }

  public beforeDestroy() {
    this.$root.$off('calendar:next', this.calendarNext)
    this.$root.$off('calendar:prev', this.calendarPrev)
    this.$root.$off('calendar:today', this.calendarToday)
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
    CalendarStore.state.eventlist.forEach((myevent) => (map[myevent.date] = map[myevent.date] || []).push(myevent))
    return map
  }

  get addOrUpdateEvent() {
    if (this.contextDay && this.contextDay.bgcolor) {
      return 'Update'
    }
    return 'Add'
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

  get scrollerPopupStyle280() {
    if (this.$q.screen.lt.sm) {
      return {
        width: '100vw',
        height: '100vh'
      }
    } else {
      return {
        maxHeight: '400px',
        height: '400px',
        width: '280px'
      }
    }
  }

  public showEvent(eventparam: IEvents) {
    // console.log('showEvent - INIZIO')
    this.myevent = eventparam
    this.displayEvent = true
    // console.log('showEvent - FINE ' + myevent)
  }

  public getEndTime(eventparam) {
    let endTime = new Date(eventparam.date + ' ' + eventparam.time + ':00')
    endTime = date.addToDate(endTime, { minutes: eventparam.duration })
    endTime = date.formatDate(endTime, 'HH:mm')
    return endTime
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

  public addEventMenu(day, type) {
    // console.log('addeventmenu editable = ', this.editable)
    if (this.calendarView === 'scheduler' || this.calendarView === 'week-scheduler' || this.calendarView === 'month-scheduler' || !this.editable) {
      return
    }
    this.resetForm()
    this.contextDay = { ...day }
    let timestamp
    if (this.contextDay.hasTime === true) {
      timestamp = this.getTimestamp(this.adjustTimestamp(this.contextDay))
      const startTime = new Date(timestamp)
      const endTime = date.addToDate(startTime, { hours: 1 })
      this.eventForm.dateTimeEnd = this.formatDate(endTime) + ' ' + this.formatTime(endTime) // endTime.toString()
    } else {
      timestamp = this.contextDay.date + ' 00:00'
    }
    this.eventForm.dateTimeStart = timestamp
    this.eventForm.allDay = this.contextDay.hasTime === false
    this.eventForm.bgcolor = '#0000FF' // starting color
    this.addEvent = true // show dialog
  }

  public addBookEventMenu(eventparam) {
    if (!UserStore.state.isLogged || !UserStore.state.verified_email) {
      this.$router.push('/signin')
    } else {
      console.log('addBookEventMenu')
      this.resetForm()
      this.myevent = eventparam
      // this.bookEventForm.msgbooking = translate('cal.bookingtextdefault') + ' ' + tools.gettextevent(this.myevent)
      this.bookEventForm.msgbooking = ''
      this.bookEventForm.numpeople = 1
      this.bookEventpage.state = EState.Creating

      this.displayEvent = false
      this.bookEventpage.show = true // show dialog
    }
  }

  public clEvent(event: IEvents) {
    return (this.isAlreadyBooked(event) ? 'text-left bg-light-green-1' : 'text-left')
  }

  public editEvent(eventparam) {
    console.log('editEvent - INIZIO')
    this.resetForm()
    this.contextDay = { ...eventparam }
    let timestamp
    if (eventparam.time) {
      timestamp = eventparam.date + ' ' + eventparam.time
      const startTime = new Date(timestamp)
      const endTime = date.addToDate(startTime, { minutes: eventparam.duration })
      this.eventForm.dateTimeStart = this.formatDate(startTime) + ' ' + this.formatTime(startTime) // endTime.toString()
      this.eventForm.dateTimeEnd = this.formatDate(endTime) + ' ' + this.formatTime(endTime) // endTime.toString()
    } else {
      timestamp = eventparam.date
      this.eventForm.dateTimeStart = timestamp
    }
    this.eventForm.allDay = !eventparam.time
    this.eventForm.bgcolor = eventparam.bgcolor
    this.eventForm.icon = eventparam.icon
    this.eventForm.title = eventparam.title
    this.eventForm.details = eventparam.details
    this.addEvent = true // show dialog
  }

  public deleteEvent(eventparam) {
    const index = this.findEventIndex(eventparam)
    if (index >= 0) {
      CalendarStore.state.eventlist.splice(index, 1)
    }
  }

  public findEventIndex(eventparam) {
    for (let i = 0; i < CalendarStore.state.eventlist.length; ++i) {
      if (eventparam.title === CalendarStore.state.eventlist[i].title &&
        eventparam.details === CalendarStore.state.eventlist[i].details &&
        eventparam.date === CalendarStore.state.eventlist[i].date) {
        return i
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

  get tools() {
    return tools
  }

  get toolsext() {
    return toolsext
  }

  get func_tools() {
    return func_tools
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

  public saveEvent() {
    const self = this

    // ++Todo VALIDATE this.$refs.myevent

    if (true) {
      // close the dialog
      self.addEvent = false
      const form = { ...self.eventForm }
      let update = false
      if (self.contextDay.bgcolor) {
        // an update
        update = true
      } else {
        // an add
      }
      const data: IEvents = {
        time: '',
        duration: 0,
        duration2: 0,
        title: form.title,
        details: form.details,
        icon: form.icon,
        bgcolor: form.bgcolor,
        date: String(form.dateTimeStart).slice(0, 10).replace(/\//g, '-')
      }
      if (form.allDay === false) {
        // get time into separate var
        data.time = String(form.dateTimeStart).slice(11, 16)
        data.duration = self.getDuration(form.dateTimeStart, form.dateTimeEnd, 'minutes')
      }
      if (update === true) {
        const index = self.findEventIndex(self.contextDay)
        if (index >= 0) {
          // @ts-ignore
          CalendarStore.state.eventlist.splice(index, 1, { ...data })
        }
      } else {
        // add to events array
        // @ts-ignore
        CalendarStore.state.eventlist.push(data)
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
      this.bookEventForm.infoevent = bookedevent.infoevent
      this.bookEventForm.msgbooking = bookedevent.msgbooking
      this.bookEventForm.booked = bookedevent.booked
      this.bookEventForm.datebooked = bookedevent.datebooked
    }

    this.bookEventpage.state = EState.Modifying
    this.bookEventpage.bookedevent = bookedevent
    this.bookEventpage.show = true
  }

  get hasModifiedBooking() {
    return (this.bookEventpage.bookedevent.numpeople !== this.bookEventForm.numpeople) ||
      (this.bookEventpage.bookedevent.msgbooking !== this.bookEventForm.msgbooking) ||
      (this.bookEventpage.bookedevent.booked !== this.bookEventForm.booked)
  }

  public sendMsg(myevent: IEvents) {
    // ..
  }

  public saveBookEvent(myevent: IEvents) {
    const self = this

    // ++Todo VALIDATE this.$refs.myevent

    if (true) {
      // close the dialog
      self.bookEventpage.show = false

      // self.bookEventForm.booked = self.bookEventForm.bookedcheck

      const data: IBookedEvent = {
        userId: UserStore.state.userId,
        id_bookedevent: myevent._id,
        numpeople: self.bookEventForm.numpeople,
        infoevent: tools.gettextevent(myevent),
        msgbooking: self.bookEventForm.msgbooking,
        booked: self.bookEventForm.booked,
        datebooked: tools.getDateNow(),
        modified: (self.bookEventpage.state !== EState.Creating)
      }

      this.BookEvent(data).then((ris) => {
        if (ris)
          tools.showPositiveNotif(self.$q, self.$t('cal.booked') + ' ' + self.$t('cal.event') + ' "' + myevent.title + '"')
        else
          tools.showNegativeNotif(self.$q, self.$t('cal.booked_error'))
      })

      self.contextDay = null
    }
  }

  public showOffset(days) {
    if (days.length === 0) return

    let val = ''
    val = tools.padTime(new Date(this.getTimestamp(days[0])).getTimezoneOffset() / 60)
    if (Number.isNaN(Number(val))) return ''
    return 'GMT-' + val
  }

  public adjustTimestamp(day) {
    day.minute = day.minute < 15 || day.minute >= 45 ? 0 : 30
    return day
  }

  public getTimestamp(day) {
    return day.date + ' ' + tools.padTime(day.hour) + ':' + tools.padTime(day.minute) + ':00.000'
  }

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
      if (info.duration >= 30 && this.ignoreNextSwipe === false) {
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
      return this.draggedEvent.date !== day.date
    } else if (type === 'interval') {
      stopAndPrevent(ev)
      return this.draggedEvent.date !== day.date && this.draggedEvent.time !== day.time
    }
  }

  public onDrop(ev, day, type) {
    ev.preventDefault()
    ev.stopPropagation()
    if (type === 'day') {
      this.draggedEvent.date = day.date
      this.draggedEvent.side = void 0
    } else if (type === 'interval') {
      this.draggedEvent.date = day.date
      this.draggedEvent.time = day.time
      this.draggedEvent.side = void 0
    }
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

  public isAlreadyBooked(eventparam: IEvents) {
    return CalendarStore.getters.findEventBooked(eventparam, true)
  }

  public getEventDate(eventparam) {
    const parts = eventparam.date.split('-')
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
    const s = { color: '', top: '', height: '' }

    if (tools.isCssColor(eventparam.bgcolor)) {
      s['background-color'] = eventparam.bgcolor
      s.color = colors.luminosity(eventparam.bgcolor) > 0.5 ? 'black' : 'white'
    }
    if (timeStartPos) {
      s.top = timeStartPos(eventparam.time) + 'px'
    }
    if (timeDurationHeight) {
      s.height = timeDurationHeight(eventparam.duration) + 'px'
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
    const eventsloc = []

    const datenow = tools.addDays(tools.getDateNow(), -1)

    for (let i = 0; i < CalendarStore.state.eventlist.length; ++i) {
      // console.log('  ciclo i = ', i, CalendarStore.state.eventlist[i])
      const dateEvent = new Date(CalendarStore.state.eventlist[i].date + ' 00:00:00')

      if (dateEvent >= datenow) {
        eventsloc.push(CalendarStore.state.eventlist[i])
      }
    }

    return eventsloc
  }

  public getEvents(dt) {
    const eventsloc = []

    for (let i = 0; i < CalendarStore.state.eventlist.length; ++i) {
      let added = false
      // console.log('  ciclo i = ', i, CalendarStore.state.eventlist[i])
      if (CalendarStore.state.eventlist[i].date === dt) {
        if (CalendarStore.state.eventlist[i].time) {
          if (eventsloc.length > 0) {
            // check for overlapping times
            const startTime = new Date(CalendarStore.state.eventlist[i].date + ' ' + CalendarStore.state.eventlist[i].time)
            const endTime = date.addToDate(startTime, { minutes: CalendarStore.state.eventlist[i].duration })
            for (let j = 0; j < eventsloc.length; ++j) {
              const startTime2 = new Date(eventsloc[j].date + ' ' + eventsloc[j].time)
              const endTime2 = date.addToDate(startTime2, { minutes: eventsloc[j].duration2 })
              if (date.isBetweenDates(startTime, startTime2, endTime2) || date.isBetweenDates(endTime, startTime2, endTime2)) {
                eventsloc[j].side = 'left'
                // CalendarStore.state.eventlist[i].side = 'right'
                eventsloc.push(CalendarStore.state.eventlist[i])
                added = true
                break
              }
            }
          }
        }
        if (!added) {
          // CalendarStore.state.eventlist[i].side = void 0
          eventsloc.push(CalendarStore.state.eventlist[i])
        }
      } else if (CalendarStore.state.eventlist[i].days) {
        // check for overlapping dates
        const startDate = new Date(CalendarStore.state.eventlist[i].date + ' 00:00:00')
        const endDate = date.addToDate(startDate, { days: CalendarStore.state.eventlist[i].days })
        if (date.isBetweenDates(dt, startDate, endDate)) {
          eventsloc.push(CalendarStore.state.eventlist[i])
          added = true
        }
      }
    }
    return eventsloc
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

  get mythis() {
    return this
  }

  public isEventEnabled(myevent) {
    // check if event is in the past
    const datenow = tools.addDays(tools.getDateNow(), -1)

    let dateEvent = new Date(myevent.date + ' 00:00:00')

    if (myevent.days) {
      dateEvent = tools.addDays(dateEvent, myevent.days)
    }

    return (dateEvent >= datenow)
  }
}
