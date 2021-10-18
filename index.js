const puppeteer = require('puppeteer');
const fs = require('fs');
//----para lectura
// let rawData = fs.readFileSync('./links.json')
// let links = JSON.parse(rawData);     
//----------------
let linksToJson = [];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://southparkspainhd.wordpress.com/');
    hrefs = await page.$$eval('a', as => as.map(a => a.href));
    for(let i = 0; i < hrefs.length; i++) {
        linksToJson.push({
            name: i.toString(),
            url: hrefs[i]
        })
    };
    let toJson = JSON.stringify(linksToJson);
    fs.writeFileSync('./links.json',toJson);        //para escritura

    await browser.close();
})();

