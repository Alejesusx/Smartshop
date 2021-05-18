import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import colors from 'colors'
import { UrlNotFound, errorHandler } from './Middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import ProductRoutes from './routes/ProductRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/OrderRoutes.js'
import uploadRoutes from './routes/UploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use('/API/products', ProductRoutes)
app.use('/API/users', userRoutes)
app.use('/API/orders', orderRoutes)
app.use('/API/upload', uploadRoutes)

const __dirname = path.resolve()


app.get('/API/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)


app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}
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
