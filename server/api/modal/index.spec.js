'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var modalCtrlStub = {
  index: 'modalCtrl.index',
  show: 'modalCtrl.show',
  create: 'modalCtrl.create',
  upsert: 'modalCtrl.upsert',
  patch: 'modalCtrl.patch',
  destroy: 'modalCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var modalIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './modal.controller': modalCtrlStub
});

describe('Modal API Router:', function() {
  it('should return an express router instance', function() {
    modalIndex.should.equal(routerStub);
  });

  describe('GET /api/modals', function() {
    it('should route to modal.controller.index', function() {
      routerStub.get
        .withArgs('/', 'modalCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/modals/:id', function() {
    it('should route to modal.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'modalCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/modals', function() {
    it('should route to modal.controller.create', function() {
      routerStub.post
        .withArgs('/', 'modalCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/modals/:id', function() {
    it('should route to modal.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'modalCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/modals/:id', function() {
    it('should route to modal.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'modalCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/modals/:id', function() {
    it('should route to modal.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'modalCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
