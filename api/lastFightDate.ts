import { NowRequest, NowResponse } from '@vercel/node';

let lastFightDate = new Date();

export default (req: NowRequest, res: NowResponse) => {
  if (req.method === 'GET') {
    res.status(200).json({ lastFightDate });
  } else if (req.method === 'POST') {
    lastFightDate = new Date(req.body.date);
    res.status(200).json({ message: 'Date updated successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};