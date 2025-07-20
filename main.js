import express from 'express';
import mongoose from 'mongoose';
import {router} from './router/userRoutes.js';
import {Todorouter} from "./router/tasksRoutes.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/testDB")
  .then(() => console.log("MongoDB connected"));

app.use('/user', router); 
app.use('/tasks', Todorouter);

app.get('/', (req,res)=>{
  res.render("dashboard");
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
