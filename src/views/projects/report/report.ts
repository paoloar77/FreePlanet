import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import MixinBase from '@src/mixins/mixin-base'
import { CTitleBanner } from '@components'
import Global = WebAssembly.Global
import { CalendarStore, GlobalStore, UserStore } from '@store'
import { colors, Screen, Platform, date } from 'quasar'
import { tools } from '@src/store/Modules/tools'

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

  public mounted() {
    const date_start = tools.addDays(new Date(tools.getTimestampsNow()), -90)
    const date_end = tools.addDays(new Date(tools.getTimestampsNow()), 365)
    UserStore.actions.reportload({ date_start, date_end })
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
  }

  public calendarPrev() {
    this.$refs.calendar.prev()
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

  public getEvents(dt, objres) {
    console.log('dt', dt, 'objres', objres)
    const eventsloc = []

    if (!!this.arrhour[objres.username]) {
      if (this.arrhour[objres.username].length > 0) {
        this.arrhour[objres.username].forEach((item) => {
          if (item) {
            if (tools.getstrYYMMDDDate(item.date) === dt) {
              if (eventsloc.length > 0) {
                // check for overlapping times
                eventsloc.push(item)
              }
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

}
