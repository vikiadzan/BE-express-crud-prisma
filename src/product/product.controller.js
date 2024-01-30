// Layer untuk handle Request dan Respons
// Handle Validasi  Body

const express = require('express')
const prisma = require("../db")
const { getAllProducts, getProductById, createProduct, deleteProductById, editProductById } = require('./product.services')

const router = express.Router()

router.get("/", async (req, res) => {
    const products = await getAllProducts()
    res.send(products)
})

router.get("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id)
        const product = await getProductById(parseInt(productId))
   
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// POST
router.post("/", async (req, res) => {
   

    try {
        const newProductData = req.body
        const product = await createProduct(newProductData)
        res.status(200).send({
            message: 'Create Product Success',
            Data: product
        })
        
    } catch (error) {
        res.status(400).send(error.message)
    }

})

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const productId = req.params.id //string
    
        await deleteProductById(parseInt(productId))
    
        res.send("Product delete")
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// PUT
router.put("/:id", async (req, res) => {
    const productId = req.params.id
    const productData = req.body

    if (!(productData.name && productData.price && productData.description && productData.image)) {
        return res.status(400).send("Some Fields are missing")
    }

    const product = await editProductById(parseInt(productId),productData)

    res.status(200).send({
        message: "Update data success",
        Data: product
    })
})

// PATCH
router.patch("/:id", async (req, res) => {
    try {
        const productId = req.params.id
        const productData = req.body
    
        const product = await editProductById(parseInt(productId),productData)

        res.status(200).send({
            message: "Update data success",
            Data: product
        })
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router 