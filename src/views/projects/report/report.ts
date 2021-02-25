import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import MixinBase from '@src/mixins/mixin-base'
import { CTitleBanner } from '@components'
import Global = WebAssembly.Global
import { CalendarStore, GlobalStore, UserStore } from '@store'
import { colors, Screen, Platform, date } from 'quasar'
import { tools } from '@src/store/Modules/tools'
import { shared_consts } from '@src/common/shared_vuejs'

@Component({

  components: { CTitleBanner }
})

export default class Report extends MixinBase {
  public dateFormatter: any = ''
  public titleFormatter: any = null
  public selectedDate = ''
  public arrhour: {} = {}
  public listaResidenti: any[] = []
  public $refs: {
    calendar: any
  }

  public myView: string = 'month'
  public myresource = { username: '' }
  public title: string = ''

  public optView = [{ _id: 1, label: 'Settimanale', value: 'week-scheduler' },
    { _id: 2, label: 'Mensile', value: 'month' }]

  public resourceHeight = 60

  public valfilter: number = 0

  public arrfilters = [
    // { label: 'Responsabili', value: 1, ris: false },
    { label: 'Visualizza Progetti', value: 2, ris: false }
  ]

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
    this.$root.$emit('calendar:today', tools.formatDate(tools.getDateNow()))
  }

  public mounted() {
    this.$root.$on('calendar:next', this.calendarNext)
    this.$root.$on('calendar:prev', this.calendarPrev)
    this.$root.$on('calendar:today', this.calendarToday)

    this.SetToday()
    // CalendarStore.state.eventlist = events
    this.updateFormatters()

    this.load()
  }

  get locale() {
    return CalendarStore.state.locale
  }

  public created() {
    this.refreshFilter(false)

  }

  public load() {
    this.myresource.username = UserStore.state.my.username
    const date_start = tools.addDays(new Date(tools.getTimestampsNow()), -90)
    const date_end = tools.addDays(new Date(tools.getTimestampsNow()), 30)
    UserStore.actions.reportload({ date_start, date_end, filter: this.valfilter })
      .then((myris) => {
        if (!!myris) {
          console.log('myris', myris)
          this.arrhour = myris.arrhour
          this.listaResidenti = myris.listaResidenti
        }
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

  public isEventEnabled(myevent) {
    // check if event is in the past
    const datenow = tools.addDays(tools.getDateNow(), -1)

    // console.log('datenow', datenow, 'end', myevent.dateTimeEnd)

    return (new Date(myevent.dateTimeEnd) >= datenow)
  }

  public badgeStyles(eventparam) {
    const s = { color: '', top: '', height: '', opacity: 1 }

    if (tools.isCssColor(eventparam.bgcolor)) {
      s['background-color'] = eventparam.bgcolor
      s.color = colors.luminosity(eventparam.bgcolor) > 0.5 ? 'black' : 'white'
    }

    // if (!this.isEventEnabled(eventparam)) {
    //   s.opacity = 0.5
    // }

    s['align-items'] = 'flex-start'
    return s
  }

  public getEvents(dt, objres) {
    const eventsloc = []

    if (!!this.arrhour[objres.username]) {
      if (this.arrhour[objres.username].length > 0) {
        this.arrhour[objres.username].forEach((item) => {
          if (!!item && dt) {
            if (tools.getstrYYMMDDDate(item.date) === dt.date) {
              // console.log('dt', dt, 'objres', objres, 'this.arrhour[objres.username]', this.arrhour[objres.username])
              // console.log('Eccolo!', item)
              eventsloc.push(item)
            }
          }
        })
      }
    }

    return eventsloc
  }

  get resources() {
    const arr = []
    if (!!this.listaResidenti) {
      for (const user of this.listaResidenti) {
        const rec = {
          label: user.name + ' ' + user.surname,
          username: user.username
        }
        arr.push(rec)
      }
    }
    return arr
  }

  public refreshFilter(refresh) {

    this.valfilter = 0
    for (const filter of this.arrfilters) {
      if (filter.ris)
        this.valfilter += filter.value

      if (filter.value === shared_consts.REPORT_FILT_ATTIVITA && filter.ris) {
        this.resourceHeight = 120
      } else {
        this.resourceHeight = 80
      }
    }

    if (refresh)
      this.load()
  }

  @Watch('locale')
  public checkloc() {
    this.updateFormatters()
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
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
      })

    } catch (e) {
      console.error('Intl.DateTimeFormat not supported')
      this.dateFormatter = void 0
    }
  }

  get title_cal() {
    if (this.titleFormatter && this.locale) {
      const mydate = new Date(this.selectedDate)
      return this.titleFormatter.format(mydate)
    }
    return ''
  }

  get getOreMensili() {
    const startday = tools.firstDayOfDate(this.selectedDate)
    const endday = tools.LastDayOfDate(this.selectedDate)

    console.log('ore mensili', startday, endday)
    let count = 0
    if (!!this.arrhour[this.myresource.username]) {
      if (this.arrhour[this.myresource.username].length > 0) {
        this.arrhour[this.myresource.username].forEach((item) => {
          if (!!item) {
            if (date.isBetweenDates(item.date, startday, endday)) {
              if (item.totalhours > 0)
                count += item.totalhours
            }
          }
        })
      }
    }
    return count
  }

}
