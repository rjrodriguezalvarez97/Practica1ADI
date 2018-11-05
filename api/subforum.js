var ensureAuthenticated = require('../middleware/auth').ensureAuthenticated;

app.get('/forums/:idForum(\\d+)/subforums', function(req, resp){
    getAllSubforumsByForumId(req.params.idForum, function(data, error){
        if(error){
            resp.status(404).send({error: "Unable to find subforums for forum with id: " + req.params.idForum})
        }else{
            resp.status(200).send(data);
        }
    })
});

app.get('/subforums/:idSubforum(\\d+)', function(req, resp){
    getSubforumById(req.params.idSubforum, function(data, error){
        if(error){
            resp.status(404).send({error: "Unable to find subforum with id: " + req.params.idSubforum})
        }else{
            resp.status(200).send(data);
        }
    })
});


function getAllSubforumsByForumId(idForum, callback){
    knex('Subforum').select('id','title','forum').where('forum', idForum).
    then(function (data){
        callback(data, undefined);
    }).
    catch(function (error) {
        callback(undefined, error);
    });
}

function getSubforumById(idSubforum, callback){
    knex('Subforum').select('id','title','forum').where('id', idSubforum).
    then(function (data){
        callback(data, undefined);
    }).
    catch(function (error) {
        callback(undefined, error);
    });
}