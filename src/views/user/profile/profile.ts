import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import MixinBase from '../../../mixins/mixin-base'
import { CMyFieldDb, CTitleBanner, CProfile, CStatus } from '@components'
import { UserStore } from '../../../store/Modules'
import { GlobalStore } from '../../../store'
import { tools } from '../../../store/Modules/tools'

@Component({
  components: { CProfile, CTitleBanner, CMyFieldDb, CStatus }
})

export default class Profile extends MixinBase {
  public $v
  public $q

  get mythis() {
    return this
  }

  get getpayment() {
    return UserStore.state.my.profile.paymenttypes
  }

  get profile() {
    return UserStore.state.my.profile
  }

  public eliminaAccount() {

    this.$q.dialog({
      message: this.$t('reg.cancellami', {sitename: this.$t('ws.sitename')}),
      cancel: {
        label: this.$t('dialog.cancel')
      },
      ok: {
        label: this.$t('dialog.yes'),
        push: true
      },
      title: this.$t('pages.profile')
    }).onOk(async () => {
      this.$q.dialog({
        message: this.$t('reg.cancellami_2', {sitename: this.$t('ws.sitename')}),
        cancel: {
          label: this.$t('dialog.cancel')
        },
        ok: {
          label: this.$t('dialog.yes'),
          push: true
        },
        title: this.$t('pages.profile')
      })
        .onOk(async () => {
          GlobalStore.actions.DeleteRec({ table: tools.TABUSER, id: UserStore.state.my._id })
            .then((ris) => {
              if (ris) {
                tools.showPositiveNotif(this.$q, this.$t('reg.account_cancellato'))
                UserStore.actions.logout()
                this.$router.replace('/')
              } else
                tools.showNegativeNotif(this.$q, this.$t('db.recfailed'))

            })
        })
    })
  }

}
