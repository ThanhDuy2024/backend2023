const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
const Account = require("./account.model");
mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
    {
        title: String,
        category_parent_id: String,
        categoryTitle: {
            type: String,
            default: ""
        },
        price: Number,
        quantity: Number,
        total: Number,
        description: String,
        discountPercentage: Number,
        discountedTotal: Number,
        discountPercent: Number,
        stock: Number,
        createdBy: {
            account_id: String,
            fullName: String,
            created: {
                type: String,
                default: Date.now
            }
        },
        deleted: {
            type: Boolean,
            default: false
        },
        slug: {
            type: String,
            slug: "title",
            unique: true
        },
        status: String,
        position: Number,
        thumbnail: String,
        deleteAt: Date
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;