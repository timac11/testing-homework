import { it, expect } from '@jest/globals';

import { render } from '@testing-library/react';
import { CartApi, ExampleApi } from "../../src/client/api";
import { Product, ProductShortInfo } from "../../src/common/types";
import { generateProduct, returnResponse} from "../utils/apiMock";
import events from '@testing-library/user-event';
import { buildApp } from "../utils/appBuild";

describe('Тестирование страницы Продукта', () => {
  const basename = '/hw/store';
  const cart = new CartApi();
  const product: Product = generateProduct({ id: 1, price: 100 });
  const products = [product, generateProduct({ id: 2, price: 200 })];
  const api = new ExampleApi(basename);
  api.getProductById = async (id: number) => returnResponse<Product>(generateProduct(products.find(item => item.id === id)))
  api.getProducts = async () => returnResponse<ProductShortInfo[]>(products)


  it('Отображается продукт, который приходит с сервера', async () => {
    const { application } = buildApp(api, cart, [`${basename}/catalog/${product.id}`], 0);
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
    const { application } = buildApp(api, cart, [`${basename}/catalog/${product.id}`], 0);
    const { findByText, findAllByTestId } = render(application);

    const button = await findByText('Add to Cart');
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
