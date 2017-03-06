var router = require('express').Router();
var googleFinance = require('google-finance');

// Format - ?q=NASDAQ:AAPL
// Returns a list of companies with news (multiple symbols);
router.get('/api/v1/companyNews', function(req, res, next) {
    var marketStockSymbols = req.query.q;
    multipleCompanyNews(marketStockSymbols.split(','), res);
});

function multipleCompanyNews(marketStockSymbols, res) {
    googleFinance.companyNews({
        symbols: marketStockSymbols
    }, function(err, news) {
        if (err) {
            process.exit(1);
        }
        return res.json(news);
    });
}

router.get('/api/v1/companyNews/:marketStockSymbol', function(req, res, next) {
    companyNews(req.params.marketStockSymbol, res);
});

function companyNews(marketStockSymbol, res) {
    googleFinance.companyNews({
        symbol: marketStockSymbol
    }, function(err, news) {
        if (err) {
            process.exit(1);
        }
        return res.json(news);
    });
}

// ?startDate=1232321&endDate=12312321
router.get('/api/v1/historicalData/:marketStockSymbol', function(req, res, next) {
    var marketStockSymbol = req.params.marketStockSymbol;
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    historicalData(marketStockSymbol, startDate, endDate);
});

function historicalData(marketStockSymbol, startDate, endDate) {
    googleFinance.historical({
        symbol: marketStockSymbol,
        from: startDate,
        to: endDate
    }, function(err, quotes) {
        if (err) {
            process.exit(1);
        }

        return res.json(quotes);
    });
}

router.get('api/v1/historicalData', function(req, res, next) {
    var marketStockSymbols = req.query.q;
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    historicalMultipleCompanyData(marketStockSymbols.split(','), startDate, endDate);
});

//TODO: Convert date formats to "2014-01-02T05:00:00.000Z",
function historicalMultipleCompanyData(marketStockSymbols, startDate, endDate) {
    googleFinance.historical({
        symbols: [SYMBOL1, SYMBOL2],
        from: startDate,
        to: endDate
    }, function(err, result) {
        if (err) {
            process.exit(1);
        }

        return res.json(result);
    });
}

module.exports = router;
