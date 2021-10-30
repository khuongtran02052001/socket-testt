import React from 'react';

import renderer from 'react-test-renderer';

import { IconLeft } from './IconLeft';

it('renders correctly', () => {
  const tree = renderer.create(<IconLeft></IconLeft>).toJSON();
  expect(tree).toMatchSnapshot();
});
