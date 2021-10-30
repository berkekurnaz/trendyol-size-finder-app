const express = require('express')
const app = express()
const port = 3000
const path = require('path');
var ejs = require('ejs');
const fetch = require('node-fetch');

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('.ejs', ejs.__express);
app.set('views', __dirname + '/views');

const findEstimatedSizes = require("./findEstimatedSizes");
const findUserSize = require("./findUserSize");
const findProductId = require("./findProductId");

app.get('/', (req, res) => {
    res.render("./index.ejs", { result: "", comments: [] });
})

app.post('/', (req, res) => {
    if (!req.body.link.includes("trendyol")) {
        res.json("404");
    }
    let productId = findProductId.findId(req.body.link);
    fetch('https://public-mdc.m.trendyol.com/discovery-mweb-socialgw-service/api/product-review/reviews/' + productId + '?page=0&size=200&storefrontId=1')
        .then(res => res.json())
        .then(json => {
            let data = json;
            let result = findEstimatedSizes.findSizes(data);
            result.sort((a, b) => b.estimatedHeight - a.estimatedHeight);
            let comments = [];
            result.forEach(element => {
                comments.push(element.comments);
            });

            findSize = findUserSize.findUserPerfectSize(req.body.weight, req.body.height, result);
            let userPerfectSize = "Results: You can buy '" + findSize + "' size for : " + req.body.weight + " weight and " + req.body.height + " height"
            if (findSize == "") {
                userPerfectSize = "";
            }
            res.render("./index.ejs", { result: userPerfectSize, comments: comments });
        });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})