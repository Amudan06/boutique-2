import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Billing from './pages/Billing';
import AdvancedDashboard from './pages/AdvancedDashboard';
import SmartInventory from './pages/SmartInventory';
import ClientPortal from './pages/ClientPortal';
import AdvancedAnalytics from './pages/AdvancedAnalytics';
import EnhancedMeasurementSystem from './pages/EnhancedMeasurementSystem';

function App() {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      {/* Sidebar Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 p-8 ml-64 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/advanced-dashboard" element={<AdvancedDashboard />} />
          <Route path="/smart-inventory" element={<SmartInventory />} />
          <Route path="/client-portal" element={<ClientPortal />} />
          <Route path="/advanced-analytics" element={<AdvancedAnalytics />} />
          <Route path="/measurements" element={<EnhancedMeasurementSystem />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
