import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { SingleProject } from '../../../components/projects/SingleProject/index'
import { CTodo } from '../../../components/todos/CTodo'

import { CProgress } from '../../../components/CProgress'
import { CDate } from '../../../components/CDate'
import { Action } from 'vuex'
import Products from '@src/store/Modules/Products'
import { CSingleCart } from '../../../components/CSingleCart'
import { CTitleBanner } from '@components'
import { tools } from '@src/store/Modules/tools'
import { ICart, IOrderCart } from '@src/model'
import MixinBase from '@src/mixins/mixin-base'
import { shared_consts } from '@src/common/shared_vuejs'

const namespace: string = 'Products'

@Component({
  name: 'checkOut',
  components: { SingleProject, CProgress, CTodo, CDate, CSingleCart, CTitleBanner },
  filters: {
    capitalize(value) {
      if (!value) {
        return ''
      }
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})

export default class OrderInfo extends MixinBase {
  public $q: any
  public myorderscart: IOrderCart[] = []
  public myarrrec: any = {}

  public conferma_carrello: boolean = false
  public conferma_ordine: boolean = false

  public taborders: string = 'incorso'
  public filter: string = ''
  public statusnow: number = 0
  public arrnumstatus: any = []
  public columns = [
    {
      name: 'numorder',
      required: true,
      align: 'left',
      label: 'Numero Ordine',
      field: 'numorder',
      sortable: true
    },
    {
      name: 'nameSurname',
      required: true,
      align: 'left',
      label: 'Nome',
      field: 'nameSurname',
      sortable: true
    },
    {
      name: 'created_at',
      required: true,
      align: 'center',
      label: 'Effettuato il',
      field: 'created_at',
      sortable: true
    },
    {
      name: 'items',
      required: true,
      label: 'Articoli',
      field: 'items',
      sortable: true
    },
    {
      name: 'totalPrice',
      required: true,
      label: 'Totale',
      field: 'totalPrice',
      sortable: true
    },
    {
      name: 'status',
      align: 'center',
      required: true,
      label: 'Stato',
      field: 'status',
      sortable: true
    }
  ]

  /*public $refs: {
    singleproject: SingleProject[],
    ctodo: CTodo
  }*/

  get getOrdersCart() {
    return Products.getters.getOrdersCart(this.taborders)
  }

  get getAllOrdersCart() {
    return Products.getters.getOrdersAllCart()
  }

  public change_field(myorderid, fieldname) {
    if (this.myarrrec[myorderid][fieldname] !== this[fieldname]) {
      this.myarrrec[myorderid][fieldname] = this[fieldname]

      const mydata = {
        [fieldname]: this.myarrrec[myorderid][fieldname]
      }

      const aggiorna = fieldname !== 'status'
      tools.saveFieldToServer(this, 'orderscart', myorderid, mydata, aggiorna)
    }
  }
  public updateorders() {
    this.myorderscart = this.getOrdersCart
    for (const ordercart of this.myorderscart) {
      this.myarrrec[ordercart._id] = Object.keys(ordercart)
    }

    const allorders = this.getAllOrdersCart
    for (const status of [
      2,
      3,
      4,
      6,
      10
    ]) {
      this.arrnumstatus[status] = allorders.filter((rec) => (rec.status === status)).reduce((sum, item) => sum + 1, 0)
    }

  }

  public mounted() {

    this.updateorders()

    console.log('arrnumstatus;')
    console.log(this.arrnumstatus)

    this.columns = [...this.columns,
      {
        name: 'comandi',
        align: 'center',
        required: false,
        label: 'Comandi',
        field: 'comandi',
        sortable: false
      }]

  }

  public CanBeShipped() {
    return Products.state.cart.items.filter((rec) => rec.order.product.canBeShipped).length
  }

  public CanBeBuyOnline() {
    return Products.state.cart.items.filter((rec) => rec.order.product.canBeBuyOnline).length
  }

  get getnumsteps() {
    let numsteps = 1

    if (this.CanBeShipped())
      numsteps++
    if (this.CanBeBuyOnline())
      numsteps++

    return numsteps
  }

  public docheckout() {

    // Può essere spedito?

    if (this.CanBeShipped()) {
      // mostra form di spedizione
    }

    if (this.CanBeBuyOnline()) {
      // mostra form di acquisto Online
    }
  }

  get nextstep() {
    return 0
  }

  public clickFunz(order, status) {

    if (status === shared_consts.OrderStatus.ORDER_CONFIRMED) {
      // Conferma Ordine
    }

    const statusStr = shared_consts.getStatusStr(status)

    this.$q.dialog({
      message: 'Impostare l\'ordine n. ' + order.numorder + ' ' + statusStr + ' ?',
      ok: {
        label: this.$t('dialog.yes'),
        push: true
      },
      cancel: {
        label: this.$t('dialog.cancel')
      },
      title: 'Ordine'
    }).onOk(async () => {

      this.statusnow = await Products.actions.UpdateOrderStatus({ order_id: order._id, status })

      if (this.statusnow === status) {
        order.status = this.statusnow
        this.updateorders()
        tools.showPositiveNotif(this.$q, 'Ordine ' + statusStr)
      }
      // this.change_field('status')
      // this.change_field('status')
    })
  }


}
