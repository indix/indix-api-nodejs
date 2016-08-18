import chai from 'chai';
let should = chai.should();
chai.use(require('chai-fuzzy'));
import * as ixClient from '../src/indix-api';
import nock from 'nock';
import fs from 'fs';

describe('Advanced Search Lookup', function() {

  before(function(){
    ixClient.init({
      appID: 'APP_ID',
      appKey: 'APP_KEY'
    });
  });

  it('universal should return the approppriate products with ASE universal information', function(done){

    var stubData = { id: 1234, status: 'SUBMITTED' }
    nock('https://api.indix.com').post('/v2/universal/bulk/ase').reply(200, stubData);

    var query = {
      inputFile: fs.createReadStream('test/stubs/ase-job-input.txt', 'utf8'),
      countryCode: 'US'
    }

    ixClient.getASELookupUniversal(query).then(function(result){
      result.should.be.like({ id: 1234, status: 'SUBMITTED' });
      done();
    });

  });

});
