import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { GlobalStore, CalendarStore } from '@store'
import { ICalendarState, IMessage, IPost, IUserState } from '../../../model/index'

import './messagePopover.scss'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { ITodo, ITodosState } from '../../../model'
import { Getter } from 'vuex-class'
import { UserStore } from '../../../store/Modules'

import MixinUsers from '../../../mixins/mixin-users'

const namespace = 'MessageModule'

@Component({
  mixins: [MixinUsers]
})
export default class MessagePopover extends Vue {

  @Getter('getlasts_messages', { namespace })
  public lasts_messages: (state: IUserState) => IMessage[]

  public created() {
    // if (GlobalStore.state.posts.length < 1) {
    //   this.requestPosts()
    // }
  }

  public clickChat(msg: IMessage){
    this.$router.replace('/messages/' + msg.dest.username)
  }

  get getNumNotifUnread() {

    return 0
  }

  public randomDate(): Date {
    const myval = Math.floor(Math.random() * 10000000000)
    return tools.getstrDateTime(new Date(tools.getTimestampsNow() - myval))
  }

  public randomAvatarUrl() {
    return `https://api.adorable.io/avatars/face/${this.randomEye()}/${this.randomNose()}/${this.randomMouth()}/${this.randomHexColor()}`
  }

  public randomHexColor() {
    return Math.random().toString(16).slice(2, 8)
  }

  public randomEye() {
    return this.randomArrayElement(['eyes1', 'eyes10', 'eyes2', 'eyes3', 'eyes4', 'eyes5', 'eyes6', 'eyes7', 'eyes9'])
  }

  public randomNose() {
    return this.randomArrayElement(['nose2', 'nose3', 'nose4', 'nose5', 'nose6', 'nose7', 'nose8', 'nose9'])
  }

  public randomMouth() {
    return this.randomArrayElement(['mouth1', 'mouth10', 'mouth11', 'mouth3', 'mouth5', 'mouth6', 'mouth7', 'mouth9'])
  }

  public randomArrayElement(array) {
    return array[Math.floor((Math.random() * array.length))]
  }

  public requestPosts_old() {
    /*this.$http.jsonplaceholder
      .get('posts')
      .then(response => { this.setPosts(response.data) })
      */
  }

  // public requestPosts() {
  //   // console.log('requestPosts...')
  //   let prova = [{ title: 'primo' }, { title: 'Secondo' }]
  //   this.posts.push(...prova)
  //
  // }
}
