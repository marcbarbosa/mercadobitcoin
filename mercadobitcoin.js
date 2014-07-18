var unirest = require('unirest');
    crypto  = require('crypto'),
    qs      = require('querystring');

var ENDPOINT_API       = 'https://www.mercadobitcoin.com.br/api/',
    ENDPOINT_TRADE_API = 'https://www.mercadobitcoin.com.br/tapi/';


var MercadoBitcoin = function (config) {
  this.config = {
    CURRENCY: config.currency
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

    var isLitecoin = this.config.CURRENCY === 'LTC';

    unirest.get(ENDPOINT_API + method + (isLitecoin ? '_litecoin' : ''))
    .headers('Accept', 'application/json')
    .end(function (response) {
      success(JSON.parse(response.raw_body));
    });
  }
}


var MercadoBitcoinTrade = function (config) {
    this.config = {
        KEY: config.key,
        SECRET: config.secret,
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

    unirest.post(ENDPOINT_TRADE_API)
      .headers({'Key': this.config.KEY})
      .headers({'Sign': signature})
      .send(qs.stringify({'method': method, 'tonce': now}))
      .send(qs.stringify(parameters))
      .end(function (response) {
        if (response.body.success === 1 && success)
          success(response.body.return);
        else if (error)
          error(response.body.error);
      });
  }

}


module.exports = {
  MercadoBitcoin: MercadoBitcoin,
  MercadoBitcoinTrade: MercadoBitcoinTrade
};
