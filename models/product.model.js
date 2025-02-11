const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
    {
        title: String,
        price: Number,
        quantity: Number,
        total: Number,
        description: String,
        discountPercentage: Number,
        discountedTotal: Number,
        discountPercent: Number,
        stock: Number,
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