const db = require("../models")
const { Op } = require("sequelize")

const Transaction = db.Transaction
const Transaction_Item = db.Transaction_Item
const Warehouse = db.Warehouse
const Product = db.Product
const Total_Stock = db.Total_Stock
const User = db.User

const adminTransactionHistoryController = {
    // showAllTransaction: async (req, res) => {
    //     const {
    //         _sortBy = "id",
    //         // _sortDir = "ASC",
    //         WarehouseId = "id",
    //         ProductId = "id",
    //         _limit = 10,
    //         _page = 1,
    //         TransactionId = "id",
    //     } = req.query
    //     try {
    //         if (WarehouseId) {
    //             const seeAllTransactionWithFilter =
    //                 await Transaction.findAndCountAll({
    //                     limit: Number(_limit),
    //                     offset: (_page - 1) * _limit,
    //                     subQuery: false,
    //                     include: [
    //                         {
    //                             model: Transaction_Item,
    //                             include: [
    //                                 {
    //                                     model: Product,
    //                                     include: [
    //                                         {
    //                                             model: Total_Stock,
    //                                             // where: {
    //                                             //     WarehouseId,
    //                                             // },
    //                                             include: [
    //                                                 {
    //                                                     model: Warehouse,
    //                                                 },
    //                                             ],
    //                                         },
    //                                     ],
    //                                 },
    //                             ],
    //                         },
    //                         { model: User },
    //                     ],

    //                     // order: [[_sortBy]],
    //                 })
    //             return res.status(200).json({
    //                 message: "With filter",
    //                 data: seeAllTransactionWithFilter.rows,
    //                 dataCount: seeAllTransactionWithFilter.count,
    //             })
    //         }

    //         const seeAllTransaction = await Transaction.findAndCountAll({
    //             limit: Number(_limit),
    //             offset: (_page - 1) * _limit,
    //             subQuery: false,
    //             include: [
    //                 {
    //                     model: Transaction_Item,
    //                     include: [
    //                         {
    //                             model: Product,
    //                             include: [
    //                                 {
    //                                     model: Total_Stock,
    //                                     include: [
    //                                         {
    //                                             model: Warehouse,
    //                                         },
    //                                     ],
    //                                 },
    //                             ],
    //                         },
    //                     ],
    //                 },
    //                 { model: User },
    //             ],

    //             // order: [[_sortBy]],
    //         })
    //         return res.status(200).json({
    //             message: "With filter",
    //             data: seeAllTransaction.rows,
    //             dataCount: seeAllTransaction.count,
    //         })
    //     } catch (err) {
    //         console.log(err)
    //         return res.status(500).json({
    //             message: err.message,
    //         })
    //     }
    // },

    test: async (req, res) => {
        const { WarehouseId = "", _limit = 10, _page = 1 } = req.query
        try {
            if (WarehouseId) {
                const test = await db.sequelize
                    .query(`SELECT wr.id as warehouse_id,ts.WarehouseId,trx_items.TransactionId,us.username, trx.createdAt, trx.total_quantity, trx.total_price, trx.order_status, wr.warehouse_name, pr.product_name, pr.price, pr.description
                        FROM transactions as trx
                        JOIN users as us ON us.id = trx.UserId
                        JOIN transaction_items as trx_items ON trx_items.TransactionId = trx.id
                        JOIN products as pr ON pr.id = trx_items.ProductId
                        JOIN total_stocks as ts ON ts.ProductId = pr.id
                        JOIN warehouses as wr ON wr.id = ts.WarehouseId
                        WHERE wr.id = ${WarehouseId}
                        ORDER BY trx_items.TransactionId
                        LIMIT 5`)

                const test0 = test[0]
                return res.status(200).json({
                    message: "Filtered",
                    data: test0,
                })
            }
            const test2 = await db.sequelize
                .query(`SELECT wr.id as warehouse_id, ts.WarehouseId,trx_items.TransactionId,us.username, trx.createdAt, trx.total_quantity, trx.total_price, trx.order_status, wr.warehouse_name, pr.product_name, pr.price, pr.description
                        FROM transactions as trx
                        JOIN users as us ON us.id = trx.UserId
                        JOIN transaction_items as trx_items ON trx_items.TransactionId = trx.id
                        JOIN products as pr ON pr.id = trx_items.ProductId
                        JOIN total_stocks as ts ON ts.ProductId = pr.id
                        JOIN warehouses as wr ON wr.id = ts.WarehouseId
                        ORDER BY trx_items.TransactionId
                        LIMIT 5`)
            const test20 = test2[0]
            return res.status(200).json({
                message: "All",
                data: test20,
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message,
            })
        }
    },
}

module.exports = adminTransactionHistoryController
