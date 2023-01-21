//express server
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import authRouter from './auth.js'
import userRouter from './user.js'
import productRouter from './product.js'

import { PrismaClient } from '@prisma/client'

//dotenv as import
import dotenv from 'dotenv'
dotenv.config()

const dbUrl =
  process.env.DATABASE_URL ||
  'postgresql://casadiny:casadiny@localhost:5432/casadiny?schema=casadiny'

const prisma = new PrismaClient({
  datasources: { db: { url: dbUrl } },
})
const app = express()
const port = 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

//add prismajs to req
app.use((req, res, next) => {
  req.prisma = prisma
  next()
})

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/product', productRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
