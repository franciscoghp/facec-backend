const { response } = require('express');
const Product = require('../models/product');

const getProducts = async(req, res = response) => {
    try {
        // Verificar si hay productos
        const data = await Product.find({})

        if ( !data ) {
            return res.json({
                msg: 'There are not products'
            });
        }
        res.json({
            data
        })

    } catch (error) {
        console.log('este es el catch',error);
        res.status(500).json({
            msg: 'Something wrong has happened'
        });
    }

}

const postProduct = async(req, res = response) => {

    const {
        category,
        type,
        name,
        description,
        stoke,
        quantity_minium,
        price
    } = req.body;

    try {
        const data = new Product({
            category,
            type,
            name,
            description,
            stoke,
            quantity_minium,
            price
        });
        await data.save();
        res.json({
            msg: 'Product created',
            data
        })

    } catch (error) {
        console.log('este es el catch',error);
        res.status(500).json({
            msg: 'Something wrong has happened'
        });
    }
}

const getProductByID = async(req, res = response) => {

    const { id } = req.params;

    try {

        // Verificar si el prodcuto existe
        const data = await Product.findOne({ _id: id});

        if ( !data ) {
            return res.status(400).json({
                msg: 'Product does not exist'
            });
        }
        res.json({
            data
        })

    } catch (error) {
        console.log('este es el catch',error);
        res.status(500).json({
            msg: 'Something wrong has happened'
        });
    }

}

module.exports = {
    getProducts,
    postProduct,
    getProductByID
}
