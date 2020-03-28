const jwt = require('jsonwebtoken');
const config = require('config');

module.exports  = function(req, res, next){
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({ msg : 'No token, authorization fails'});
    }

    try{
        const payload = jwt.verify(token,config.get('jwtSecretToken'));

        req.user = payload.user

        next();
    } catch {
        res.status(401).json({ msg : 'Token Error'});
    }
};