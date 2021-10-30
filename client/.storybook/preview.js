import { RouterContext } from "next/dist/shared/lib/router-context";
import 'tailwindcss/tailwind.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}

import { withTests } from "@storybook/addon-jest";

import results from '../.jest-test-results.json';

export const decorators = [
  withTests({
    results,
  }),
]; 