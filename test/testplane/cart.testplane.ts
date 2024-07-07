import { BASE_PATH } from "../utils/constants";
import { buildUrl } from "../utils/url";

it("После перезагрузки корзина сохранилась", async ({ browser }) => {
  await browser.url(buildUrl('catalog/0'));

  const addCart = await browser.$('.ProductDetails-AddToCart')

  await addCart.waitForDisplayed();
  await addCart.click();

  await browser.refresh();
  await browser.url(buildUrl('cart'));

  const count = await browser.$('.Cart-Table .Cart-Count')
  const clearButton = await browser.$('.Cart-Clear')
  await count.waitForDisplayed()

  expect(count).toBeDisplayedInViewport()
  expect(clearButton).toBeDisplayedInViewport()
});
