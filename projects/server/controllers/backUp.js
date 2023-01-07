const refreshPage = () => {
    window.location.reload(false)
}

if (status === "On Going") {

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
            {
                model: db.Order_status,
            },
            { model: db.Address },
        ],
        where: {
            [Op.or]: [
                { OrderStatusId: 1 },
                { OrderStatusId: 2 },
                { OrderStatusId: 3 },
                { OrderStatusId: 4 },
            ],
            UserId: req.user.id,
        },
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
            {
                model: db.Order_status,
            },
            { model: db.Address },
        ],
        where: {
            [Op.or]: [
                { OrderStatusId: 1 },
                { OrderStatusId: 2 },
                { OrderStatusId: 3 },
                { OrderStatusId: 4 },
            ],
            UserId: req.user.id,
        },
    })
    const count = MyTransactionListAll.map((val) => val.id)

    const dataCount = count.length

    return res.status(200).json({
        message: "Get Transaction List By Status",
        data: MyTransactionList.rows,
        dataCount: dataCount,
    })
}

if (status === "Awaiting Confirmation") {
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
            {
                model: db.Order_status,
            },
            { model: db.Address },
        ],
        where: {
            OrderStatusId: 1,
            UserId: req.user.id,
        },
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
            {
                model: db.Order_status,
            },
            { model: db.Address },
        ],
        where: {
            OrderStatusId: 1,
            UserId: req.user.id,
        },
    })
    const count = MyTransactionListAll.map((val) => val.id)

    const dataCount = count.length

    return res.status(200).json({
        message: "Get Transaction List By Status",
        data: MyTransactionList.rows,
        dataCount: dataCount,
    })
}

if (status === "Processed") {
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
            {
                model: db.Order_status,
            },
            { model: db.Address },
        ],
        where: {
            OrderStatusId: 2,
            UserId: req.user.id,
        },
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
            {
                model: db.Order_status,
            },
            { model: db.Address },
        ],
        where: {
            OrderStatusId: 2,
            UserId: req.user.id,
        },
    })

    const count = MyTransactionListAll.map((val) => val.id)

    const dataCount = count.length

    return res.status(200).json({
        message: "Get Transaction List By Status",
        data: MyTransactionList.rows,
        dataCount: dataCount,
    })
}

if (status === "Shipping") {
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
            {
                model: db.Order_status,
            },
            { model: db.Address },
        ],
        where: {
            OrderStatusId: 3,
            UserId: req.user.id,
        },
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
            {
                model: db.Order_status,
            },
            { model: db.Address },
        ],
        where: {
            OrderStatusId: 3,
            UserId: req.user.id,
        },
    })
    const count = MyTransactionListAll.map((val) => val.id)

    const dataCount = count.length

    return res.status(200).json({
        message: "Get Transaction List By Status",
        data: MyTransactionList.rows,
        dataCount: dataCount,
    })
}

if (status === "Delivered") {
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
            {
                model: db.Order_status,
            },
            { model: db.Address },
        ],
        where: {
            OrderStatusId: 4,
            UserId: req.user.id,
        },
    })

    const MyTransactionListAll = await Transaction.findAll({
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
            {
                model: db.Order_status,
            },
            { model: db.Address },
        ],
        where: {
            OrderStatusId: 4,
            UserId: req.user.id,
        },
    })

    const count = MyTransactionListAll.map((val) => val.id)

    const dataCount = count.length

    return res.status(200).json({
        message: "Get Transaction List By Status",
        data: MyTransactionList.rows,
        dataCount: dataCount,
    })
}

if (status === "Done") {
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
            {
                model: db.Order_status,
            },
            { model: db.Address },
        ],
        where: {
            OrderStatusId: 5,
            UserId: req.user.id,
            is_paid: true
        },
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
            {
                model: db.Order_status,
            },
            { model: db.Address },
        ],
        where: {
            OrderStatusId: 5,
            UserId: req.user.id,
        },
    })
    const count = MyTransactionListAll.map((val) => val.id)

    const dataCount = count.length

    return res.status(200).json({
        message: "Get Transaction List By Status",
        data: MyTransactionList.rows,
        dataCount: dataCount,
    })
}

if (status === "Cancelled") {
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
            {
                model: db.Order_status,
            },
            { model: db.Address },
        ],
        where: {
            OrderStatusId: 6,
            UserId: req.user.id,
        },
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
            {
                model: db.Order_status,
            },
            { model: db.Address },
        ],
        where: {
            OrderStatusId: 6,
            UserId: req.user.id,
        },
    })
    const count = MyTransactionListAll.map((val) => val.id)

    const dataCount = count.length

    return res.status(200).json({
        message: "Get Transaction List By Status",
        data: MyTransactionList.rows,
        dataCount: dataCount,
    })
}