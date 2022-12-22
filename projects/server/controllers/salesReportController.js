const db = require("../models")

const salesReportController = {
    getReport: async (req, res) => {
        try {
            const { WarehouseId, CategoryId } = req.query
            console.log(req.query)

            if (CategoryId) {
                const findDataFilter = await db.Transaction.findAndCountAll({
                    include: [
                        {
                            model: db.Warehouse,
                        },
                        {
                            model: db.TransactionItem,
                            include: [
                                {
                                    model: db.Product,
                                    include: [
                                        {
                                            model: db.Category,
                                        },
                                    ],
                                    where: { CategoryId },
                                },
                            ],
                        },
                    ],
                    // where: { WarehouseId },
                })
                return res.status(200).json({
                    message: "Get data filtered",
                    data: findDataFilter.rows,
                    dataCount: findDataFilter.count,
                })
            }

            const findData = await db.Transaction.findAndCountAll({
                include: [
                    {
                        model: db.Warehouse,
                    },
                    {
                        model: db.TransactionItem,
                        include: [
                            {
                                model: db.Product,
                                include: [
                                    {
                                        model: db.Category,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            })
            return res.status(200).json({
                message: "Get data",
                data: findData.rows,
                dataCount: findData.count,
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message,
            })
        }
    },

    getReportWithQuery: async (req, res) => {
        const CategoryId = req.query.CategoryId
        const WarehouseId = req.query.WarehouseId[0]
        const { createdAt, _limit = 5, _page = 1 } = req.query
        console.log("ct", CategoryId)
        console.log("wr", WarehouseId)
        console.log("mnth", createdAt)
        try {
            let sql = `SELECT trx.WarehouseId, pr.CategoryId, pr.id AS productId, ct.category_name, pr.product_name, pr.description, trx_items.price_per_item AS price, trx_items.quantity,
                        trx_items.price_per_item * trx_items.quantity AS total, wr.warehouse_name, trx_items.createdAt
                        FROM transactionitems AS trx_items
                        JOIN transactions AS trx ON trx.id = trx_items.TransactionId
                        JOIN products AS pr ON pr.id = trx_items.ProductId
                        JOIN categories AS ct ON ct.id = pr.CategoryId
                        JOIN warehouses as wr ON wr.id = trx.WarehouseId `

            if (WarehouseId && CategoryId && createdAt) {
                sql += `WHERE WarehouseId=${WarehouseId} AND CategoryId=${CategoryId} AND MONTH(trx_items.createdAt)=${createdAt} `
            } else if (WarehouseId && CategoryId) {
                sql += `WHERE WarehouseId=${WarehouseId} AND CategoryId=${CategoryId} `
            } else if (WarehouseId && createdAt) {
                sql += `WHERE WarehouseId=${WarehouseId} AND MONTH(trx_items.createdAt)=${createdAt} `
            } else if (CategoryId && createdAt) {
                sql += `WHERE CategoryId=${CategoryId} AND MONTH(trx_items.createdAt)=${createdAt} `
            } else if (CategoryId) {
                sql += `WHERE CategoryId=${CategoryId} `
            } else if (WarehouseId) {
                sql += `WHERE WarehouseId=${WarehouseId} `
            } else if (createdAt) {
                sql += `WHERE MONTH(trx_items.createdAt)=${createdAt}`
            }

            sql += `LIMIT ${_limit}
                    OFFSET ${(_page - 1) * _limit} `

            const findData = await db.sequelize.query(sql)
            const findDataReal = findData[0]
            return res.status(200).json({
                message: "Filtered",
                data: findDataReal,
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message,
            })
        }
    },
}

module.exports = salesReportController
