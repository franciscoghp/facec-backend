const { response } = require('express');
const Plates = require('../models/plates');
const fs = require('fs')

const getPlates = async(req, res = response) => {
    try {
        // Verificar si hay restaurantes
        const data = await Plates.find({})

        if ( !data ) {
            return res.json({
                msg: 'There are not chats'
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

const postPlates = async(req, res = response) => {

    const {
        product,
        quantity,
        price
    } = req.body;
    const  image  = req.file;

    if( !product){
        return res.status(400).json({
            msg: 'Product is required',
        })
    }
    else if(!quantity){
        return res.status(400).json({
            msg: 'Quantity is required',
        })
    }
    else if( !price){
        return res.status(400).json({
            msg: 'Price is required',
        })
    }

    try {
        const data = new Plates({
            product,
            quantity,
            price
        });

        if(image){
            fs.writeFileSync(`uploads/restaurant/${image.originalname}`, image.buffer)
            data.img = `${image.originalname}`
        }

        await data.save();
        res.json({
            msg: 'Plate created',
            data
        })

    } catch (error) {
        console.log('este es el catch',error);
        res.status(500).json({
            msg: 'Something wrong has happened'
        });
    }
}

const getPlatesByID = async(req, res = response) => {

    const { id } = req.params;

    try {

        // Verificar si el restaurante existe
        const data = await Plates.findOne({ _id: id});

        if ( !data ) {
            return res.status(400).json({
                msg: 'Plate does not exist'
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
    getPlates,
    postPlates,
    getPlatesByID
}
