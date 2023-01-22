import express from 'express'
import { authToken } from './auth.js'

var router = express.Router()

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// sign-up
router.get('/', authToken, async (req, res) => {
  //send user wihout password
  const user = { ...req.user, password: undefined }

  res.json(user)
})

//add address
router.post('/address', authToken, async (req, res) => {
  try {
    const address = await req.prisma.address.create({
      data: {
        ...req.body,
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    })

    res.json(address)
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message.substring(1, error.message.length - 1) })
  }
})

//address
router.get('/address', authToken, async (req, res) => {
  try {
    const address = await req.prisma.address.findMany({
      where: {
        userId: req.user.id,
      },
    })

    res.json(address)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//address with id
router.get('/address/:id', authToken, async (req, res) => {
  try {
    const address = await req.prisma.address.findUnique({
      where: {
        id: Number(req.params.id),
      },
    })

    res.json(address)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
