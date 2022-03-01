const { Router } = require('express');
const { check } = require('express-validator');
const multer  = require('multer');

const upload = multer({ storage: multer.memoryStorage() });
const { validarCampos } = require('../middlewares/validates-fields');

const { login, signup, forgotPassword, recoveryPassword, refreshToken, loginGoogle, signupGoogle } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validates-jwt');

const router = Router();

router.post('/login',[
    check('password', 'Password  is required').not().isEmpty(),
    validarCampos
], login );

router.post('/login-google', loginGoogle );

router.post('/signup',[
    upload.single('imagen'),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password  is required').not().isEmpty(),
    validarCampos
], signup );

router.post('/signup-google',[
    check('email', 'Email is required').isEmail(),
    validarCampos
], signupGoogle );

router.post('/forgot-password',[
    check('email', 'Email is required').isEmail(),
    validarCampos
], forgotPassword );

router.post('/recovery-password',[
    validarJWT,
    check('password', 'Password  is required').not().isEmpty(),
    validarCampos
], recoveryPassword );

router.post('/refresh-jwt', refreshToken );

module.exports = router;