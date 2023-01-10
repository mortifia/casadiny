//express server
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import auth from './auth'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

//add prismajs to req
app.use((req, res, next) => {
  req.prisma = prisma
  next()
})

app.use('/auth', auth)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
