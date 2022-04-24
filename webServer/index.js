const express = require('express')
const app = express()
const port = 3002
const data = require('./data.json')

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/search/:input', (req, res) => {
  console.log("req : ", req.params.input)
  let input = req.params.input.toLowerCase();
  res.send(data.filter(d => d.name.toLowerCase().includes(input)))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})