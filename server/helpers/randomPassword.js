function randomPassword(){
    let secret = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890#@-_.,'
    let result = ''
    for(let i = 0; i < secret.length; i++){
        result += secret[Math.floor(Math.random()*68)]
    }
    return result
}

module.exports = randomPassword