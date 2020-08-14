require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize()
    try {
        await driver.get('https://www.baidu.com');
        await driver.findElement(By.id("kw")).sendKeys("中华人民共和国", Key.ENTER)
        await driver.wait(until.elementLocated(By.xpath("//a/em[text()='中华人民共和国']"))).click()
        let allWindowHandles = await driver.getAllWindowHandles()
        await driver.switchTo().window(allWindowHandles[1])
        for (let i = 0; i <= 500; i++) {
            let js = "window.scrollTo(0, " + i * 5 + ")"
            await driver.executeScript(js)
            await driver.sleep(12)
        }
        await driver.executeScript("alert('浏览器将于三秒后自动关闭！')")
        await driver.sleep(3000)
    }
    finally {
        driver.quit();
    }
})();