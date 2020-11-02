const bcr = require('bcrypt');
class bcrypt{
    static hash(a){
        return bcr.hashSync(a, 10);
    }

    static compare(a,b){
        return bcr.compareSync(a,b)
    } 
}
module.exports = bcrypt


