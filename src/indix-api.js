import _ from 'lodash';
import request from 'request';
import * as util from './util.js';

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

  let params = util.convertJSONToQueryParams(query);
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

function getProductSearch(type, query, callback){

  query = query || {};
  _.assign(query, { appID: appID, appKey: appKey });

  let endpoint;

  switch(type){
    case 'Summary':
      endpoint = '/v2/summary/products';
      break;
    case 'Offers Standard':
      endpoint = '/v2/offersStandard/products';
      break;
    case 'Offers Premium':
      endpoint = '/v2/offersPremium/products';
      break;
    case 'Catalog Standard':
      endpoint = '/v2/catalogStandard/products';
      break;
    case 'Catalog Premium':
      endpoint = '/v2/catalogPremium/products';
      break;
    case 'Universal':
      endpoint = '/v2/universal/products';
      break;
  }

  let params = util.convertJSONToQueryParams(query);
  let url = HOST + endpoint + '?' + params;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let r = JSON.parse(body);
      if(r.message == 'ok'){
        callback(r.result.products);
      }
    }
  });

}

export function getProductSummary(query, callback){
  getProductSearch('Summary', query, callback);
}

export function getProductOffersStandard(query, callback){
  getProductSearch('Offers Standard', query, callback);
}

export function getProductOffersPremium(query, callback){
  getProductSearch('Offers Premium', query, callback);
}

export function getProductCatalogStandard(query, callback){
  getProductSearch('Catalog Standard', query, callback);
}

export function getProductCatalogPremium(query, callback){
  getProductSearch('Catalog Premium', query, callback);
}

export function getProductUniversal(query, callback){
  getProductSearch('Universal', query, callback);
}

function getProductLookup(type, query, callback){

  query = query || {};
  _.assign(query, { appID: appID, appKey: appKey });

  let endpoint;

  switch(type){
    case 'Summary':
      endpoint = '/v2/summary/' + query.mpid;
      break;
    case 'Offers Standard':
      endpoint = '/v2/offersStandard/' + query.mpid;
      break;
    case 'Offers Premium':
      endpoint = '/v2/offersPremium/' + query.mpid;
      break;
    case 'Catalog Standard':
      endpoint = '/v2/catalogStandard/' + query.mpid;
      break;
    case 'Catalog Premium':
      endpoint = '/v2/catalogPremium/' + query.mpid;
      break;
    case 'Universal':
      endpoint = '/v2/universal/' + query.mpid;
      break;
  }

  let params = util.convertJSONToQueryParams(query);
  let url = HOST + endpoint + '?' + params;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let r = JSON.parse(body);
      if(r.message == 'ok'){
        callback(r.result.product);
      }
    }
  });

}

export function getProductLookupSummary(query, callback){
  getProductLookup('Summary', query, callback);
}

export function getProductLookupOffersStandard(query, callback){
  getProductLookup('Offers Standard', query, callback);
}

export function getProductLookupOffersPremium(query, callback){
  getProductLookup('Offers Premium', query, callback);
}

export function getProductLookupCatalogStandard(query, callback){
  getProductLookup('Catalog Standard', query, callback);
}

export function getProductLookupCatalogPremium(query, callback){
  getProductLookup('Catalog Premium', query, callback);
}

export function getProductLookupUniversal(query, callback){
  getProductLookup('Universal', query, callback);
}
