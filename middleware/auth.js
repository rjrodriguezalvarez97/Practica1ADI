
module.exports.ensureAuthenticated = function ensureAuthenticated(req, resp, next){
    if(!req.headers.authorization) {
        return resp
          .status(403)
          .send({message: "Tu petición no tiene cabecera de autorización"});
      }   
    var token = req.headers.authorization.split(" ")[1];
    try{
    var payload = jwt.decode(token, SECRET);
    }
    catch(err){
        return resp
            .status(401)
        .send({error: "El token ha expirado"});    
    }
    req.user = payload.sub;
    next();
}