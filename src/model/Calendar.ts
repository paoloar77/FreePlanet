import { IOperators } from '@src/model/GlobalStore'

export interface IEvents {
  _id?: any
  typol?: string
  short_tit?: string
  title?: string
  details?: string
  bodytext?: string
  dateTimeStart?: Date
  dateTimeEnd?: Date
  side?: string
  bgcolor?: string
  icon?: string
  img?: string
  img_small?: string
  wherecode?: string
  contribtype?: string
  price?: number
  infoafterprice?: string
  teacher?: string
  teacher2?: string
  infoextra?: string
  linkpage?: string
  linkpdf?: string
  nobookable?: boolean
  lunchAvailable?: boolean
  dinnerAvailable?: boolean
  dinnerSharedAvailable?: boolean
  lunchType?: number
  dinnerType?: number
  lunchPrice?: number
  dinnerPrice?: number
  internal?: boolean
  news?: boolean
  canceled?: boolean
  deleted?: boolean
  dupId?: any
  modified?: boolean
}

export interface IBookedEvent {
  _id?: any
  userId: string
  id_bookedevent?: any
  numpeople: number
  numpeopleLunch?: number
  numpeopleDinner?: number
  numpeopleDinnerShared?: number
  infoevent: string
  msgbooking: string
  datebooked?: Date
  modified: boolean
  booked: boolean
}

export interface IWheres {
  code: string
  placename: string
  whereicon: string
}

export interface IContribtype {
  _id: any
  label: string
  showprice: boolean
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
  wheres: IWheres[]
  contribtype: IContribtype[]
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
