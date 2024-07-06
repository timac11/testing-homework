import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Application } from "../../src/client/Application";
import React from "react";
import * as H from "history";

const basename = '/hw/store';

export const buildApp = (
  api: ExampleApi,
  cartApi: CartApi,
  initialEntries: H.LocationDescriptor[],
  initialIndex: number
) => {
  const store = initStore(api, cartApi);

  const application =
    <MemoryRouter
        basename={basename}
        initialEntries={initialEntries}
        initialIndex={initialIndex}>
          <Provider store={store}>
            <Application />
          </Provider>
    </MemoryRouter>;

  return {application, store };
}
