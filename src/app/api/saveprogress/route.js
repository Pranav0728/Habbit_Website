// pages/api/saveProgress.js
import { getSession } from 'next-auth/react';
import Activity from '../../models/Activity';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { date, linesCreated, linesDeleted, totalLinesChanged, filesCreated, filesDeleted } = req.body;
  const userId = session.user.id;

  const activity = new Activity({
    userId,
    date,
    linesCreated,
    linesDeleted,
    totalLinesChanged,
    filesCreated,
    filesDeleted,
  });

  await activity.save();

  res.status(201).json({ message: 'Progress saved' });
}
