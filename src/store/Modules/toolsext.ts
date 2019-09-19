import { UserStore } from '@store'

export const toolsext = {
  getLocale(vero?: boolean) {
    if (UserStore) {
      if (UserStore.state) {
        return UserStore.state.lang
      }
    }
    return process.env.LANG_DEFAULT
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
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
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
