var unirest = require('unirest');

var ENDPOINT = 'https://www.mercadobitcoin.com.br/api/';

var MercadoBitcoin = function (config) {
	this.config = {
        CURRENCY: config.moeda
    }
}

MercadoBitcoin.prototype = {

	ticker: function (success) {
		this.call('ticker', success);
	},

	orderBook: function (success) {
		this.call('orderbook', success);
	},

	trades: function (success) {
		this.call('trades', success);
	},

	call: function (method, success) {
		unirest.get(ENDPOINT + method + this.config.CURRENCY === 'LTC' ? '_litecoin' : '')
		.headers('Accept', 'application/json')
		.end(function (response) {
            success(response.body);
        });
	}
}
