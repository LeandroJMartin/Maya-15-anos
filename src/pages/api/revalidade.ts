import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const path = req.query.path as string;
    res.revalidate(path);
    console.log('path api', path);
    return res.json({ revalidade: true });
  } catch (err) {
    return res.status(500).send(err);
  }
}
