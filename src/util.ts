import {camelCase, snakeCase} from 'lodash';

export type QueryParamValue = string | Array<string>;

export interface ISuggestion {
  [key: string]: string;
  suggestion: string;
}

/**
 * Query Object from API Client.
 * This contains all the query parameters and the client options.
 */
export interface IQueryObject {
  [key: string]: QueryParamValue;
  /**
   * Unique identifier key for your app.
   * 
   * If you don't have one, visit http://www.indix.com/product-api-free-trial/
   * Existing users can find their app key by logging into https://developer.indix.com/
   */
  appKey?: string;
  /**
   * API server hostname.
   *
   * Defaults to "https://api.indix.com"
   */
  host?: string;
  /**
   * API version.
   *
   * Defaults to "v2"
   */
  version?: string;
  /**
   * Store ID.
   *
   * Limits results to products sold at given store.
   */
  storeId?: QueryParamValue;
  alsoSoldAt?: QueryParamValue;
  brandId?: QueryParamValue;
  categoryId?: QueryParamValue;
  facetBy?: QueryParamValue;
  mpid?: string;
  inputFile?: string;
}

export function convertToQueryParams(queryObject: IQueryObject) {

  const queryObj = { ...queryObject };

  delete queryObj['mpid'];
  delete queryObj['inputFile'];

  const returnValue: Array<string> = [];
  for (const queryParam of Object.getOwnPropertyNames(queryObj)) {
    switch (queryParam) {
      case 'appKey':
        returnValue.push(`${snakeCase(queryParam)}=${queryObj[queryParam]}`);
        break;
      case 'storeId':
      case 'alsoSoldAt':
      case 'brandId':
      case 'categoryId':
      case 'facetBy':
        if (Array.isArray(queryObj[queryParam])) {
          for (const item of queryObj[queryParam] as Array<{}>) {
            returnValue.push(`${queryParam}=${queryObj[queryParam]}`);
          }
        } else {
          returnValue.push(`${queryParam}=${queryObj[queryParam]}`);
        }
        break;
      default:
        returnValue.push(`${queryParam}=${queryObj[queryParam]}`);
    }
  }
  return returnValue.join('&');
}
