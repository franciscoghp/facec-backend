const { response } = require('express');

const User = require('../../models/customer');

const { generarJWT } = require('../../helpers/generates-jwt');

const loginGoogle = async(req, res = response) => {

    const { email } = req.body;
    try {
        // Verificar si el email existe
        let user = await User.findOne({ email });

        if ( !user ) {
            //Probamos buscando el username
            user = await User.findOne({ username: email });

            if(!user) return res.status(400).json({
                msg: 'User or Password is not correct - email'
            });
        }

        // Generar el JWT
        const token = await generarJWT( user.id );

        res.json({
            token,
            user,
        })

    } catch (error) {
        console.log('este es el catch',error);
        res.status(500).json({
            msg: 'Something wrong has happened'
        });
    }   

};

module.exports = {
    loginGoogle
}