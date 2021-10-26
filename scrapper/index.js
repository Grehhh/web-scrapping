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
    const names = await page.$$eval('.menu-item-object-post', name => name.map(n => n.textContent));
    const hrefs = await page.$$eval('.menu-item-object-post > a', as => as.map(a => a.href));
    for(let i = 0; i < hrefs.length; i++) {
        linksToJson.push({
            name: names[i],
            url: hrefs[i]
        })
    };
    const toJson = JSON.stringify(linksToJson);
    fs.writeFileSync('./links.json',toJson);        //para escritura
    // console.log(names)
    // console.log(hrefs)
    await browser.close();
})();

