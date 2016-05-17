import _ from 'lodash';
import request from 'request';
import * as util from './util.js';
import fs from 'fs';
import zlib from 'zlib';
import byline from 'byline';

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

function getEntities(type, query, callback){

  query = query || {};
  _.assign(query, { appID: appID, appKey: appKey });

  let endpoint = '/v2/' + type.toLowerCase();

  let params = util.convertToQueryParams(query);
  let url = HOST + endpoint + '?' + params;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let r = JSON.parse(body);
      if(r.message == 'ok'){
        callback(r.result[type.toLowerCase()]);
      }
    }
  });

}

export function getBrands(query, callback){
  getEntities('Brands', query, callback);
}

export function getStores(query, callback){
  getEntities('Stores', query, callback);
}

export function getCategories(callback){
  getEntities('Categories', null, callback);
}

function getProducts(type, query, callback){

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
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let r = JSON.parse(body);
      if(r.message == 'ok'){
        let returnValue = type.indexOf('Product Search') != -1 ? r.result.products : r.result.product;
        callback(returnValue);
      }
    }
  });

}

export function getProductSummary(query, callback){
  getProducts('Product Search Summary', query, callback);
}

export function getProductOffersStandard(query, callback){
  getProducts('Product Search Offers Standard', query, callback);
}

export function getProductOffersPremium(query, callback){
  getProducts('Product Search Offers Premium', query, callback);
}

export function getProductCatalogStandard(query, callback){
  getProducts('Product Search Catalog Standard', query, callback);
}

export function getProductCatalogPremium(query, callback){
  getProducts('Product Search Catalog Premium', query, callback);
}

export function getProductUniversal(query, callback){
  getProducts('Product Search Universal', query, callback);
}

export function getProductLookupSummary(query, callback){
  getProducts('Product Lookup Summary', query, callback);
}

export function getProductLookupOffersStandard(query, callback){
  getProducts('Product Lookup Offers Standard', query, callback);
}

export function getProductLookupOffersPremium(query, callback){
  getProducts('Product Lookup Offers Premium', query, callback);
}

export function getProductLookupCatalogStandard(query, callback){
  getProducts('Product Lookup Catalog Standard', query, callback);
}

export function getProductLookupCatalogPremium(query, callback){
  getProducts('Product Lookup Catalog Premium', query, callback);
}

export function getProductLookupUniversal(query, callback){
  getProducts('Product Lookup Universal', query, callback);
}

function getBulkProducts(type, query, callback){

  query = query || {};
  _.assign(query, { appID: appID, appKey: appKey });

  let endpoint;

  switch(type){

    // Bulk Search Endpoints
    case 'Bulk Search Summary':
      endpoint = '/v2/summary/bulk/products';
      break;
    case 'Bulk Search Offers Standard':
      endpoint = '/v2/offersStandard/bulk/products';
      break;
    case 'Bulk Search Offers Premium':
      endpoint = '/v2/offersPremium/bulk/products';
      break;
    case 'Bulk Search Catalog Standard':
      endpoint = '/v2/catalogStandard/bulk/products';
      break;
    case 'Bulk Search Catalog Premium':
      endpoint = '/v2/catalogPremium/bulk/products';
      break;
    case 'Bulk Search Universal':
      endpoint = '/v2/universal/bulk/products';
      break;

    // Bulk Lookup Endpoints
    case 'Bulk Lookup Summary':
      endpoint = '/v2/summary/bulk/' + query.mpid;
      break;
    case 'Bulk Lookup Offers Standard':
      endpoint = '/v2/offersStandard/bulk/' + query.mpid;
      break;
    case 'Bulk Lookup Offers Premium':
      endpoint = '/v2/offersPremium/bulk/' + query.mpid;
      break;
    case 'Bulk Lookup Catalog Standard':
      endpoint = '/v2/catalogStandard/bulk/' + query.mpid;
      break;
    case 'Bulk Lookup Catalog Premium':
      endpoint = '/v2/catalogPremium/bulk/' + query.mpid;
      break;
    case 'Bulk Lookup Universal':
      endpoint = '/v2/universal/bulk/' + query.mpid;
      break;
  }

  let params = util.convertToQueryParams(query);
  let url = HOST + endpoint;
  let options = {
    method: 'POST',
    url: url,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    form: params
  }
  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(JSON.parse(body));
    }
  });

}

export function getBulkProductSummary(query, callback){
  getBulkProducts('Bulk Search Summary', query, callback);
}

