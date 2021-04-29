import { UserStore } from '@store'
import { date } from 'quasar'

export const toolsext = {
  getLocale(vero?: boolean) {
    if (UserStore) {
      if (UserStore.state) {
        return UserStore.state.lang
      }
    }
    return process.env.LANG_DEFAULT
  },
  isLang(whichlang) {
    const loc = func_tools.getLocale()
    return (loc === whichlang)
  }
}

export const func_tools = {
  getLocale(vero?: boolean) {
    if (UserStore) {
      if (UserStore.state) {
        return UserStore.state.lang
      }
    }
    return ''
  },

  getDateStr(mydate) {
    const DateFormatter = new Intl.DateTimeFormat(func_tools.getLocale() || void 0, {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
      // timeZone: 'UTC'
    })
    try {
      // console.log('mydate', mydate, DateFormatter)
      if (DateFormatter) {
        const date1 = new Date(mydate)
        return DateFormatter.format(date1)
      }
      return mydate
    }catch (e) {
      return ''
    }

  },

  getMinutesDuration(mydatestart, mydateend) {
    return date.getDateDiff(mydateend, mydatestart, 'minutes')
  },

  getDateTimeShortStr(mydate) {
    const DateFormatter = new Intl.DateTimeFormat(func_tools.getLocale() || void 0, {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'short'
      // timeZone: 'UTC'
    })
    if (DateFormatter) {
      const date = new Date(mydate)
      return DateFormatter.format(date)
    }
    return mydate
  }
}

// export const costanti_tools = {
//   DateFormatter: new Intl.DateTimeFormat(func_tools.getLocale() || void 0, {
//     weekday: 'long',
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric'
//     // timeZone: 'UTC'
//   })
// }
