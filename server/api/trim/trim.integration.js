'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newTrim;

describe('Trim API:', function() {
  describe('GET /api/trims', function() {
    var trims;

    beforeEach(function(done) {
      request(app)
        .get('/api/trims')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          trims = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      trims.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/trims', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/trims')
        .send({
          name: 'New Trim',
          info: 'This is the brand new trim!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTrim = res.body;
          done();
        });
    });

    it('should respond with the newly created trim', function() {
      newTrim.name.should.equal('New Trim');
      newTrim.info.should.equal('This is the brand new trim!!!');
    });
  });

  describe('GET /api/trims/:id', function() {
    var trim;

    beforeEach(function(done) {
      request(app)
        .get(`/api/trims/${newTrim._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          trim = res.body;
          done();
        });
    });

    afterEach(function() {
      trim = {};
    });

    it('should respond with the requested trim', function() {
      trim.name.should.equal('New Trim');
      trim.info.should.equal('This is the brand new trim!!!');
    });
  });

  describe('PUT /api/trims/:id', function() {
    var updatedTrim;

    beforeEach(function(done) {
      request(app)
        .put(`/api/trims/${newTrim._id}`)
        .send({
          name: 'Updated Trim',
          info: 'This is the updated trim!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedTrim = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTrim = {};
    });

    it('should respond with the updated trim', function() {
      updatedTrim.name.should.equal('Updated Trim');
      updatedTrim.info.should.equal('This is the updated trim!!!');
    });

    it('should respond with the updated trim on a subsequent GET', function(done) {
      request(app)
        .get(`/api/trims/${newTrim._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let trim = res.body;

          trim.name.should.equal('Updated Trim');
          trim.info.should.equal('This is the updated trim!!!');

          done();
        });
    });
  });

  describe('PATCH /api/trims/:id', function() {
    var patchedTrim;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/trims/${newTrim._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Trim' },
          { op: 'replace', path: '/info', value: 'This is the patched trim!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedTrim = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedTrim = {};
    });

    it('should respond with the patched trim', function() {
      patchedTrim.name.should.equal('Patched Trim');
      patchedTrim.info.should.equal('This is the patched trim!!!');
    });
  });

  describe('DELETE /api/trims/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/trims/${newTrim._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when trim does not exist', function(done) {
      request(app)
        .delete(`/api/trims/${newTrim._id}`)
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
