import React from 'react';

import { it, expect } from '@jest/globals';
import { getByRole, render } from '@testing-library/react';
import { initStore } from "../../src/client/store";
import { CartApi, ExampleApi } from "../../src/client/api";
import { Provider } from "react-redux";
import { Application } from "../../src/client/Application";
import { MemoryRouter } from "react-router-dom";
import { ProductShortInfo } from "../../src/common/types";
import { generateProductList, returnResponse } from "../utils/apiMock";
import {buildApp} from "../utils/appBuild";

describe('Тестирование страницы Каталога', () => {
  const basename = '/hw/store';
  const products: ProductShortInfo[] = generateProductList(10);
  const api = new ExampleApi(basename);
  api.getProducts = async () => returnResponse<ProductShortInfo[]>(products)
  const cart = new CartApi();


  it('В каталоге отображается лоадер', async () => {
    const { application, store } = buildApp(api, cart, [`${basename}/catalog`], 0);
    const { container, findByText } = render(application);
    expect(findByText('LOADING')).toBeDefined();
  });

  it('В каталоге отображаются товары, которые приходят с сервера', async () => {
    const { application, store } = buildApp(api, cart, [`${basename}/catalog`], 0);
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
