import { withSentry } from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

export const helloApi = async (_req: NextApiRequest, res: NextApiResponse) => {
  res.send({ message: 'Hello' });
};

export default withSentry(helloApi);
