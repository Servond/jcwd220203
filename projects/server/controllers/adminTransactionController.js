const db = require("../models")
const { Op } = require("sequelize")

const Transaction = db.Transaction
const Transaction_Item = db.Transaction_Item
const Warehouse = db.Warehouse
const Product = db.Product
const Total_Stock = db.Total_Stock
const User = db.User

const adminTransactionController = {
    showAllTransaction: async (req, res) => {
        const {
            _sortBy = "id",
            // _sortDir = "ASC",
            WarehouseId = "",
            _limit = 10,
            _page = 1,
            TransactionId = "id",
        } = req.query
        try {
            if (WarehouseId) {
                const seeAllTransactionWithFilter =
                    await Transaction.findAndCountAll({
                        limit: Number(_limit),
                        offset: (_page - 1) * _limit,
                        subQuery: false,
                        include: [
                            {
                                model: Transaction_Item,
                                include: [
                                    {
                                        model: Product,
                                        include: [
                                            {
                                                model: Total_Stock,

                                                include: [
                                                    {
                                                        model: Warehouse,
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                            { model: User },
                        ],

                        // order: [[_sortBy]],
                    })
                return res.status(200).json({
                    message: "With filter",
                    data: seeAllTransactionWithFilter.rows,
                    dataCount: seeAllTransactionWithFilter.count,
                })
            }

            const seeAllTransaction = await Transaction.findAndCountAll({
                limit: Number(_limit),
                offset: (_page - 1) * _limit,
                subQuery: false,
                include: [
                    {
                        model: Transaction_Item,
                        include: [
                            {
                                model: Product,
                                include: [
                                    {
                                        model: Total_Stock,
                                        include: [
                                            {
                                                model: Warehouse,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    { model: User },
                ],

                // order: [[_sortBy]],
            })
            return res.status(200).json({
                message: "With filter",
                data: seeAllTransaction.rows,
                dataCount: seeAllTransaction.count,
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: err.message,
            })
        }
    },
}

module.exports = adminTransactionController
