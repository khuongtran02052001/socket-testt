import React from 'react';

import { Meta, Story } from '@storybook/react';

import { NewsPost, Post } from './NewsPost';

const story: Meta = {
  title: 'Components/NewsPost',
  component: NewsPost,
};

export const Default: Story = (props: Post) => {
  return <NewsPost {...props}></NewsPost>;
};

Default.args = {};

Default.parameters = {
  jest: ['Header.test.tsx'],
  layout: 'fullscreen',
};

export default story;
