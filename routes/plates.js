const { Router } = require('express');
const { getPlates, getPlatesByID, postPlates } = require('../controllers/plates');
const { validarJWT } = require('../middlewares/validates-jwt');
const multer  = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

// router.get('/:id',[ validarJWT ], getPlatesByID );
router.get('/:id', getPlatesByID );

// router.get('/',[ validarJWT ], getPlates );
router.get('/', getPlates );

router.post('/', [
    upload.single('image'),
], postPlates );
// router.post('/',[ validarJWT ], postPlates );

module.exports = router;