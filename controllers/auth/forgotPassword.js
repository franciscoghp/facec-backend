const User = require('../../models/customer');

const { generarJWT } = require('../../helpers/generates-jwt');
const { sendRecoveryToken } = require('../../helpers/send-email');

const forgotPassword = async (req, res) => {
    try {
            // Verificar si el email existe
            const { email } = req.body;
            const user = await User.findOne({ email });
 
            if( !user ) res.status(400).json({
                msg: 'User does not exist'
            });

            //Verificar que el usuario no esté en proceso de recuperar contraseña
            if( user.in_recovery_process ) res.status(400).json({
                msg: 'This user already has request the recovery'
            });

            // Generar el JWT
            const token = await generarJWT( user.id );

            user.recovery_token = token;
            user.in_recovery_process = true;

            // Guardar en BD
            await user.save();
            await sendRecoveryToken(user, token)
            res.json({
                token,
                msg: 'Mail sended to your email'
            });

    } catch (error) {
        console.log('estoy en el catch',error);
        res.status(400).json({
            msg: 'Something bad happened',
            error
        });
    }
}

module.exports = {
    forgotPassword
}
