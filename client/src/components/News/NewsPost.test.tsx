import React from 'react';

import renderer from 'react-test-renderer';

import { NewsPost, Post } from './NewsPost';

const post: Post = {
  title: 'A',
  comments: ['B'],
  url: ['C'],
  likes: [{ _id: '', authorId: '', postId: '' }],
  createdAt: 'D',
  _id: 'D',
  totalRows: 0,
  user: { _id: '', avatar: '', username: '', fullname: '' },
};

it('renders correctly', async () => {
  const tree = renderer.create(<NewsPost {...post}></NewsPost>).toJSON();
  expect(tree).toMatchSnapshot();
});
