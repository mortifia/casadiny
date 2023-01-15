import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const jwt_secret = 'coucou'

var router = express.Router()

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// sign-up
router.post('/signup', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const user = await req.prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user) {
    return res.status(400).json({ message: 'Email already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await req.prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  res.json('ok')
})

// sign-in
router.post('/signin', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const user = await req.prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid password' })
  }

  const token = jwt.sign(
    { user: user.id, jwtId: crypto.randomBytes(9).toString('base64url') },
    jwt_secret,
    { expiresIn: '30d' }
  )

  res.json({ token })
})

export async function authToken(req, res, next) {
  try {
    console.log(`test : ${req.headers.authorization.split(' ')[1].toString()}`)
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, jwt_secret, async (err, jwt) => {
      if (err) return res.sendStatus(403)
      req.jwt = jwt
      req.user = await req.prisma.user.findUnique({
        where: {
          id: jwt.user,
        },
        //not get password
        // select: {
        //   id: true,
        //   email: true,
        //   admin: true,
        // },
      })
      next()
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

// admin check
router.get('/admin', authToken, async (req, res) => {
  if (!req.user.admin) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  res.json('ok')
})

export default router
