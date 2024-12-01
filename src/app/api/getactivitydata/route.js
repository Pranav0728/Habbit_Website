// pages/api/getActivityData.js
import { connectToDatabase } from '../../utils/db';
import Activity from '../../models/Activity';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  try {
    await connectToDatabase();

    const activity = await Activity.findOne({ userId }).select('track -_id'); // Only fetch the track field

    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity data not found' });
    }

    const activityData = Object.keys(activity.track).map((date) => ({
      date,
      ...activity.track[date],
    }));

    return res.status(200).json(activityData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Error fetching activity data' });
  }
}
