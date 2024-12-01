"use client"
import React, { useState, useEffect } from 'react';

const HabitTrackerChart = ({ userId }) => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const fetchActivityData = async () => {
      const response = await fetch(`/api/getActivityData?userId=${userId}`);
      const data = await response.json();
      setActivityData(data);
    };

    fetchActivityData();
  }, [userId]);

  const renderChart = () => {
    return activityData.map((day) => {
      const { date, totalLinesChanged } = day;
      const color = totalLinesChanged > 0 ? 'green' : 'gray';
      return (
        <div key={date} title={`${date}: ${totalLinesChanged} lines changed`} style={{ backgroundColor: color, width: '20px', height: '20px', margin: '2px' }} />
      );
    });
  };

  return <div style={{ display: 'flex', flexWrap: 'wrap', width: '400px' }}>{renderChart()}</div>;
};

export default HabitTrackerChart;
