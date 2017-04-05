import * as fs from 'fs';
import * as request from 'request';
import * as Promise from 'bluebird';
import * as zlib from 'zlib';
import * as byline from 'byline';
import * as util from './util';
import * as debug from 'debug';

const config = require(`../config/${process.env.NODE_ENV || 'default'}`);

let appKey: string;

let HOST = config.host;
let VERSION = config.version;

const log = debug('indix-api');

export function init(options: util.IQueryObject) {
  options = options || {};
  appKey = options.appKey;

  HOST = options.host || HOST;
  VERSION = options.version || VERSION;

  log(`App Key: ${appKey}`);
  log(`Host: ${HOST}`);
  log(`Version: ${VERSION}`);
}

function getEntities(type: string, query?: util.IQueryObject) {

  query = query || {};
  query = (<any>Object).assign(query, { appKey });

  const endpoint = `/${VERSION}/${type.toLowerCase()}`;
  const params = util.convertToQueryParams(query);
  const url = `${HOST}${endpoint}?${params}`;

  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const result = JSON.parse(body);
        if (result.message === 'ok') {
          resolve(result.result[type.toLowerCase()]);
        }
      } else {
        reject(body);
      }
    });
  });
}

export function getBrands(query: util.IQueryObject) {
  return getEntities('Brands', query);
}

export function getStores(query: util.IQueryObject) {
  return getEntities('Stores', query);
}

export function getCategories() {
  return getEntities('Categories');
}

export function getSearchSuggestions(query: util.IQueryObject) {

  query = query || {};
  query = (<any>Object).assign(query, { appKey });

  const endpoint = `/${VERSION}/products/suggestions`;
  const params = util.convertToQueryParams(query);
  const url = `${HOST}${endpoint}?${params}`;

  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const result = JSON.parse(body);
        if (result.message === 'ok') {
          const finalResponse = result.result.suggestions.map((suggestItem: util.ISuggestion) => suggestItem.suggestion);
          resolve(finalResponse);
        }
      }
      reject(body);
    });
  });
}

function getProducts(type: string, query: util.IQueryObject) {

  query = query || {};
  query = (<any>Object).assign(query, { appKey });

  let endpoint;

  switch (type) {

    // Product Search Endpoints
    case 'Product Search Summary':
      endpoint = '/' + VERSION + '/summary/products';
      break;
    case 'Product Search Offers Standard':
      endpoint = '/' + VERSION + '/offersStandard/products';
      break;
    case 'Product Search Offers Premium':
      endpoint = '/' + VERSION + '/offersPremium/products';
      break;
    case 'Product Search Catalog Standard':
      endpoint = '/' + VERSION + '/catalogStandard/products';
      break;
    case 'Product Search Catalog Premium':
      endpoint = '/' + VERSION + '/catalogPremium/products';
      break;
    case 'Product Search Universal':
      endpoint = '/' + VERSION + '/universal/products';
      break;

    // Product Lookup Endpoints
    case 'Product Lookup Summary':
      endpoint = '/' + VERSION + '/summary/products/' + query.mpid;
      break;
    case 'Product Lookup Offers Standard':
      endpoint = '/' + VERSION + '/offersStandard/products/' + query.mpid;
      break;
    case 'Product Lookup Offers Premium':
      endpoint = '/' + VERSION + '/offersPremium/products/' + query.mpid;
      break;
    case 'Product Lookup Catalog Standard':
      endpoint = '/' + VERSION + '/catalogStandard/products/' + query.mpid;
      break;
    case 'Product Lookup Catalog Premium':
      endpoint = '/' + VERSION + '/catalogPremium/products/' + query.mpid;
      break;
    case 'Product Lookup Universal':
      endpoint = '/' + VERSION + '/universal/products/' + query.mpid;
      break;
  }

  const params = util.convertToQueryParams(query);
  const url = HOST + endpoint + '?' + params;

  return new Promise((fulfill, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const r = JSON.parse(body);
        if (r.message === 'ok') {
          const returnValue = type.indexOf('Product Search') !== -1 ? r.result.products : r.result.product;
          fulfill(returnValue);
        }
      } else {
        reject(body);
      }

    });

  });

}

