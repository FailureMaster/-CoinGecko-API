const express       = require('express');
const bodyParser    = require('body-parser');

const app = express();

app.use(express.static(__dirname + "/assets"));
// app.use(express.static('./assets'));

app.set('views', './views');
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index');
}).listen(9090);

