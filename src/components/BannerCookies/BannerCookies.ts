import Vue from 'vue'
import Component from 'vue-class-component'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

import Quasar, { Screen } from 'quasar'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'BannerCookies'
})

export default class BannerCookies extends Vue {
  public $t
  @Prop({ required: true }) public urlInfo: string

  public elementId = 'id'
  public disableDecline = true
  public debug = false
  public status = null
  public supportsLocalStorage = true
  public isOpen = false

  public init() {
    const visitedType = this.getCookieStatus()
    if (visitedType && (visitedType === 'accept' || visitedType === 'decline' || visitedType === 'postpone')) {
      this.isOpen = false
    }

    if (!visitedType) {
      this.isOpen = true
    }
    if (!this.supportsLocalStorage)
      this.isOpen = false

    this.status = visitedType
    this.$emit('status', visitedType)
  }

  public mounted() {
    this.init()
  }

  public checkLocalStorageFunctionality() {
    // Check for availability of localStorage
    try {
      const test = '__cookie-check-localStorage'
      window.localStorage.setItem(test, test)
      window.localStorage.removeItem(test)
    } catch (e) {
      console.error('Local storage is not supported, falling back to cookie use')
      this.supportsLocalStorage = false
    }
  }

  public setCookieStatus(type) {
    if (this.supportsLocalStorage) {
      if (type === 'accept') {
        localStorage.setItem(`cookie-${this.elementId}`, 'accept')
      }
      if (type === 'decline') {
        localStorage.setItem(`cookie-${this.elementId}`, 'decline')
      }
      if (type === 'postpone') {
        localStorage.setItem(`cookie-${this.elementId}`, 'postpone')
      }
    } else {
      /*if (type === 'accept') {
        tinyCookie.set(`cookie-${this.elementId}`, 'accept')
      }
      if (type === 'decline') {
        tinyCookie.set(`cookie-${this.elementId}`, 'decline')
      }
      if (type === 'postpone') {
        tinyCookie.set(`cookie-${this.elementId}`, 'postpone')
      }*/
    }
  }

  public getCookieStatus() {
    if (this.supportsLocalStorage) {
      return localStorage.getItem(`cookie-${this.elementId}`)
    } else {
      // return tinyCookie.get(`cookie-${this.elementId}`)
    }
  }

  public accept() {
    if (!this.debug) {
      this.setCookieStatus('accept')
    }

    this.status = 'accept'
    this.isOpen = false
    this.$emit('clicked-accept')
  }

  public decline() {
    if (!this.debug) {
      this.setCookieStatus('decline')
    }

    this.status = 'decline'
    this.isOpen = false
    this.$emit('clicked-decline')
  }

  public clickInfo() {
    this.isOpen = false
  }

  public postpone() {
    if (!this.debug) {
      this.setCookieStatus('postpone')
    }

    this.status = 'postpone'
    this.isOpen = false
    this.$emit('clicked-postpone')
  }

  public removeCookie() {
    localStorage.removeItem(`cookie-${this.elementId}`)
    this.status = null
    this.$emit('removed-cookie')
  }
}
