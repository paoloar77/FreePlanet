import Vue from 'vue'

import Component from 'vue-class-component'
import { func_tools } from '../store/Modules/toolsext'
import { tools } from '../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { GlobalStore, UserStore } from '../store/Modules'
import { fieldsTable } from '@src/store/Modules/fieldsTable'
import { CalendarStore } from '@store'
import MixinMetaTags from '@src/mixins/mixin-metatags'

import { shared_consts } from '../common/shared_vuejs'

// You can declare a mixin as the same style as components.
@Component
export default class MixinBase extends MixinMetaTags {
  get mythis() {
    return this
  }

  public showNotif(msg) {
    tools.showNotif(this.$q, this.$t(msg))
  }

  get toolsext() {
    return toolsext
  }

  get db_fieldsTable() {
    return fieldsTable
  }

  get func_tools() {
    return func_tools
  }

  get tools() {
    return tools
  }

  get shared_consts() {
    return shared_consts
  }

  public getValDb(keystr, serv, def?, table?, subkey?, id?, idmain?) {

    return tools.getValDb(keystr, serv, def, table, subkey, id, idmain)
  }

  public getValDbLang(keystr, serv, def?, table?, subkey?) {
    let ris = tools.getValDb(keystr + '_' + tools.getLocale(), serv, def, table, subkey)
    if (ris === def)
      ris = tools.getValDb(keystr + '_it', serv, def, table, subkey)
    return ris
  }

  public async setValDb(key, value, type, serv: boolean, table?, subkey?, id?) {

    // console.log('setValDb', key, value, serv, table, subkey)
    let mydatatosave = null
    if (table === 'users') {
      const myid = UserStore.state.my._id

      const myfield = {}

      if (key === 'profile') {
        UserStore.state.my.profile[subkey] = value
      } else {
        UserStore.state.my[key] = value
      }

      // Save to the DB:
      if (subkey) {
        myfield[key + '.' + subkey] = value
      } else {
        myfield[key] = value
      }

      // console.log('myfield', myfield)

      mydatatosave = {
        id: myid,
        table,
        fieldsvalue: myfield
      }

    } else if (table === 'todos') {

      const myfield = {}

      // Save to the DB:
      if (subkey) {
        myfield[key + '.' + subkey] = value
      } else {
        myfield[key] = value
      }

      // console.log('myfield', myfield)

      mydatatosave = {
        id,
        table,
        fieldsvalue: myfield
      }

    } else if (table === 'settings') {
      GlobalStore.mutations.setValueSettingsByKey({ key, value, serv })

      let myrec = GlobalStore.getters.getrecSettingsByKey(key, serv)
      if (myrec === undefined) {
        myrec = {
          idapp: process.env.APP_ID,
          key,
          type
        }
        myrec.serv = serv
        if ((myrec.type === tools.FieldType.date) || (myrec.type === tools.FieldType.onlydate))
          myrec.value_date = value
        else if ((myrec.type === tools.FieldType.number) || (myrec.type === tools.FieldType.hours))
          myrec.value_num = value
        else if (myrec.type === tools.FieldType.boolean)
          myrec.value_bool = value
        else
          myrec.value_str = value

        myrec = await tools.createNewRecord(this, 'settings', myrec).then((myrecris) => {
          // console.log('myrec')
          let recsett = null
          if (serv)
            recsett = GlobalStore.state.serv_settings
          else
            recsett = GlobalStore.state.settings

          recsett.push(myrecris)
          return recsett.find((rec) => rec.key === key)
        })
      }
      // console.log('myrec', myrec)

      mydatatosave = {
        id: myrec._id,
        table: 'settings',
        fieldsvalue: myrec
      }
    } else {
      const myfield = {}

      // Save to the DB:
      if (subkey) {
        myfield[key + '.' + subkey] = value
      } else {
        myfield[key] = value
      }

      // console.log('myfield', myfield)

      mydatatosave = {
        id,
        table,
        fieldsvalue: myfield
      }

    }

    // console.log('mydatatosave', mydatatosave)

    GlobalStore.actions.saveFieldValue(mydatatosave).then((esito) => {
      if (esito) {
        tools.showPositiveNotif(this.$q, this.$t('db.recupdated'))
      } else {
        tools.showNegativeNotif(this.$q, this.$t('db.recfailed'))
        // Undo...
      }
    })

  }

  public getarrValDb(keystr, serv) {
    const myval = GlobalStore.getters.getValueSettingsByKey(keystr, serv)
    // console.log('myval', myval)
    try {
      if (myval) {
        const myrec = JSON.parse(myval)
        // console.log('*************** getarrValDb')
        // console.table(myrec)
        return myrec
      } else {
        return []
      }
    } catch (e) {
      return []
    }
  }

}
