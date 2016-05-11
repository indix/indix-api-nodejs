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
