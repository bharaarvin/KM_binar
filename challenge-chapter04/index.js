const path = require('path');
const express = require('express');
const app = express();
const PORT = 8080;
const PATH_DIR = __dirname + '/public/';
const DATA_DIR = __dirname + '/data/';

app.use(express.static('public'));
app.use(express.static('data'));

app.get('/', (req, res) => {
    res.sendFile(path.join(PATH_DIR + 'landingPage.html'));
});

app.get('/getcars', (req, res) => {
    res.sendFile(path.join(DATA_DIR + 'cars.json'));
});

app.listen(PORT, () => console.log(`server running at localhost:${PORT}`));