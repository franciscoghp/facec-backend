const jwt = require('jsonwebtoken');

const generarJWT = ( id = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { id };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: 60*60*24*7
        } , ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'The token could not been generated' )
            } else {
                resolve( token );
            }
        })

    })
}

module.exports = {
    generarJWT
}

