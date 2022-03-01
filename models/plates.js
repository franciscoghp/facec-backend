const { Schema, model } = require('mongoose');

const PlatesSchema = Schema({
    item: {
        type: String,
        required: [true, 'Product is required']
    },
    cantidad: {
        type: Number,
        required: [true, 'Quantity is required']
    },
    cost: {
        type: Number,
        required: [true, 'Price is required'],
    },
    img: {
        type: String,
        required: [true, 'Image is required'],
    }
});

PlatesSchema.methods.toJSON = function() {
    const { __v, _id, password, ...Plates  } = this.toObject();
    Plates.id = _id;
    return Plates;
}

module.exports = model( 'Plates', PlatesSchema );