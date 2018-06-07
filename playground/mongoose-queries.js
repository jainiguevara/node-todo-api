const { mongoose } = require('./../server/db/mongoose');
const { ObjectID } = require('mongodb');

const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user')

const id = '5b190114f005602495729aeb';

if (!ObjectID.isValid(id)) {
    console.log('Id not valid');
} else {
    User.findById(id).then((user) => {
        if (!user) {
            return console.log('user not found');
        }

        console.log('User found:', user);
    }), (error) => console.log(error);
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// })

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found')
//     }
//     console.log('Todo by id', todo);
// }).catch((e) => console.log(e));