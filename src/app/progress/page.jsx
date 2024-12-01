// pages/progress.js
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import axios from 'axios';

export default function ProgressPage() {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      const session = await getSession();
      if (!session) {
        window.location.href = '/auth/signin'; // Redirect if not signed in
      } else {
        try {
          const response = await axios.get('/api/progress', {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          });
          setProgress(response.data);
        } catch (error) {
          console.error('Error fetching progress:', error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchProgress();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Progress</h1>
      {progress.map((entry) => (
        <div key={entry._id}>
          <p>{entry.date}</p>
          <p>Lines Created: {entry.linesCreated}</p>
          <p>Lines Deleted: {entry.linesDeleted}</p>
          <p>Total Lines Changed: {entry.totalLinesChanged}</p>
        </div>
      ))}
    </div>
  );
}
