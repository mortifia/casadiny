import express from 'express'

var router = express.Router()

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define the home page route
router.get('/', async (req, res) => {
  //return users
  const users = await req.prisma.user.findMany()
  res.json(users)
})

export default router
