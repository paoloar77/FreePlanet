import { ICart, IOrder, IOrderCart, IProduct, IProductsState } from 'model'
import { storeBuilder } from './Store/Store'

import Api from '@api'
import { tools } from './tools'
import { lists } from './lists'
import * as ApiTables from './ApiTables'
import { GlobalStore, Products, Todos, UserStore } from '@store'
import globalroutines from './../../globalroutines/index'
import { Mutation } from 'vuex-module-decorators'
import { serv_constants } from '@src/store/Modules/serv_constants'
import { GetterTree } from 'vuex'
import objectId from '@src/js/objectId'
import { costanti } from '@src/store/Modules/costanti'
import { IAction } from '@src/model'
import * as Types from '@src/store/Api/ApiTypes'
import { static_data } from '@src/db/static_data'
import { shared_consts } from '@src/common/shared_vuejs'

const state: IProductsState = {
  products: [],
  cart: { items: [], totalPrice: 0, totalQty: 0, userId: '' },
  orders: []
}

// const listFieldsToChange: string [] = ['descr', 'statustodo', 'category', 'expiring_at', 'priority', 'id_prev', 'pos', 'enableExpiring', 'progress', 'phase', 'assigned_to_userId', 'hoursplanned', 'hoursworked', 'start_date', 'completed_at', 'themecolor', 'themebgcolor']

const b = storeBuilder.module<IProductsState>('Products', state)
const stateGetter = b.state()

function getProductsByCategory(category: string): any[] {
  return state.products.filter((rec) => rec.category === category)
}

function createOrderByProduct(product: IProduct, order: IOrder): IOrder {
  const myorder: IOrder = {
    userId: UserStore.state.my._id,
    idapp: process.env.APP_ID,
    idProduct: product._id,
    idProducer: product.idProducer,
    status: shared_consts.OrderStatus.IN_CART,
    price: product.price,
    color: product.color,
    size: product.size,
    weight: product.weight,

    quantity: order.quantity,
    idStorehouse: order.idStorehouse
  }

  if (product.storehouses.length === 1) {
    order.idStorehouse = product.storehouses[0]._id
  }

  return myorder
}

function initcat() {

  const rec = Getters.getters.getRecordEmpty()
  // rec.userId = UserStore.state.my._id

  return rec

}

namespace Getters {
  const getProducts = b.read((stateparamf: IProductsState) => (): IProduct[] => {
    return state.products
  }, 'getProducts')

  const getCart = b.read((stateparamf: IProductsState) => (): ICart => {
    return state.cart
  }, 'getCart')

  const getOrdersCart = b.read((stateparamf: IProductsState) => (tipoord: string): IOrderCart[] => {
    if (tipoord === 'incorso')
      return state.orders.filter((rec) => rec.status <= shared_consts.OrderStatus.CHECKOUT_CONFIRMED)
    else
      return state.orders.filter((rec) => rec.status < shared_consts.OrderStatus.RECEIVED && rec.status > shared_consts.OrderStatus.CHECKOUT_CONFIRMED)
  }, 'getOrdersCart')

  const existProductInCart = b.read((stateparamf: IProductsState) => (idproduct): boolean => {
    // console.log('.state.cart.items', state.cart.items)
    const ris = state.cart.items.filter((item) => item.order.idProduct === idproduct).reduce((sum, rec) => sum + 1, 0)
    return ris > 0
  }, 'existProductInCart')

  const getRecordEmpty = b.read((stateparamf: IProductsState) => (): IProduct => {

    const tomorrow = tools.getDateNow()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const objproduct: IProduct = {
      // _id: tools.getDateNow().toISOString(),  // Create NEW
      idProducer: '',
      idStorehouses: [],
      producer: null,
      storehouses: null,
      code: '',
      name: '',
      description: '',
      department: '',
      category: '',
      price: 0.0,
      color: '',
      size: '',
      quantityAvailable: 0,
      canBeShipped: false,
      canBeBuyOnline: false,
      weight: 0,
      stars: 0,
      date: tools.getDateNow(),
      icon: '',
      img: ''
    }
    return objproduct
  }, 'getRecordEmpty')

  export const getters = {
    get getRecordEmpty() {
      return getRecordEmpty()
    },
    get getProducts() {
      return getProducts()
    },
    get getCart() {
      return getCart()
    },
    get getOrdersCart() {
      return getOrdersCart()
    },
    get existProductInCart() {
      return existProductInCart()
    },
  }
}

namespace Mutations {

  export const mutations = {}

}

namespace Actions {

  async function loadProducts(context) {

    console.log('loadProducts')

    if (!static_data.functionality.ENABLE_ECOMMERCE)
      return null

    console.log('getProducts', 'userid=', UserStore.state.my._id)

    // if (UserStore.state.my._id === '') {
    //   return new Types.AxiosError(0, null, 0, '')
    // }

    let ris = null

    ris = await Api.SendReq('/products', 'POST', null)
      .then((res) => {
        if (res.data.products) {  // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
          state.products = res.data.products
        } else {
          state.products = []
        }

        // console.log('ARRAY PRODUCTS = ', state.products)
        if (process.env.DEBUG === '1') {
          // console.log('dbLoad', 'state.products', state.products)
        }

        return res
      })
      .catch((error) => {
        console.log('error getProducts', error)
        UserStore.mutations.setErrorCatch(error)
        return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, tools.ERR_GENERICO, error)
      })

    // ApiTables.aftercalling(ris, checkPending, 'categories')

