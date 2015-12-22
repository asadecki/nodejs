var _ = require('lodash');
var heroin = require('heroin-js');

//configurator.export('book-inventory-service-petru').then(function (result) {
//        console.log(result);
//});

var dev = {
        name: "book-inventory-service-petru-t",
        domains: ['book-inventory-service-petru.herokuapp-t.com'],
        log_drains: [],
        addons: {mongolab: {plan: 'mongolab:sandbox'}}
};

var config = _.merge({}, require('./base'), dev);


var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});
configurator(config);