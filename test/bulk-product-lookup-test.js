import chai from 'chai';
let should = chai.should();
chai.use(require('chai-fuzzy'));
import * as ixClient from '../src/indix-api';
import nock from 'nock';
import fs from 'fs';

describe('Bulk Product Lookup', function() {

  before(function(){
    ixClient.init({
      appID: 'APP_ID',
      appKey: 'APP_KEY'
    });
  });

  it('bulk summary should return the approppriate products with bulk summary information', function(done){

    var stubData = { id: 1234, status: 'SUBMITTED' }
    nock('https://api.indix.com').post('/v2/summary/bulk/lookup').reply(200, stubData);

    var query = {
      inputFile: fs.createReadStream('test/stubs/bulk-job-input.csv', 'utf8'),
      countryCode: 'US'
    }

    ixClient.getBulkProductLookupSummary(query, function(result){
      result.should.be.like({ id: 1234, status: 'SUBMITTED' });
      done();
    });

  });

  it('bulk offers standard should return the approppriate products with bulk offers standard information', function(done){

    var stubData = { id: 1234, status: 'SUBMITTED' }
    nock('https://api.indix.com').post('/v2/offersStandard/bulk/lookup').reply(200, stubData);

    var query = {
      inputFile: fs.createReadStream('test/stubs/bulk-job-input.csv', 'utf8'),
      countryCode: 'US'
    }

    ixClient.getBulkProductLookupOffersStandard(query, function(result){
      result.should.be.like({ id: 1234, status: 'SUBMITTED' });
      done();
    });

  });

  it('bulk offers premium should return the approppriate products with bulk offers premium information', function(done){

    var stubData = { id: 1234, status: 'SUBMITTED' }
    nock('https://api.indix.com').post('/v2/offersPremium/bulk/lookup').reply(200, stubData);

    var query = {
      inputFile: fs.createReadStream('test/stubs/bulk-job-input.csv', 'utf8'),
      countryCode: 'US'
    }

    ixClient.getBulkProductLookupOffersPremium(query, function(result){
      result.should.be.like({ id: 1234, status: 'SUBMITTED' });
      done();
    });

  });

  it('bulk catalog standard should return the approppriate products with bulk catalog standard information', function(done){

    var stubData = { id: 1234, status: 'SUBMITTED' }
    nock('https://api.indix.com').post('/v2/catalogStandard/bulk/lookup').reply(200, stubData);

    var query = {
      inputFile: fs.createReadStream('test/stubs/bulk-job-input.csv', 'utf8'),
      countryCode: 'US'
    }

    ixClient.getBulkProductLookupCatalogStandard(query, function(result){
      result.should.be.like({ id: 1234, status: 'SUBMITTED' });
      done();
    });

  });

  it('bulk catalog premium should return the approppriate products with bulk catalog premium information', function(done){

    var stubData = { id: 1234, status: 'SUBMITTED' }
    nock('https://api.indix.com').post('/v2/catalogPremium/bulk/lookup').reply(200, stubData);

    var query = {
      inputFile: fs.createReadStream('test/stubs/bulk-job-input.csv', 'utf8'),
      countryCode: 'US'
    }

    ixClient.getBulkProductLookupCatalogPremium(query, function(result){
      result.should.be.like({ id: 1234, status: 'SUBMITTED' });
      done();
    });

  });

  it('bulk universal should return the approppriate products with bulk universal information', function(done){

    var stubData = { id: 1234, status: 'SUBMITTED' }
    nock('https://api.indix.com').post('/v2/universal/bulk/lookup').reply(200, stubData);

    var query = {
      inputFile: fs.createReadStream('test/stubs/bulk-job-input.csv', 'utf8'),
      countryCode: 'US'
    }

    ixClient.getBulkProductLookupUniversal(query, function(result){
      result.should.be.like({ id: 1234, status: 'SUBMITTED' });
      done();
    });

  });

});