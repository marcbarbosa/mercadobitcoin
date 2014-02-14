var unirest = require('unirest'),
    crypto  = require('crypto'),
    qs      = require('querystring');

var ENDPOINT = 'https://www.mercadobitcoin.com.br/tapi/';

var MercadoBitcoinTrade = function (config) {
    this.config = {
        KEY: config.chave,
        SECRET: config.codigo,
        PIN: config.pin
    }
};

MercadoBitcoinTrade.prototype = {

    getInfo: function(success, error) {
        this.call('getInfo', {}, success, error);
    },

    orderList: function (parameters, success, error) {
        this.call('OrderList', parameters, success, error)
    },

    trade: function (parameters, success, error) {
        this.call('Trade', parameters, success, error)
    },

    cancelOrder: function (parameters, success, error) {
        this.call('CancelOrder', parameters, success, error)
    },

    call: function (method, parameters, success, error) {
        
        var now = Math.round(new Date().getTime() / 1000);
        var signature = crypto.createHmac('sha512', this.config.SECRET)
                              .update(method + ':' + this.config.PIN + ':' + now)
                              .digest('hex');

        unirest.post(ENDPOINT)
            .headers({'Key': this.config.KEY})
            .headers({'Sign': signature})
            .send(qs.stringify({'method': method, 'tonce': now}))
            .send(qs.stringify(parameters))
            .end(function (response) {
                success(response.body);
            });
    }

}
