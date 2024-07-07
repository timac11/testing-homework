import { CartApi, ExampleApi } from "../../src/client/api";
import { Product, ProductShortInfo } from "../../src/common/types";
import { generateProduct, generateProductList, returnResponse } from "../utils/apiMock";
import { buildApp } from "../utils/appBuild";
import { render } from "@testing-library/react";

describe('Тестирование основной страницы приложения', () => {
  const basename = '/hw/store';
  const productsCount = 3;

  const api = new ExampleApi(basename);
  const products: ProductShortInfo[] = generateProductList(productsCount);
  api.getProducts = async () => returnResponse<ProductShortInfo[]>(products)
  api.getProductById = async (id: number) => returnResponse<Product>(generateProduct(products.find(item => item.id === id)))
  const cart = new CartApi();

  it('Отображаются ссылки в приложении', async () => {
    const { application, store } = buildApp(api, cart, [`${basename}/catalog/${products[0].id}`], 0);

    const { findByText } = render(application);

    const links = [
      {
        name: 'Kogtetochka store',
        href: `${basename}`
      },
      {
        name: 'Contacts',
        href: `${basename}/contacts`
      },
      {
        name: 'Catalog',
        href: `${basename}/catalog`
      },
      {
        name: 'Delivery',
        href: `${basename}/delivery`
      },
      {
        name: 'Cart',
        href: `${basename}/cart`
      }
    ];

    for (const link of links) {
      const item = await findByText(link.name);
      expect(item).toHaveAttribute('href', link.href);
    }
  });
})
