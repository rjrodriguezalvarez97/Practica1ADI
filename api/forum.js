var ensureAuthenticated = require('../middleware/auth').ensureAuthenticated;
app.get('/forums', function(req, resp){
    getForums(function (data, err){
        if(err){
            resp.status(500).send({error: "Unable to retrieve forums"});
        }else{
        resp.status(200).send(data);
        }
    })


})
app.get('/forums/:id', function(req, resp){
    getForumById(req.params.id,function (data, err){
        if(err){
            resp.status(400).send({error: "Unable to retrieve forum with id: " + req.params.id});
        }else{
        resp.status(200).send(data);
        }
    })
})

app.delete('/forums/:id', ensureAuthenticated, function(req, resp){
    deleteForum(req.params.id, function (data, err){
        if(err){
            resp.status(400).send({error: "Unable to delete forum with id: " + req.params.id});
        }else{
        resp.status(200).send({error: "Deleted forum with id: " + req.params.id});
        }
    })

})

app.post('/forums',ensureAuthenticated, function(req, resp){
    var name = req.body.name;
    if(name){
        createForum(name,function(data, err){
            if(err){
                resp.status(400).send({error: "Unable to create forum"});
            }else{
            resp.status(201).send(data);
            }
        })
    }
    else{
        resp.status(400).send({error :"Missing name"});
    }
})

app.put('/forums/:id', ensureAuthenticated, function(req, resp){
    var name = req.body.name;
    if(name){
        updateForum(req.params.id, name, function(data, err) {
            if(err){
                resp.status(400).send({error: "Unable to update forum with id: " + req.params.id});
            }else{
            resp.status(200).send("Updated forum with id: " + req.params.id);
            }
        })
    }


})
function getForums(callback){
    knex.select().from('Forum').
    then(function (data){
        callback(data, undefined);
    }).
    catch(function (error){
        callback(undefined, error);
     });
}

function getForumById(id, callback){
    knex.select('name').from('Forum').where('id', id).
    then(function (data){
        callback(data, undefined);
    }).
    catch(function (error){
        callback(undefined, error);
     });
}

function createForum(name, callback){
    knex('Forum').insert({name: name},'id').
    then(function (data){
        callback(data, undefined);
    }).
    catch(function (error){
        callback(undefined, error);
     });
}

function deleteForum(id, callback){
    knex('Forum').where('id', id).del().
    then(function (data){
        callback(data, undefined);
    }).
    catch(function (error){
        callback(undefined, error);
     });;
}

function updateForum(id, data, callback,err){
    knex('Forum').where('id',id).update({
        name: data.name
    }).then(function (data){
        callback(data, undefined);
    }).
    catch(function (error){
       callback(undefined, error);
    });
}