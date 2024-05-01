const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/signup').then(() => {
    console.log('Connected to Mongo');
}).catch(err => console.log('Error connecting'));

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model("User", UserSchema);


app.get('/users',async(req, res) => {
    const result= await User.find({});
   return res.json(result);
    })
    app.post('/submit', async (req, res) => {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
    
        var data = {
            "username": username,
            "email": email,
            "password": password,
        };
    
        await User.create(data);
        console.log("User created successfully");
    
        return res.send(`Username ${username} successfully signed up!`);
        

    });
    

app.listen(8000, () => {
    console.log('Server Started !!!');
});
