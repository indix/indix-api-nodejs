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

export function getBrands(query, callback){

  query = query || {};
  _.assign(query, { appID: appID, appKey: appKey });

  var endpoint = '/v2/brands';
  var params = util.convertJSONToQueryParams(query);
  var url = HOST + endpoint + '?' + params;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var r = JSON.parse(body);
      if(r.message == 'ok'){
        callback(r.result.brands);
      }
    }
  })

}

export function getStores(query, callback){

  query = query || {};
  _.assign(query, { appID: appID, appKey: appKey });

  var endpoint = '/v2/stores';
  var params = util.convertJSONToQueryParams(query);
  var url = HOST + endpoint + '?' + params;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var r = JSON.parse(body);
      if(r.message == 'ok'){
        callback(r.result.stores);
      }
    }
  })

}

export function getCategories(callback){

  var query = { appID: appID, appKey: appKey };

  var endpoint = '/v2/categories';
  var params = util.convertJSONToQueryParams(query);
  var url = HOST + endpoint + '?' + params;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var r = JSON.parse(body);
      if(r.message == 'ok'){
        callback(r.result.categories);
      }
    }
  })

}

function getProductSearch(type, query, callback){

  query = query || {};
  _.assign(query, { appID: appID, appKey: appKey });

  var endpoint;

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

  var params = util.convertJSONToQueryParams(query);
  var url = HOST + endpoint + '?' + params;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var r = JSON.parse(body);
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
