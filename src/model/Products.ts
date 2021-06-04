export interface IProduct {
  _id?: any
  active?: boolean
  idProducer?: string,
  idStorehouses?: string[],
  producer?: IProducer,
  storehouses?: IStorehouse[],
  code?: string,
  name?: string,
  description?: string,
  department?: string,
  category?: string,
  price?: number,
  after_price?: string,
  color?: string,
  size?: string,
  quantityAvailable?: number,
  canBeShipped?: boolean,
  canBeBuyOnline?: boolean,
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
  after_price?: string
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
  orders: IOrderCart[]
}

export interface IProducer {
  _id?: any
  idapp?: string
  name?: string,
  description?: string,
  referent?: string,
  username?: string,
  region?: string,
  city?: string,
  img?: string,
  website?: string,
}

export interface IDepartment {
  _id?: any
  idapp?: string
  name?: string,
  username?: string,
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
  department?: string
  items?: IBaseOrder[]
  note?: string
  modify_at?: Date
}

export interface IOrderCart {
  _id?: any
  idapp?: string
  numorder?: number
  userId?: string
  totalQty?: number
  totalPrice?: number
  department?: string
  items?: IBaseOrder[]
  nameSurname?: string
  status?: number
  note?: string
  modify_at?: Date
  completed_at?: Date
}

export interface IShareWithUs {
  _id?: any
  idapp?: string
  userId?: string
  description?: string
  numshared?: number
  rating?: number
}
