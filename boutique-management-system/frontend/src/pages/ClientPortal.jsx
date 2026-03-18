import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Calendar, User, Package, MapPin, Award } from 'lucide-react';

const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Profile Section */}
      <div className="glass rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="flex items-center gap-6 z-10">
          <div className="h-24 w-24 rounded-full bg-surface shadow-neo flex items-center justify-center border-4 border-white/40">
            <User size={40} className="text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text">Welcome back, Sarah!</h1>
            <p className="text-text-muted mt-1 flex items-center gap-2">
              <MapPin size={16} /> New York, NY
            </p>
          </div>
        </div>
        
        {/* Loyalty Points Mini-ban */}
        <div className="neo-card p-4 flex items-center gap-4 z-10 w-full md:w-auto">
          <div className="bg-yellow-100 text-yellow-600 p-3 rounded-xl">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-muted">Loyalty Points</p>
            <p className="text-2xl font-bold">1,250 <span className="text-sm font-normal text-text-muted">Gold Tier</span></p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b border-border/50 pb-2 overflow-x-auto">
        {['orders', 'appointments', 'measurements'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium capitalize transition-all whitespace-nowrap ${
              activeTab === tab 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-text-muted hover:text-text'
            }`}
          >
            My {tab}
          </button>
        ))}
      </div>

      {/* Tab Content Placeholder */}
      <div className="mt-8 transition-all">
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Package className="text-primary" /> Active Orders
            </h2>
            <div className="neo-card p-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <p className="font-bold text-lg">Custom Silk Gown</p>
                <p className="text-text-muted text-sm mt-1">Order #BMS-84221</p>
              </div>
              
              {/* Timeline Progress */}
              <div className="flex-1 max-w-xl w-full px-4">
                <div className="relative flex justify-between">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-border/50 -z-10 -translate-y-1/2 rounded-full"></div>
                  <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full"></div>
                  
                  {['Ordered', 'Cutting', 'Stitching', 'Trial', 'Ready'].map((step, idx) => (
                    <div key={step} className="flex flex-col items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${idx <= 2 ? 'bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-surface border-2 border-border/80'}`}></div>
                      <span className={`text-xs font-medium ${idx <= 2 ? 'text-text' : 'text-text-muted'}`}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-text-muted">Expected Delivery</p>
                <p className="font-bold text-primary">Oct 24, 2026</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Calendar className="text-primary" /> Upcoming Appointments
              </h2>
              <Button variant="primary">Schedule New</Button>
            </div>
            <div className="glass p-8 text-center rounded-2xl">
              <p className="text-text-muted">You have no upcoming appointments.</p>
              <Button variant="ghost" className="mt-4">Book a trial session</Button>
            </div>
          </div>
        )}

        {activeTab === 'measurements' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">My Measurements Profile</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[ {label: 'Chest', val: '34"'}, {label: 'Waist', val: '28"'}, {label: 'Hip', val: '36"'}, {label: 'Shoulder', val: '14"'} ].map(m => (
                <div key={m.label} className="neo-card p-4 text-center">
                  <p className="text-text-muted text-sm">{m.label}</p>
                  <p className="text-xl font-bold mt-1">{m.val}</p>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-primary">Request Measurement Update</Button>
          </div>
        )}
      </div>

    </div>
  );
};

export default ClientPortal;
