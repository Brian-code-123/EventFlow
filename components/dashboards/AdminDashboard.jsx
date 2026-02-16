'use client';

import React, { useState, useEffect } from 'react';
import Loader from '@/components/common/Loader';

import DashboardWidget from './shared/DashboardWidget';
import './AdminDashboard.css';

/**
 * Admin Dashboard Component
 * @param {import('./types').DashboardProps} props
 */
export default function AdminDashboard({ userId, role }) {
    const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
      useEffect(() => {
    async function fetchDashboardData() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStats({
          totalUsers: 120,
          activeSessions: 34,
          newRegistrations: 8,
          totalEvents: 15,
          upcomingEvents: 5,
          completedEvents: 10,
          lastBackup: "Today 02:00 AM"
        });

      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

      if (loading) {
    return <Loader size="lg" />;
  }


  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p className="welcome-text">Welcome, Admin {userId}</p>
      </div>
      
      <div className="dashboard-grid">
        <DashboardWidget title="User Management">
          <div className="widget-stats">
            <p><strong>Total Users:</strong> <span>[Placeholder]</span></p>
            <p><strong>Active Sessions:</strong> <span>[Placeholder]</span></p>
            <p><strong>New Registrations:</strong> <span>[Placeholder]</span></p>
          </div>
        </DashboardWidget>

        <DashboardWidget title="Event Statistics">
          <div className="widget-stats">
            <p><strong>Total Events:</strong> <span>[Placeholder]</span></p>
            <p><strong>Upcoming Events:</strong> <span>[Placeholder]</span></p>
            <p><strong>Completed Events:</strong> <span>[Placeholder]</span></p>
          </div>
        </DashboardWidget>

        <DashboardWidget title="System Status">
          <div className="widget-stats">
            <p><strong>Server Status:</strong> <span className="status-ok">Online</span></p>
            <p><strong>Database:</strong> <span className="status-ok">Connected</span></p>
            <p><strong>Last Backup:</strong> <span>[Placeholder]</span></p>
          </div>
        </DashboardWidget>

        <DashboardWidget title="Recent Activity">
          <div className="activity-list">
            <p>• User registration event [Placeholder]</p>
            <p>• Event created [Placeholder]</p>
            <p>• System update [Placeholder]</p>
          </div>
        </DashboardWidget>
      </div>
    </div>
  );
}
