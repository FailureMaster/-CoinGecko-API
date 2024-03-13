const express       = require('express');
const bodyParser    = require('body-parser');
const session       = require('express-session');
const app           = express();
const axios         = require('axios');

//setting up session
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

//setting the static files directory
app.use(express.static('./assets'));

//setting where the views are located
app.set('views', './views');
app.set('view engine', 'ejs');

//setting body parser
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',  (req, res) => {
    res.render('index');
}).listen(9090);

// ====== CRYPTO ROUTE ====== 
app.get('/crypto', (req, res) => {
    axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=false').then(coins => {
        let responseData = [];
        coins.data.forEach((element, index) => {
            //get first 10 element of the array and push it to the responseData
            if (index < 10) {
                responseData.push(element.name);
            }
        });
        // return it by using res = response
        res.json(responseData);
    });
});//crypto route closing


app.get('/crypto/:id', (req, res) => {
    axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=false').then(coins => {
        let responseData = [];
        let page = parseInt(req.params.id);
        let start = page -1;
        coins.data.forEach((element, index) => {
            if (index >= start*10 && index < page*10) {
                console.log(`${index} and ${start}`);
                responseData.push(element.name);
            }
        });
        res.json(responseData);
    });
});//previus and next route


app.get('/cryptohundred', (req, res) => {
    axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=false').then(coins => {
        let responseData = [];
        coins.data.forEach((element, index) => {
            if (index < 100 ) {
                responseData.push(element.name);
            }
        });

        res.json(responseData);
    });
});//show hundred route


// ====== EXCHANGES ROUTE ====== 
app.get('/exchanges', (req, res) => {
    axios.get(`https://api.coingecko.com/api/v3/exchanges?per_page=10&page=1`).then(exchange => {
        let responseData = [];
        exchange.data.forEach((elem) => {
            responseData.push(elem.name);
        })
        res.json(responseData);
    });
});


app.get('/exchanges/:page', (req, res) => {
    let page = req.params.page
    axios.get(`https://api.coingecko.com/api/v3/exchanges?per_page=10&page=${page}`).then(exchange => {
        let responseData = [];
        exchange.data.forEach((elem) => {
            responseData.push(elem.name);
        })
        res.json(responseData);
    });
});


app.get('/exchangeshundred/', (req, res) => {
    axios.get(`https://api.coingecko.com/api/v3/exchanges?per_page=100`).then(exchange => {
        let responseData = [];
        exchange.data.forEach((elem) => {
            responseData.push(elem.name);
        })
        res.json(responseData);
    });
});

// ====== FINANCE ROUTE ====== 
app.get('/finance/', (req, res) => {
    axios.get(`https://api.coingecko.com/api/v3/asset_platforms`).then(finance => {
        let responseData = [];
        finance.data.forEach((elem, i) => {
            if (i < 10) {
                responseData.push(elem.name);
            }
        })
        res.json(responseData);
    });
});


app.get('/finance/:page', (req, res) => {
    axios.get(`https://api.coingecko.com/api/v3/asset_platforms`).then(finance => {
        let responseData = [];
        let page = parseInt(req.params.page);
        let start = page - 1;
        finance.data.forEach((elem, i) => {
            if (i >= start*10 && i <= page*10) {
                responseData.push(elem.name);
            }
        })
        res.json(responseData);
    });
});


app.get('/financehundred/', (req, res) => {
    axios.get(`https://api.coingecko.com/api/v3/asset_platforms`).then(exchange => {
        let responseData = [];
        exchange.data.forEach((elem, i) => {
            if (i < 100) {
                responseData.push(elem.name);
            }
        })
        res.json(responseData);
    });
});