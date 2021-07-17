import axios from 'axios'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../constants/orderConstants"

export const createOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      })
      const {userLogin: { userInfo }} = getState()
  
  
      const { data } = await axios.post(`/api/orders`, {...order,userInfo})
  
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      })
      dispatch({
        type: CART_CLEAR_ITEMS,
        payload: data,
      })
      localStorage.removeItem('cartItems')
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
      })
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_MY_REQUEST,
      })
      const {userLogin: { userInfo }} = getState()
  
  
      const { data } = await axios.get(`/api/orders/myorders/${userInfo._id}`)
      // console.log(data)
  
      dispatch({
        type: ORDER_LIST_MY_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ORDER_LIST_MY_FAIL,
        payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
      })
    }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    // const {
    //   userLogin: { userInfo },
    // } = getState()


    const { data } = await axios.get(`/api/orders/${id}`)
    console.log(data)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    })
  }
}

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    })

    const { data } = await axios.get(`/api/orders`)

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    })
  }
}

export const deliverOrder = (order, orderStatus) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    })

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`, {orderStatus}
    )

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: message,
    })
  }
}