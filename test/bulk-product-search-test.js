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

    ixClient.getBulkProductSummary(query, function(result){
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

    ixClient.getBulkProductOffersStandard(query, function(result){
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

    ixClient.getBulkProductOffersPremium(query, function(result){
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

    ixClient.getBulkProductCatalogStandard(query, function(result){
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

    ixClient.getBulkProductCatalogPremium(query, function(result){
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

    ixClient.getBulkProductUniversal(query, function(result){
      result.should.be.like({ id: 1234, status: 'SUBMITTED' });
      done();
    });

  });

  it('should poll for job status', function(done){

    var stubData = { id: 1234, status: 'COMPLETED', count: 10000 }
    nock('https://api.indix.com').get('/v2/bulk/jobs/1234').reply(200, stubData);

    var jobID = 1234;

    ixClient.getJobStatus(jobID, function(result){
      result.should.be.like({ id: 1234, status: 'COMPLETED', count: 10000 });
      done();
    });

  });

  it('should download the product data', function(done){

    var stubData = fs.readFileSync('test/stubs/bulk-job-output.jsonl.gz', 'utf8');
    nock('https://api.indix.com').get('/v2/bulk/jobs/1234/download?app_id=APP_ID&app_key=APP_KEY').reply(200, stubData);

    var jobID = 1234;

    ixClient.downloadProducts(jobID, function(results){
      results[0].should.be.like({
        "minSalePrice":13.0,
        "maxSalePrice":1799.0,
        "offersCount":514,
        "storesCount":21,
        "lastRecordedAt":1463079146728,
        "countryCode":"US",
        "mpid":"8586800ef26b43f9c7ed09b7ea57d2d2",
        "currency":"USD",
        "upcs":[
          "00037988561544"
        ],
        "title":"Panasonic Bikini Trimmer and Shaver, Ladies, ES246AC",
        "brandId":2712,
        "categoryIdPath":"10166 > 16021 > 16113 > 19160",
        "brandName":"Panasonic",
        "categoryId":19160,
        "categoryName":"Bikinis",
        "mpns":[
          "001910639601",
          "null",
          "PAN-ES246AC",
          "PANPES246AC",
          "ES246AC",
          "ES246AC/PAN",
          "ES-246AC"
        ],
        "imageUrl":"http://ecx.images-amazon.com/images/I/61PJuromGYL._SY450_.jpg",
        "categoryNamePath":"Clothing & Accessories > Women > Swim > Bikinis"
      });
      done();
    });

  });

});