const { Router } = require('express');
const { getChatByID, getChats, postChat, getChatByUser } = require('../controllers/employee');
const { validarJWT } = require('../middlewares/validates-jwt');

const router = Router();

router.get('/:id',[ validarJWT ], getChatByID );

router.get('/chat-by-user/:user_id',[ validarJWT ], getChatByUser );

router.get('/',[ validarJWT ], getChats );

router.post('/',[ validarJWT ], postChat );

module.exports = router;