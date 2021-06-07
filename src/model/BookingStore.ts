import { IAction } from '@src/model/Projects'
import { Component } from 'vue-router/types/router'
import { IEvents } from '@src/model/Calendar'

export interface IBookingState {
  bookinglist: IEvents[]
}