export function getProductSummary(query: util.IQueryObject) {
  return getProducts('Product Search Summary', query);
}

export function getProductOffersStandard(query: util.IQueryObject) {
  return getProducts('Product Search Offers Standard', query);
}

export function getProductOffersPremium(query: util.IQueryObject) {
  return getProducts('Product Search Offers Premium', query);
}

export function getProductCatalogStandard(query: util.IQueryObject) {
  return getProducts('Product Search Catalog Standard', query);
}

export function getProductCatalogPremium(query: util.IQueryObject) {
  return getProducts('Product Search Catalog Premium', query);
}

export function getProductUniversal(query: util.IQueryObject) {
  return getProducts('Product Search Universal', query);
}

export function getProductLookupSummary(query: util.IQueryObject) {
  return getProducts('Product Lookup Summary', query);
}

export function getProductLookupOffersStandard(query: util.IQueryObject) {
  return getProducts('Product Lookup Offers Standard', query);
}

export function getProductLookupOffersPremium(query: util.IQueryObject) {
  return getProducts('Product Lookup Offers Premium', query);
}

export function getProductLookupCatalogStandard(query: util.IQueryObject) {
  return getProducts('Product Lookup Catalog Standard', query);
}

export function getProductLookupCatalogPremium(query: util.IQueryObject) {
  return getProducts('Product Lookup Catalog Premium', query);
}

export function getProductLookupUniversal(query: util.IQueryObject) {
  return getProducts('Product Lookup Universal', query);
}

function getBulkProducts(type: string, query: util.IQueryObject) {

  query = query || {};
  query = (<any>Object).assign(query, { appKey });

  let endpoint;

  switch (type) {

    // Bulk Product Search Endpoints
    case 'Bulk Product Search Summary':
      endpoint = '/' + VERSION + '/summary/bulk/products';
      break;
    case 'Bulk Product Search Offers Standard':
      endpoint = '/' + VERSION + '/offersStandard/bulk/products';
      break;
    case 'Bulk Product Search Offers Premium':
      endpoint = '/' + VERSION + '/offersPremium/bulk/products';
      break;
    case 'Bulk Product Search Catalog Standard':
      endpoint = '/' + VERSION + '/catalogStandard/bulk/products';
      break;
    case 'Bulk Product Search Catalog Premium':
      endpoint = '/' + VERSION + '/catalogPremium/bulk/products';
      break;
    case 'Bulk Product Search Universal':
      endpoint = '/' + VERSION + '/universal/bulk/products';
      break;

    // Bulk Product Lookup Endpoints
    case 'Bulk Product Lookup Summary':
      endpoint = '/' + VERSION + '/summary/bulk/lookup';
      break;
    case 'Bulk Product Lookup Offers Standard':
      endpoint = '/' + VERSION + '/offersStandard/bulk/lookup';
      break;
    case 'Bulk Product Lookup Offers Premium':
      endpoint = '/' + VERSION + '/offersPremium/bulk/lookup';
      break;
    case 'Bulk Product Lookup Catalog Standard':
      endpoint = '/' + VERSION + '/catalogStandard/bulk/lookup';
      break;
    case 'Bulk Product Lookup Catalog Premium':
      endpoint = '/' + VERSION + '/catalogPremium/bulk/lookup';
      break;
    case 'Bulk Product Lookup Universal':
      endpoint = '/' + VERSION + '/universal/bulk/lookup';
      break;

    // Advanced Search Lookup Endpoints
    case 'ASE Lookup Universal':
      endpoint = '/' + VERSION + '/universal/bulk/ase';
      break;

  }

  const inputFile = query.inputFile;
  const params = util.convertToQueryParams(query);
  const url = HOST + endpoint;
  let options: request.OptionsWithUrl;

  if (type.indexOf('Product Search') !== -1) {
    options = {
      url,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      form: params,
    };
  } else {
    options = {
      url,
      method: 'POST',
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
      },
      formData: {
        file: {
          value: inputFile,
          options: {
            contentType: null,
          },
        },
        app_key: appKey,
        countryCode: query.countryCode,
      },
    };

    if (query.use_apigee === 'true') {
      options.formData.use_apigee = 'true';
    }
  }

  return new Promise((resolve, reject) => {

    log(options);
    request.post(options, (error, response, body) => {
      log(body);
      if (!error && response.statusCode === 200) {
        resolve(JSON.parse(body));
      } else {
        reject(JSON.parse(body));
      }
    });

  });

}

