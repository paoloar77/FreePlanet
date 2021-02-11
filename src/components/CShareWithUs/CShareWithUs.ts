import { Component, Prop, Watch } from 'vue-property-decorator'
import { INotData, IParamsQuery, IShareWithUs } from '../../model/index'
import { tools } from '../../store/Modules/tools'
import { NotevoleStore } from '@store'
import MixinBase from '@src/mixins/mixin-base'
import { validationMixin } from 'vuelidate'
import { validations } from '../CSignUpNotevole/CSignUp-validate'
import { CTitleBanner } from '@components'
import { CCardState } from '../CCardState'
import { UserStore } from '../../store/Modules'
import { GlobalStore } from '../../store'
import { CCopyBtn } from '../CCopyBtn'

import { date } from 'quasar'
import objectId from '@src/js/objectId'

@Component({
  name: 'CShareWithUs',
  components: { CTitleBanner, CCardState, CCopyBtn }
})

export default class CShareWithUs extends MixinBase {
  public $t
  public myshares: IShareWithUs[] = []
  public mydescr: string = ''

  get listasharewithus() {
    return GlobalStore.state.sharewithus.sort((a, b) => b.numshared - a.numshared)
  }

  get listamyshare() {
    return UserStore.state.my.profile.myshares
  }

  public myload() {
    const sortBy = 'numshared'
    const descending = 1
    const myobj = {}
    if (descending)
      myobj[sortBy] = -1
    else
      myobj[sortBy] = 1

    const params: IParamsQuery = {
      table: 'sharewithus',
      startRow: 0,
      endRow: 10000,
      filter: '',
      filterand: '',
      sortBy: myobj,
      descending,
      userId: UserStore.state.my._id
    }

    console.log('myload', params)

    GlobalStore.actions.loadTable(params).then((data) => {
      GlobalStore.state.sharewithus = data.rows
    })
  }

  public mounted() {
    this.myload()
  }

  public recsharenow(mydescr): IShareWithUs {
    return {
      idapp: process.env.APP_ID,
      description: mydescr,
      userId: UserStore.state.my._id,
      numshared: 0,
      rating: 0
    }
  }

  public add_newshare(mydescr) {
    if (!mydescr)
      return false
    const recfound = UserStore.state.my.profile.myshares.find((rec) => rec.description.toLowerCase() === mydescr.toLowerCase())
    if (!!recfound) {
      tools.showNegativeNotif(this.$q, '"' + mydescr + '" è già presente!')
      return false
    }
    UserStore.state.my.profile.myshares.push({ description: mydescr, rating: 5 })

    const mydata = {
      'profile.myshares': UserStore.state.my.profile.myshares
    }
    tools.saveFieldToServer(this, 'users', UserStore.state.my._id, mydata)

    const myrec = this.recsharenow(mydescr)

    const updatedexistingrec = this.updaterecnow(mydescr, true)
    if (!updatedexistingrec) {
      tools.createNewRecord(this, 'sharewithus', myrec, false).then((myrecris) => {
        GlobalStore.state.sharewithus.push(myrecris)
        this.myload()
        this.mydescr = ''
        return true
      })
    }

  }

  public updaterecnow(mydescr, add) {
    const recesistente = GlobalStore.state.sharewithus.find((rec) => rec.description.toLowerCase() === mydescr.toLowerCase())
    const indrec = GlobalStore.state.sharewithus.findIndex((rec) => rec.description.toLowerCase() === mydescr.toLowerCase())
    console.log('recesistente', recesistente)
    if (recesistente) {
      const mydatatosave = {
        id: recesistente._id,
        table: tools.TABSHAREWITHUS,
        fieldsvalue: recesistente
      }

      if (add)
        recesistente.numshared++
      else {
        if (recesistente.numshared <= 0)
          return false
        else
          recesistente.numshared--
      }

      GlobalStore.actions.saveFieldValue(mydatatosave).then((myrecris) => {
        if (myrecris) {
          GlobalStore.state.sharewithus[indrec] = recesistente
          this.myload()
        }
        this.mydescr = ''
      })
      return true
    } else {
      return false
    }
  }

  public selected(value, shared) {
    shared.numshared++
    tools.saveFieldToServer(this, 'sharewithus', shared._id, { numshared: shared.numshared })

  }

  public checkifICanRemove(shared) {
    // Controlla se questo è stato aggiunto da me
    const recfound = GlobalStore.state.sharewithus.find((rec) => rec.description.toLowerCase() === shared.description.toLowerCase())
    if (!!recfound)
      return recfound.userId === UserStore.state.my._id
    else
      return true
  }

  public removeShared(shared) {
    this.$q.dialog({
      message: 'Vuoi cancellare "' + shared.description + '" dalla tua lista ?',
      ok: {
        label: this.$t('dialog.yes'),
        push: true
      },
      cancel: {
        label: this.$t('dialog.cancel')
      },
      title: this.$t('pages.sharedwithus')
    }).onOk(async () => {

        const descr = shared.description

        // Aggiorna Record Personale
        UserStore.state.my.profile.myshares = UserStore.state.my.profile.myshares.filter((rec) => rec.description !== descr)

        const mydata = {
          'profile.myshares': UserStore.state.my.profile.myshares
        }
        tools.saveFieldToServer(this, 'users', UserStore.state.my._id, mydata)

        const updatedexistingrec = this.updaterecnow(shared.description, false)
        if (!updatedexistingrec) {
          if (this.checkifICanRemove(shared)) {
            const myrec = GlobalStore.state.sharewithus.find((rec) => rec.description.toLowerCase() === descr.toLowerCase())
            if (!!myrec) {
              GlobalStore.actions.DeleteRec({ table: tools.TABSHAREWITHUS, id: myrec._id })
                .then((ris) => {
                  console.log('DELETEREC ris=', ris)
                  if (ris) {

                    // Aggiorna Array Globale
                    GlobalStore.state.sharewithus = GlobalStore.state.sharewithus.filter((rec) => rec.description !== descr)
                    this.myload()

                    console.log('GlobalStore.state.sharewithus', GlobalStore.state.sharewithus)
                    tools.showPositiveNotif(this.$q, this.$t('db.deletedrecord'))
                  }
                })
            }
          }
        }
      }
    )
  }

  public findrec(descr) {
    if (UserStore.state.my.profile.myshares.length === 0)
      return false
    return UserStore.state.my.profile.myshares.find((rec) => rec.description.toLowerCase() === descr.toLowerCase())
  }

  public mycolorbtn(shared) {
    if (this.findrec(shared.description)) {
      return 'positive'
    } else {
      return 'primary'
    }
  }

  public geticon(shared) {
    if (this.findrec(shared.description))
      return undefined
    else
      return 'fas fa-plus'
  }

  public getifdisable(shared) {
    return this.findrec(shared.description)
  }
}
