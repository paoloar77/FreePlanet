import Vue from 'vue'

import Component from 'vue-class-component'
import { func_tools } from '../store/Modules/toolsext'
import { tools } from '../store/Modules/tools'
import { IMessage } from '@src/model'
import { IEvents } from '../model'
import { CalendarStore, GlobalStore } from '@store'
import translate from '@src/globalroutines/util'

// You can declare a mixin as the same style as components.
@Component
export default class MixinEvents extends Vue {

  public getImgEvent(event: IEvents) {
    if (!!event.img)
      return '../../statics/' + event.img
    else
      return '../../statics/images/noimg.png'
  }

  public getStyleByEvent(event: IEvents, visu: boolean) {
    if (visu) {
      return 'border: inset; border-color: darkblue; border-width: 3px; padding: 5px !important; '
    } else {
      return ''
    }
  }

  public isAlreadyBooked(eventparam: IEvents) {
    return CalendarStore.getters.findEventBooked(eventparam, true)
  }

  public getWhereIcon(where) {
    const whererec = CalendarStore.getters.getWhereRec(where)
    return (whererec) ? whererec.whereicon : ''
  }

  public getWhereName(where) {
    const whererec = CalendarStore.getters.getWhereRec(where)
    return (whererec) ? whererec.placename : ''
  }

  get editable() {
    return CalendarStore.state.editable
  }

  public getContribtypeById(id) {
    return CalendarStore.getters.getContribtypeById(id)
  }

  public getPrice(event: IEvents) {
    let myprice = (event.price > 0) ? event.price + ' €' : ''
    myprice = (event.price === -1) ? translate('event.askinfo') : myprice

    if (event.infoafterprice)
      myprice += ' ' + event.infoafterprice

    return myprice
  }

  public isShowPrice(event: IEvents) {
    const rec = CalendarStore.getters.getContribtypeRec(event.contribtype)
    return (rec) ? rec.showprice : true
  }

  public isEventEnabled(myevent) {
    // check if event is in the past
    const datenow = tools.addDays(tools.getDateNow(), -1)

    // console.log('datenow', datenow, 'end', myevent.dateTimeEnd)

    return (new Date(myevent.dateTimeEnd) >= datenow)
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

  public UpdateDbByFields(self, myrec, undo?) {

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


}
