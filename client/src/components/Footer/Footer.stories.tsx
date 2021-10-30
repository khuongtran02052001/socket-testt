import React from 'react';

import { Meta, Story } from '@storybook/react';

import { Footer, FooterProps } from './Footer';

const story: Meta = {
  title: 'Components/Footer',
  component: Footer,
};

export const Default: Story = (props: FooterProps) => {
  return <Footer {...props}></Footer>;
};

Default.args = {};

Default.parameters = {
  jest: ['Header.test.tsx'],
  layout: 'fullscreen',
};

export default story;
