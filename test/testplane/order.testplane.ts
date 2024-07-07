import { buildUrl } from "../utils/url";

it("Заказ успешно создается", async ({ browser }) => {

  await browser.url(buildUrl('catalog/1'));

  const addCart = await browser.$('.ProductDetails-AddToCart');
  await addCart.waitForDisplayed();
  await addCart.click();

  await browser.url(buildUrl('cart'));

  const name = await browser.$('#f-name');
  const phone = await browser.$('#f-phone');
  const email = await browser.$('#f-address');

  await name.setValue('NickName');
  await phone.setValue('89326479894');
  await email.setValue('ya@ya.ru');

  const submitButton = await browser.$('.Form-Submit');

  await submitButton.click();


  const successAlert = await browser.$('.Cart-SuccessMessage.alert-success');
  const id = await (await browser.$('.Cart-SuccessMessage.alert-success .Cart-Number')).getText()


  await successAlert.waitForDisplayed();
  expect(successAlert).toBeDisplayed();
  expect(id).toBe('1');
});
