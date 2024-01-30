// Berkomunikasi dengan database
// Bisa menggunakan ORM, atau Row Query

const prisma = require("../db")

const findProducts = async () =>{
    const products  = await prisma.produk.findMany()

    return products
}

const findProductById = async (id) =>{
    const product = await prisma.produk.findUnique({
        where:{
            id,
        }
    })

    // Ini contoh Row Query
    // const product = await prisma.$executeRaw`SELECT * FROM produk`

    return product
    
}


const insertProduct = async (productData) =>{
    const product = await prisma.produk.create({
        data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            image: productData.image
        }
    })
    return product
}


const deleteProduct = async (id) =>{
    await prisma.produk.delete({
        where: {
            id,
        }
    })
}


const editProduct = async (id,productData) =>{
    const product = await prisma.produk.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            image: productData.image
        }
    })

    return product
}

module.exports = {
    findProducts,
    findProductById,
    insertProduct,
    deleteProduct,
    editProduct
}