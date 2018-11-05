var express = require('express');
app = express();
jwt = require('jwt-simple');
var bp = require('body-parser');

knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./foro.db"
    }
});
var ensureAuthenticated = require('./middleware/auth').ensureAuthenticated;

SECRET = "Supersecreto";
app.use(bp.json());


app.get('/', function(req, resp){
    resp.status(200);
    resp.send("Hola");
})
app.get('/privado', ensureAuthenticated, function(req, resp){
    resp.status(200).send("Estas dentro hamijo con id: " + req.user);
})

require('./api/user');

require('./api/forum');







app.listen(3001, function () {
    console.log("El servidor express está en el puerto 3001");
 });