'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var makeCtrlStub = {
  index: 'makeCtrl.index',
  show: 'makeCtrl.show',
  create: 'makeCtrl.create',
  upsert: 'makeCtrl.upsert',
  patch: 'makeCtrl.patch',
  destroy: 'makeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var makeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './make.controller': makeCtrlStub
});

describe('Make API Router:', function() {
  it('should return an express router instance', function() {
    makeIndex.should.equal(routerStub);
  });

  describe('GET /api/makes', function() {
    it('should route to make.controller.index', function() {
      routerStub.get
        .withArgs('/', 'makeCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/makes/:id', function() {
    it('should route to make.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'makeCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/makes', function() {
    it('should route to make.controller.create', function() {
      routerStub.post
        .withArgs('/', 'makeCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/makes/:id', function() {
    it('should route to make.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'makeCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/makes/:id', function() {
    it('should route to make.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'makeCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/makes/:id', function() {
    it('should route to make.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'makeCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
