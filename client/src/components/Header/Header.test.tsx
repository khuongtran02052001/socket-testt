import React from 'react';

import { QueryClientProvider, QueryClient } from 'react-query';
import renderer from 'react-test-renderer';

import { Header } from './Header';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <QueryClientProvider client={new QueryClient()}>
        <Header></Header>
      </QueryClientProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
