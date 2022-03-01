const { Router } = require('express');
const { getProductByID, getProducts, postProduct } = require('../controllers/product');
const { validarJWT } = require('../middlewares/validates-jwt');

const router = Router();

router.get('/:id',[ validarJWT ], getProductByID );

router.get('/',[ validarJWT ], getProducts );

router.post('/', postProduct );
// router.post('/',[ validarJWT ], postProduct );

module.exports = router;