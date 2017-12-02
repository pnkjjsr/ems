'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var vehicleCtrlStub = {
  index: 'vehicleCtrl.index',
  show: 'vehicleCtrl.show',
  create: 'vehicleCtrl.create',
  upsert: 'vehicleCtrl.upsert',
  patch: 'vehicleCtrl.patch',
  destroy: 'vehicleCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var vehicleIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './vehicle.controller': vehicleCtrlStub
});

describe('Vehicle API Router:', function() {
  it('should return an express router instance', function() {
    vehicleIndex.should.equal(routerStub);
  });

  describe('GET /api/vehicles', function() {
    it('should route to vehicle.controller.index', function() {
      routerStub.get
        .withArgs('/', 'vehicleCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/vehicles/:id', function() {
    it('should route to vehicle.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'vehicleCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/vehicles', function() {
    it('should route to vehicle.controller.create', function() {
      routerStub.post
        .withArgs('/', 'vehicleCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/vehicles/:id', function() {
    it('should route to vehicle.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'vehicleCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/vehicles/:id', function() {
    it('should route to vehicle.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'vehicleCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/vehicles/:id', function() {
    it('should route to vehicle.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'vehicleCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
