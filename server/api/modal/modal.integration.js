'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newModal;

describe('Modal API:', function() {
  describe('GET /api/modals', function() {
    var modals;

    beforeEach(function(done) {
      request(app)
        .get('/api/modals')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          modals = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      modals.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/modals', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/modals')
        .send({
          name: 'New Modal',
          info: 'This is the brand new modal!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newModal = res.body;
          done();
        });
    });

    it('should respond with the newly created modal', function() {
      newModal.name.should.equal('New Modal');
      newModal.info.should.equal('This is the brand new modal!!!');
    });
  });

  describe('GET /api/modals/:id', function() {
    var modal;

    beforeEach(function(done) {
      request(app)
        .get(`/api/modals/${newModal._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          modal = res.body;
          done();
        });
    });

    afterEach(function() {
      modal = {};
    });

    it('should respond with the requested modal', function() {
      modal.name.should.equal('New Modal');
      modal.info.should.equal('This is the brand new modal!!!');
    });
  });

  describe('PUT /api/modals/:id', function() {
    var updatedModal;

    beforeEach(function(done) {
      request(app)
        .put(`/api/modals/${newModal._id}`)
        .send({
          name: 'Updated Modal',
          info: 'This is the updated modal!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedModal = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedModal = {};
    });

    it('should respond with the updated modal', function() {
      updatedModal.name.should.equal('Updated Modal');
      updatedModal.info.should.equal('This is the updated modal!!!');
    });

    it('should respond with the updated modal on a subsequent GET', function(done) {
      request(app)
        .get(`/api/modals/${newModal._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let modal = res.body;

          modal.name.should.equal('Updated Modal');
          modal.info.should.equal('This is the updated modal!!!');

          done();
        });
    });
  });

  describe('PATCH /api/modals/:id', function() {
    var patchedModal;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/modals/${newModal._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Modal' },
          { op: 'replace', path: '/info', value: 'This is the patched modal!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedModal = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedModal = {};
    });

    it('should respond with the patched modal', function() {
      patchedModal.name.should.equal('Patched Modal');
      patchedModal.info.should.equal('This is the patched modal!!!');
    });
  });

  describe('DELETE /api/modals/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/modals/${newModal._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when modal does not exist', function(done) {
      request(app)
        .delete(`/api/modals/${newModal._id}`)
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
