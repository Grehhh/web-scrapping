const puppeteer = require('puppeteer');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://southparkspainhd.wordpress.com/');
    const names = await page.$$eval('.menu-item-object-post', name => name.map(n => n.textContent));
    const hrefs = await page.$$eval('.menu-item-object-post > a', as => as.map(a => a.href));
    const linksToDB = [];
    for(let i = 0; i < hrefs.length; i++) {d
        linksToDB.push({
            name: names[i],
            url: hrefs[i]
        })
    };
    const uri = 'mongodb+srv://Graham:lacontrasenya@cluster0.xmw07.mongodb.net/testDB1?retryWrites=true&w=majority'
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
    
    const Schema = mongoose.Schema;
    const linkSchema = new Schema({
        season: String,
        name: String,
        url: String
    })
    const Link = mongoose.model('Link', linkSchema);
    const newLink = new Link(linksToDB);
    newLink.save((err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Data saved');
        }
    });
    
    await browser.close();
})();


app.listen(port, () => {
    console.log('App listening on port ' + port);
});
