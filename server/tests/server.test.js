const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = new require('./../server');
const {Todo} = new require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First'
}, {
    text: 'Second'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done());
    done();
});

describe('POST /todo', () => {
    it('should create a new todo', (done) => {
        var text = 'Todo test';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                return expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done(); 
                }).catch((e) => done(e));
            });          
    });
});

describe('GET /todos', () =>{

    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo).toBe(todos[0].text);
            })
            .end(done);
    });
});