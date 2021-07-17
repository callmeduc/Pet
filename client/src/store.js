import {combineReducers} from 'redux'

import {createStore , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import {composeWithDevTools} from 'redux-devtools-extension'
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userDeleteReducer, userListReducer, userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateReducer, userUpdateProfileReducer, userProfileReducer } from './reducers/usersReducers'
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer } from './reducers/orderReducers'


const reducer = combineReducers({
    productList: productListReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productDetails: productDetailsReducer,
    productUpdate: productUpdateReducer,
    cart:cartReducer,
    userRegister:userRegisterReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userProfile: userProfileReducer,
    orderCreate: orderCreateReducer,
    orderListMy: orderListMyReducer,
    orderDetails: orderDetailsReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
  const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
  const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
    userLogin: { userInfo: userInfoFromStorage },
}

const composeEnhancers= composeWithDevTools({})

const store = createStore(reducer , initialState , composeEnhancers(applyMiddleware(thunk)))

export default store