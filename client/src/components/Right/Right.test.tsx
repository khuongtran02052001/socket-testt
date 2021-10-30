import React from 'react';

import renderer from 'react-test-renderer';

import { Right } from './Right';

it('renders correctly', () => {
  const tree = renderer.create(<Right></Right>).toJSON();
  expect(tree).toMatchSnapshot();
});
