const { DataTypes } = require('sequelize')
const sequelize = require("../../config/db"),
    UserModel = require('../user')

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    }
}, {timestamps: true})

Product.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'product_belongsTo_user',
    // The possible choices are RESTRICT, CASCADE, NO ACTION, SET DEFAULT and SET NULL
    // onDelete: "RESTRICT",  Default is SET NULL
    // onUpdate: "RESTRICT",     Default is CASCADE
})
UserModel.hasMany(Product, {
    foreignKey: 'userId',
    as: 'user_hasOne_product'
})
//Product.sync({ force: true })
// update User table if exist without delete
// await Product.sync({ alter: true });
// drop and create User table
// await Product.sync({ force: true });
// create User table if not exist
module.exports = Product
