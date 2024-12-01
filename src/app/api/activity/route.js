// pages/api/activity.js
import dbConnect from '@/utils/db';
import Activity from '@/models/Activity';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, date, activityData } = req.body;

    if (!userId || !date || !activityData) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
      await dbConnect();

      const activity = await Activity.findOneAndUpdate(
        { userId },
        {
          $set: { [`track.${date}`]: activityData },
        },
        { new: true, upsert: true } // Create if doesn't exist
      );

      return res.status(200).json({ success: true, activity });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Error saving activity data', error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
