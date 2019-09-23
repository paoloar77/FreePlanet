
export interface IEvents {
  _id?: any
  time?: string
  duration?: number
  duration2?: number
  title?: string
  details?: string
  date?: string
  side?: string
  bgcolor?: string
  days?: number
  icon?: string
  img?: string
  where?: string
  teacher?: string
  teacher2?: string
  avatar?: string
  avatar2?: string
  infoextra?: string
  linkpdf?: string
  nobookable?: boolean
}

export interface IBookedEvent {
  id_bookedevent: any
  numpeople: number
}

export interface ICalendarState {
  editable: boolean
  eventlist: IEvents[]
  bookedevent: IBookedEvent[]
  // ---------------
  titlebarHeight: number
  locale: string,
  maxDays: number,
  fiveDayWorkWeek: boolean,
  shortMonthLabel: boolean,
  showDayOfYearLabel: boolean,
  shortWeekdayLabel: boolean,
  shortIntervalLabel: boolean,
  hour24Format: boolean,
  hideHeader: boolean,
  noScroll: boolean,
  showMonthLabel: boolean,
  showWorkWeeks: boolean,
  intervalRange: {min: number, max: number},
  intervalRangeStep: number,
  intervalHeight: number,
  resourceHeight: number,
  resourceWidth: number,
  dayHeight: number,
  enableThemes: boolean,
  theme: {}
}
