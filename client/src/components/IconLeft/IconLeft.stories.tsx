import React from 'react';

import { Meta, Story } from '@storybook/react';

import { IconLeft, IconProps } from './IconLeft';

const story: Meta = {
  title: 'Components/IconLeft',
  component: IconLeft,
};

export const Default: Story = (props: IconProps) => {
  return <IconLeft {...props}></IconLeft>;
};

Default.args = {};

Default.parameters = {
  jest: ['Header.test.tsx'],
  layout: 'fullscreen',
};

export default story;
