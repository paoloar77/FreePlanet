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
  public selectedDate = ''
  public arrhour: {} = {}
  public listaResidenti: any[] = []
  public $refs: {
    calendar: any
  }

  public resourceHeight = 100

  public valfilter: number = 0

  public arrfilters = [
    // { label: 'Responsabili', value: 1, ris: false },
    { label: 'Attività', value: 2, ris: false }
  ]

  public mounted() {
    this.load()
  }

  public load() {
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

  public calendarNext() {
    this.$refs.calendar.next()
    console.log('SelectedDate', this.selectedDate)
  }

  public calendarPrev() {
    this.$refs.calendar.prev()
    console.log('SelectedDate', this.selectedDate)
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
          if (item) {
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

  public refreshFilter() {

    this.valfilter = 0
    for (const filter of this.arrfilters) {
      if (filter.ris)
        this.valfilter += filter.value

      if (filter.value === shared_consts.REPORT_FILT_ATTIVITA && filter.ris) {
        this.resourceHeight = 120
      } else {
        this.resourceHeight = 60
      }
    }

    this.load()
  }

}
