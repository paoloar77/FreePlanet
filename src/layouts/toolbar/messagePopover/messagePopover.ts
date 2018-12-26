import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { GlobalStore } from '@store'
import { IPost } from '../../../model/index'

import './messagePopover.scss'

@Component({
})
export default class MessagePopover extends Vue {
  posts: IPost[] = []

  created() {
    if (GlobalStore.state.posts.length < 1) {
      this.requestPosts()
    }
  }

  get filteredPosts() {
    if (this.posts.length >= 1)
      return this.posts.slice(0, 5)
    else
      return []
  }


  public randomDate(): Date {
    let myval = Math.floor(Math.random() * 10000000000)
    return new Date(new Date().valueOf() - myval)
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

  public requestPosts() {
    // console.log('requestPosts...')
    let prova = [{ title: 'primo' }, { title: 'Secondo' }]
    this.posts.push(...prova)

  }
}
