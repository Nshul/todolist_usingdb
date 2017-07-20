/**
 * Created by anshulmittal on 12/7/17.
 */
const express=require('express');
const app=express();
const bp = require('body-parser');
const router=express.Router();
const db= require('./db');

app.use('/',express.static(__dirname+"/public_static"));

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));


app.get('/todos',(req,res,next)=>{
    db.getTodos().then((todos)=>{
        res.send(todos);
    }).catch((err)=>{
        res.send({error: "Couldn't retrieve todos"})
    })
});

app.post('/todos',(req,res,next)=>{
   db.addTodos(req.body.task).then(function () {
       db.getpositions();
       res.send({success: true});
   }).catch(function (err) {
       
   })
});

app.post('/deletetodo',(req,res,next)=>{
    db.delTodos(req.body.dataid);
    res.send({success: true});
});
app.post('/moveuptodo',(req,res,next)=>{
    db.moveupTodo(req.body.dataid);
    res.send({success: true});
});
app.post('/movedowntodo',(req,res,next)=>{
    db.movedownTodo(req.body.dataid);
    res.send({success: true});
});
app.post('/setdonetodo',(req,res,next)=>{
    db.settodo(req.body.dataid);
    res.send({success: true});
});
app.get('/removealldone',(req,res,next)=>{
    db.removealldone();
    res.send({success: true});
});

app.listen(8000,function(){
    console.log("Server Started on https://localhost:8000");
});
