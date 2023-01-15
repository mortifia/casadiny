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
  console.log(req.jwt)
  console.log(req.user)

  //send user wihout password
  const user = { ...req.user, password: undefined }

  res.json(user)
})

export default router
