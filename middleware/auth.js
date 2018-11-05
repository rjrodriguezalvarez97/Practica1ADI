
module.exports.ensureAuthenticated = function ensureAuthenticated(req, resp, next){
    if(!req.headers.authorization) {
        return resp
          .status(403)
          .send({error: "Missing authorization header"});
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

module.exports.ensureAuthenticatedAdmin = function ensureAuthenticatedAdmin(req, resp, next){
    if(!req.headers.authorization) {
        return resp
          .status(403)
          .send({error: "Missing authorization header"});
      }   
    var token = req.headers.authorization.split(" ")[1];
    try{
    var payload = jwt.decode(token, SECRET);
    }
    catch(err){
        return resp
        .status(401)
        .send({error: "Token has expired"});    
    }
    if(payload.isAdmin === 'false'){
        return resp
        .status(401)
        .send({error: "Unable to delete. You are not an admin"});    
    }
    req.user = payload.sub;
    req.isAdmin = payload.isAdmin;
    next();
    
}
