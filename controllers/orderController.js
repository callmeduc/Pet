import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import { sendMail } from '../utils/mailer.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
    userInfo,
    note
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      user : userInfo._id,
      orderItems ,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      note
    })

    const email = userInfo.email

    //send mail 
    // console.log(order)
    // cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    
  const total = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  var i = 1;
    const bodySend = `<Table>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Qty</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
    ${orderItems.map(x =>(`
      <tr>
        <td>${i++}</td>
        <td>${x.name}</td>
        <td>${x.qty}</td>
        <td>${x.price}</td>
      </tr>`
      ))}
    </tbody>
  </Table>
  <h3><b>Please prepare an amount of ${total} VNĐ to pay for your order.</b></h3>
  <p><b>Thank you use our service.</b></p>`
    await sendMail(bodySend, email, "Xác nhận đặt hàng thành công")
    const createdOrder = await order.save()
    // res.status(400).json({
    //     status: 'success',
    //     data: null,
    //     message: "Thành công. Mật Khẩu mới đã được gửi đến email của người dùng"
    // });

    res.status(201).json(createdOrder)
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders/:id
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id })
  res.json(orders)
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )
    // console.log(order)
  
    if (order) {
      res.json(order)
    } else {
      res.status(404).json("loi")
    }
    
  } catch (error) {
    res.json(error)
    
  }
  
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name email')
  res.json(orders)
})

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  // console.log(req.body)
  const { orderStatus } = req.body

  if (order) {
    order.orderStatus = orderStatus
    if(orderStatus == 2 ){
      order.isDelivered = true
      order.deliveredAt = Date.now()
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export { addOrderItems, getMyOrders, getOrderById , getOrders, updateOrderToDelivered, updateOrderToPaid }