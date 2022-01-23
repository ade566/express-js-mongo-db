const express = require('express')
const router = require('./routers')
const app = express()
const port = 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`)
})