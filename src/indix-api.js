import _ from 'lodash';
import request from 'request';
import * as util from './util.js';
import fs from 'fs';
import zlib from 'zlib';
import byline from 'byline';
import Promise from 'promise';

let appID,
    appKey;

const HOST = 'https://api.indix.com';

export function init(options){
  options = options || {};
  if(typeof options.appID == 'undefined' || typeof options.appKey == 'undefined'){
    throw 'A valid App ID and App Key must be provided to initialize the Indix API Client.';
  }
  appID = options.appID;
  appKey = options.appKey;
}

function getEntities(type, query){

  query = query || {};
  _.assign(query, { appID: appID, appKey: appKey });

  let endpoint = '/v2/' + type.toLowerCase();

  let params = util.convertToQueryParams(query);
  let url = HOST + endpoint + '?' + params;

  return new Promise(function (fulfill, reject){
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let r = JSON.parse(body);
        if(r.message == 'ok'){
          fulfill(r.result[type.toLowerCase()]);
        } else {
          reject(r);
        }
      }
    });
  });

}

export function getBrands(query){
  return getEntities('Brands', query);
}

export function getStores(query){
  return getEntities('Stores', query);
}

export function getCategories(){
  return getEntities('Categories');
}

export function getSearchSuggestions(query){

  query = query || {};
  _.assign(query, { appID: appID, appKey: appKey });

  let endpoint = '/v2/products/suggestions';

  let params = util.convertToQueryParams(query);
  let url = HOST + endpoint + '?' + params;

  return new Promise(function (fulfill, reject){
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let r = JSON.parse(body);
        if(r.message == 'ok'){
          let s = _.map(r.result.suggestions, function(s){
            return s.suggestion;
          });
          fulfill(s);
        } else {
          reject(r);
        }
      }
    });
  });
}

function getProducts(type, query){

  query = query || {};
  _.assign(query, { appID: appID, appKey: appKey });

  let endpoint;

  switch(type){

    // Product Search Endpoints
    case 'Product Search Summary':
      endpoint = '/v2/summary/products';
      break;
    case 'Product Search Offers Standard':
      endpoint = '/v2/offersStandard/products';
      break;
    case 'Product Search Offers Premium':
      endpoint = '/v2/offersPremium/products';
      break;
    case 'Product Search Catalog Standard':
      endpoint = '/v2/catalogStandard/products';
      break;
    case 'Product Search Catalog Premium':
      endpoint = '/v2/catalogPremium/products';
      break;
    case 'Product Search Universal':
      endpoint = '/v2/universal/products';
      break;

    // Product Lookup Endpoints
    case 'Product Lookup Summary':
      endpoint = '/v2/summary/' + query.mpid;
      break;
    case 'Product Lookup Offers Standard':
      endpoint = '/v2/offersStandard/' + query.mpid;
      break;
    case 'Product Lookup Offers Premium':
      endpoint = '/v2/offersPremium/' + query.mpid;
      break;
    case 'Product Lookup Catalog Standard':
      endpoint = '/v2/catalogStandard/' + query.mpid;
      break;
    case 'Product Lookup Catalog Premium':
      endpoint = '/v2/catalogPremium/' + query.mpid;
      break;
    case 'Product Lookup Universal':
      endpoint = '/v2/universal/' + query.mpid;
      break;
  }

  let params = util.convertToQueryParams(query);
  let url = HOST + endpoint + '?' + params;

  return new Promise(function (fulfill, reject){

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let r = JSON.parse(body);
        if(r.message == 'ok'){
          let returnValue = type.indexOf('Product Search') != -1 ? r.result.products : r.result.product;
          fulfill(returnValue);
        }else{
          reject(r);
        }
      }

    });

  });

}

export function getProductSummary(query){
  return getProducts('Product Search Summary', query);
}

export function getProductOffersStandard(query){
  return getProducts('Product Search Offers Standard', query);
}

export function getProductOffersPremium(query){
  return getProducts('Product Search Offers Premium', query);
}

export function getProductCatalogStandard(query){
  return getProducts('Product Search Catalog Standard', query);
}

export function getProductCatalogPremium(query){
  return getProducts('Product Search Catalog Premium', query);
}

export function getProductUniversal(query){
  return getProducts('Product Search Universal', query);
}

export function getProductLookupSummary(query){
  return getProducts('Product Lookup Summary', query);
}

export function getProductLookupOffersStandard(query){
  return getProducts('Product Lookup Offers Standard', query);
}

export function getProductLookupOffersPremium(query){
  return getProducts('Product Lookup Offers Premium', query);
}

export function getProductLookupCatalogStandard(query){
  return getProducts('Product Lookup Catalog Standard', query);
}

export function getProductLookupCatalogPremium(query){
  return getProducts('Product Lookup Catalog Premium', query);
}

export function getProductLookupUniversal(query){
  return getProducts('Product Lookup Universal', query);
}

