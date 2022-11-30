const { Op } = require("sequelize")
const db = require("../models")
const Product = db.Product
const Image = db.Image
const Category = db.Category

const productController = {
    getAllProduct: async (req, res) => {
        try {
            const {
                product_name = "",
                description = "",
                price = "",
                CategoryId = "",
                _sortBy = "id",
                _sortDir = "ASC",
                _limit = 12,
                _page = 1,
            } = req.query

            if (
                _sortBy === "product_name" ||
                _sortBy === "description" ||
                _sortBy === "price" ||
                _sortBy === "CategoryId" ||
                product_name ||
                price ||
                description ||
                CategoryId
            ) {
                if (!Number(CategoryId)) {
                    const getAllProducts = await Product.findAndCountAll({
                        limit: Number(_limit),
                        offset: (_page - 1) * _limit,
                        include: [{ model: Category, required: true }],
                        order: [[_sortBy, _sortDir]],
                        where: {
                            [Op.or]: {
                                product_name: {
                                    [Op.like]: `%${product_name}%`,
                                },
                            },
                        },
                    })
                    return res.status(200).json({
                        message: "Get all products",
                        data: getAllProducts.rows,
                        dataCount: getAllProducts.count,
                    })
                }

                const getAllProduct = await Product.findAndCountAll({
                    limit: Number(_limit),
                    offset: (_page - 1) * _limit,
                    include: [{ model: Category, required: true }],
                    order: [[_sortBy, _sortDir]],
                    where: {
                        [Op.or]: {
                            product_name: {
                                [Op.like]: `%${product_name}%`,
                            },
                        },
                        CategoryId,
                    },
                })

                return res.status(200).json({
                    message: "Get all books",
                    data: getAllProduct.rows,
                    dataCount: getAllProduct.count,
                })
            }
            const getAll = await Product.findAndCountAll({
                limit: Number(_limit),
                offset: (_page - 1) * _limit,
                include: [{ model: Category, required: true }],
                order: [
                    [_sortBy, _sortDir],
                    ["price", "DESC"],
                ],
            })
            return res.status(200).json({
                message: "Get all",
                data: getAll.rows,
                dataCount: getAll.count,
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
            const { _limit = 10, _page = 1, _sortBy = "id" } = req.query
            const findCategory = await Category.findAll({
                limit: Number(_limit),
                offset: (_page - 1) * _limit,
                order: [
                    ["category_name", "ASC"],
                    [_sortBy, "ASC"],
                ],
            })
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
