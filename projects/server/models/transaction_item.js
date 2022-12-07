"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Transaction_Item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Transaction_Item.belongsTo(models.Product)
            Transaction_Item.belongsTo(models.Transaction)
        }
    }
    Transaction_Item.init(
        {
            quantity: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Transaction_Item",
        }
    )
    return Transaction_Item
}