    return ris
  }

  async function loadProduct(context, { code }) {

    console.log('loadProduct', code)

    if (!static_data.functionality.ENABLE_ECOMMERCE)
      return null

    console.log('getProduct', 'code', code)

    // if (UserStore.state.my._id === '') {
    //   return new Types.AxiosError(0, null, 0, '')
    // }

    let ris = null

    ris = await Api.SendReq('/products/' + code, 'POST', { code })
      .then((res) => {
        console.log('product', res.data.product)
        if (res.data.product) {  // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
          return res.data.product
        } else {
          return null
        }
      })
      .catch((error) => {
        console.log('error getProduct', error)
        UserStore.mutations.setErrorCatch(error)
        return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, tools.ERR_GENERICO, error)
      })

    return ris
  }

  async function loadCart(context) {

    console.log('loadCart')

    if (!static_data.functionality.ENABLE_ECOMMERCE)
      return null

    console.log('loadCart', 'userid=', UserStore.state.my._id)

    // if (UserStore.state.my._id === '') {
    //   return new Types.AxiosError(0, null, 0, '')
    // }

    let ris = null

    ris = await Api.SendReq('/cart/' + UserStore.state.my._id, 'GET', null)
      .then((res) => {
        if (res.data.cart) {  // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
          state.cart = res.data.cart
        } else {
          state.cart = { items: [], totalPrice: 0, totalQty: 0, userId: '' }
        }

        return res
      })
      .catch((error) => {
        console.log('error loadCart', error)
        UserStore.mutations.setErrorCatch(error)
        return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, tools.ERR_GENERICO, error)
      })

    // ApiTables.aftercalling(ris, checkPending, 'categories')

    return ris
  }

  async function removeFromCart(context, { order }) {

    const ris = await Api.SendReq('/cart/' + UserStore.state.my._id, 'DELETE', { orderId: order._id })
      .then((res) => {
        if (res.data.cart) {  // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
          state.cart = res.data.cart
        } else {
          state.cart = { items: [], totalPrice: 0, totalQty: 0, userId: '' }
        }

        return res
      })

    return ris
  }

  async function addToCart(context, { product, order }) {

    if (!static_data.functionality.ENABLE_ECOMMERCE)
      return null

    const neworder = createOrderByProduct(product, order)

    if (!neworder.idStorehouse)
      return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, tools.ERR_GENERICO, 'Nessuno Store')

    console.log('addToCart', 'userid=', UserStore.state.my._id, neworder)

    let ris = null

    ris = await Api.SendReq('/cart/' + UserStore.state.my._id, 'POST', { order: neworder })
      .then((res) => {
        if (res.data.cart) {  // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
          state.cart = res.data.cart
        } else {
          state.cart = { items: [], totalPrice: 0, totalQty: 0, userId: '' }
        }

        return res
      })
      .catch((error) => {
        console.log('error addToCart', error)
        UserStore.mutations.setErrorCatch(error)
        return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, tools.ERR_GENERICO, error)
      })

    // ApiTables.aftercalling(ris, checkPending, 'categories')

    return ris
  }

  async function addSubQtyToItem(context, { addqty, subqty, order }) {

    if (!static_data.functionality.ENABLE_ECOMMERCE)
      return null

    // console.log('addSubQtyToItem', 'userid=', UserStore.state.my._id, order)

    let ris = null

    ris = await Api.SendReq('/cart/' + UserStore.state.my._id, 'POST', { addqty, subqty, order })
      .then((res) => {
        state.cart = res.data.cart
        if (!!res.data.qty) {
          // const ind = state.cart.items.findIndex((rec) => rec.order._id === order._id)
          // state.cart.items[ind].order.quantity = res.data.qty

          return res.data.qty
        }

        return 0
      })
      .catch((error) => {
        console.log('error addSubQtyToItem', error)
        UserStore.mutations.setErrorCatch(error)
        return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, tools.ERR_GENERICO, error)
      })

    // ApiTables.aftercalling(ris, checkPending, 'categories')

    return ris
  }

  async function UpdateStatusCart(context, { cart_id, status }) {

    if (!static_data.functionality.ENABLE_ECOMMERCE)
      return null

    // console.log('addSubQtyToItem', 'userid=', UserStore.state.my._id, order)

    let ris = null

    ris = await Api.SendReq('/cart/' + UserStore.state.my._id + '/cartstatus', 'POST', { cart_id, status })
      .then((res) => {

        if (res.data.status === shared_consts.OrderStatus.CHECKOUT_CONFIRMED) {
          ProductsModule.state.cart = {}
          if (res.data.orders)
            Products.state.orders = res.data.orders
        }
        return res.data.status
      })
      .catch((error) => {
        console.log('error UpdateStatusCart', error)
        UserStore.mutations.setErrorCatch(error)
        return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, tools.ERR_GENERICO, error)
      })

    return ris
  }

  export const actions = {
    // loadCart: b.dispatch(loadCart),
    loadProduct: b.dispatch(loadProduct),
    loadProducts: b.dispatch(loadProducts),
    addToCart: b.dispatch(addToCart),
    addSubQtyToItem: b.dispatch(addSubQtyToItem),
    UpdateStatusCart: b.dispatch(UpdateStatusCart),
    removeFromCart: b.dispatch(removeFromCart),
  }

}

// Module
const ProductsModule = {
  get state() {
    return stateGetter()
  },
  getters: Getters.getters,
  mutations: Mutations.mutations,
  actions: Actions.actions
}

export default ProductsModule