function getBulkProducts(type, query){

  query = query || {};
  _.assign(query, { appID: appID, appKey: appKey });

  let endpoint;

  switch(type){

    // Bulk Product Search Endpoints
    case 'Bulk Product Search Summary':
      endpoint = '/v2/summary/bulk/products';
      break;
    case 'Bulk Product Search Offers Standard':
      endpoint = '/v2/offersStandard/bulk/products';
      break;
    case 'Bulk Product Search Offers Premium':
      endpoint = '/v2/offersPremium/bulk/products';
      break;
    case 'Bulk Product Search Catalog Standard':
      endpoint = '/v2/catalogStandard/bulk/products';
      break;
    case 'Bulk Product Search Catalog Premium':
      endpoint = '/v2/catalogPremium/bulk/products';
      break;
    case 'Bulk Product Search Universal':
      endpoint = '/v2/universal/bulk/products';
      break;

    // Bulk Product Lookup Endpoints
    case 'Bulk Product Lookup Summary':
      endpoint = '/v2/summary/bulk/lookup';
      break;
    case 'Bulk Product Lookup Offers Standard':
      endpoint = '/v2/offersStandard/bulk/lookup';
      break;
    case 'Bulk Product Lookup Offers Premium':
      endpoint = '/v2/offersPremium/bulk/lookup';
      break;
    case 'Bulk Product Lookup Catalog Standard':
      endpoint = '/v2/catalogStandard/bulk/lookup';
      break;
    case 'Bulk Product Lookup Catalog Premium':
      endpoint = '/v2/catalogPremium/bulk/lookup';
      break;
    case 'Bulk Product Lookup Universal':
      endpoint = '/v2/universal/bulk/lookup';
      break;
  }

  let options = {};

  let inputFile = query.inputFile;
  let params = util.convertToQueryParams(query);
  let url = HOST + endpoint;

  if(type.indexOf('Product Search') != -1){

    options = {
      method: 'POST',
      url: url,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: params
    }

  } else {

    options = {
      method: 'POST',
      url: url,
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
      },
      formData: {
        file: {
          value: inputFile,
          options: { contentType: null }
        },
        app_id: appID,
        app_key: appKey,
        countryCode: query.countryCode
      }
    }

  }

  return new Promise(function (fulfill, reject){

    request.post(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        fulfill(JSON.parse(body));
      }else{
        reject(JSON.parse(body));
      }
    });

  });

}

export function getBulkProductSummary(query){
  return getBulkProducts('Bulk Product Search Summary', query);
}

export function getBulkProductOffersStandard(query){
  return getBulkProducts('Bulk Product Search Offers Standard', query);
}

export function getBulkProductOffersPremium(query){
  return getBulkProducts('Bulk Product Search Offers Premium', query);
}

export function getBulkProductCatalogStandard(query){
  return getBulkProducts('Bulk Product Search Catalog Standard', query);
}

export function getBulkProductCatalogPremium(query){
  return getBulkProducts('Bulk Product Search Catalog Premium', query);
}

export function getBulkProductUniversal(query){
  return getBulkProducts('Bulk Product Search Universal', query);
}

export function getBulkProductLookupSummary(query){
  return getBulkProducts('Bulk Product Lookup Summary', query);
}

export function getBulkProductLookupOffersStandard(query){
  return getBulkProducts('Bulk Product Lookup Offers Standard', query);
}

export function getBulkProductLookupOffersPremium(query){
  return getBulkProducts('Bulk Product Lookup Offers Premium', query);
}

export function getBulkProductLookupCatalogStandard(query){
  return getBulkProducts('Bulk Product Lookup Catalog Standard', query);
}

export function getBulkProductLookupCatalogPremium(query){
  return getBulkProducts('Bulk Product Lookup Catalog Premium', query);
}

export function getBulkProductLookupUniversal(query){
  return getBulkProducts('Bulk Product Lookup Universal', query);
}

export function getJobStatus(jobId){

  let endpoint = '/v2/bulk/jobs/' + jobId;
  let url = HOST + endpoint;
  return new Promise(function (fulfill, reject){
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let r = JSON.parse(body);
        fulfill(r);
      }
    });
  });

}

export function downloadProducts(jobID){

  let fileNameGzip = './files/' + jobID + '.jsonl.gz';
  let fileNameUnzip = './files/' + jobID + '.jsonl';

  let url = 'https://api.indix.com/v2/bulk/jobs/' + jobID + '/download?app_id=' + appID + '&app_key=' + appKey;

  let writeStream = fs.createWriteStream(fileNameGzip);
  request(url).pipe(writeStream);

  return new Promise(function (fulfill, reject){

    writeStream.on('finish', function(){

      fs.createReadStream(fileNameGzip)
        // .pipe(zlib.createUnzip())
        .pipe(
          fs.createWriteStream(fileNameUnzip)
            .on('finish', function(){

              let products = [];

              let stream = byline(fs.createReadStream(fileNameUnzip, { encoding: 'utf8' }));
              stream
                .on('data', function(line) {
                  products.push(JSON.parse(line));
                })
                .on('end', function() {
                  fulfill(products);
                });

            })
        );

    });

  });

}
