const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser');
const cors =require('cors');
const nodemon=require('nodemon');
require('dotenv').config()

const app=express();

app.use(cors())

app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017/king').then(()=>{
console.log("DB Connected");

})
.catch((err)=>{
    console.log(err);
    
})



const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
}, { timestamps: true });

const Todo=mongoose.model('Todo',TodoSchema)


app.get('/api/todos',async(req,res)=>{
    const todos=await Todo.find()
    res.json(todos)
})

app.post('/api/todos',async(req,res)=>{
    console.log(req.body);
    const newTodo=new Todo({
        title:req.body.title
    })
    await newTodo.save();
    res.json(newTodo)
    
})


app.put('/api/todos:id',async(req,res)=>{
    const updatedTodo=await Todo.findByIdAndUpdate(
        req.params.id,
        {completed:req.body.completed},
        {new:true}
    )
    res.json(updatedTodo)
})


app.delete('api/todos/:id',async(req,res)=>{
    await Todo.findByIdAndDelete(req,params.id);
    res.json({
        message:'Todo Deleted'
    })
})

 const PORT=process.env.PORT||5000;
 app.listen(PORT,()=>{
    console.log('Server is running');
    
 })