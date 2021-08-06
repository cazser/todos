const express = require('express')
const fs = require('fs')
const app = express()

app.get('/todos', (request,  response)=>{
    fs.readFile('./db.json', 'utf8', (err, data)=>{
	    if(err){
		return   response.status(500).json({error: err.message});
	    }

	    const db = JSON.parse(data);
	    response.status(200).json(db.todos)
    })
})

app.get('/todos/:id', (request,  response)=>{
     fs.readFile('./db.json', 'utf8', (err, data)=>{
	    if(err){
		return   response.status(500).json({error: err.message});
	    }

	    const db = JSON.parse(data);
	    const todo = db.todos.filter( todo => {return todo.id === Number.parseInt(request.params.id)})
	    /* console.log(todo);
	    console.log(typeof request.params.id)
	    console.log(typeof db.todos[0].id)
	    console.log(Number.parseInt(request.params.id) === db.todos[0].id) */
	    if(todo === [] ){
		  return  response.status(404).end();
	    }   
	    return response.status(200).json(todo)
    })
})

app.post('/todos', (request,  response)=>{
    response.send('/todos')
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