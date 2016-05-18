import chai from 'chai';
let should = chai.should();
chai.use(require('chai-fuzzy'));
import * as ixClient from '../src/indix-api';
import nock from 'nock';
import fs from 'fs';

describe('Search Suggestions', function() {

  before(function(){
    ixClient.init({
      appID: 'APP_ID',
      appKey: 'APP_KEY'
    });
  });

  it('should return the approppriate suggestions', function(done){

    var stubData = JSON.parse(fs.readFileSync('test/stubs/search-suggestions.json', 'utf8'));
    nock('https://api.indix.com').get('/v2/products/suggestions?q=red&countryCode=US&app_id=APP_ID&app_key=APP_KEY').reply(200, stubData);

    var query = {
      q: 'red',
      countryCode: 'US'
    }

    ixClient.getSearchSuggestions(query).then(function(results){
      results.length.should.equal(5);
      results[0].should.equal('red');
      done();
    });

  });

});