import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';
import axios from 'axios';

const AdvancedDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('http://localhost:5000/analytics/dashboard');
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
        </div>
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-text">Advanced Dashboard</h1>
        <Button variant="primary">Export Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Metric Cards - Glassmorphism */}
        <div className="glass p-6 rounded-2xl flex flex-col justify-center">
          <p className="text-text-muted text-sm font-medium">Total Revenue</p>
          <p className="text-3xl font-bold mt-2">${data?.totalRevenue?.toLocaleString()}</p>
        </div>
        <div className="glass p-6 rounded-2xl flex flex-col justify-center">
          <p className="text-text-muted text-sm font-medium">Revenue Growth (AI Forecast)</p>
          <p className="text-3xl font-bold mt-2 text-green-500">+{data?.revenueGrowth}%</p>
        </div>
        <div className="neo-card p-6 flex flex-col justify-center">
          <p className="text-text-muted text-sm font-medium">Active Orders</p>
          <p className="text-3xl font-bold mt-2">{data?.activeOrders}</p>
        </div>
        <div className="neo-card p-6 flex flex-col justify-center">
          <p className="text-text-muted text-sm font-medium">Customer Satisfaction</p>
          <p className="text-3xl font-bold mt-2">{data?.customerSatisfaction} / 5.0</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="neo-card p-6 bg-surface">
        <h2 className="text-xl font-semibold mb-6">Revenue Trend & Forecast</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data?.revenueChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
              <XAxis dataKey="name" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--surface)', border: 'none', borderRadius: '12px', boxShadow: 'var(--shadow-neo)' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="var(--primary)" 
                strokeWidth={3} 
                dot={{ fill: 'var(--primary)', strokeWidth: 2, r: 6 }} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdvancedDashboard;
