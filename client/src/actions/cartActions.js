import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants"

export const addToCart= (product , qty) => async(dispatch, getState)=>{
    var cartItem = {
        name : product.name ,
        _id : product._id,
        image : product.image ,
        qty : Number(qty) ,
        price : product.price
    }
    if(cartItem.qty > 10){
        alert('You cannot add more than 10 quantities')
    }else{
        if(cartItem.qty < 1){
            dispatch(removeFromCart(cartItem._id))
        }else{
            dispatch({
                type: CART_ADD_ITEM,
                payload:cartItem
            })

        }
    }
    
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const removeFromCart = (id) => async(dispatch, getState) =>{
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => async(dispatch, getState) =>{
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => async(dispatch, getState) =>{
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}