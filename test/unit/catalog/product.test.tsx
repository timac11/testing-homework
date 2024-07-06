import React from 'react';

import { it, expect } from '@jest/globals';

import { render } from '@testing-library/react';
import { initStore } from "../../../src/client/store";
import { CartApi, ExampleApi } from "../../../src/client/api";
import { Provider} from "react-redux";
import { Application} from "../../../src/client/Application";
import { MemoryRouter } from "react-router-dom";
import { Product } from "../../../src/common/types";
import { generateProduct } from "../../utils/apiMock";
import events from '@testing-library/user-event';

describe('Тестирование страницы Продукта', () => {
  const basename = '/hw/store'
  const buildApp = () => {
    const api = new ExampleApi(basename);
    const product: Product = generateProduct({ id: 1, price: 100 });

    api.getProducts = async () => Promise.resolve(
      {
        data: [product, generateProduct({ id: 2, price: 200 })],
        status: 200,
        headers: {},
        statusText: 'OK',
        config: { headers: {} as any }
      });

    api.getProductById = async () => Promise.resolve({
      data: product,
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
        initialEntries={[`${basename}/catalog/${product.id}`]}
        initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>;

    return {application, store, product };
  }

  it('Отображается продукт, который приходит с сервера', async () => {
    const { application, product } = buildApp();
    const { container, findByText, findByRole, findAllByRole } = render(application);

    // Проверка отображеня имени
    const heading = await findByRole('heading');
    expect(heading.textContent).toBe(product.name);

    // Проверка, что отображается описание
    const description = await findByText(product.description);
    expect(description).toBeInTheDocument();

    // Проверка, что отображается цена
    const price = await findByText(`$${product.price}`);
    expect(price).toBeInTheDocument();

    const color = await findByText(product.color);
    expect(color).toBeInTheDocument();

    const material = await findByText(product.material);
    expect(material).toBeInTheDocument();

    const button = await findByText('Add to Cart');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Add to Cart');
  });

  it('Отображается, что товар добавлен в корзину', async () => {
    const { application, product } = buildApp();
    const { container, findByText, findAllByTestId, findByRole, findAllByRole } = render(application);

    const button: HTMLButtonElement = await findByText('Add to Cart');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Add to Cart');

    await events.click(button);

    const itemInCart = await findByText('Item in cart');
    expect(itemInCart).toBeInTheDocument();

    const catalog = await findByText('Catalog');
    await events.click(catalog);

    const items = (await findAllByTestId(product.id)).filter(item => item.className.indexOf('ProductItem') >= 0);

    expect(items.length).toBe(1);
    expect(items[0].querySelector('.CartBadge').textContent).toBe('Item in cart');
  });
});
