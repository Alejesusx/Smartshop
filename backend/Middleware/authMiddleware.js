import jwt from 'jsonwebtoken'
import User from '../Models/UserModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
  let Bearer = req.headers.authorization
  if (Bearer && Bearer.startsWith('Bearer')) {
    try {
      let token = Bearer.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET)

      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, no Bearer')
    }
  }

  if (!Bearer) {
    res.status(401)
    throw new Error('Not authorized, no Bearer')
  }
})
export { protect }
