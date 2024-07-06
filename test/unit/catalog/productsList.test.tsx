import React from 'react';

import { it, expect } from '@jest/globals';
import { getByRole, render } from '@testing-library/react';
import { initStore } from "../../../src/client/store";
import { CartApi, ExampleApi } from "../../../src/client/api";
import { Provider } from "react-redux";
import { Application } from "../../../src/client/Application";
import { MemoryRouter } from "react-router-dom";
import { ProductShortInfo } from "../../../src/common/types";
import { generateProductList } from "../../utils/apiMock";

describe('Тестирование страницы Каталога', () => {
  const basename = '/hw/store'
  const buildApp = () => {

    const products: ProductShortInfo[] = generateProductList(10);
    const api = new ExampleApi(basename);

    api.getProducts = async () => Promise.resolve(
      {
        data: products,
        status: 200,
        headers: {},
        statusText: 'OK',
        config: { headers: {} as any }
      });

    const cart = new CartApi();
    const store = initStore(api, cart);

    const application =
      <MemoryRouter
        basename={basename}
        initialEntries={[`${basename}/catalog`]}
        initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>;

    return {application, store, products };
  }

  it('В каталоге отображается лоадер', async () => {
    const { application, store } = buildApp();
    const { container, findByText } = render(application);
    expect(findByText('LOADING')).toBeDefined();
  });

  it('В каталоге отображаются товары, которые приходят с сервера', async () => {
    const { application, products } = buildApp();
    const { container, findAllByTestId, findByText } = render(application);

    // фильтрация оберток
    const items = (await findAllByTestId(new RegExp(/^[0-9]$/))).filter(item => item.className.indexOf('ProductItem') >= 0);

    expect(items.length).toBe(products.length);

    // проверка названия и цены, а также наличия ссылки
    for (let i = 0; i < items.length; i++) {
      expect(items[i].querySelector('.ProductItem-Name').textContent).toBe(products[i].name);
      expect(items[i].querySelector('.ProductItem-Price').textContent).toBe(`$${products[i].price}`);
      expect(getByRole(items[i], 'link')).toBeDefined();
      expect(getByRole(items[i], 'link').textContent).toBe('Details');
      expect(getByRole<HTMLLinkElement>(items[i], 'link').href).toContain(`${basename}/catalog/${products[i].id}`);
    }
  });
});
