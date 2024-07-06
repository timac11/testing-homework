import React from 'react';

import { it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import {initStore} from "../../../src/client/store";
import {CartApi, ExampleApi} from "../../../src/client/api";
import {Provider} from "react-redux";
import {Application} from "../../../src/client/Application";
import {BrowserRouter, MemoryRouter} from "react-router-dom";

it('example test', () => {
  const basename = '/hw/store'

  const api = new ExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);

  const application =
    <MemoryRouter
      basename={basename}
      initialEntries={[`${basename}/`]}
      initialIndex={0}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>;

  const { container } = render(application);

  screen.logTestingPlaygroundURL(container);

  expect('t').toEqual('t');
});
