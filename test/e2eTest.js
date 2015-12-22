var request = require('supertest')
        , express = require('express');

var assert = require('assert');

var mockDao = require('./daoMock.js')();
var app = require('../myapp.js')(mockDao);

describe('GET /', function () {
        it('returned 200', function (done) {
                request(app)
                        .get('/')
                        .set('Accept', 'application/json')
                        .expect(200, done);
        })
});

describe('GET /strangePath', function () {
        it('returned 404', function (done) {
                request(app)
                        .get('/strangePath')
                        .set('Accept', 'application/json')
                        .expect(404, done);
        })
});


describe('POST /book', function () {
        it('returned proper json', function (done) {
                request(app)
                        .post('/book')
                        .send({"isbn": "qwerty", "count": 15})
                        .set('Content-Type', 'application/json')
                        .expect(200)
                        .end(function (err, res) {
                                if (err) return done(err);
                                assert.equal(res.body.isbn, "qwerty");
                                done();

                        })
        })
});


describe('GET /book/:isbn', function () {
        it('check stock', function (done) {
                request(app)
                        .get('/book/qwerty')
                        .set('Content-Type', 'application/json')
                        .expect(200)
                        .end(function (err, res) {
                                if (err) return done(err);
                                assert.equal(res.body.count, 15);
                                done();

                        })
        })
});