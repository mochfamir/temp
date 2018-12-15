const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      expect    = chai.expect,
      app       = require('../app'),
      helperTesting = require('./helperTesting'),
      helper  = require('../helper/helper');

chai.use(chaiHttp);

describe('Comment Test', function() {
    var dataUser;
    var dataComment;
    before(function(done) {
        helperTesting.createUser()
            .then(user => {
                dataUser = user
                done()
            })
    })
    before(function(done) {
        helperTesting.createComment()
            .then(comment => {
                dataComment = comment;
                done();
            })
    })
    describe('POST /comment', function(done) {
        it('should create a new comment with 201 status code', function(done) {
            const newComment = {
                content: "comment nich",
                user: dataUser._id
            };
            chai
                .request(app)
                .post('/comment')
                .set("token", helper.generateToken(dataUser._id, dataUser.email))
                .send(newComment)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body.content).not.equal('')
                    expect(res.body.userId).not.equal('')
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('content');
                    expect(res.body).to.have.property('user');
                    done();
                })
        })
    })
    describe('GET /comment', function(done) {
        it('should send object comment with status code 200', function(done) {
            chai
                .request(app)
                .get('/comment')
                .set("token", helper.generateToken(dataUser._id, dataUser.email))
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body[0]).to.have.property('_id');
                    expect(res.body[0]).to.have.property('content');
                    expect(res.body[0]).to.have.property('user');
                    done();
                })
        })
    })
    describe('PUT /comment', function(done) {
        it('should update comment with status code 201', function(done) {
            const dataUpdate = {
                content: 'ini update',
                user: '5c0e76b22edbf64207509fe4'
            }
            chai
                .request(app)
                .put(`/comment/${dataComment._id}`)
                .set("token", helper.generateToken(dataUser._id, dataUser.email))
                .send(dataUpdate)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body.nModified).equal(1);
                    done();
                })
        })
    })
    describe('DELETE /comment', function(done) {
        it('should delete comment with status code 200', function(done) {
            chai
                .request(app)
                .delete(`/comment/${dataComment._id}`)
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