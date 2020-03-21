import Vue from 'vue'
import { GlobalStore, UserStore, MessageStore } from '../store/Modules'

import Component from 'vue-class-component'
import { func_tools } from '../store/Modules/toolsext'
import { tools } from '../store/Modules/tools'
import { IMessage } from '@src/model'
import MixinBase from './mixin-base'

// You can declare a mixin as the same style as components.
@Component
export default class MixinNave extends MixinBase {
  public CHISONO_DONATORE: number = 0
  public CHISONO_MEDIATORE: number = 3
  public CHISONO_SOGNATORE: number = 6



}
