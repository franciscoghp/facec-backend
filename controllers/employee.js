const { response } = require('express');
const Chat = require('../models/employee');
const User = require('../models/customer');

const getChats = async(req, res = response) => {
    try {
        // Verificar si el email existe
        const chat = await Chat.find({})

        if ( !chat ) {
            return res.json({
                msg: 'There are not chats'
            });
        }
        res.json({
            chat
        })

    } catch (error) {
        console.log('este es el catch',error);
        res.status(500).json({
            msg: 'Something wrong has happened'
        });
    }

}

const postChat = async(req, res = response) => {

    const { second_user_id, first_user_id } = req.body;

    try {
        // Verificar si el chat existe
        const userTransmitter = await User.findOne({ _id: first_user_id});
        const userReceiver = await User.findOne({ _id: second_user_id});
        const chat_ = await Chat.findOne({ first_user_id, second_user_id});
        const chat__ = await Chat.findOne({ 
            first_user_id: second_user_id,
            second_user_id: first_user_id
        })


        if( second_user_id === first_user_id ){
            return res.status(400).json({
                msg: 'Do not make a chat with the same users'
            });
        }

        if ( !userTransmitter ) {
            return res.status(400).json({
                msg: 'First User does not exist'
            });
        }
        else if ( !userReceiver ) {
            return res.status(400).json({
                msg: 'Second User does not exist'
            });
        }
        else if ( chat_ || chat__ ) {
            return res.status(400).json({
                msg: 'That chat already exists'
            });
        }

        const data = new Chat({ 
            second_user_id,
            first_user_id,
            first_user : {
                name: userTransmitter.name,
                lastname: userTransmitter.lastname,
                id: userTransmitter._id,
                imgUrl: userTransmitter.imgUrl
            },
            second_user : {
                name: userReceiver.name,
                lastname: userReceiver.lastname,
                id: userReceiver._id,
                imgUrl: userReceiver.imgUrl
            }
        });
        await data.save();
        res.json({
            msg: 'Chat created',
            data
        })

    } catch (error) {
        console.log('este es el catch',error);
        res.status(500).json({
            msg: 'Something wrong has happened'
        });
    }
}

const getChatByID = async(req, res = response) => {

    const { id } = req.params;

    try {

        // Verificar si el email existe
        const chat = await Chat.findOne({ _id: id});

        if ( !chat ) {
            return res.status(400).json({
                msg: 'Chat does not exist'
            });
        }
        res.json({
            chat
        })

    } catch (error) {
        console.log('este es el catch',error);
        res.status(500).json({
            msg: 'Something wrong has happened'
        });
    }

}

const getChatByUser = async(req, res = response) => {

    const { user_id } = req.params;

    try {

        // Verificar si el email existe
        const user = await User.findOne({ _id: user_id});

        if ( !user ) {
            return res.status(400).json({
                msg: 'User does not exist'
            });
        }

        await Chat.find( {} , (error, data) => {
            let chats = [];

            if(error){
                console.log(error);
                res.status(500).json({
                    msg: 'Something wrong has happened'
                });
            }

            data.map( iten => {
                if( iten.second_user_id == user_id  || iten.first_user_id == user_id ) return chats.push(iten);
            });

            if(!chats){
                return res.status(400).json({
                    msg: 'There are not anyone of the users'
                })
            };

            res.json({
                data: chats
            })
    
        });

    } catch (error) {
        console.log('este es el catch',error);
        res.status(500).json({
            msg: 'Something wrong has happened'
        });
    }

}

module.exports = {
    getChats,
    postChat,
    getChatByID,
    getChatByUser
}
