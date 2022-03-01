const { response } = require('express');
const User = require('../models/customer');

const getUser = async(req, res = response) => {

    const { id } = req.params;

    try {

        // Verificar si el email existe
        const user = await User.findOne({ _id: id})

        if ( !user ) {
            return res.status(400).json({
                msg: 'User does not exist'
            });
        }
        const { _doc } = user;

        delete _doc.password;
        res.json({
            user
        })

    } catch (error) {
        console.log('este es el catch',error);
        res.status(500).json({
            msg: 'Something wrong has happened'
        });
    }

}

const search = async (req, res = response) => {
    const { search } = req.body;
    try {
        // Verificar si el email existe
        const userByName = await User.findOne({ name: search});
        const userByUsername = await User.findOne({ username: search});

        if ( !(userByName && userByUsername) ) {
            return res.status(400).json({
                msg: 'User does not exist'
            });
        }

        if(userByName){
            res.json({ userByName })
        }else{
            res.json({ userByUsername })
        }

    } catch (error) {
        console.log('esto es un catch', error)
    }
}

module.exports = {
    getUser,
    search
}
