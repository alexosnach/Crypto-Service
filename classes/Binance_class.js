const BinanceExchange = require('node-binance-api');

class Binance {
    static getPairPrice(pair) {
        const binance = new BinanceExchange().options({
            APIKEY: 'RexE8P6gLlOgINjgskqixlyolO5q4MmYZAJkuZVY9kTdfHf4d4vbO2Z6g1ivCW7G',
            APISECRET: 'HYYmZwwZ5ypVnysK9ao3TnSbiir1YKybEbHJfYucpchjK0tryrj7niFDZZpI7OeA'
        });

        return new Promise((resolve, reject) => {
            binance.prices(pair, (error, ticker) => {
                if (ticker != undefined) {
                    resolve(ticker[pair]);
                } else {
                    reject();
                }
            });
        });
    }
}

module.exports = Binance