export function getBulkProductOffersStandard(query, callback){
  getBulkProducts('Bulk Search Offers Standard', query, callback);
}

export function getBulkProductOffersPremium(query, callback){
  getBulkProducts('Bulk Search Offers Premium', query, callback);
}

export function getBulkProductCatalogStandard(query, callback){
  getBulkProducts('Bulk Search Catalog Standard', query, callback);
}

export function getBulkProductCatalogPremium(query, callback){
  getBulkProducts('Bulk Search Catalog Premium', query, callback);
}

export function getBulkProductUniversal(query, callback){
  getBulkProducts('Bulk Search Universal', query, callback);
}

export function getBulkProductLookupSummary(query, callback){
  getBulkProducts('Bulk Lookup Summary', query, callback);
}

export function getBulkProductLookupOffersStandard(query, callback){
  getBulkProducts('Bulk Lookup Offers Standard', query, callback);
}

export function getBulkProductLookupOffersPremium(query, callback){
  getBulkProducts('Bulk Lookup Offers Premium', query, callback);
}

export function getBulkProductLookupCatalogStandard(query, callback){
  getBulkProducts('Bulk Lookup Catalog Standard', query, callback);
}

export function getBulkProductLookupCatalogPremium(query, callback){
  getBulkProducts('Bulk Lookup Catalog Premium', query, callback);
}

export function getBulkProductLookupUniversal(query, callback){
  getBulkProducts('Bulk Lookup Universal', query, callback);
}

export function getJobStatus(jobId, callback){

  let endpoint = '/v2/bulk/jobs/' + jobId;
  let url = HOST + endpoint;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let r = JSON.parse(body);
      callback(r);
    }
  });

}

export function downloadProducts(jobID, callback){

  let fileNameGzip = './files/' + jobID + '.jsonl.gz';
  let fileNameUnzip = './files/' + jobID + '.jsonl';

  let url = 'https://api.indix.com/v2/bulk/jobs/' + jobID + '/download?app_id=' + appID + '&app_key=' + appKey;

  let writeStream = fs.createWriteStream(fileNameGzip);
  request(url).pipe(writeStream);

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
                callback(products);
              });

          })
      );

  });

}

function getBulkProductLookup(type, query, callback){

  query = query || {};
  _.assign(query, { appID: appID, appKey: appKey });

  let endpoint;

  switch(type){

    // Bulk Search Endpoints
    case 'Bulk Search Summary':
      endpoint = '/v2/summary/bulk/products';
      break;
    case 'Bulk Search Offers Standard':
      endpoint = '/v2/offersStandard/bulk/products';
      break;
    case 'Bulk Search Offers Premium':
      endpoint = '/v2/offersPremium/bulk/products';
      break;
    case 'Bulk Search Catalog Standard':
      endpoint = '/v2/catalogStandard/bulk/products';
      break;
    case 'Bulk Search Catalog Premium':
      endpoint = '/v2/catalogPremium/bulk/products';
      break;
    case 'Bulk Search Universal':
      endpoint = '/v2/universal/bulk/products';
      break;

    // Bulk Lookup Endpoints
    case 'Bulk Lookup Summary':
      endpoint = '/v2/summary/bulk/lookup';
      break;
    case 'Bulk Lookup Offers Standard':
      endpoint = '/v2/offersStandard/bulk/lookup';
      break;
    case 'Bulk Lookup Offers Premium':
      endpoint = '/v2/offersPremium/bulk/lookup';
      break;
    case 'Bulk Lookup Catalog Standard':
      endpoint = '/v2/catalogStandard/bulk/lookup';
      break;
    case 'Bulk Lookup Catalog Premium':
      endpoint = '/v2/catalogPremium/bulk/lookup';
      break;
    case 'Bulk Lookup Universal':
      endpoint = '/v2/universal/bulk/lookup';
      break;
  }

  let inputFile = query.inputFile;
  let params = util.convertToQueryParams(query);
  let url = HOST + endpoint;

  console.log(params);

  let options = { method: 'POST',
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
      countryCode: params.countryCode
    }
  };

  console.log(options);

  request(options, function(error, response, body){
    if (!error && response.statusCode == 200) {
      res.send(body);
    }else if (!error && response.statusCode == 429) {
      res.status(response.statusCode).send(body);
    }
  });

}

export function getBulkLookupSummary(query, callback){
  console.log(query);
  getBulkProductLookup('Bulk Lookup Summary', query, callback);
}
