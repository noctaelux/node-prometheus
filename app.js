const express = require('express');
const prom = require('prom-client');

const collectDefaultMetrics = prom.collectDefaultMetrics;
const app = express();
const port = 8081;

app.get('/', function (req, res) {
    res.send('Welcome page');
});

app.get('/hola-mundo', function (req, res) {
    res.send('Hola mundo');
});


collectDefaultMetrics();
app.get('/metrics', async( req , res ) => {
    res.set('Content-Type', prom.register.contentType);
    return res.send(await prom.register.metrics());
});

app.get('*', function (req, res) {
    res.send('404 | Page not found');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});