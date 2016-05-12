import chai from 'chai';
let should = chai.should();
chai.use(require('chai-fuzzy'));
import * as ixClient from '../src/indix-api';
import nock from 'nock';
import fs from 'fs';

describe('Product Search', function() {

  describe('Summary', function(){

    before(function(){
      ixClient.init({
        appID: 'APP_ID',
        appKey: 'APP_KEY'
      });
    });

    it('should return the approppriate products with summary information', function(done){

      var stubData = JSON.parse(fs.readFileSync('test/stubs/product-summary.json', 'utf8'));
      nock('https://api.indix.com').get('/v2/summary/products?q=nike&countryCode=US&app_id=APP_ID&app_key=APP_KEY').reply(200, stubData);

      var query = {
        q: 'nike',
        countryCode: 'US'
      }

      ixClient.getProductSummary(query, function(results){
        results.length.should.equal(10);
        results[0].should.be.like({
          "categoryNamePath":"Shoes > Men > Fashion Sneakers",
          "categoryId":20082,
          "mpid":"8e1d8cd338ada38624d2f9322b259402",
          "categoryName":"Fashion Sneakers",
          "upcs":[
            "00884499652748",
            "00091206081795",
            "00091206081818",
            "00884499652755"
          ],
          "brandName":"Nike",
          "minSalePrice":45.02,
          "brandId":5572,
          "categoryIdPath":"10179 > 17421 > 20082",
          "mpns":[
            "ROSHERUN",
            "511881-405"
          ],
          "countryCode":"US",
          "currency":"USD",
          "title":"Nike Men's Rosherun Running Shoe.",
          "lastRecordedAt":1462486236868,
          "imageUrl":"http://ecx.images-amazon.com/images/I/41N3coiimrL._AA200_.jpg",
          "maxSalePrice":162.0,
          "offersCount":212,
          "storesCount":1
        })
        done();
      });

    });

  });

});
