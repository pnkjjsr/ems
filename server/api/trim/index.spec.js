'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var trimCtrlStub = {
  index: 'trimCtrl.index',
  show: 'trimCtrl.show',
  create: 'trimCtrl.create',
  upsert: 'trimCtrl.upsert',
  patch: 'trimCtrl.patch',
  destroy: 'trimCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var trimIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './trim.controller': trimCtrlStub
});

describe('Trim API Router:', function() {
  it('should return an express router instance', function() {
    trimIndex.should.equal(routerStub);
  });

  describe('GET /api/trims', function() {
    it('should route to trim.controller.index', function() {
      routerStub.get
        .withArgs('/', 'trimCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/trims/:id', function() {
    it('should route to trim.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'trimCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/trims', function() {
    it('should route to trim.controller.create', function() {
      routerStub.post
        .withArgs('/', 'trimCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/trims/:id', function() {
    it('should route to trim.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'trimCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/trims/:id', function() {
    it('should route to trim.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'trimCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/trims/:id', function() {
    it('should route to trim.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'trimCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
