const puppeteer = require('puppeteer');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;


const getLinks = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://southparkspainhd.wordpress.com/');
    const names = await page.$$eval('.menu-item-object-post', name => name.map(n => n.textContent));
    const hrefs = await page.$$eval('.menu-item-object-post > a', as => as.map(a => a.href));
    const linksToDB = [];
    for(let i = 0; i < hrefs.length; i++) {
        linksToDB.push({
            name: names[i],
            url: hrefs[i]
        })
    };
    await browser.close();
    return linksToDB;
}

(async () => {

    const name = process.argv.slice(2,3);
    const pass = process.argv.slice(3);
    
    const uri = 'mongodb+srv://' + name + ':' + pass+ '@cluster0.xmw07.mongodb.net/testDB1?retryWrites=true&w=majority'
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
        name: String,
        url: String,
        createdDate: { type: Date, default: Date.now() }
    })
    const Link = mongoose.model('Link', linkSchema);
    const linksToDB = await getLinks();
    // const linksToDB =  { 
        //     name: 'name3',
        //     url: 'name3.url'
        // }
    await Link.deleteMany({})        
    try {
        await Link.insertMany(linksToDB);
        console.log('links inserted');
    } catch(err) {
        console.log(err);
    }
    
    app.listen(port, () => {
        console.log('App listening on port ' + port);
    });
    
})();






