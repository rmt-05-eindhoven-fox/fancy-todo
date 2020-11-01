const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models/');

async function authentication(req,res,next) {
    const { token } = req.headers;
    // console.log("ASUPPP  DI AUT AUT AUT AUT")
    try{
        if (!token) {
            throw {msg: 'authentication failed', status:401}
        }else{
            const decoded = verifyToken(token);
            // console.log(decoded, 'decoded =====')
            const user = await User.findOne({
                where:{
                    email: decoded.email
                }
            })
            console.log(user)
            if (!user) {
                throw { msg : 'authentication failed', status: 401 }
            }else{
                // console.log(req.loggedInUser, 'req.loggedInUser')
                req.loggedInUser = decoded;
                console.log("authentication berhasil")
                next();
                // console.log(req.loggedInUser, 'setelah di buat');
            }
        }
    }catch(err){
        const status = err.status || 500;
        const msg = err.msg || 'Internal Server Error';
        res.status(status).json( { error: msg } )
    }
}

module.exports = authentication