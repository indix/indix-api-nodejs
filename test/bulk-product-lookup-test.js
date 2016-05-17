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
      inputFile: fs.readFileSync('test/stubs/bulk-job-input.csv', 'utf8'),
      countryCode: 'US'
    }

    ixClient.getBulkLookupSummary(query, function(result){
      result.should.be.like({ id: 1234, status: 'SUBMITTED' });
      done();
    });

  });

});