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


function liveFlightsCallback(error, response, body) {
    var body = '';
        response.on('error', function(data){
            console.log(data)
            console.log('1')
        // body += data;
    });
    response.on('data', function(data){
        body += data;
    });

    response.on('end', function(){
        var result = JSON.parse(body);
        console.log(result);
    });

    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info);
    }

    console.log('response is: ', response.body)
    console.log("status code is", response.statusCode) // 200 
}

request.post(options, callback).form(defaults)