const puppeteer = require('puppeteer');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = 3000;
const uri = 'mongodb+srv://Graham:De4throcker@cluster0.xmw07.mongodb.net/testDB1?retryWrites=true&w=majority'
mongoose.connect(uri, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('Conectado a ' + uri);
    }
}, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

app.listen(port, () => {
    console.log('App listening on port ' + port);
})


const Schema = new mongoose.Schema;
const linkSchema = new Schema({
    season: String,
    name: String,
    url: String
})
const linkModel = mongoose.model('link', linkSchema);

const linksToDB = [];


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://southparkspainhd.wordpress.com/');
    const names = await page.$$eval('.menu-item-object-post', name => name.map(n => n.textContent));
    const hrefs = await page.$$eval('.menu-item-object-post > a', as => as.map(a => a.href));
    for(let i = 0; i < hrefs.length; i++) {d
        linksToDB.push({
            name: names[i],
            url: hrefs[i]
        })
    };

    app.post('/links', (req,res) => {

    })
    

    // console.log(names)
    // console.log(hrefs)
    await browser.close();
})();

