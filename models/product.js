const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    type: {
        type: String,
        required: [true, 'Type is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    stoke: {
        type: Number,
        required: [true, 'Stoke is required'],
    },
    quantity_minium: {
        type: Number,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    imgUrl: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    }
});

ProductSchema.methods.toJSON = function() {
    const { __v, _id, password, ...Product  } = this.toObject();
    Product.id = _id;
    return Product;
}

module.exports = model( 'Product', ProductSchema );