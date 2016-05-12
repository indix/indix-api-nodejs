import chai from 'chai';
let should = chai.should();
chai.use(require('chai-fuzzy'));
import * as ixClient from '../src/indix-api';
import nock from 'nock';
import fs from 'fs';

describe('BCS Search', function() {

  before(function(){
    ixClient.init({
      appID: 'APP_ID',
      appKey: 'APP_KEY'
    });
  });

  it('brands should return the approppriate brands when searched using a query term', function(done){

    var stubData = JSON.parse(fs.readFileSync('test/stubs/brands.json', 'utf8'));
    nock('https://api.indix.com').get('/v2/brands?q=Nike&app_id=APP_ID&app_key=APP_KEY').reply(200, stubData);

    var query = { q: 'Nike' }
    ixClient.getBrands(query, function(results){
      results.length.should.equal(1);
      results[0].should.be.like({ id: 5572, name: 'Nike' })
      done();
    });

  });

  it('stores should return the approppriate stores when searched using a query term', function(done){

    var stubData = JSON.parse(fs.readFileSync('test/stubs/stores.json', 'utf8'));
    nock('https://api.indix.com').get('/v2/stores?q=Amazon.com&app_id=APP_ID&app_key=APP_KEY').reply(200, stubData);

    var query = { q: 'Amazon.com' }
    ixClient.getStores(query, function(results){
      results.length.should.equal(4);
      results[0].should.be.like({ id: 270, name: 'Amazon.com Marketplace', countryCode: 'US' })
      done();
    });

  });

  it('categories should return all the categories', function(done){

    var stubData = JSON.parse(fs.readFileSync('test/stubs/categories.json', 'utf8'));
    nock('https://api.indix.com').get('/v2/categories?app_id=APP_ID&app_key=APP_KEY').reply(200, stubData);

    ixClient.getCategories(function(results){
      results.length.should.equal(3);
      results[0].should.be.like({ id: 10161, idPath: "10161", name: 'Computers & Accessories', namePath: 'Computers & Accessories' })
      done();
    });

  });

});
