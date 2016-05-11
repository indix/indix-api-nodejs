import _ from 'lodash';

export function convertJSONToQueryParams(o){

  var params = _.map(o, function(value, attr){
    if(attr == 'appID') attr = 'app_id';
    if(attr == 'appKey') attr = 'app_key';
    return attr + '=' + value;
  });

  return params.join('&');

}
