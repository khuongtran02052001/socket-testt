import React from 'react';

import { Meta, Story } from '@storybook/react';

import { Right, RightProps } from './Right';

const story: Meta = {
  title: 'Components/Right',
  component: Right,
};

export const Default: Story = (props: RightProps) => {
  return <Right {...props}></Right>;
};

Default.args = {};

Default.parameters = {
  jest: ['Header.test.tsx'],
  layout: 'fullscreen',
};

export default story;
