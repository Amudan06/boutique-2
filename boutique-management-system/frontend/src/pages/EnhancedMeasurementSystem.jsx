import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Ruler, Activity, Camera, Mic } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockHistory = [
  { date: 'Jan 15', chest: 34, waist: 28, hip: 36 },
  { date: 'Apr 22', chest: 34.5, waist: 28.5, hip: 36.5 },
  { date: 'Oct 10', chest: 35, waist: 29, hip: 37 }
];

const standardSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const EnhancedMeasurementSystem = () => {
  const [activeTab, setActiveTab] = useState('new');
  
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text flex items-center gap-3">
            <Ruler className="text-primary h-8 w-8" /> Enhanced Measurement Center
          </h1>
          <p className="text-text-muted mt-1">Track 20+ body points, view history, and use standard templates.</p>
        </div>
        <div className="flex bg-surface rounded-xl p-1 border border-border/50">
          <button onClick={() => setActiveTab('new')} className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'new' ? 'bg-background shadow font-semibold text-primary' : 'text-text-muted hover:text-text'}`}>New Measurement</button>
          <button onClick={() => setActiveTab('history')} className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'history' ? 'bg-background shadow font-semibold text-primary' : 'text-text-muted hover:text-text'}`}>History & Growth</button>
        </div>
      </div>

      {activeTab === 'new' && (
        <div className="space-y-8 mt-8">
          {/* Top Tools Container */}
          <div className="glass p-6 rounded-2xl flex flex-wrap gap-6 items-center justify-between">
            <div className="flex gap-4 items-center">
              <span className="font-semibold text-text-muted">Standard Template:</span>
              <div className="flex gap-2">
                {standardSizes.map(size => (
                  <button key={size} className="h-10 w-10 rounded-full neo-button flex items-center justify-center font-bold text-sm">
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" className="flex gap-2"><Camera size={18} /> Add Photos</Button>
              <Button variant="ghost" className="flex gap-2"><Mic size={18} /> Voice Notes</Button>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="neo-card p-6 space-y-4">
              <h3 className="font-bold text-lg mb-4 text-primary border-b border-border/30 pb-2">Upper Body</h3>
              <div><label className="text-sm font-medium text-text-muted">Chest</label><Input placeholder="inches" /></div>
              <div><label className="text-sm font-medium text-text-muted">Waist</label><Input placeholder="inches" /></div>
              <div><label className="text-sm font-medium text-text-muted">Shoulder</label><Input placeholder="inches" /></div>
              <div><label className="text-sm font-medium text-text-muted">Neck</label><Input placeholder="inches" /></div>
              <div><label className="text-sm font-medium text-text-muted">Back Width</label><Input placeholder="inches" /></div>
            </div>
            
            <div className="neo-card p-6 space-y-4">
              <h3 className="font-bold text-lg mb-4 text-primary border-b border-border/30 pb-2">Lower Body</h3>
              <div><label className="text-sm font-medium text-text-muted">Hip</label><Input placeholder="inches" /></div>
              <div><label className="text-sm font-medium text-text-muted">Inseam</label><Input placeholder="inches" /></div>
              <div><label className="text-sm font-medium text-text-muted">Outseam</label><Input placeholder="inches" /></div>
              <div><label className="text-sm font-medium text-text-muted">Thigh / Knee</label><div className="flex gap-2"><Input placeholder="Thigh" /><Input placeholder="Knee" /></div></div>
              <div><label className="text-sm font-medium text-text-muted">Calf / Ankle</label><div className="flex gap-2"><Input placeholder="Calf" /><Input placeholder="Ankle" /></div></div>
            </div>

            <div className="neo-card p-6 space-y-4">
              <h3 className="font-bold text-lg mb-4 text-primary border-b border-border/30 pb-2">Arms & Details</h3>
              <div><label className="text-sm font-medium text-text-muted">Sleeve Length</label><Input placeholder="inches" /></div>
              <div><label className="text-sm font-medium text-text-muted">Armhole / Wrist</label><div className="flex gap-2"><Input placeholder="Armhole" /><Input placeholder="Wrist" /></div></div>
              <div><label className="text-sm font-medium text-text-muted">Front & Back Length</label><div className="flex gap-2"><Input placeholder="Front" /><Input placeholder="Back" /></div></div>
              <div><label className="text-sm font-medium text-text-muted">Body Type Classification</label>
                <select className="flex h-10 w-full rounded-md neo-input text-sm text-text">
                  <option>Select...</option>
                  <option>Slim</option>
                  <option>Athletic</option>
                  <option>Average</option>
                  <option>Plus</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button variant="primary" size="lg">Save All Measurements</Button>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-8 mt-8 animate-in slide-in-from-right-8 duration-500">
          <div className="glass p-6 rounded-2xl border-l-4 border-primary flex items-start gap-4">
            <Activity className="text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-text">Growth Analysis Alert</h3>
              <p className="text-text-muted">Customer 'Sarah' has shown a +1 inch variation in Waist and Chest over the last 9 months. Recommending a re-measurement before starting tight-fitting structured gowns.</p>
            </div>
          </div>

          <div className="neo-card p-8">
            <h2 className="text-xl font-semibold mb-6">Measurement History Trends</h2>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} vertical={false} />
                  <XAxis dataKey="date" stroke="var(--text-muted)" />
                  <YAxis stroke="var(--text-muted)" domain={['dataMin - 2', 'dataMax + 2']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--surface)', border: 'none', borderRadius: '12px', boxShadow: 'var(--shadow-neo)' }}
                  />
                  <Line type="monotone" dataKey="chest" stroke="var(--primary)" strokeWidth={3} dot={{r: 5}} />
                  <Line type="monotone" dataKey="waist" stroke="#10b981" strokeWidth={3} dot={{r: 5}} />
                  <Line type="monotone" dataKey="hip" stroke="#f59e0b" strokeWidth={3} dot={{r: 5}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EnhancedMeasurementSystem;
