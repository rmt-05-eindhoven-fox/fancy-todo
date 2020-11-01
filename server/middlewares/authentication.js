const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req, res, next) {
    const { token } = req.headers // didapat dari ajax/client (headers)
    try {
        if(!token){// jika token tidak ada lempar error
            throw {msg: 'Authentication failed', status:400}
        }
        else{
            const decoded = verifyToken(token)// jika token ada, decode/verify token
            const user = await User.findOne({// compare hasil decoded dengan data user yg ada di db kita  
                where:{
                    email: decoded.email // disini compare berdasarkan email
                }
            })
            if(!user){ // jika user dengan email di atas tdk ada di db kita maka lempar error
                throw {msg: 'Authentication failed', status:400}
            }else{
                req.loggedInUser = decoded // jika ada tampung hasil decoded ke req.loggedInUser(setelah req. boleh diisi dg nama variable lain/tdk harus loggedInUser)
                next() // setelah hasil decoded ditampung, kemudian boleh lanjut ke middleware selanjutnya(jika ada) atau proses setelahnya  
            }
        }
    }
    catch (err) {
        next(err)// throw akan masuk ke sini
    }
}

module.exports = authentication