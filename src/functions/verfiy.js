const {  ACCESS_DENIED } = require('../responses/errors');

module.exports = {
    isAdmin: (req, res, next) =>{
        if(req.user.role > 0){
            next();
        }else{
            res.status(403).json(ACCESS_DENIED);
        }
    }
}