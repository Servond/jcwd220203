"use strict";

var _require = require("../models"),
    sequelize = _require.sequelize;

var db = require("../models");

var pagination = require("../lib/sales/pagination");

var paginationData = require("../lib/sales/paginationData");

var salesReportController = {
  getReport: function getReport(req, res) {
    var CategoryId, WarehouseId, _req$query, createdAt, _req$query$_limit, _limit, _req$query$_page, _page, findDataFilterCatWar, findDataFilterWar, findDataFilterCat, findDataFilterMnth, findData;

    return regeneratorRuntime.async(function getReport$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            CategoryId = req.query.CategoryId;
            WarehouseId = req.query.WarehouseId;
            _req$query = req.query, createdAt = _req$query.createdAt, _req$query$_limit = _req$query._limit, _limit = _req$query$_limit === void 0 ? 5 : _req$query$_limit, _req$query$_page = _req$query._page, _page = _req$query$_page === void 0 ? 1 : _req$query$_page;
            console.log("cat", CategoryId);
            console.log("war", WarehouseId);
            console.log("mnth", createdAt);
            _context.prev = 6;

            if (!(CategoryId && WarehouseId)) {
              _context.next = 14;
              break;
            }

            _context.next = 10;
            return regeneratorRuntime.awrap(db.Transaction.findAndCountAll({
              include: [{
                model: db.Warehouse
              }, {
                model: db.TransactionItem,
                include: [{
                  model: db.Product,
                  include: [{
                    model: db.Category
                  }],
                  where: {
                    CategoryId: CategoryId
                  }
                }],
                required: true
              }],
              where: {
                WarehouseId: WarehouseId
              },
              limit: Number(_limit),
              offset: (_page - 1) * _limit
            }));

          case 10:
            findDataFilterCatWar = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              message: "Get data filtered",
              data: findDataFilterCatWar.rows,
              dataCount: findDataFilterCatWar.count
            }));

          case 14:
            if (!WarehouseId) {
              _context.next = 21;
              break;
            }

            _context.next = 17;
            return regeneratorRuntime.awrap(db.Transaction.findAndCountAll({
              include: [{
                model: db.Warehouse
              }, {
                model: db.TransactionItem,
                include: [{
                  model: db.Product,
                  include: [{
                    model: db.Category
                  }]
                }],
                required: true
              }],
              where: {
                WarehouseId: WarehouseId
              },
              limit: Number(_limit),
              offset: (_page - 1) * _limit
            }));

          case 17:
            findDataFilterWar = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              message: "Get data filtered",
              data: findDataFilterWar.rows,
              dataCount: findDataFilterWar.count
            }));

          case 21:
            if (!CategoryId) {
              _context.next = 28;
              break;
            }

            _context.next = 24;
            return regeneratorRuntime.awrap(db.Transaction.findAndCountAll({
              include: [{
                model: db.Warehouse
              }, {
                model: db.TransactionItem,
                include: [{
                  model: db.Product,
                  include: [{
                    model: db.Category
                  }],
                  where: {
                    CategoryId: CategoryId
                  }
                }],
                required: true
              }],
              limit: Number(_limit),
              offset: (_page - 1) * _limit
            }));

          case 24:
            findDataFilterCat = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              message: "Get data filtered",
              data: findDataFilterCat.rows,
              dataCount: findDataFilterCat.count
            }));

          case 28:
            if (!createdAt) {
              _context.next = 33;
              break;
            }

            _context.next = 31;
            return regeneratorRuntime.awrap(db.Transaction.findAndCountAll({
              include: [{
                model: db.Warehouse
              }, {
                model: db.TransactionItem,
                include: [{
                  model: db.Product,
                  include: [{
                    model: db.Category
                  }]
                }],
                required: true,
                subQuery: true
              }],
              limit: Number(_limit),
              offset: (_page - 1) * _limit
            }));

          case 31:
            findDataFilterMnth = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              message: "Get data filtered",
              data: findDataFilterMnth.rows,
              dataCount: findDataFilterMnth.count
            }));

          case 33:
            _context.next = 35;
            return regeneratorRuntime.awrap(db.Transaction.findAndCountAll({
              include: [{
                model: db.Warehouse
              }, {
                model: db.TransactionItem,
                include: [{
                  model: db.Product,
                  include: [{
                    model: db.Category
                  }]
                }],
                attributes: [sequelize.fn("MONTH", sequelize.col("TransactionItem.createdAt"))]
              }],
              limit: Number(_limit),
              offset: (_page - 1) * _limit
            }));

          case 35:
            findData = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              message: "Get data",
              data: findData.rows,
              dataCount: findData.count
            }));

          case 39:
            _context.prev = 39;
            _context.t0 = _context["catch"](6);
            return _context.abrupt("return", res.status(500).json({
              message: _context.t0.message
            }));

          case 42:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[6, 39]]);
  },
  getReportWithQuery: function getReportWithQuery(req, res) {
    var CategoryId, WarehouseId, _req$query2, createdAt, _req$query2$product_n, product_name, _req$query2$category_, category_name, _req$query2$_limit, _limit, _req$query2$_page, _page, _req$query$_sortBy, _sortBy, sql, dataCount, dataCountReal, findData, findDataReal;

    return regeneratorRuntime.async(function getReportWithQuery$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            CategoryId = req.query.CategoryId;
            WarehouseId = req.query.WarehouseId[0];
            _req$query2 = req.query, createdAt = _req$query2.createdAt, _req$query2$product_n = _req$query2.product_name, product_name = _req$query2$product_n === void 0 ? "" : _req$query2$product_n, _req$query2$category_ = _req$query2.category_name, category_name = _req$query2$category_ === void 0 ? "" : _req$query2$category_, _req$query2$_limit = _req$query2._limit, _limit = _req$query2$_limit === void 0 ? 10 : _req$query2$_limit, _req$query2$_page = _req$query2._page, _page = _req$query2$_page === void 0 ? 1 : _req$query2$_page; // const page = parseInt(req.query.page)
            // const { _limit, _offset } = pagination(page)

            console.log("ct", CategoryId);
            console.log("wr", WarehouseId);
            console.log("mnth", createdAt);
            console.log("pr", product_name);
            console.log("cname", category_name);
            _context2.prev = 8;
            _req$query$_sortBy = req.query._sortBy, _sortBy = _req$query$_sortBy === void 0 ? "" : _req$query$_sortBy;
            sql = "SELECT  trx.WarehouseId, pr.CategoryId, pr.id AS productId, ct.category_name, pr.product_name, pr.description, trx_items.price_per_item AS price, trx_items.quantity,\n                        trx_items.price_per_item * trx_items.quantity AS total, wr.warehouse_name, trx_items.createdAt\n                        FROM transactionitems AS trx_items\n                        JOIN transactions AS trx ON trx.id = trx_items.TransactionId\n                        JOIN products AS pr ON pr.id = trx_items.ProductId\n                        JOIN categories AS ct ON ct.id = pr.CategoryId\n                        JOIN warehouses as wr ON wr.id = trx.WarehouseId ";

            if (WarehouseId && CategoryId && createdAt && (product_name || category_name)) {
              sql += "WHERE WarehouseId=".concat(WarehouseId, " AND CategoryId=").concat(CategoryId, " AND MONTH(trx_items.createdAt)=").concat(createdAt, " AND (pr.product_name LIKE \"%").concat(product_name, "%\" OR ct.category_name LIKE \"%").concat(category_name, "%\") ");
            } else if (WarehouseId && CategoryId && (product_name || category_name)) {
              sql += "WHERE WarehouseId=".concat(WarehouseId, " AND CategoryId=").concat(CategoryId, " AND (pr.product_name LIKE \"%").concat(product_name, "%\" OR ct.category_name LIKE \"%").concat(category_name, "%\") ");
            } else if (WarehouseId && createdAt && (product_name || category_name)) {
              sql += "WHERE WarehouseId=".concat(WarehouseId, " AND MONTH(trx_items.createdAt)=").concat(createdAt, " AND (pr.product_name LIKE \"%").concat(product_name, "%\" OR ct.category_name LIKE \"%").concat(category_name, "%\") ");
            } else if (CategoryId && createdAt && (product_name || category_name)) {
              sql += "WHERE CategoryId=".concat(CategoryId, " AND MONTH(trx_items.createdAt)=").concat(createdAt, " AND (pr.product_name LIKE \"%").concat(product_name, "%\" OR ct.category_name LIKE \"%").concat(category_name, "%\") ");
            } else if (CategoryId && (product_name || category_name)) {
              sql += "WHERE CategoryId=".concat(CategoryId, " AND (pr.product_name LIKE \"%").concat(product_name, "%\" OR ct.category_name LIKE \"%").concat(category_name, "%\") ");
            } else if (WarehouseId && (product_name || category_name)) {
              sql += "WHERE WarehouseId=".concat(WarehouseId, " AND (pr.product_name LIKE \"%").concat(product_name, "%\" OR ct.category_name LIKE \"%").concat(category_name, "%\") ");
            } else if (createdAt && (product_name || category_name)) {
              sql += "WHERE MONTH(trx_items.createdAt)=".concat(createdAt, " AND (pr.product_name LIKE \"%").concat(product_name, "%\" OR ct.category_name LIKE \"%").concat(category_name, "%\") ");
            } else if (WarehouseId && CategoryId && createdAt) {
              sql += "WHERE WarehouseId=".concat(WarehouseId, " AND CategoryId=").concat(CategoryId, " AND MONTH(trx_items.createdAt)=").concat(createdAt, " ");
            } else if (WarehouseId && CategoryId) {
              sql += "WHERE WarehouseId=".concat(WarehouseId, " AND CategoryId=").concat(CategoryId, " ");
            } else if (WarehouseId && createdAt) {
              sql += "WHERE WarehouseId=".concat(WarehouseId, " AND MONTH(trx_items.createdAt)=").concat(createdAt, " ");
            } else if (CategoryId && createdAt) {
              sql += "WHERE CategoryId=".concat(CategoryId, " AND MONTH(trx_items.createdAt)=").concat(createdAt, " ");
            } else if (product_name || category_name) {
              sql += "WHERE pr.product_name LIKE \"%".concat(product_name, "%\" OR ct.category_name LIKE \"%").concat(category_name, "%\" ");
            } else if (CategoryId) {
              sql += "WHERE CategoryId=".concat(CategoryId, " ");
            } else if (WarehouseId) {
              sql += "WHERE WarehouseId=".concat(WarehouseId, " ");
            } else if (createdAt) {
              sql += "WHERE MONTH(trx_items.createdAt)=".concat(createdAt, " ");
            } // else if (category_name) {
            //     sql += `WHERE ct.category_name LIKE "%${category_name}%" `
            // }


            _context2.next = 14;
            return regeneratorRuntime.awrap(db.sequelize.query(sql));

          case 14:
            dataCount = _context2.sent;
            dataCountReal = dataCount[0];
            sql += "ORDER BY trx_items.createdAt ".concat(_sortBy, "\n                    LIMIT ").concat(_limit, "\n                    OFFSET ").concat((_page - 1) * _limit, " ");
            _context2.next = 19;
            return regeneratorRuntime.awrap(db.sequelize.query(sql));

          case 19:
            findData = _context2.sent;
            findDataReal = findData[0]; // const result = paginationData(findData, page, _limit)

            return _context2.abrupt("return", res.status(200).json({
              message: "Filtered",
              data: findDataReal,
              dataCount: dataCountReal.length
            }));

          case 24:
            _context2.prev = 24;
            _context2.t0 = _context2["catch"](8);
            return _context2.abrupt("return", res.status(500).json({
              message: _context2.t0.message
            }));

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[8, 24]]);
  },
  findWarehouse: function findWarehouse(req, res) {
    var response;
    return regeneratorRuntime.async(function findWarehouse$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(db.Warehouse.findAll());

          case 3:
            response = _context3.sent;
            return _context3.abrupt("return", res.status(200).json({
              message: "Find all warehouse",
              data: response
            }));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(500).json({
              message: "Server Error"
            }));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 7]]);
  }
};
module.exports = salesReportController;