export function getBulkProductSummary(query: util.IQueryObject) {
  return getBulkProducts('Bulk Product Search Summary', query);
}

export function getBulkProductOffersStandard(query: util.IQueryObject) {
  return getBulkProducts('Bulk Product Search Offers Standard', query);
}

export function getBulkProductOffersPremium(query: util.IQueryObject) {
  return getBulkProducts('Bulk Product Search Offers Premium', query);
}

export function getBulkProductCatalogStandard(query: util.IQueryObject) {
  return getBulkProducts('Bulk Product Search Catalog Standard', query);
}

export function getBulkProductCatalogPremium(query: util.IQueryObject) {
  return getBulkProducts('Bulk Product Search Catalog Premium', query);
}

export function getBulkProductUniversal(query: util.IQueryObject) {
  return getBulkProducts('Bulk Product Search Universal', query);
}

export function getBulkProductLookupSummary(query: util.IQueryObject) {
  return getBulkProducts('Bulk Product Lookup Summary', query);
}

export function getBulkProductLookupOffersStandard(query: util.IQueryObject) {
  return getBulkProducts('Bulk Product Lookup Offers Standard', query);
}

export function getBulkProductLookupOffersPremium(query: util.IQueryObject) {
  return getBulkProducts('Bulk Product Lookup Offers Premium', query);
}

export function getBulkProductLookupCatalogStandard(query: util.IQueryObject) {
  return getBulkProducts('Bulk Product Lookup Catalog Standard', query);
}

export function getBulkProductLookupCatalogPremium(query: util.IQueryObject) {
  return getBulkProducts('Bulk Product Lookup Catalog Premium', query);
}

export function getBulkProductLookupUniversal(query: util.IQueryObject) {
  return getBulkProducts('Bulk Product Lookup Universal', query);
}

export function getASELookupUniversal(query: util.IQueryObject) {
  return getBulkProducts('ASE Lookup Universal', query);
}

function _getJobStatus(jobId: string, type?: string) {

  let endpoint;
  if (type === 'ASE') {
    endpoint = '/' + VERSION + '/bulk/ase/' + jobId + '?app_key=' + appKey;
  } else {
    endpoint = '/' + VERSION + '/bulk/jobs/' + jobId + '?app_key=' + appKey;
  }
  const url = HOST + endpoint;
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const r = JSON.parse(body);
        resolve(r);
      }
    });
  });

}

export function getJobStatus(jobId: string) {
  return _getJobStatus(jobId);
}

export function getASEJobStatus(jobId: string) {
  return _getJobStatus(jobId, 'ASE');
}

function _downloadProducts(jobID: string, type?: string) {

  const fileNameGzip = './files/' + jobID + '.jsonl.gz';
  const fileNameUnzip = './files/' + jobID + '.jsonl';

  let url;
  if (type === 'ASE') {
    url = 'https://api.indix.com/' + VERSION + '/bulk/ase/' + jobID + '/download?app_key=' + appKey;
  } else {
    url = 'https://api.indix.com/' + VERSION + '/bulk/jobs/' + jobID + '/download?app_key=' + appKey;
  }

  const writeStream = fs.createWriteStream(fileNameGzip);
  request(url).pipe(writeStream);

  return new Promise((resolve, reject) => {

    writeStream.on('finish', () => {
      fs.createReadStream(fileNameGzip)
        .pipe(zlib.createUnzip())
        .pipe(
        fs.createWriteStream(fileNameUnzip)
          .on('finish', () => {
            const products: Array<Object> = [];
            const stream = byline(fs.createReadStream(fileNameUnzip, { encoding: 'utf8' }));
            stream
              .on('data', (line: string) => {
                products.push(JSON.parse(line));
              })
              .on('end', () => {
                resolve(products);
              });
          }),
      );
    });
  });
}

export function downloadProducts(jobID: string) {
  return _downloadProducts(jobID);
}

export function downloadASEProducts(jobID: string) {
  return _downloadProducts(jobID, 'ASE');
}
