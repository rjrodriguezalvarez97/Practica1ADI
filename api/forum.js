var ensureAuthenticated = require('../middleware/auth').ensureAuthenticated;
app.get('/forums', function(req, resp){
    getForums(function (data){
        resp.status(200).send(data);
    })


})
app.get('/forums/:id', function(req, resp){
    getForumById(req.params.id,function (data){
        resp.status(200).send(data);
    })
})

app.delete('/forums/:id', ensureAuthenticated, function(req, resp){
    deleteForum(req.params.id, function (data){
        resp.status(200).send({message: "Deleted forum with id: " + req.params.id});
    })

})

app.post('/forums',ensureAuthenticated, function(req, resp){
    var name = req.body.name
    if(name){
        createForum(name,function(data){
            resp.status(201).send(data);
        })
    }
    else{
        resp.status(400).send("Missing name");
    }
})
function getForums(callback){
    knex.select().from('Forum').
    then(function (data){
        callback(data);
    })
}

function getForumById(id, callback){
    knex.select('name').from('Forum').where('id', id).
    then(function (data){
        callback(data);
    })
}

function createForum(name, callback){
    knex('Forum').insert({name: name},'id').
    then(function (data){
        callback(data);
    })
}

function deleteForum(id, callback){
    knex('Forum').where('id', id).del().
    then(function (data){
        callback(data);
    })
}