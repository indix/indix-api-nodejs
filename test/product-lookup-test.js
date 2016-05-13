import chai from 'chai';
let should = chai.should();
chai.use(require('chai-fuzzy'));
import * as ixClient from '../src/indix-api';
import nock from 'nock';
import fs from 'fs';

describe('Product Lookup', function() {

  before(function(){
    ixClient.init({
      appID: 'APP_ID',
      appKey: 'APP_KEY'
    });
  });

  it('summary should return the approppriate product with summary information', function(done){

    var stubData = JSON.parse(fs.readFileSync('test/stubs/product-lookup-summary.json', 'utf8'));
    nock('https://api.indix.com').get('/v2/summary/8e1d8cd338ada38624d2f9322b259402?countryCode=US&app_id=APP_ID&app_key=APP_KEY').reply(200, stubData);

    var query = {
      mpid: '8e1d8cd338ada38624d2f9322b259402',
      countryCode: 'US'
    }

    ixClient.getProductLookupSummary(query, function(result){
      result.should.be.like({
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
        "maxSalePrice":162,
        "offersCount":212,
        "storesCount":1
      });
      done();
    });

  });

  it('offers standard should return the approppriate product with offers standard information', function(done){

    var stubData = JSON.parse(fs.readFileSync('test/stubs/product-lookup-offers-standard.json', 'utf8'));
    nock('https://api.indix.com').get('/v2/offersStandard/8e1d8cd338ada38624d2f9322b259402?storeId=24&countryCode=US&app_id=APP_ID&app_key=APP_KEY').reply(200, stubData);

    var query = {
      mpid: '8e1d8cd338ada38624d2f9322b259402',
      storeId: [24],
      countryCode: 'US'
    }

    ixClient.getProductLookupOffersStandard(query, function(result){
      result.should.be.like({
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
        "maxSalePrice":162,
        "offersCount":212,
        "storesCount":1
      });
      done();
    });

  });

  it('offers premium should return the approppriate product with offers premium information', function(done){

    var stubData = JSON.parse(fs.readFileSync('test/stubs/product-lookup-offers-premium.json', 'utf8'));
    nock('https://api.indix.com').get('/v2/offersPremium/8e1d8cd338ada38624d2f9322b259402?countryCode=US&app_id=APP_ID&app_key=APP_KEY').reply(200, stubData);

    var query = {
      mpid: '8e1d8cd338ada38624d2f9322b259402',
      countryCode: 'US'
    }

    ixClient.getProductLookupOffersPremium(query, function(result){
      result.stores['270'].offers[0].should.be.like({
        "sku":"B005ODHBE6",
        "refurbishedOffers":0,
        "priceHistoryAvailable":true,
        "salesRank":0,
        "productUrl":"http://www.amazon.com/dp/B005ODHBE6?psc=1",
        "userRatings":0,
        "maxRating":0,
        "addOnItem":false,
        "availability":"IN_STOCK",
        "upcs":[

        ],
        "avgRating":0,
        "shippingText":"",
        "fulfilledBy":"",
        "pid":"8d8d507ba00e4750d6a9634f609bb890",
        "mpns":[
          "511881-405"
        ],
        "newOffers":0,
        "listPrice":53.98,
        "buyBoxWinner":false,
        "additionalImageUrls":[

        ],
        "salePrice":53.98,
        "cartPrice":false,
        "lastRecordedAt":1460006722058,
        "imageUrl":"http://ecx.images-amazon.com/images/I/81y6jdi%2BCZL._UX535_.jpg",
        "usedOffers":0,
        "seller":""
      });
      done();
    });

  });

  it('catalog standard should return the approppriate product with catalog standard information', function(done){

    var stubData = JSON.parse(fs.readFileSync('test/stubs/product-lookup-catalog-standard.json', 'utf8'));
    nock('https://api.indix.com').get('/v2/catalogStandard/8e1d8cd338ada38624d2f9322b259402?countryCode=US&app_id=APP_ID&app_key=APP_KEY').reply(200, stubData);

    var query = {
      mpid: '8e1d8cd338ada38624d2f9322b259402',
      countryCode: 'US'
    }

    ixClient.getProductLookupCatalogStandard(query, function(result){
      result.attributes.should.be.like({
        "size":[
          "10 d m us",
          "6 d m us",
          "8.5 d m us",
          "9 d m us",
          "7 d m us",
          "9.5 d m us",
          "13 d m us"
        ],
        "asin":[
          "b000p6gkoo"
        ],
        "color":[
          "black / black-black-light ash grey",
          "black / dark charcoal / black fluo",
          "dark loden / black / dark loden / medium turquoise",
          "mica green/venom green/summit white",
          "wolf grey / white",
          "fuchsia frc / black / hyper pnch / light as",
          "black/anthracite-sail",
          "university red / light orewood brown / dark pewter"
        ],
        "product_dimensions":[
          "11 x 4 x 7 inches"
        ],
        "shipping_weight":[
          "3 pounds (view shipping rates and policies)",
          "2 pounds (view shipping rates and policies)"
        ],
        "item_model_number":[
          "511881-405"
        ],
        "date_first_available_at_amazoncom":[
          "august 6, 2003"
        ]
      });
      done();
    });

  });

  it('catalog premium should return the approppriate product with catalog premium information', function(done){

    var stubData = JSON.parse(fs.readFileSync('test/stubs/product-lookup-catalog-premium.json', 'utf8'));
    nock('https://api.indix.com').get('/v2/catalogPremium/8e1d8cd338ada38624d2f9322b259402?countryCode=US&app_id=APP_ID&app_key=APP_KEY').reply(200, stubData);

    var query = {
      mpid: '8e1d8cd338ada38624d2f9322b259402',
      countryCode: 'US'
    }

    ixClient.getProductLookupCatalogPremium(query, function(result){
      result.stores['270'].offers[0].should.be.like({
        "breadCrumbs":"Shoes > Men's > Fashion Sneakers",
        "sku":"B005ODHBE6",
        "productUrl":"http://www.amazon.com/dp/B005ODHBE6?psc=1",
        "tags":[

        ],
        "upcs":[

        ],
        "attributes":{

        },
        "pid":"8d8d507ba00e4750d6a9634f609bb890",
        "mpns":[
          "511881-405"
        ],
        "additionalImageUrls":[

        ],
        "facetAttributes":{

        },
        "lastRecordedAt":1460006722058,
        "imageUrl":"http://ecx.images-amazon.com/images/I/81y6jdi%2BCZL._UX535_.jpg",
        "seller":"",
        "brandText":"Nike"
      });
      done();
    });

  });

  it('universal should return the approppriate product with universal information', function(done){

    var stubData = JSON.parse(fs.readFileSync('test/stubs/product-lookup-universal.json', 'utf8'));
    nock('https://api.indix.com').get('/v2/universal/8e1d8cd338ada38624d2f9322b259402?countryCode=US&app_id=APP_ID&app_key=APP_KEY').reply(200, stubData);

    var query = {
      mpid: '8e1d8cd338ada38624d2f9322b259402',
      countryCode: 'US'
    }

    ixClient.getProductLookupUniversal(query, function(result){
      result.attributes.should.be.like({
        "size":[
          "10 d m us",
          "6 d m us",
          "8.5 d m us",
          "9 d m us",
          "7 d m us",
          "9.5 d m us",
          "13 d m us"
        ],
        "asin":[
          "b000p6gkoo"
        ],
        "color":[
          "black / black-black-light ash grey",
          "black / dark charcoal / black fluo",
          "dark loden / black / dark loden / medium turquoise",
          "mica green/venom green/summit white",
          "wolf grey / white",
          "fuchsia frc / black / hyper pnch / light as",
          "black/anthracite-sail",
          "university red / light orewood brown / dark pewter"
        ],
        "product_dimensions":[
          "11 x 4 x 7 inches"
        ],
        "shipping_weight":[
          "3 pounds (view shipping rates and policies)",
          "2 pounds (view shipping rates and policies)"
        ],
        "item_model_number":[
          "511881-405"
        ],
        "date_first_available_at_amazoncom":[
          "august 6, 2003"
        ]
      });
      done();
    });

  });

});