'use client';

import React from 'react';
import './DashboardWidget.css';

/**
 * Reusable Dashboard Widget Component
 * @param {import('../types').WidgetProps} props
 */
export default function DashboardWidget({ title, children }) {
  return (
    <div className="dashboard-widget">
      <div className="widget-header">
        <h3 className="widget-title">{title}</h3>
      </div>
      <div className="widget-content">
        {children}
      </div>
    </div>
  );
}