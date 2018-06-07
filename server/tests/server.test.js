const expect = require('expect');
const request = require('supertest');

const {app} = new require('./../server');
const {Todo} = new require('./../models/todo');

const todos = [{
    text: 'First'
}, {
    text: 'Second'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todo', () => {
    it('should create a new todo', (done) => {
        var text = "Todo test";

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
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
            })

            
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
            .end(done)
    })
});

// describe('GET /todos/:id', () => {
//     it('should get todo by id', (done) => {
//         request(app)
//             .get('/todos/5b190b159f09c1116c888ad7')
//             .expect(200)
//             .expect((res) => {
//                 console.log(res.body);
//                 expect(res.body.todo).toBe(true);
//             })
//             .end(done)
//     });
// });