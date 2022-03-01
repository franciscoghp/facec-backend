const { response } = require('express');
const bcryptjs = require('bcryptjs')


const recoveryPassword = async(req, res = response) => {
    const { password } = req.body;
    const user = req.user
    try {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();   
        user.password = bcryptjs.hashSync( String(password), salt );

        user.in_recovery_process = false;
        user.recovery_token = null;

        await user.save()
        res.json({
            msg: 'Your password was changed succesfully'
        })

    } catch (error) {
        console.log('estoy en el catch',error);
        res.status(500).json({
            msg: 'Something wrong has happened'
        });
    }   

}

module.exports = {
    recoveryPassword
}
