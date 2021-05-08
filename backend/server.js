import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { UrlNotFound, errorHandler } from './Middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import ProductRoutes from './routes/ProductRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/OrderRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running.. 420-69 ;)')
})

app.use('/API/products', ProductRoutes)
app.use('/API/users', userRoutes)
app.use('/API/orders', orderRoutes)

app.get('/API/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use(UrlNotFound)

app.use(errorHandler)

const PORT = process.env.PORT || 42069

app.listen(
  PORT,
  console.log(
    `Running server in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta
      .bold
  )
)
