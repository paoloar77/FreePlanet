export interface IProduct {
  _id?: any
  descr?: string,
  idProducer?: string,
  idStorehouses?: string[],
  producer?: IProducer,
  storehouses?: IStorehouse[],
  name?: string,
  department?: string,
  category?: string,
  price?: number,
  color?: string,
  size?: string,
  quantityAvailable?: number,
  weight?: number,
  stars?: number,
  date?: Date,
  icon?: string,
  img?: string
}

export interface IBaseOrder {
  order?: IOrder
}

export interface IOrder {
  _id?: any
  idapp?: string
  userId?: string
  status?: number
  idProduct?: string
  idProducer?: string
  idStorehouse?: string
  price?: number
  color?: string
  size?: string
  quantity?: number
  weight?: number
  stars?: number
  product?: IProduct
  producer?: IProducer
  storehouse?: IStorehouse
  date_created?: Date
  date_checkout?: Date
  date_payment?: Date
  date_shipping?: Date
  date_delivered?: Date
  notes?: string
}

export interface IProductsState {
  products: IProduct[]
  cart: ICart
}

export interface IProducer {
  _id?: any
  idapp?: string
  name?: string,
  description?: string,
  referent?: string,
  region?: string,
  city?: string,
  img?: string,
  website?: string,
}

export interface IStorehouse {
  _id?: any
  idapp?: string
  name?: string,
  description?: string,
  referent?: string,
  address?: string,
  city?: string,
  region?: string,
  img?: string,
  website?: string,
}

export interface ICart {
  _id?: any
  idapp?: string
  userId?: string
  totalQty?: number
  totalPrice?: number
  items?: IBaseOrder[]
}
