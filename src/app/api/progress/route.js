// pages/api/progress.js
import { getSession } from 'next-auth/react';
import Activity from '../../models/Activity';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = session.user.id;

  // Fetch activity data for the user
  const progress = await Activity.find({ userId }).sort({ date: -1 });

  res.status(200).json(progress);
}
