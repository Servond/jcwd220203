const db = require("../models")
const Product = db.Product
const Image = db.Image
const Category = db.Category

const productController = {
    getAllProduct: async (req, res) => {
        try {
            const findAllProduct = await Product.findAll({
                // include: [
                //     { model: db.Category },
                //     { model: db.Total_Stock },
                //     { model: db.Image },
                // ],
            })

            return res.status(200).json({
                message: "Get all product",
                data: findAllProduct,
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "Server Error",
            })
        }
    },

    getProductById: async (req, res) => {
        try {
            const { id } = req.params
            const findProductByPk = await Product.findByPk(id, {
                // include: [
                //     { model: db.Category },
                //     { model: db.Total_Stock },
                //     { model: db.Image },
                // ],
            })

            return res.status(200).json({
                message: "Get Products details",
                data: findProductByPk,
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "Server Error",
            })
        }
    },
    getImage: async (req, res) => {
        try {
            const { id } = req.params
            const findImageById = await Image.findByPk(id)

            return res.status(200).json({
                message: "Get image by id",
                data: findImageById,
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "Server Error",
            })
        }
    },

    getCategory: async (req, res) => {
        try {
            const findCategory = await Category.findAll()
            return res.status(200).json({
                message: "Get category",
                data: findCategory,
            })
        } catch (err) {
            console.log(err)
            return res.status(200).json({
                message: "Server Error",
            })
        }
    },

    getCategoryId: async (req, res) => {
        try {
            const { id } = req.params
            const findCategoryById = await Category.findByPk(id)
            return res.status(200).json({
                message: "Get category",
                data: findCategoryById,
            })
        } catch (err) {
            console.log(err)
            return res.status(200).json({
                message: "Server Error",
            })
        }
    },
}

module.exports = productController
