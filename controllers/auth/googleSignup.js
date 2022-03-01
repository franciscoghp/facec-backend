const fs = require('fs')
const User = require('../../models/customer');

const signupGoogle = async (req, res) => {

    const { email } = req.body;

    try {
            // Verificar si el email existe
            const userExists = await User.findOne({ email });
            if( userExists ) return res.status(400).json({
                msg: 'User already exists'
            });

            const data = new User({ 
                name: req.body.name,
                lastname: req.body.lastname,
                email,
                password,
                username: req.body.email,
                birthday: req.body.birthday,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                genre: req.body.genre,
                phone: req.body.phone,
                code_phone: req.body.code_phone,
            });

            if(photo){
                fs.writeFileSync(`storage/profiles/${email}-${photo.originalname}`, photo.buffer)
                data.imgGoogle = `${email}-${photo.originalname}`
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
        console.log('tremenda loca',error);
        res.status(400).json({
            msg: 'Something bad happened',
            error
        });
    }
}

module.exports = {
    signupGoogle
}