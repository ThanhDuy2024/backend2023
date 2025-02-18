const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema(
    {
        title: String,
        parent_id: {
            type: String,
            default: ""
        },
        description: String,
        thumbnail: String,
        position: Number,
        status: String,
        deleted: {
            type: Boolean,
            default: false
        },
        deleteAt: Date,
        updateAt: Date,
        createAt: Date,
        slug: {
            type: String,
            slug: "title",
            unique: true
        }
    },
    {
        timestamps: true
    }
)

const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "productCategory");

module.exports = ProductCategory