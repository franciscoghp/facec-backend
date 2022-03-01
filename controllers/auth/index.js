const { login } = require('./login');
const { loginGoogle } = require('./googleSignin');
const { signup } = require('./signup');
const { forgotPassword } = require('./forgotPassword');
const { recoveryPassword } = require('./recoveryPassword');
const { refreshToken } = require('./refreshToken');
const { signupGoogle } = require('./googleSignup');

module.exports = {
    login, 
    signup, 
    forgotPassword, 
    recoveryPassword,
    refreshToken,
    loginGoogle,
    signupGoogle
}