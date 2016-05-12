import chai from 'chai';
let should = chai.should();
chai.use(require('chai-fuzzy'));
import * as ixClient from '../src/indix-api';
import nock from 'nock';
import fs from 'fs';

describe('Initialization', function() {

  it('should ensure that App ID and App Key are provided', function() {
    var e = '';
    try{
      ixClient.init();
    }catch(ex){
      e = ex;
    }finally{
      e.should.equal('A valid App ID and App Key must be provided to initialize the Indix API Client.')
    }
  });

});
