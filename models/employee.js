const { Schema, model } = require('mongoose');

const EmployeeSchema = Schema({
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

EmployeeSchema.methods.toJSON = function() {
    const { __v, _id, password, ...Employee  } = this.toObject();
    Employee.id = _id;
    return Employee;
}

module.exports = model( 'Employee', EmployeeSchema );