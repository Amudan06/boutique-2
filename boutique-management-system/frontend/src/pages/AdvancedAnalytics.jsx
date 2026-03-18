import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '../components/ui/Button';
import { Download, PieChart as PieChartIcon, Target, Users } from 'lucide-react';

const mockData = [
  { name: 'Traditional', revenue: 4000, profit: 2400 },
  { name: 'Western', revenue: 3000, profit: 1398 },
  { name: 'Bridal', revenue: 9800, profit: 6800 },
  { name: 'Fusion', revenue: 2780, profit: 1908 }
];

const AdvancedAnalytics = () => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text">Business Intelligence</h1>
          <p className="text-text-muted mt-1">Deep dive into your boutique's performance metrics.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" className="flex gap-2"><PieChartIcon size={18} /> Custom Report</Button>
          <Button variant="primary" className="flex gap-2"><Download size={18} /> Export PDF</Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl flex items-center gap-6">
          <div className="bg-primary/10 p-4 rounded-xl text-primary">
            <Target size={32} />
          </div>
          <div>
            <p className="text-text-muted text-sm font-medium">Profit Margin</p>
            <p className="text-3xl font-bold mt-1">42.8%</p>
          </div>
        </div>
        
        <div className="glass p-6 rounded-2xl flex items-center gap-6">
          <div className="bg-emerald-500/10 p-4 rounded-xl text-emerald-500">
            <Users size={32} />
          </div>
          <div>
            <p className="text-text-muted text-sm font-medium">Customer Retention</p>
            <p className="text-3xl font-bold mt-1">86.4%</p>
          </div>
        </div>

        <div className="neo-card p-6 flex flex-col justify-center">
          <p className="text-text-muted text-sm font-medium">Top Performing Category</p>
          <p className="text-2xl font-bold mt-2 text-primary">Bridal Wear</p>
          <p className="text-xs text-green-500 mt-1 flex items-center gap-1">+24% YoY Growth</p>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="neo-card p-8 bg-surface mt-8">
        <h2 className="text-xl font-semibold mb-8">Revenue vs Profit Breakdown (by Category)</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-muted)" axisLine={false} tickLine={false} />
              <YAxis stroke="var(--text-muted)" axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                cursor={{ fill: 'var(--border)', opacity: 0.1 }}
                contentStyle={{ backgroundColor: 'var(--surface)', border: 'none', borderRadius: '12px', boxShadow: 'var(--shadow-neo)' }}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="revenue" name="Total Revenue" fill="var(--text-muted)" radius={[4, 4, 0, 0]} maxBarSize={50} />
              <Bar dataKey="profit" name="Net Profit" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default AdvancedAnalytics;
