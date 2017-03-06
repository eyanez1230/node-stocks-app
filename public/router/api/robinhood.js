var router = require('express').Router();
var credentials = {
    username: '',
    password: ''
};

router.get('/api/v1/getQuoteData/:stockSymbol', function(req, res, next) {
    getQuoteData(req.params.stockSymbol, res);
});

//TODO: Refactor the robinhood decleration and the credentials

//The username and password you use to sign into the robinhood app.
function getQuoteData(stockSymbol, res) {
    var Robinhood = require('robinhood')(credentials, function() {
        Robinhood.quote_data(stockSymbol, function(error, response, body) {
            if (error) {
                console.error(error);
                process.exit(1);
            }
            return res.json(body);
        });
    });
}

router.get('/api/v1/sp500Up', function(req, res, next) {
    sp500Up(res);
});

function sp500Up(res) {
    var Robinhood = require('robinhood')(credentials, function() {
        Robinhood.sp500_up(function(error, response, body) {
            if (error) {
                process.exit(1);
            }

            return res.json(body);
        });
    });
}

router.get('/api/v1/sp500Down', function(req, res, next) {
    sp500Down(res);
});

function sp500Down(res) {
    var Robinhood = require('robinhood')(credentials, function() {
        Robinhood.sp500_down(function(error, response, body) {
            if (error) {
                process.exit(1);
            }

            return res.json(body);
        });
    });
}

module.exports = router;
