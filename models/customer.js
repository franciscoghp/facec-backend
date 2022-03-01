const { Schema, model } = require('mongoose');

const CustomerSchema = Schema({
    identity_card: {
        type: Number,
        required: [true, 'Identify card is required'],
        unique: [true, 'Identify card must be uniqued'],
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    phone: {
        type: Number,
        required: [true, 'Phone is required'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    address2: {
        type: String,
        required: [true, 'Address 2 is required'],
    },
    imgUrl: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    }
});

CustomerSchema.methods.toJSON = function() {
    const { __v, _id, password, ...Customer  } = this.toObject();
    Customer.id = _id;
    return Customer;
}

module.exports = model( 'Customer', CustomerSchema );