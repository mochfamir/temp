const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      expect    = chai.expect,
      app       = require('../app'),
        Article = require('../models/article'),
        User    = require('../models/user'),
  helperTesting = require('./helperTesting'),
        helper  = require('../helper/helper');

chai.use(chaiHttp)

after(function(done) {
    Article.deleteMany({})
        .then(result => {
            done()
        })
})


describe('Article test', function() {
    var dataUser;
    before(function(done) {
        helperTesting.createUser()
            .then(user => {
                dataUser = user
                done()
            })
    })
    describe('POST /article', function() {
        it("should send an object of data Article with status code 201", function(done) {
            const newArticle = {
                title: "test title",
                content: "bla bla bla",
                comment: '5c0e76b22edbf64207509fe4',
                user: '5c0e76b22edbf64207509fe4',
            };
            chai
            .request(app)
            .post('/article')
            .send(newArticle)
            .set("token", helper.generateToken(dataUser._id, dataUser.email))
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body.title).not.equal('')
                expect(res.body.content).not.equal('')
                expect(res.body.comment).not.equal('')
                expect(res.body.user).not.equal('')
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('content');
                expect(res.body).to.have.property('user');
                done();
            });
        })

        it("should send error with status code 400", function(done) {
            const newArticle = {
                title: "",
                content: "bla bla bla",
                comment: '5c0e76b22edbf64207509fe4',
                user: '5c0e76b22edbf64207509fe4',
            };
            chai
            .request(app)
            .post('/article')
            .send(newArticle)
            .set("token", helper.generateToken(dataUser._id, dataUser.email))
            .end(function(err, res) {
                console.log(res.body.err)
                expect(res).to.have.status(400);
                expect(res.body.err).equal('Article validation failed: title: Name is required')
                done();
            });
        })

        it("should send error with status code 400", function(done) {
            const newArticle = {
                title: "test title",
                content: "",
                comment: '5c0e76b22edbf64207509fe4',
                user: '5c0e76b22edbf64207509fe4',
            };
            chai
            .request(app)
            .post('/article')
            .send(newArticle)
            .set("token", helper.generateToken(dataUser._id, dataUser.email))
            .end(function(err, res) {
                console.log(res.body.err)
                expect(res).to.have.status(400);
                expect(res.body.err).equal('Article validation failed: content: Content is required')
                done();
            });
        })
    })

    describe('GET /article', function() {
        it("should send an array of object data Articles with status code 200", function(done) {
            chai
            .request(app)
            .get('/article')
            .set("token", helper.generateToken(dataUser._id, dataUser.email))
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body[0].title).not.equal('')
                expect(res.body[0].content).not.equal('')
                expect(res.body[0].comment).not.equal('')
                expect(res.body[0].user).not.equal('')
                expect(res.body[0]).to.have.property('title');
                expect(res.body[0]).to.have.property('content');
                expect(res.body[0]).to.have.property('user');
                done();
            });
        })
    });
    
    describe('PUT /article', function() {
        var idArticle;
        before(function(done) {
            Article.create({
                title: "test title",
                content: "bla bla bla",
                comment: '5c0e76b22edbf64207509fe4',
                user: '5c0e76b22edbf64207509fe4',
            })
                .then(article => {
                    idArticle = article._id
                    done()
                })
        })
        it('should update an article with status code 201', function(done) {
            const newArticle = {
                title: "test update",
                content: "update",
                comment: '5c0e76b22edbf64207509fe4',
                user: '5c0e76b22edbf64207509fe4',
            };
            chai
                .request(app)
                .put(`/article/${idArticle}`)
                .set("token", helper.generateToken(dataUser._id, dataUser.email))
                .send(newArticle)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body.nModified).equal(1);
                    done();
                })
        })
    })

    describe('DELETE /article', function() {
        var id;
        before(function(done) {
            Article.create({
                title: "test title",
                content: "bla bla bla",
                comment: '5c0e76b22edbf64207509fe4',
                user: '5c0e76b22edbf64207509fe4',
            })
                .then(article => {
                    id = article._id
                    done()
                })
        })

        it('should delete an article with status code 200', function(done) {
            chai
                .request(app)
                .delete(`/article/${id}`)
                .set("token", helper.generateToken(dataUser._id, dataUser.email))
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body.n).equal(1);
                    expect(res.body.ok).equal(1);
                    done();
                })
        })
    })

})