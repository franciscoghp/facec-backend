const jwt = require('jsonwebtoken');
const { generarJWT } = require('../../helpers/generates-jwt');
const User = require('../../models/customer');

const refreshToken = async ( req, res) => {

    const { id } = req.body;

    try {
        let token = req.headers.authorization;
        if ( !token ) {
            return res.status(401).json({
                msg: 'There is not token in request'
            });
        }
    
        token = req.headers.authorization.split(' ')[1];

        const { id } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        if(id) res.json({
            msg: 'Token still validates'
        })

    } catch (error) {
        console.log(error)
        // Generar nuevo JWT
        const token = await generarJWT( id );

        // Verificar si el email existe
        let user = await User.findOne({ _id: id });
        console.log('Token fue refrescado')
        return res.json({
            msg: 'Token refreshed',
            token,
            user
        });
    }
}

module.exports = {
    refreshToken
}

