const puppeteer = require('puppeteer');
const fs = require('fs');
let rawData = fs.readFileSync('./links.json')
let links = JSON.parse(rawData);
let json = {
    name: 'hola',
    link: 'por determinar'
}
let toJson = JSON.stringify(json);
fs.writeFileSync('./links.json',toJson);

console.log(links);

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // await page.goto('https://grehhh.github.io/lorem_store_sass/');
    await page.goto('https://southparkspainhd.wordpress.com/');
    hrefs = await page.$$eval('a', as => as.map(a => a.href));

    // console.log(hrefs)



    await browser.close();
})();


// let nums = [];
// for(let i = 0; i < 5; i++) {
//     // nums.push(`<li>${i}</li>`)
//     nums += `<li>${i}</li>`
// }
// let palHTML = `<ul>${nums}</ul>`
// document.body.innerHTML = palHTML;
// console.log(nums)
// console.log(palHTML);
