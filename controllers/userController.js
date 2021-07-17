import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'


// @desc    Auth user 
// @route   POST /api/users/login
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
})

// @desc    Register a new user
// @route   POST /api/users
const register = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('')
      }
    
      const user = await User.create({
        name,
        email,
        password,
      })
    
      if (user) {
        res.status(201).json(user)
      } else {
        res.status(400)
        throw new Error('Invalid user data')
      }

})

// @desc    Get all users
// @route   GET /api/users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
    
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })


// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const {userInfo} = req.body
  console.log("req.body")
  console.log(req.body)
  // console.log(userInfo)
  const user = await User.findById(userInfo._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  console.log(req.body)
  const user = await User.findById(req.body.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


export {register, getAllUsers, authUser, deleteUser , getUserById, updateUser,getUserProfile, updateUserProfile }