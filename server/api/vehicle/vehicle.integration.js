'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newVehicle;

describe('Vehicle API:', function() {
  describe('GET /api/vehicles', function() {
    var vehicles;

    beforeEach(function(done) {
      request(app)
        .get('/api/vehicles')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          vehicles = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      vehicles.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/vehicles', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/vehicles')
        .send({
          name: 'New Vehicle',
          info: 'This is the brand new vehicle!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newVehicle = res.body;
          done();
        });
    });

    it('should respond with the newly created vehicle', function() {
      newVehicle.name.should.equal('New Vehicle');
      newVehicle.info.should.equal('This is the brand new vehicle!!!');
    });
  });

  describe('GET /api/vehicles/:id', function() {
    var vehicle;

    beforeEach(function(done) {
      request(app)
        .get(`/api/vehicles/${newVehicle._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          vehicle = res.body;
          done();
        });
    });

    afterEach(function() {
      vehicle = {};
    });

    it('should respond with the requested vehicle', function() {
      vehicle.name.should.equal('New Vehicle');
      vehicle.info.should.equal('This is the brand new vehicle!!!');
    });
  });

  describe('PUT /api/vehicles/:id', function() {
    var updatedVehicle;

    beforeEach(function(done) {
      request(app)
        .put(`/api/vehicles/${newVehicle._id}`)
        .send({
          name: 'Updated Vehicle',
          info: 'This is the updated vehicle!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedVehicle = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVehicle = {};
    });

    it('should respond with the updated vehicle', function() {
      updatedVehicle.name.should.equal('Updated Vehicle');
      updatedVehicle.info.should.equal('This is the updated vehicle!!!');
    });

    it('should respond with the updated vehicle on a subsequent GET', function(done) {
      request(app)
        .get(`/api/vehicles/${newVehicle._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let vehicle = res.body;

          vehicle.name.should.equal('Updated Vehicle');
          vehicle.info.should.equal('This is the updated vehicle!!!');

          done();
        });
    });
  });

  describe('PATCH /api/vehicles/:id', function() {
    var patchedVehicle;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/vehicles/${newVehicle._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Vehicle' },
          { op: 'replace', path: '/info', value: 'This is the patched vehicle!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedVehicle = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedVehicle = {};
    });

    it('should respond with the patched vehicle', function() {
      patchedVehicle.name.should.equal('Patched Vehicle');
      patchedVehicle.info.should.equal('This is the patched vehicle!!!');
    });
  });

  describe('DELETE /api/vehicles/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/vehicles/${newVehicle._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when vehicle does not exist', function(done) {
      request(app)
        .delete(`/api/vehicles/${newVehicle._id}`)
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
