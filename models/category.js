const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    }
});

CategorySchema.methods.toJSON = function() {
    const { __v, _id, password, ...Category  } = this.toObject();
    Category.id = _id;
    return Category;
}

module.exports = model( 'Category', CategorySchema );