"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Transaction.belongsTo(models.User)
            Transaction.hasMany(models.Transaction_Item)
        }
    }
    Transaction.init(
        {
            order_status: DataTypes.STRING,
            payment_date: DataTypes.DATE,
            payment_proof: DataTypes.STRING,
            total_quantity: DataTypes.INTEGER,
            total_price: DataTypes.INTEGER,
            is_paid: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Transaction",
        }
    )
    return Transaction
}
