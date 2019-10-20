
export interface IEvents {
  _id?: any
  typol?: string
  short_tit?: string
  title?: string
  details?: string
  withtime?: boolean
  dur?: number
  dur2?: number
  date?: string
  side?: string
  bgcolor?: string
  days?: number
  icon?: string
  img?: string
  where?: string
  contribtype?: number
  teacher?: string  // teacherid
  teacher2?: string // teacherid2
  infoextra?: string
  linkpage?: string
  linkpdf?: string
  nobookable?: boolean
  news?: boolean
  dupId?: any
  canceled?: boolean
  deleted?: boolean
}

export interface IBookedEvent {
  _id?: any
  userId: string
  id_bookedevent?: any
  numpeople: number
  infoevent: string
  msgbooking: string
  datebooked?: Date
  modified: boolean
  booked: boolean
}

export interface IOperators {
  username: string
  name: string
  surname: string
  email: string
  cell: string
  webpage?: string
  img: string
  skype?: string
  days_working?: string
  facebook?: string
  disciplines?: string
  offers?: string
}

export enum EState {
  None, Creating, Modifying
}

export interface IBookedEventPage {
  show: boolean
  bookedevent: IBookedEvent
  state: EState
}

export interface ICalendarState {
  editable: boolean
  eventlist: IEvents[]
  bookedevent: IBookedEvent[]
  operators: IOperators[]
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
