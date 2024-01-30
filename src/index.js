const express = require("express")
require('dotenv').config()

const app = express()

const port = process.env.PORT

app.use(express.json())

app.get("/api",(req,res) => {
  res.send("API Get")
})

const productController =  require('./product/product.controller')

app.use('/products', productController)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})