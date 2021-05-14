require('dotenv').config();
const massive = require('massive');
const session = require('express-session');
const express = require('express');
const userCtrl = require('./controllers/user');
const postCtrl = require('./controllers/posts');

      
const app = express();

// TOP LEVEL MIDDLEWARE
app.use(express.json());

// DESTRUCTURING
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

// MASSIVE
app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: (1000 * 60 * 60)
        }
    })
)
    
    massive({
        connectionString: CONNECTION_STRING,
        ssl: {
            rejectUnauthorized: false
        }
    })
    .then((db)=>{
        app.set('db', db)
        console.log('Database Connected!')
        app.listen(SERVER_PORT, ()=> console.log(`running on ${SERVER_PORT}`));
    })
//Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);

//Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)
