"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var db = require("../models");

var _require = require("sequelize"),
    Op = _require.Op;

var _require2 = require("../models"),
    sequelize = _require2.sequelize;

var Transaction = db.Transaction;
var TransactionItem = db.TransactionItem;
var Warehouse = db.Warehouse;
var Product = db.Product;
var Total_Stock = db.Total_Stock;
var User = db.User;
var Image_Url = db.Image_Url;
var adminOrderHistoryController = {
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
  getOrder: function getOrder(req, res) {
    var _req$query, _req$query$_limit, _limit, _req$query$_page, _page, WarehouseId, query, test, test0;

    return regeneratorRuntime.async(function getOrder$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query = req.query, _req$query$_limit = _req$query._limit, _limit = _req$query$_limit === void 0 ? 10 : _req$query$_limit, _req$query$_page = _req$query._page, _page = _req$query$_page === void 0 ? 1 : _req$query$_page;
            WarehouseId = req.query.WarehouseId[0];
            console.log(req.query);
            _context.prev = 3;
            query = "SELECT wr.id as warehouse_id,ts.WarehouseId,trx_items.TransactionId,trx.transaction_name, \n            us.username, trx.createdAt, trx.total_quantity, trx.total_price, ps.payment_status_name as order_status, wr.warehouse_name,pr.id as productId                      \n                        FROM transactions as trx\n                        JOIN users as us ON us.id = trx.UserId\n                        JOIN transactionitems as trx_items ON trx_items.TransactionId = trx.id\n                        JOIN products as pr ON pr.id = trx_items.ProductId\n                        JOIN total_stocks as ts ON ts.ProductId = pr.id\n                        JOIN warehouses as wr ON wr.id = ts.WarehouseId\n                        JOIN payment_statuses as ps ON ps.id = trx.PaymentStatusId ";

            if (WarehouseId) {
              query += "WHERE wr.id = ".concat(WarehouseId, " ");
            }

            query += "ORDER BY trx_items.TransactionId DESC\n                    LIMIT ".concat(_limit, "\n                    OFFSET ").concat((_page - 1) * _limit, " ");
            _context.next = 9;
            return regeneratorRuntime.awrap(db.sequelize.query(query));

          case 9:
            test = _context.sent;
            test0 = test[0]; // const transformArr = (orig) => {
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

            return _context.abrupt("return", res.status(200).json({
              message: "Filtered",
              data: test0 // dataCount: 5,

            }));

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", res.status(500).json({
              message: _context.t0.message
            }));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 14]]);
  },
  getByWarehouseId: function getByWarehouseId(req, res) {
    var _req$query2, WarehouseId, _req$query2$transacti, transaction_name, _req$query2$_sortBy, _sortBy, _req$query2$_sortDir, _sortDir, _req$query2$_limit, _limit, _req$query2$_page, _page, test2, test3;

    return regeneratorRuntime.async(function getByWarehouseId$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$query2 = req.query, WarehouseId = _req$query2.WarehouseId, _req$query2$transacti = _req$query2.transaction_name, transaction_name = _req$query2$transacti === void 0 ? "" : _req$query2$transacti, _req$query2$_sortBy = _req$query2._sortBy, _sortBy = _req$query2$_sortBy === void 0 ? "" : _req$query2$_sortBy, _req$query2$_sortDir = _req$query2._sortDir, _sortDir = _req$query2$_sortDir === void 0 ? "ASC" : _req$query2$_sortDir, _req$query2$_limit = _req$query2._limit, _limit = _req$query2$_limit === void 0 ? 10 : _req$query2$_limit, _req$query2$_page = _req$query2._page, _page = _req$query2$_page === void 0 ? 1 : _req$query2$_page;

            if (!(WarehouseId || transaction_name || _sortBy == "createdAt" || _sortDir || _limit || _page)) {
              _context2.next = 7;
              break;
            }

            _context2.next = 5;
            return regeneratorRuntime.awrap(Transaction.findAndCountAll({
              include: [{
                model: Transaction_Item,
                include: [{
                  model: Product
                }]
              }, {
                model: Warehouse
              }, {
                model: User
              }, {
                model: Order_status
              }],
              where: _defineProperty({}, Op.or, {
                WarehouseId: WarehouseId,
                transaction_name: _defineProperty({}, Op.like, "%".concat(transaction_name, "%"))
              }),
              limit: Number(_limit),
              offset: (_page - 1) * _limit,
              order: [[_sortBy, _sortDir]]
            }));

          case 5:
            test2 = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              message: "All",
              data: test2.rows,
              dataCount: test2.count
            }));

          case 7:
            _context2.next = 9;
            return regeneratorRuntime.awrap(Transaction.findAndCountAll({
              include: [{
                model: Transaction_Item,
                include: [{
                  model: Product
                }]
              }, {
                model: Warehouse
              }, {
                model: User
              }, {
                model: Order_status
              }],
              // where: {
              //     transaction_name: { [Op.like]: `%${transaction_name}%` },
              // },
              limit: Number(_limit),
              offset: (_page - 1) * _limit,
              order: [[_sortBy, _sortDir]]
            }));

          case 9:
            test3 = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              message: "All",
              data: test3.rows,
              dataCount: test3.count
            }));

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(500).json({
              message: _context2.t0.message
            }));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 13]]);
  },
  getTransactionList: function getTransactionList(req, res) {
    var _req$query3, _req$query3$_limit, _limit, _req$query3$_page, _page, _req$query3$_sortBy, _sortBy, _req$query3$_sortDir, _sortDir, _req$query3$searching, searching, WarehouseId, rawQuery, getDataQuery, getTransactionId, _MyTransactionList, _dataCount, MyTransactionList, MyTransactionListAll, count, dataCount;

    return regeneratorRuntime.async(function getTransactionList$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$query3 = req.query, _req$query3$_limit = _req$query3._limit, _limit = _req$query3$_limit === void 0 ? 10 : _req$query3$_limit, _req$query3$_page = _req$query3._page, _page = _req$query3$_page === void 0 ? 1 : _req$query3$_page, _req$query3$_sortBy = _req$query3._sortBy, _sortBy = _req$query3$_sortBy === void 0 ? "id" : _req$query3$_sortBy, _req$query3$_sortDir = _req$query3._sortDir, _sortDir = _req$query3$_sortDir === void 0 ? "DESC" : _req$query3$_sortDir, _req$query3$searching = _req$query3.searching, searching = _req$query3$searching === void 0 ? "" : _req$query3$searching;
            WarehouseId = req.query.WarehouseId;
            rawQuery = "SELECT p.product_name,  t.id AS TransactionId, transaction_name, t.UserId \n                    FROM transactionItems AS ti\n                    JOIN products AS p ON p.id = ti.ProductId\n                    JOIN transactions AS t ON ti.TransactionId = t.id\n                    JOIN warehouses AS wr ON wr.id = t.WarehouseId\n                    WHERE t.transaction_name Like '%".concat(searching, "%' && WarehouseId='").concat(WarehouseId, "'\n                    GROUP BY t.id ");

            if (!(WarehouseId && searching)) {
              _context3.next = 14;
              break;
            }

            _context3.next = 7;
            return regeneratorRuntime.awrap(db.sequelize.query(rawQuery));

          case 7:
            getDataQuery = _context3.sent;
            getTransactionId = getDataQuery[0].map(function (val) {
              return val.TransactionId;
            });
            _context3.next = 11;
            return regeneratorRuntime.awrap(Transaction.findAndCountAll({
              limit: Number(_limit),
              offset: (_page - 1) * _limit,
              order: [[_sortBy, _sortDir]],
              include: [{
                model: TransactionItem,
                include: [{
                  model: Product,
                  include: [{
                    model: Image_Url
                  }, {
                    model: Total_Stock
                  }]
                }]
              }, {
                model: Warehouse
              }, {
                model: db.Order_status
              }, {
                model: User
              }],
              where: {
                id: getTransactionId
              }
            }));

          case 11:
            _MyTransactionList = _context3.sent;
            _dataCount = getTransactionId.length;
            return _context3.abrupt("return", res.status(200).json({
              message: "Get Keyword with status On Going List",
              data: _MyTransactionList.rows,
              dataCount: _dataCount
            }));

          case 14:
            _context3.next = 16;
            return regeneratorRuntime.awrap(Transaction.findAndCountAll({
              limit: Number(_limit),
              offset: (_page - 1) * _limit,
              order: [[_sortBy, _sortDir]],
              include: [{
                model: TransactionItem,
                include: [{
                  model: db.Product,
                  include: [{
                    model: db.Image_Url
                  }, {
                    model: db.Total_Stock
                  }]
                }]
              }, {
                model: Warehouse
              }, {
                model: db.Order_status
              }, {
                model: User
              }]
            }));

          case 16:
            MyTransactionList = _context3.sent;
            _context3.next = 19;
            return regeneratorRuntime.awrap(Transaction.findAll({
              order: [[_sortBy, _sortDir]],
              include: [{
                model: TransactionItem,
                include: [{
                  model: db.Product,
                  include: [{
                    model: db.Image_Url
                  }, {
                    model: db.Total_Stock
                  }]
                }]
              }, {
                model: Warehouse
              }, {
                model: db.Order_status
              }, {
                model: User
              }]
            }));

          case 19:
            MyTransactionListAll = _context3.sent;
            count = MyTransactionListAll.map(function (val) {
              return val.id;
            });
            dataCount = count.length;
            return _context3.abrupt("return", res.status(200).json({
              message: "Get keyword",
              data: MyTransactionList.rows,
              dataCount: dataCount
            }));

          case 25:
            _context3.prev = 25;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(500).json({
              message: "Server error"
            }));

          case 29:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 25]]);
  },
  getReport: function getReport(req, res) {
    var WarehouseId, _req$query4, createdAt, _req$query4$transacti, transaction_name, _req$query4$_limit, _limit, _req$query4$_page, _page, _req$query4$_sortBy, _sortBy, sql, findData, getTransactionId, dataCount, transactionList;

    return regeneratorRuntime.async(function getReport$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            WarehouseId = req.query.WarehouseId[0];
            _req$query4 = req.query, createdAt = _req$query4.createdAt, _req$query4$transacti = _req$query4.transaction_name, transaction_name = _req$query4$transacti === void 0 ? "" : _req$query4$transacti, _req$query4$_limit = _req$query4._limit, _limit = _req$query4$_limit === void 0 ? 10 : _req$query4$_limit, _req$query4$_page = _req$query4._page, _page = _req$query4$_page === void 0 ? 1 : _req$query4$_page, _req$query4$_sortBy = _req$query4._sortBy, _sortBy = _req$query4$_sortBy === void 0 ? "" : _req$query4$_sortBy;
            _context4.prev = 2;
            sql = "SELECT  trx.id AS TransactionId,  trx.WarehouseId, wr.warehouse_name\n                        FROM transactionitems AS trx_items\n                        JOIN products AS pr ON pr.id = trx_items.ProductId\n                        JOIN transactions AS trx ON trx.id = trx_items.TransactionId\n                        JOIN warehouses as wr ON wr.id = trx.WarehouseId ";

            if (WarehouseId && createdAt && transaction_name) {
              sql += "WHERE WarehouseId=".concat(WarehouseId, " AND MONTH(trx.createdAt)=").concat(createdAt, " AND trx.transaction_name LIKE \"%").concat(transaction_name, "%\" ");
            } else if (WarehouseId && transaction_name) {
              sql += "WHERE WarehouseId=".concat(WarehouseId, " AND trx.transaction_name LIKE \"%").concat(transaction_name, "%\"  ");
            } else if (WarehouseId && createdAt) {
              sql += "WHERE WarehouseId=".concat(WarehouseId, " AND MONTH(trx.createdAt)=").concat(createdAt, " ");
            } else if (createdAt && transaction_name) {
              sql += "WHERE MONTH(trx.createdAt)=".concat(createdAt, " AND trx.transaction_name LIKE \"%").concat(transaction_name, "%\" ");
            } else if (WarehouseId) {
              sql += "WHERE WarehouseId=".concat(WarehouseId, " ");
            } else if (createdAt) {
              sql += "WHERE MONTH(trx.createdAt)=".concat(createdAt, " ");
            } else if (transaction_name) {
              sql += "WHERE trx.transaction_name LIKE \"%".concat(transaction_name, "%\" ");
            }

            _context4.next = 7;
            return regeneratorRuntime.awrap(db.sequelize.query(sql += "GROUP BY trx.id\n                        ORDER BY trx.createdAt ".concat(_sortBy, " ")));

          case 7:
            findData = _context4.sent;
            getTransactionId = findData[0].map(function (val) {
              return val.TransactionId;
            });
            dataCount = getTransactionId.length;
            _context4.next = 12;
            return regeneratorRuntime.awrap(Transaction.findAndCountAll({
              limit: Number(_limit),
              offset: (_page - 1) * _limit,
              include: [{
                model: TransactionItem,
                include: [{
                  model: Product,
                  include: [{
                    model: Image_Url
                  }, {
                    model: Total_Stock
                  }]
                }]
              }, {
                model: db.Order_status
              }, {
                model: User
              }, {
                model: Warehouse
              }],
              where: {
                id: getTransactionId
              }
            }));

          case 12:
            transactionList = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              message: "Filtered",
              data: transactionList.rows,
              dataCount: dataCount
            }));

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](2);
            return _context4.abrupt("return", res.status(500).json({
              message: _context4.t0.message
            }));

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[2, 16]]);
  },
  findWarehouse: function findWarehouse(req, res) {
    var response;
    return regeneratorRuntime.async(function findWarehouse$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return regeneratorRuntime.awrap(db.Warehouse.findAll());

          case 3:
            response = _context5.sent;
            return _context5.abrupt("return", res.status(200).json({
              message: "Find all warehouse",
              data: response
            }));

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(500).json({
              message: "Server Error"
            }));

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 7]]);
  },
  getById: function getById(req, res) {
    var sql, findData, getTransactionId, transactionList;
    return regeneratorRuntime.async(function getById$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            sql = "SELECT  trx.id AS TransactionId,  trx.WarehouseId, wr.warehouse_name\n                        FROM transactionitems AS trx_items\n                        JOIN products AS pr ON pr.id = trx_items.ProductId\n                        JOIN transactions AS trx ON trx.id = trx_items.TransactionId\n                        JOIN warehouses as wr ON wr.id = trx.WarehouseId ";
            _context6.next = 4;
            return regeneratorRuntime.awrap(db.sequelize.query(sql += "GROUP BY trx.id "));

          case 4:
            findData = _context6.sent;
            getTransactionId = findData[0].map(function (val) {
              return val.TransactionId;
            });
            _context6.next = 8;
            return regeneratorRuntime.awrap(Transaction.findAll({
              where: {
                id: req.params.id
              },
              include: [{
                model: TransactionItem,
                include: [{
                  model: Product,
                  include: [{
                    model: Image_Url
                  }, {
                    model: Total_Stock
                  }]
                }]
              }, {
                model: db.Order_status
              }, {
                model: User
              }, {
                model: Warehouse
              }]
            }));

          case 8:
            transactionList = _context6.sent;
            return _context6.abrupt("return", res.status(200).json({
              data: transactionList,
              message: "Get By Id"
            }));

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](0);
            res.status(500).json({
              message: _context6.t0.message
            });

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 12]]);
  }
};
module.exports = adminOrderHistoryController;