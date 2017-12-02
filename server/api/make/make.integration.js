'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newMake;

describe('Make API:', function() {
  describe('GET /api/makes', function() {
    var makes;

    beforeEach(function(done) {
      request(app)
        .get('/api/makes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          makes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      makes.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/makes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/makes')
        .send({
          name: 'New Make',
          info: 'This is the brand new make!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newMake = res.body;
          done();
        });
    });

    it('should respond with the newly created make', function() {
      newMake.name.should.equal('New Make');
      newMake.info.should.equal('This is the brand new make!!!');
    });
  });

  describe('GET /api/makes/:id', function() {
    var make;

    beforeEach(function(done) {
      request(app)
        .get(`/api/makes/${newMake._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          make = res.body;
          done();
        });
    });

    afterEach(function() {
      make = {};
    });

    it('should respond with the requested make', function() {
      make.name.should.equal('New Make');
      make.info.should.equal('This is the brand new make!!!');
    });
  });

  describe('PUT /api/makes/:id', function() {
    var updatedMake;

    beforeEach(function(done) {
      request(app)
        .put(`/api/makes/${newMake._id}`)
        .send({
          name: 'Updated Make',
          info: 'This is the updated make!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedMake = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMake = {};
    });

    it('should respond with the updated make', function() {
      updatedMake.name.should.equal('Updated Make');
      updatedMake.info.should.equal('This is the updated make!!!');
    });

    it('should respond with the updated make on a subsequent GET', function(done) {
      request(app)
        .get(`/api/makes/${newMake._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let make = res.body;

          make.name.should.equal('Updated Make');
          make.info.should.equal('This is the updated make!!!');

          done();
        });
    });
  });

  describe('PATCH /api/makes/:id', function() {
    var patchedMake;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/makes/${newMake._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Make' },
          { op: 'replace', path: '/info', value: 'This is the patched make!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedMake = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedMake = {};
    });

    it('should respond with the patched make', function() {
      patchedMake.name.should.equal('Patched Make');
      patchedMake.info.should.equal('This is the patched make!!!');
    });
  });

  describe('DELETE /api/makes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/makes/${newMake._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when make does not exist', function(done) {
      request(app)
        .delete(`/api/makes/${newMake._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
