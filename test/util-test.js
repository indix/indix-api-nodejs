import chai from 'chai';
let should = chai.should();
chai.use(require('chai-fuzzy'));
import * as ixClient from '../src/indix-api';
import nock from 'nock';
import fs from 'fs';
import * as util from '../src/util.js';

describe('URL converter', function() {

  it('should convert appID and appKey to app_id and app_key paramters', function(){

    let url,
        query;

    query = {
      q: 'nike',
      countryCode: 'US',
      app_id: 'APP_ID',
      app_key: 'APP_KEY'
    }
    url = 'q=nike&countryCode=US&app_id=APP_ID&app_key=APP_KEY';
    util.convertJSONToQueryParams(query).should.be.equal(url);

  });

  it('should convert simple paramters', function(){

    let url,
        query;

    query = {
      q: 'nike',
      countryCode: 'US'
    }
    url = 'q=nike&countryCode=US';
    util.convertJSONToQueryParams(query).should.be.equal(url);

  });

  it('should convert complex paramters', function(){

    let url,
        query;

    query = {
      countryCode: 'US',
      q: 'nike',
      storeId: [24, 25, 26],
      alsoSoldAt: [270, 271],
      brandId: [5572, 5573],
      categoryId: [99998, 99999],
      upc: 'SOME_UPC',
      mpn: 'SOME_MPN',
      sku: 'SOME_SKU',
      startPrice: 1,
      endPrice: 100,
      availability: 'IN_STOCK',
      priceHistoryAvailable: true,
      priceChange: 'EITHER',
      onPromotion: true,
      lastRecordedIn: 15,
      storesCount: 10,
      applyFiltersTo: 'storeIdOrAlsoSoldAt',
      sortBy: 'PRICE_LOW_TO_HIGH',
      facetBy: [ 'storeId', 'brandId' ],
      pageNumber: 10,
      pageSize: 20,
      app_id: 'APP_ID',
      app_key: 'APP_KEY'
    }
    url = 'countryCode=US&q=nike&storeId=24&storeId=25&storeId=26&alsoSoldAt=270&alsoSoldAt=271&brandId=5572&brandId=5573&categoryId=99998&categoryId=99999&upc=SOME_UPC&mpn=SOME_MPN&sku=SOME_SKU&startPrice=1&endPrice=100&availability=IN_STOCK&priceHistoryAvailable=true&priceChange=EITHER&onPromotion=true&lastRecordedIn=15&storesCount=10&applyFiltersTo=storeIdOrAlsoSoldAt&sortBy=PRICE_LOW_TO_HIGH&facetBy=storeId&facetBy=brandId&pageNumber=10&pageSize=20&app_id=APP_ID&app_key=APP_KEY';
    util.convertJSONToQueryParams(query).should.be.equal(url);

  });

  it('should remove mpid from paramters', function(){

    let url,
        query;

    query = {
      q: 'nike',
      mpid: '8e1d8cd338ada38624d2f9322b259402'
    }
    url = 'q=nike';
    util.convertJSONToQueryParams(query).should.be.equal(url);

  });

});
