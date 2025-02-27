const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    fullName: String,
    email: String,
    password: String,
    avatar: String,
    role_id: String,
    status: String,
    token: String,
    phone: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, {
    timestamps: true
});

const Account = mongoose.model('Account', AccountSchema, "accounts");
module.exports = Account;