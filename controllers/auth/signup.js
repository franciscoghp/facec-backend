const bcryptjs = require('bcryptjs')
const fs = require('fs')
const User = require('../../models/customer');

const signup = async (req, res) => {
    const { email, password } = req.body;
    const  imagen  = req.file

    console.log(imagen)
    try {
            // Verificar si el email existe
            const userExists = await User.findOne({ email });
            if( userExists ) return res.status(400).json({
                msg: 'User already exists'
            });

            const data = new User({ 
                email,
                password,
            });

            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();   
            data.password = bcryptjs.hashSync( String(password), salt );

            if(imagen){
                fs.writeFileSync(`storage/profiles/${email}-${imagen.originalname}`, imagen.buffer)
                data.imgUrl = `${email}-${imagen.originalname}`
            }
            // Guardar en BD
            await data.save();

            res.status(201).json({
                msg: 'User created succesfully',
                user: {
                    id: data.id,
                    username: data.username,
                    name: data.name,
                    lastname: data.lastname,
                    email: data.email,
                }
            });

    } catch (error) {
        console.log('este es un catch',error);
        res.status(400).json({
            msg: 'Something bad happened',
            error
        });
    }
}

module.exports = {
    signup
}