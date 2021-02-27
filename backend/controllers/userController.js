import asyncHandler from 'express-async-handler'
import generateWebToken from '../utils/generateWebToken.js'
import User from '../Models/UserModel.js'
import Product from '../Models/UserModel.js'

// Description: get all the users
// Route: GET /API/users
//type: public
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await Product.find({})
  res.json(users)
})

// Description: auth user/get token
// Route: POST /API/users/login
//type: public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateWebToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('invalid email or password')
  }
})

// Description: register user
// Route: POST /API/users
//type: public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400)
    throw new Error('This user already exist')
  }

  const user = await User.create({ name, email, password })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateWebToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

// Description: get the profile of the user
// Route: GET /API/users/profile
//type: private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

// Description: gupdate
// Route: PUT /API/users/profile
//type: private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    ;(user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email)
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateWebToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

export { registerUser, authUser, getUserProfile, getAllUsers, updateUser }
