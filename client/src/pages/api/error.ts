import { withSentry } from '@sentry/nextjs';

export const errorApi = async () => {
  throw new Error('Sample Error');
};

export default withSentry(errorApi);
