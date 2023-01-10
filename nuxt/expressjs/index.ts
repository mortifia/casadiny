import express from 'express'
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  })
})

console.log('Express fuuuu')

export default app
