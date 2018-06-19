const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text,
    });

    todo.save().then((doc) =>{
        res.send(doc);
    }, (error) => res.status(400).send(error));
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }), (error) => {
        res.status(400).send(error);
    };
    //res.send({todos: 'todos'});
});

app.get('/', (req, res) => {
    res.send({application: 'Todo App'});
});

app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send({users});
    }), (error) => {
        res.status(400).send(error);
    };
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(400).send();
        }
        res.status(200).send({todo});
    }).catch(() => res.status(400).send());
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};
