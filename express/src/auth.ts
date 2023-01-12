import express from 'express'
import bcrypt from 'bcrypt'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import crypto from 'crypto'

const jwt_secret: Secret = 'coucou'

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
    { id: user.id, jwtId: crypto.randomBytes(9).toString('base64url') },
    jwt_secret,
    { expiresIn: '1m' }
  )

  res.json({ token })
})

export default router
