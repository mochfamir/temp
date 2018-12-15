const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      expect    = chai.expect,
      app       = require('../app'),
      User      = require('../models/user')

chai.use(chaiHttp)

after(function() {
    User.deleteMany({})
        .then((result) => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
})

describe('User test', function() { 
    describe("POST /users/register", function() {
        it("should send an object of data user with 201 status code", function(done) {
            const newUser = {
                name: "Mochamad Faishal Amir",
                email: "faishal@mail.com",
                password: "123456789"
            };
            chai
            .request(app)
            .post('/users/register')
            .send(newUser)
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body.name).not.equal('')
                expect(res.body.email).not.equal('')
                expect(res.body.password).not.equal('')
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('password');
                expect(res.body.name).to.equal(newUser.name);
                expect(res.body.email).to.equal(newUser.email);
                expect(res.body.password).not.equal(newUser.password);
                done();
            });
        });

        it("should send an error with 400 status code", function(done) {
            const newUser = {
                name: "",
                email: "faishal@mail.com",
                password: "123456789"
            };
            chai
            .request(app)
            .post('/users/register')
            .send(newUser)
            .end(function(err, res) {
                expect(res.body.err).to.equal('User validation failed: name: Name is required')
                expect(res).to.have.status(400);
                done();
            });
        })

        it("should send an error with 400 status code", function(done) {
            const newUser = {
                name: "M",
                email: "faishal@mail.com",
                password: "123456789"
            };
            chai
            .request(app)
            .post('/users/register')
            .send(newUser)
            .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body.err).to.equal('User validation failed: name: Minimum name length is 2')
                done();
            });
        })

        it("should send an error with 400 status code", function(done) {
            const newUser = {
                name: "Mochamad Faishal Amir dqwdwd dwdawdwad awdadadwad awdwadwad",
                email: "faishal@mail.com",
                password: "123456789"
            };
            chai
            .request(app)
            .post('/users/register')
            .send(newUser)
            .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body.err).to.equal('User validation failed: name: Maximum name length is 30')
                done();
            });
        })

        it("should send an error with 400 status code", function(done) {
            const newUser = {
                name: "Mochamad Faishal Amir",
                email: "faishalmail.com",
                password: "123456789"
            };
            chai
            .request(app)
            .post('/users/register')
            .send(newUser)
            .end(function(err, res) {
                expect(res.body.err).to.equal('User validation failed: email: faishalmail.com is not a valid email!')
                expect(res).to.have.status(400);
                done();
            });
        })

        it("should send an error with 400 status code", function(done) {
            const newUser = {
                name: "Mochamad Faishal Amir",
                email: "faishal@mailcom",
                password: "123456789"
            };
            chai
            .request(app)
            .post('/users/register')
            .send(newUser)
            .end(function(err, res) {
                expect(res.body.err).to.equal('User validation failed: email: faishal@mailcom is not a valid email!')
                expect(res).to.have.status(400);
                done();
            });
        })

        it("should send an error with 400 status code", function(done) {
            const newUser = {
                name: "Mochamad Faishal Amir",
                email: "",
                password: "123456789"
            };
            chai
            .request(app)
            .post('/users/register')
            .send(newUser)
            .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body.err).to.equal('User validation failed: email: Email is required')
                done();
            });
        })

        it("should send an error with 400 status code", function(done) {
            const newUser = {
                name: "Mochamad Faishal Amir",
                email: "faishal@mail.com",
                password: ""
            };
            chai
            .request(app)
            .post('/users/register')
            .send(newUser)
            .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body.err).to.equal('User validation failed: password: password is required')
                done();
            });
        })

        it("should send an error with 400 status code", function(done) {
            const newUser = {
                name: "Mochamad Faishal Amir",
                email: "faishal@mail.com",
                password: "123"
            };
            chai
            .request(app)
            .post('/users/register')
            .send(newUser)
            .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body.err).to.equal('User validation failed: password: Minimum password length is 8')
                done();
            });
        })

          it("should send an error with 400 status code", function(done) {
            const newUser = {
                name: "Mochamad Faishal Amir",
                email: "faishal@mail.com",
                password: "123456789wdmaawdadwadawdawdawdwadawd"
            };
            chai
            .request(app)
            .post('/users/register')
            .send(newUser)
            .end(function(err, res) {
                expect(res).to.have.status(400);
                expect(res.body.err).to.equal('User validation failed: password: Maximum password length is 16')
                done();
            });
        })
    })


    describe("POST /users/login", function() {
        it('should send an object of token with 200 status code', function(done) {
            const userLogin = {
                email: "faishal@mail.com",
                password: "123456789"
            };
            chai
                .request(app)
                .post('/users/login')
                .send(userLogin)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('token');
                    done()
                });
        })

        it('should send error with 400 status code', function(done) {
            const userLogin = {
                email: "fa@mail.com",
                password: "123456789"
            };
            chai
                .request(app)
                .post('/users/login')
                .send(userLogin)
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.err).to.equal('User not found!')
                    done()
                });
        })

        it('should send error with 400 status code', function(done) {
            const userLogin = {
                email: "faishal@mail.com",
                password: "12345678"
            };
            chai
                .request(app)
                .post('/users/login')
                .send(userLogin)
                .end(function(err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body.err).to.equal('invalid password');
                    done()
                });
        })
    })

    
})

