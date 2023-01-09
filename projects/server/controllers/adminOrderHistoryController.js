const db = require("../models")
const { Op } = require("sequelize")
const { sequelize } = require("../models")

const Transaction = db.Transaction
const TransactionItem = db.TransactionItem
const Warehouse = db.Warehouse
const Product = db.Product
const Total_Stock = db.Total_Stock
const User = db.User
const Image_Url = db.Image_Url

const adminOrderHistoryController = {
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

    getOrder: async (req, res) => {
        const { _limit = 10, _page = 1 } = req.query
        const WarehouseId = req.query.WarehouseId[0]
        console.log(req.query)
        try {
            let query = `SELECT wr.id as warehouse_id,ts.WarehouseId,trx_items.TransactionId,trx.transaction_name, 
            us.username, trx.createdAt, trx.total_quantity, trx.total_price, ps.payment_status_name as order_status, wr.warehouse_name,pr.id as productId                      
                        FROM transactions as trx
                        JOIN users as us ON us.id = trx.UserId
                        JOIN transactionitems as trx_items ON trx_items.TransactionId = trx.id
                        JOIN products as pr ON pr.id = trx_items.ProductId
                        JOIN total_stocks as ts ON ts.ProductId = pr.id
                        JOIN warehouses as wr ON wr.id = ts.WarehouseId
                        JOIN payment_statuses as ps ON ps.id = trx.PaymentStatusId `

            if (WarehouseId) {
                query += `WHERE wr.id = ${WarehouseId} `
            }
            query += `ORDER BY trx_items.TransactionId DESC
                    LIMIT ${_limit}
                    OFFSET ${(_page - 1) * _limit} `

            const test = await db.sequelize.query(query)
            const test0 = test[0]

            // const transformArr = (orig) => {
            //     var newArr = [],
            //         types = {},
            //         i,
            //         j,
            //         cur
            //     for (i = 0, j = orig.length; i < j; i++) {
            //         cur = orig[i]
            //         if (!(cur.TransactionId in types)) {
            //             types[cur.TransactionId] = {
            //                 TransactionId: cur.TransactionId,
            //                 product_names: [],
            //                 prices: [],
            //                 qtys: [],
            //                 descriptions: [],
            //                 productIds: [],
            //                 usernames: [],
            //             }
            //             newArr.push(types[cur.TransactionId])
            //         }
            //         types[cur.TransactionId].product_names.push(
            //             cur.product_name
            //         )
            //         types[cur.TransactionId].prices.push(cur.price)
            //         types[cur.TransactionId].qtys.push(cur.qty)
            //         types[cur.TransactionId].descriptions.push(cur.description)
            //         types[cur.TransactionId].productIds.push(cur.productId)
            //         types[cur.TransactionId].usernames.push(cur.username)
            //     }
            //     return newArr
            // }

            return res.status(200).json({
                message: "Filtered",
                data: test0,
                // dataCount: 5,
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message,
            })
        }
    },

    getByWarehouseId: async (req, res) => {
        try {
            const {
                WarehouseId,
                transaction_name = "",
                _sortBy = "",
                _sortDir = "ASC",
                _limit = 10,
                _page = 1,
            } = req.query
            if (
                WarehouseId ||
                transaction_name ||
                _sortBy == "createdAt" ||
                _sortDir ||
                _limit ||
                _page
            ) {
                const test2 = await Transaction.findAndCountAll({
                    include: [
                        {
                            model: Transaction_Item,
                            include: [
                                {
                                    model: Product,
                                },
                            ],
                        },
                        { model: Warehouse },
                        { model: User },
                        { model: Order_status },
                    ],
                    where: {
                        [Op.or]: {
                            WarehouseId,
                            transaction_name: {
                                [Op.like]: `%${transaction_name}%`,
                            },
                        },
                    },
                    limit: Number(_limit),
                    offset: (_page - 1) * _limit,
                    order: [[_sortBy, _sortDir]],
                })

                return res.status(200).json({
                    message: "All",
                    data: test2.rows,
                    dataCount: test2.count,
                })
            }
            const test3 = await Transaction.findAndCountAll({
                include: [
                    {
                        model: Transaction_Item,
                        include: [
                            {
                                model: Product,
                            },
                        ],
                    },
                    { model: Warehouse },
                    { model: User },
                    { model: Order_status },
                ],
                // where: {
                //     transaction_name: { [Op.like]: `%${transaction_name}%` },
                // },
                limit: Number(_limit),
                offset: (_page - 1) * _limit,
                order: [[_sortBy, _sortDir]],
            })

            return res.status(200).json({
                message: "All",
                data: test3.rows,
                dataCount: test3.count,
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message,
            })
        }
    },
    getTransactionList: async (req, res) => {
        try {
            const {
                _limit = 10,
                _page = 1,
                _sortBy = "id",
                _sortDir = "DESC",
                searching = "",
            } = req.query
            const WarehouseId = req.query.WarehouseId

            const rawQuery = `SELECT p.product_name,  t.id AS TransactionId, transaction_name, t.UserId 
                    FROM transactionItems AS ti
                    JOIN products AS p ON p.id = ti.ProductId
                    JOIN transactions AS t ON ti.TransactionId = t.id
                    JOIN warehouses AS wr ON wr.id = t.WarehouseId
                    WHERE t.transaction_name Like '%${searching}%' && WarehouseId='${WarehouseId}'
                    GROUP BY t.id `

            if (WarehouseId && searching) {
                const getDataQuery = await db.sequelize.query(rawQuery)

                const getTransactionId = getDataQuery[0].map(
                    (val) => val.TransactionId
                )

                const MyTransactionList = await Transaction.findAndCountAll({
                    limit: Number(_limit),
                    offset: (_page - 1) * _limit,
                    order: [[_sortBy, _sortDir]],
                    include: [
                        {
                            model: TransactionItem,
                            include: [
                                {
                                    model: Product,
                                    include: [
                                        {
                                            model: Image_Url,
                                        },
                                        {
                                            model: Total_Stock,
                                        },
                                    ],
                                },
                            ],
                        },
                        { model: Warehouse },
                        { model: db.Order_status },
                        { model: User },
                    ],
                    where: {
                        id: getTransactionId,
                    },
                })

                const dataCount = getTransactionId.length

                return res.status(200).json({
                    message: "Get Keyword with status On Going List",
                    data: MyTransactionList.rows,
                    dataCount: dataCount,
                })
            }

            // if (searching) {
            //     const getDataQuery = await db.sequelize.query(
            //         `SELECT p.product_name,  t.id AS TransactionId, transaction_name, t.UserId
            //         FROM transactionItems AS ti
            //         JOIN products AS p ON p.id = ti.ProductId
            //         JOIN transactions AS t ON ti.TransactionId = t.id
            //         WHERE (p.product_name Like '%${searching}%' or t.transaction_name Like '%${searching}%')
            //         GROUP BY t.id; `
            //     )

            //     const getTransactionId = getDataQuery[0].map(
            //         (val) => val.TransactionId
            //     )

            //     const MyTransactionList = await Transaction.findAndCountAll({
            //         limit: Number(_limit),
            //         offset: (_page - 1) * _limit,
            //         order: [[_sortBy, _sortDir]],
            //         include: [
            //             {
            //                 model: TransactionItem,
            //                 include: [
            //                     {
            //                         model: Product,
            //                         include: [
            //                             {
            //                                 model: Image_Url,
            //                             },
            //                             {
            //                                 model: Total_Stock,
            //                             },
            //                         ],
            //                     },
            //                 ],
            //             },
            //             { model: Warehouse },
            //             { model: db.Order_status },
            //             { model: User },
            //         ],
            //         where: {
            //             id: getTransactionId,
            //         },
            //     })

            //     const dataCount = getTransactionId.length

            //     return res.status(200).json({
            //         message: "Get Keyword with status On Going List",
            //         data: MyTransactionList.rows,
            //         dataCount: dataCount,
            //     })
            // }

            const MyTransactionList = await Transaction.findAndCountAll({
                limit: Number(_limit),
                offset: (_page - 1) * _limit,
                order: [[_sortBy, _sortDir]],
                include: [
                    {
                        model: TransactionItem,
                        include: [
                            {
                                model: db.Product,
                                include: [
                                    {
                                        model: db.Image_Url,
                                    },
                                    {
                                        model: db.Total_Stock,
                                    },
                                ],
                            },
                        ],
                    },
                    { model: Warehouse },
                    { model: db.Order_status },
                    { model: User },
                ],
            })

            const MyTransactionListAll = await Transaction.findAll({
                order: [[_sortBy, _sortDir]],
                include: [
                    {
                        model: TransactionItem,
                        include: [
                            {
                                model: db.Product,
                                include: [
                                    {
                                        model: db.Image_Url,
                                    },
                                    {
                                        model: db.Total_Stock,
                                    },
                                ],
                            },
                        ],
                    },
                    { model: Warehouse },
                    { model: db.Order_status },
                    { model: User },
                ],
            })

            const count = MyTransactionListAll.map((val) => val.id)

            const dataCount = count.length

            return res.status(200).json({
                message: "Get keyword",
                data: MyTransactionList.rows,
                dataCount: dataCount,
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "Server error",
            })
        }
    },

    getReport: async (req, res) => {
        const WarehouseId = req.query.WarehouseId[0]
        const {
            createdAt,
            transaction_name = "",
            _limit = 10,
            _page = 1,
            _sortBy = "",
        } = req.query
        try {
            let sql = `SELECT  trx.id AS TransactionId,  trx.WarehouseId, wr.warehouse_name
                        FROM transactionitems AS trx_items
                        JOIN products AS pr ON pr.id = trx_items.ProductId
                        JOIN transactions AS trx ON trx.id = trx_items.TransactionId
                        JOIN warehouses as wr ON wr.id = trx.WarehouseId `

            if (WarehouseId && createdAt && transaction_name) {
                sql += `WHERE WarehouseId=${WarehouseId} AND MONTH(trx.createdAt)=${createdAt} AND trx.transaction_name LIKE "%${transaction_name}%" `
            } else if (WarehouseId && transaction_name) {
                sql += `WHERE WarehouseId=${WarehouseId} AND trx.transaction_name LIKE "%${transaction_name}%"  `
            } else if (WarehouseId && createdAt) {
                sql += `WHERE WarehouseId=${WarehouseId} AND MONTH(trx.createdAt)=${createdAt} `
            } else if (createdAt && transaction_name) {
                sql += `WHERE MONTH(trx.createdAt)=${createdAt} AND trx.transaction_name LIKE "%${transaction_name}%" `
            } else if (WarehouseId) {
                sql += `WHERE WarehouseId=${WarehouseId} `
            } else if (createdAt) {
                sql += `WHERE MONTH(trx.createdAt)=${createdAt} `
            } else if (transaction_name) {
                sql += `WHERE trx.transaction_name LIKE "%${transaction_name}%" `
            }

            const findData = await db.sequelize.query(
                (sql += `GROUP BY trx.id
                        ORDER BY trx.createdAt ${_sortBy} `)
            )

            const getTransactionId = findData[0].map((val) => val.TransactionId)

            const dataCount = getTransactionId.length

            const transactionList = await Transaction.findAndCountAll({
                limit: Number(_limit),
                offset: (_page - 1) * _limit,
                include: [
                    {
                        model: TransactionItem,
                        include: [
                            {
                                model: Product,
                                include: [
                                    {
                                        model: Image_Url,
                                    },
                                    {
                                        model: Total_Stock,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        model: db.Order_status,
                    },
                    { model: User },
                    { model: Warehouse },
                ],
                where: {
                    id: getTransactionId,
                },
            })
            return res.status(200).json({
                message: "Filtered",
                data: transactionList.rows,
                dataCount: dataCount,
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message,
            })
        }
    },
    findWarehouse: async (req, res) => {
        try {
            const response = await db.Warehouse.findAll()

            return res.status(200).json({
                message: "Find all warehouse",
                data: response,
            })
        } catch (err) {
            return res.status(500).json({
                message: "Server Error",
            })
        }
    },
    getById: async (req, res) => {
        try {
            let sql = `SELECT  trx.id AS TransactionId,  trx.WarehouseId, wr.warehouse_name
                        FROM transactionitems AS trx_items
                        JOIN products AS pr ON pr.id = trx_items.ProductId
                        JOIN transactions AS trx ON trx.id = trx_items.TransactionId
                        JOIN warehouses as wr ON wr.id = trx.WarehouseId `

            const findData = await db.sequelize.query(
                (sql += `GROUP BY trx.id `)
            )
            const getTransactionId = findData[0].map((val) => val.TransactionId)
            const transactionList = await Transaction.findAll({
                where: { id: req.params.id },
                include: [
                    {
                        model: TransactionItem,
                        include: [
                            {
                                model: Product,
                                include: [
                                    {
                                        model: Image_Url,
                                    },
                                    {
                                        model: Total_Stock,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        model: db.Order_status,
                    },
                    { model: User },
                    { model: Warehouse },
                ],
            })
            return res.status(200).json({
                data: transactionList,
                message: "Get By Id",
            })
        } catch (err) {
            res.status(500).json({
                message: err.message,
            })
        }
    },
}

module.exports = adminOrderHistoryController
