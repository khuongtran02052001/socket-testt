/* eslint-disable consistent-return */
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { apiUrl } from 'src/Context/contant';

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      try {
        const response = await axios.post(`${apiUrl}/auth/register`, req.body);
        return res.send(response.data);
      } catch (error) {
        return res.status(401).send('UNAUTHORIZED');
      }

    default:
      break;
  }
  res.status(500).send({ message: 'fail' });
}
