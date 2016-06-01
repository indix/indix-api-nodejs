import chai from 'chai';
let should = chai.should();
chai.use(require('chai-fuzzy'));
import * as ixClient from '../src/indix-api';
import nock from 'nock';
import fs from 'fs';

describe('Bulk Product Search', function() {

  before(function(){
    ixClient.init({
      appID: 'APP_ID',
      appKey: 'APP_KEY'
    });
  });

  it('bulk summary should return the approppriate products with bulk summary information', function(done){

    var stubData = { id: 1234, status: 'SUBMITTED' }
    nock('https://api.indix.com').post('/v2/summary/bulk/products').reply(200, stubData);

    var query = {
      storeId: [68],
      countryCode: 'US'
    }

    ixClient.getBulkProductSummary(query).then(function(result){
      result.should.be.like({ id: 1234, status: 'SUBMITTED' });
      done();
    });

  });

  it('bulk offers standard should return the approppriate products with bulk offers standard information', function(done){

    var stubData = { id: 1234, status: 'SUBMITTED' }
    nock('https://api.indix.com').post('/v2/offersStandard/bulk/products').reply(200, stubData);

    var query = {
      storeId: [68],
      countryCode: 'US'
    }

    ixClient.getBulkProductOffersStandard(query).then(function(result){
      result.should.be.like({ id: 1234, status: 'SUBMITTED' });
      done();
    });

  });

  it('bulk offers premium should return the approppriate products with bulk offers premium information', function(done){

    var stubData = { id: 1234, status: 'SUBMITTED' }
    nock('https://api.indix.com').post('/v2/offersPremium/bulk/products').reply(200, stubData);

    var query = {
      storeId: [68],
      countryCode: 'US'
    }

    ixClient.getBulkProductOffersPremium(query).then(function(result){
      result.should.be.like({ id: 1234, status: 'SUBMITTED' });
      done();
    });

  });

  it('bulk catalog standard should return the approppriate products with bulk catalog standard information', function(done){

    var stubData = { id: 1234, status: 'SUBMITTED' }
    nock('https://api.indix.com').post('/v2/catalogStandard/bulk/products').reply(200, stubData);

    var query = {
      storeId: [68],
      countryCode: 'US'
    }

    ixClient.getBulkProductCatalogStandard(query).then(function(result){
      result.should.be.like({ id: 1234, status: 'SUBMITTED' });
      done();
    });

  });

  it('bulk catalog premium should return the approppriate products with bulk catalog premium information', function(done){

    var stubData = { id: 1234, status: 'SUBMITTED' }
    nock('https://api.indix.com').post('/v2/catalogPremium/bulk/products').reply(200, stubData);

    var query = {
      storeId: [68],
      countryCode: 'US'
    }

    ixClient.getBulkProductCatalogPremium(query).then(function(result){
      result.should.be.like({ id: 1234, status: 'SUBMITTED' });
      done();
    });

  });

  it('bulk universal should return the approppriate products with bulk universal information', function(done){

    var stubData = { id: 1234, status: 'SUBMITTED' }
    nock('https://api.indix.com').post('/v2/universal/bulk/products').reply(200, stubData);

    var query = {
      storeId: [68],
      countryCode: 'US'
    }

    ixClient.getBulkProductUniversal(query).then(function(result){
      result.should.be.like({ id: 1234, status: 'SUBMITTED' });
      done();
    });

  });

});
