#Mercado Bitcoin API client
[Mercado Bitcoin](https://www.mercadobitcoin.com.br) is a cryptocurrency exchange in Brazil.

## Install

```shell
npm install mercadobitcoin
```

## Usage

There are 2 API endpontis. One for general info (public) and a trade API (require credentials)

### API - [documentation](https://www.mercadobitcoin.com.br/api/)

```javascript
var MercadoBitcoin = require('mercadobitcoin').MercadoBitcoin;

// The options for currency are: 'BTC' or 'LTC'
var mb = new MercadoBitcoin({ currency: 'BTC' });

// Call ticker method to get last price
mb.ticker(function (res) { console.log(res.ticker.last) });

// Call orderBook method
mb.orderBook(console.log);
```

### TRADE API - [documentation](https://www.mercadobitcoin.com.br/tapi/configuracoes/)

Get your credentials at Mercado Bitcoin website

You will need the following info: Chave, Código ([here](https://www.mercadobitcoin.com.br/tapi/configuracoes/)) and PIN ([here](https://www.mercadobitcoin.com.br/configuracoes/))

```javascript
var MercadoBitcoinTrade = require('mercadobitcoin').MercadoBitcoinTrade;

// Credentials
var chave  = '<CHAVE>',
	codigo = '<CODIGO>',
	pin    = '<PIN>';

var mbt = new MercadoBitcoinTrade({ key: chave, secret: codigo,	pin: pin });

// Call getInfo method and print amount of BTC funds in your account
mbt.getInfo(function(res) { console.log(res.funds.btc) }, console.log);

// Call orderList method
mbt.orderList({ pair: 'btc_brl' }, console.log, console.log);
```

### Donations are welcome!
1MarcE3uXebneDH81k26QPm5imMEo2PCSP
