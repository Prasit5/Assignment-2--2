const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});


ProductSchema.statics.findById = function (productId, callback) {
    return this.findOne({ _id: productId }, callback);
};


module.exports = mongoose.model('Products', ProductSchema);
