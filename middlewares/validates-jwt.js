const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/customer');

const validarJWT = async( req = request, res = response, next ) => {

    let token = req.headers.authorization
    if ( !token ) {
        return res.status(401).json({
            msg: 'There is not token in request'
        });
    }

    token = req.headers.authorization.split(' ')[1];

    try {

        const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // leer el usuario que corresponde al id
        const user = await User.findById( id );

        if( !user ) {
            return res.status(401).json({
                msg: 'Token does not valid'
            })
        }

        req.user = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token does not valid',
            error
        })
    }

}

module.exports = {
    validarJWT
}