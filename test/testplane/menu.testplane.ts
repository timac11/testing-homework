import {BASE_PATH} from "../utils/constants";
import {buildUrl} from "../utils/url";

describe('Тестирование поведения меню', () => {
  it('Меню пропадает при маленьком размере экрана (меньше 576 px)', async ({ browser }) => {
    await browser.url(buildUrl(''));
    await browser.setWindowRect(0, 0, 575, 1024);

    const links = await browser.$$('.nav-link');

    for (const link of links) {
      expect(await link.isDisplayed()).toBeFalsy();
    }

  });

  it('При клике на пункт меню из бургера меню пропадает', async ({ browser }) => {
    await browser.url(buildUrl('catalog/0'));
    await browser.setWindowRect(0, 0, 575, 1024);

    const button = await browser.$('.Application-Toggler');

    await button.click();

    const links = await browser.$$('.nav-link');

    for (const link of links) {
      expect(await link.isDisplayed()).toBeTruthy();
    }

    await links[0].click();

    for (const link of links) {
      expect(await link.isDisplayed()).toBeFalsy();
    }
  });
});
