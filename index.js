const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const Item = require('./models/Item'); 
require('dotenv').config();

(async () => {
    const mongoUri = process.env.URL;

    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected');
        
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://www.vinted.fi/catalog?search_text=nike%20air%20force%201&order=newest_first&price_to=35&currency=EUR&color_ids[]=12');
        await page.waitForSelector('.feed-grid', { visible: true });

        const data = await page.evaluate(() => {
            const allGrids = document.querySelectorAll('.new-item-box__container');
            const finalArr = [];
            allGrids.forEach((element) => {
                const size = element.querySelector('.new-item-box__description:nth-of-type(2)');
                const link = element.querySelector('.u-position-relative.u-min-height-none.u-flex-auto a');
                const pic = element.querySelector('.web_ui__Image__image.web_ui__Image__cover.web_ui__Image__portrait.web_ui__Image__scaled.web_ui__Image__ratio img');
                const price = element.querySelector('.web_ui__Text__text.web_ui__Text__caption.web_ui__Text__left.web_ui__Text__muted');

                if (parseInt(size.innerText) > 34 && parseInt(size.innerText) < 42) {
                    finalArr.push({
                        link: link ? link.href : null,
                        picture: pic ? pic.src : null,
                        price: price ? price.innerText : null,
                        size: size ? size.innerText : null,
                    });
                }
            });
            return finalArr.slice(0, 10);
        });

        await Item.insertMany(data);

        await browser.close();
    } catch (err) {
        console.error('Error:', err);
    } finally {
        mongoose.connection.close();
    }
})();
