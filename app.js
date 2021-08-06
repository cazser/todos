const express = require('express')
const fs = require('fs')
//const { report, title } = require('process')
const {getDb, saveDb} = require('./db')
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.get('/todos', async (request,  response)=>{
    /* fs.readFile('./db.json', 'utf8', (err, data)=>{
	    if(err){
		return   response.status(500).json({error: err.message});
	    }

	    const db = JSON.parse(data);
	    response.status(200).json(db.todos)
    }) */
    const db = await getDb();
    try{
    response.status(200).json(db.todos)
    }catch(err){
	return   response.status(500).json({error: err.message});
    }
})

app.get('/todos/:id', async (request,  response)=>{
     /* fs.readFile('./db.json', 'utf8', (err, data)=>{
	    if(err){
		return   response.status(500).json({error: err.message});
	    }

	    const db = JSON.parse(data);
	    const todo = db.todos.filter( todo => {return todo.id === Number.parseInt(request.params.id)})
	     console.log(todo);
	    console.log(typeof request.params.id)
	    console.log(typeof db.todos[0].id)
	    console.log(Number.parseInt(request.params.id) === db.todos[0].id) 
	    if(todo === [] ){
		  return  response.status(404).end();
	    }   
	    return response.status(200).json(todo)
    }) */
   const db = await getDb();
    try{
	const todo = db.todos.filter( todo => {return todo.id === Number.parseInt(request.params.id)})	
    	if(todo === [] ){
		return  response.status(404).end();
	}   
	    return response.status(200).json(todo)
    }catch(err){
	return   response.status(500).json({error: err.message});
    }
})

app.post('/todos', async (request,  response)=>{
	try{
	const todo = request.body;
	if(!todo.title){
		response.status(422).json({
			"err": "The field title is required."
		})
	}
	const db = await getDb();
	
	const lastTodo =db.todos[db.todos.length -1]
	todo.id = lastTodo? lastTodo.id+1 :1 ;
	//console.log(todo);
	db.todos.push(todo)
	await saveDb(db);
	response.status(200).json(todo)
}catch(err){
	response.status(500).json({
		err: err.message
	})
}
})

app.patch('/todos/:id', (request,  response)=>{
    response.send('/todos/:id')
})

app.delete('/todos/:id', (request,  response)=>{
    response.send('/todos/:id')
})





app.listen(3000, ()=>{
    console.log('Server listen at http://localhost:3000/');
})