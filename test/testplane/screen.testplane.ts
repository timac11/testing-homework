import { BASE_PATH } from "../utils/constants";
import {buildUrl} from "../utils/url";

describe("Скриншотное тестирование", () => {
  it("Корзина отображается правильно", async ({browser}) => {
    await browser.url(buildUrl('cart'));
    const page = await browser.$('.Cart');
    await page.waitForDisplayed();
    await browser.pause(500);
    await page.assertView('plain', {tolerance: 0.1, ignoreDiffPixelCount: '5%'})
  });

  it("Каталог отображается правильно", async ({browser}) => {
    await browser.url(buildUrl('catalog'));
    const page = await browser.$('.Catalog');
    await page.waitForDisplayed();
    await browser.pause(500);
    await page.assertView('plain', {tolerance: 0.1, ignoreDiffPixelCount: '5%'})
  });

  it("Продукт отображается правильно", async ({browser}) => {
    await browser.url(buildUrl('catalog/0'));
    const page = await browser.$('.Product');
    await page.waitForDisplayed();
    await browser.pause(500);
    await page.assertView('plain', {tolerance: 0.1, ignoreDiffPixelCount: '5%'})
  });

  it("Доставка отображается правильно", async ({browser}) => {
    await browser.url(buildUrl('delivery'));
    const page = await browser.$('.Delivery');
    await page.waitForDisplayed();
    await browser.pause(500);
    await page.assertView('plain', {tolerance: 0.1, ignoreDiffPixelCount: '5%'});
  });

  it("Главная отображается правильно", async ({browser}) => {
    await browser.url(buildUrl(''));
    const page = await await browser.$('.Home');
    await page.waitForDisplayed();
    await browser.pause(500);
    await page.assertView('plain', {tolerance: 0.1, ignoreDiffPixelCount: '5%'});
  });

  it("Контакты отображается без изменений", async ({browser}) => {
    await browser.url(buildUrl('contacts'));
    const page = await browser.$('.Contacts');
    await page.waitForDisplayed();
    await browser.pause(500);
    await page.assertView('plain', {tolerance: 0.1, ignoreDiffPixelCount: '5%'})
  });
});

describe('Скриншотное тестирование мальньких экранов', () => {
  it("Корзина отображается правильно", async ({browser}) => {
    await browser.url(buildUrl('cart'));
    await browser.setWindowRect(0, 0, 575, 1024);
    const page = await browser.$('.Cart');
    await page.waitForDisplayed();
    await browser.pause(500);
    await page.assertView('plain', {tolerance: 0.1, ignoreDiffPixelCount: '5%'})
  });

  it("Каталог отображается правильно", async ({browser}) => {
    await browser.url(buildUrl('catalog'));
    await browser.setWindowRect(0, 0, 575, 1024);
    const page = await browser.$('.Catalog');
    await page.waitForDisplayed();
    await browser.pause(500);
    await page.assertView('plain', {tolerance: 0.1, ignoreDiffPixelCount: '5%'})
  });

  it("Продукт отображается правильно", async ({browser}) => {
    await browser.url(buildUrl('catalog/0'));
    await browser.setWindowRect(0, 0, 575, 1024);
    const page = await browser.$('.Product');
    await page.waitForDisplayed();
    await browser.pause(500);
    await page.assertView('plain', {tolerance: 0.1, ignoreDiffPixelCount: '5%'})
  });

  it("Доставка отображается правильно", async ({browser}) => {
    await browser.url(buildUrl('delivery'));
    await browser.setWindowRect(0, 0, 575, 1024);
    const page = await browser.$('.Delivery');
    await page.waitForDisplayed();
    await browser.pause(500);
    await page.assertView('plain', {tolerance: 0.1, ignoreDiffPixelCount: '5%'});
  });

  it("Главная отображается правильно", async ({browser}) => {
    await browser.url(buildUrl(''));
    await browser.setWindowRect(0, 0, 575, 1024);
    const page = await await browser.$('.Home');
    await page.waitForDisplayed();
    await browser.pause(500);
    await page.assertView('plain', {tolerance: 0.1, ignoreDiffPixelCount: '5%'});
  });

  it("Контакты отображается без изменений", async ({browser}) => {
    await browser.url(`${BASE_PATH}/contacts`);
    await browser.setWindowRect(0, 0, 575, 1024);
    const page = await browser.$('.Contacts');
    await page.waitForDisplayed();
    await browser.pause(500);
    await page.assertView('plain', {tolerance: 0.1, ignoreDiffPixelCount: '5%'})
  });
})
