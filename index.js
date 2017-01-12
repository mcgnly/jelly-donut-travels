// import SkyscannerApiKey from './apiKeys';
// import https from './https';
var http = require('http');
var request = require('request');


function cachedPricesUrl(body) {
    return ('http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/' 
    + body.market + '/' 
    + body.currency + '/' 
    + body.locale + '/' 
    + body.originPlace + '/'
    + body.destinationPlace + '/' 
    + body.outboundPartialDate + '/' 
    + body.inboundPartialDate 
    + '?apiKey=' + SkyscannerApiKey);
} 

function locationServiceUrl(body, id) {
    return ('http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/' 
    + body.market + '/' 
    + body.currency + '/' 
    + body.locale 
    +'/?id=' + id
    + '-Iata&apiKey=' + SkyscannerApiKey);
} 


// HTTP Accept header: ‘application/json’ or ‘application/xml’.
function flightOptions(body) {
    return {
        url: cachedPricesUrl(body),
        headers: {
        'Accept': 'application/json'    
        }
    }
};

function locationOptions(body, id) {
    return {
        url: locationServiceUrl(body, id),
        headers: {
        'Accept': 'application/json'    
        }
    }
};


function cachedFlightsCallback(error, response, body) {
    console.log("status code is", response.statusCode) // 200 
    if (response.statusCode !=200) {
        console.log('response is: ', response.body)
    }

    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        let bestFlight = info.Quotes[0];
        console.log('the best flight found was: ', bestFlight);

        console.log('looking for the location at: ', locationOptions(reqBody, bestFlight.OutboundLeg.DestinationId))
        request.get(locationOptions(reqBody, bestFlight.OutboundLeg.DestinationId), locationCallback);
    }

}

function locationCallback(error, response, body) {
    console.log("status code is", response.statusCode) // 200 
    if (response.statusCode !=200) {
        console.log('response is: ', response.body)
    }

    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        
        console.log('the location of the destination was: ', info);

    }

}


// GB/GBP/en-GB/UK/anywhere/anytime/anytime?apiKey=prtl6749387986743898559646983194
let reqBody = {
    market:'DE',
    currency:'EUR',
    locale:'en-GB',
    originPlace:'BER',
    destinationPlace:'TH',
    outboundPartialDate:'2017-02',
    inboundPartialDate:'2017-02'
}
request.get(flightOptions(reqBody), cachedFlightsCallback);

