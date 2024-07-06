import { it, expect } from '@jest/globals';
import {findByRole, getAllByTestId, queryAllByTestId, render} from '@testing-library/react';
import { CartApi, ExampleApi } from "../../../src/client/api";
import { Product, ProductShortInfo } from "../../../src/common/types";
import {generateProduct, generateProductList, returnResponse} from "../../utils/apiMock";
import events from '@testing-library/user-event';
import {buildApp} from "../../utils/appBuild";
import exp = require("constants");

describe('Тестирование страницы корзины', () => {
  const basename = '/hw/store';
  const productsCount = 3;

  const api = new ExampleApi(basename);
  const products: ProductShortInfo[] = generateProductList(productsCount);
  api.getProducts = async () => returnResponse<ProductShortInfo[]>(products)
  api.getProductById = async (id: number) => returnResponse<Product>(generateProduct(products.find(item => item.id === id)))


  it('В шапке правильно отображается добавленный товар', async () => {
    const cart = new CartApi();

    const { application, store } = buildApp(api, cart, [`${basename}/catalog/${products[0].id}`], 0);

    const { container, findByText, findAllByTestId, findAllByText, findByRole, findAllByRole } = render(application);

    const addButton = await findByText('Add to Cart');
    await events.click(addButton);

    const cartLink = await findByText(`Cart (1)`);
    expect(cartLink).toBeInTheDocument();
  });

  it('В корзине должна отображаться таблица с добавленными товарами', async () => {
    const cart = new CartApi();

    cart.getState = () => [{
      name: products[0].name,
      price: products[0].price,
      count: 5,
    }, {
      name: products[1].name,
      price: products[1].price,
      count: 10,
    },  {
      name: products[2].name,
      price: products[2].price,
      count: 7,
    }]

    const { application, store } = buildApp(api, cart, [`${basename}/cart`], 0);

    const { container, findByText, findAllByTestId, findAllByText, findByRole, findAllByRole } = render(application);


    const rows = await findAllByTestId(new RegExp(/^[0-9]$/));


    expect(rows.length).toBe(3);
  });

  it('Для каждого товара в корзине отображаются параметры', async () => {
    const cart = new CartApi();

    cart.getState = () => ({0: {
      name: products[0].name,
      price: products[0].price,
      count: 5,
    }, 1: {
      name: products[1].name,
      price: products[1].price,
      count: 10,
    }, 2: {
      name: products[2].name,
      price: products[2].price,
      count: 7,
    }})

    const { application, store } = buildApp(api, cart, [`${basename}/cart`], 0);

    const { container, findByText, findAllByTestId, findAllByText, findByRole, findAllByRole } = render(application);

    const rows = await findAllByTestId(new RegExp(/^[0-9]$/));

    for (let i = 0; i < rows.length; i++) {
      const state = cart.getState()[i];
      const row = rows[i];

      expect(row.querySelector('.Cart-Name').textContent).toBe(state.name);
      expect(Number(row.querySelector('.Cart-Price').textContent.replace('$', ''))).toBe(state.price);
      expect(Number(row.querySelector('.Cart-Count').textContent)).toBe(state.count);
      expect(
        Number(row.querySelector('.Cart-Price').textContent.replace('$', '')) *
        Number(row.querySelector('.Cart-Count').textContent)
      ).toBe(state.price * state.count);
    }
  });

  it('Отображается ссылка на каталог, когда корзина пустая', async () => {
    const cart = new CartApi();

    cart.getState = () => ({});

    const { application, store } = buildApp(api, cart, [`${basename}/cart`], 0);

    const { container} = render(application);

    const link: HTMLLinkElement = await findByRole(container.querySelector('.Cart'), 'link');

    expect(link.href).toContain('/hw/store/catalog');
  });

  it('По нажатию на кнопку "Clear" товары удаляются из корзины', async () => {
    const cart = new CartApi();
    let state = {0: {
      name: products[0].name,
      price: products[0].price,
      count: 5,
    }, 1: {
      name: products[1].name,
      price: products[1].price,
      count: 10,
    }};

    cart.getState = () => {
      console.log('getState was called');
      console.log(state);
      return state;
    };
    cart.setState = (cart) => { state = {} as any; console.log('was called') };

    const { application, store } = buildApp(api, cart, [`${basename}/cart`], 0);

    const { container, findByText, queryAllByTestId } = render(application);

    const rows = queryAllByTestId(new RegExp(/^[0-9]$/));

    expect(rows.length).toBe(2);

    const button = await findByText('Clear shopping cart');

    await events.click(button);

    const link: HTMLLinkElement = await findByRole(container.querySelector('.Cart'), 'link');

    expect(link.href).toContain('/hw/store/catalog');

  });
})
