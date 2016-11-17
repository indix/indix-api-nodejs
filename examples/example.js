import * as ixClient from '../src/indix-api';
import fs from 'fs';

ixClient.init({
  appKey: 'YOUR_APP_KEY'
});

ixClient.getBrands({ q: 'Nike' }).then(function(results){
  console.log('Got', results.length, 'results');
});

ixClient.getStores({ q: 'Amazon.com' }).then(function(results){
  console.log('Got', results.length, 'results');
});

ixClient.getCategories().then(function(results){
  console.log('Got', results.length, 'results');
});

ixClient.getSearchSuggestions({ q: 'red shoes', countryCode: 'US' }).then(function(results){
  console.log('Got', results.length, 'results');
});

ixClient.getProductSummary({ q: 'red shoes', countryCode: 'US' }).then(function(results){
  console.log('Got', results.length, 'results');
});

ixClient.getProductOffersStandard({ q: 'red shoes', countryCode: 'US' }).then(function(results){
  console.log('Got', results.length, 'results');
});

ixClient.getProductOffersPremium({ q: 'red shoes', countryCode: 'US' }).then(function(results){
  console.log('Got', results.length, 'results');
});

ixClient.getProductCatalogStandard({ q: 'red shoes', countryCode: 'US' }).then(function(results){
  console.log('Got', results.length, 'results');
});

ixClient.getProductCatalogPremium({ q: 'red shoes', countryCode: 'US' }).then(function(results){
  console.log('Got', results.length, 'results');
});

ixClient.getProductUniversal({ q: 'red shoes', countryCode: 'US' }).then(function(results){
  console.log('Got', results.length, 'results');
});

ixClient.getProductLookupSummary({ mpid: '059199349f7b05dcca38ddb7dc573b80', countryCode: 'US' }).then(function(result){
  console.log(result);
});

ixClient.getProductLookupOffersStandard({ mpid: '059199349f7b05dcca38ddb7dc573b80', storeId: [24], countryCode: 'US' }).then(function(result){
  console.log(result);
});

ixClient.getProductLookupOffersPremium({ mpid: '059199349f7b05dcca38ddb7dc573b80', countryCode: 'US' }).then(function(result){
  console.log(result);
});

ixClient.getProductLookupCatalogStandard({ mpid: '059199349f7b05dcca38ddb7dc573b80', countryCode: 'US' }).then(function(result){
  console.log(result);
});

ixClient.getProductLookupCatalogPremium({ mpid: '059199349f7b05dcca38ddb7dc573b80', countryCode: 'US' }).then(function(result){
  console.log(result);
});

ixClient.getProductLookupUniversal({ mpid: '059199349f7b05dcca38ddb7dc573b80', countryCode: 'US' }).then(function(result){
  console.log(result);
});

ixClient.getBulkProductSummary({
  q: 'nike',
  storeId: [24],
  startPrice: 367,
  endPrice: 367.01,
  countryCode: 'US'
}).then(function(result){

  var poll = function(jobId){
    ixClient.getJobStatus(jobId).then(function(jobInfo){
      console.log(jobInfo);
      if(jobInfo.status != 'COMPLETED'){
        setTimeout(function(){
          poll(jobId);
        }, 5000);
      }else{
        ixClient.downloadProducts(jobId).then(function(products){
          console.log('done');
          console.log(products.length);
        });
      }
    });
  }

  poll(result.id);

});

ixClient.getBulkProductLookupSummary({
  inputFile: fs.createReadStream('test/stubs/bulk-job-input.txt', 'utf8'),
  countryCode: 'US'
}).then(function(result){

  var poll = function(jobId){
    ixClient.getJobStatus(jobId).then(function(jobInfo){
      console.log(jobInfo);
      if(jobInfo.status != 'COMPLETED'){
        setTimeout(function(){
          poll(jobId);
        }, 5000);
      }else{
        ixClient.downloadProducts(jobId).then(function(products){
          console.log('done');
          console.log(products.length);
        });
      }
    });
  }

  poll(result.id);

});

ixClient.getASELookupUniversal({
  inputFile: fs.createReadStream('test/stubs/ase-job-input.txt', 'utf8'),
  countryCode: 'US'
}).then(function(result){

  var poll = function(jobId){
    ixClient.getASEJobStatus(jobId).then(function(jobInfo){
      console.log(jobInfo);
      if(jobInfo.status != 'SUCCESS'){
        setTimeout(function(){
          poll(jobId);
        }, 5000);
      }else{
        ixClient.downloadASEProducts(jobId).then(function(products){
          console.log('done');
          console.log(products.length);
        });
      }
    });
  }

  poll(result.id);

});
