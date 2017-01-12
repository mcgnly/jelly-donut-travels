// import SkyscannerApiKey from './apiKeys';
// import https from './https';
var http = require('http');
var request = require('request');


let sessionURL = 'http://partners.api.skyscanner.net/apiservices/pricing/v1.0';


// HTTP Content-Type header: ‘application/x-www-form-urlencoded’.
// HTTP Accept header: ‘application/json’ or ‘application/xml’.
var options = {
  url: sessionURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'    
  }
};

let defaults = {
                country: "GB",
                currency: "GBP",
                locale: "en-GB",
                locationSchema: "Iata",
                apiKey: SkyscannerApiKey
            };


function callback(error, response, body) {
    console.log("status code is", response.statusCode) // 200 
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info);
  }
}

    // console.log("----getting the session");
    // http.get(sessionURL, function(res){
    //     var body = '';
    //     res.on('data', function(data){
    //         body += data;
    //     });

    //     res.on('end', function(){
    //         // var result = JSON.parse(body);
    //         callback(body);
    //     });

    // }).on('error', function(e){
    //     console.log('Error: ' + e);
    // });

request.post(options, callback).form(defaults)

// this.emit(':tell', 
//     getCatFacts(function(data){
//         getLocation(data, function(res){
//             console.log("inside the second fn call. Location is: ", res);
//             return res;
//         });
//     })
// );