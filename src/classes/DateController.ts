import moment from 'moment'
import 'moment/locale/it'
moment.locale('it')

const monthsStrings = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']

export class DateMoving {
  public date: moment.Moment
  public hour: string
  public number: number
  public month: string
  public year: number

  constructor(time: number) {
    this.date = moment(time * 1000)
    this.hour = `${this.date.format('HH:mm')}`
    this.number = this.date.date()
    this.year = this.date.year()
    this.month = monthsStrings[this.date.month()]
  }

  public fullString() {
    return this.date.format('Do MMMM YYYY, HH:mm')
  }
}
