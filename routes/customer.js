const { Router } = require('express');
const { validarJWT } = require('../middlewares/validates-jwt');
const { getUser, search } = require('../controllers/customer');

const router = Router();

router.get('/:id',[ validarJWT ], getUser );

router.post('/search',[ validarJWT ], search );

module.exports = router;