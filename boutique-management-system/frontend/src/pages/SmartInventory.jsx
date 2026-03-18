import React, { useState, useEffect } from 'react';
import { Skeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';
import axios from 'axios';
import { AlertCircle, Box, TrendingDown, Plus } from 'lucide-react';

const SmartInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/inventory');
        setInventory(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text flex items-center gap-3">
            <Box className="h-8 w-8 text-primary" /> 
            Smart Inventory
          </h1>
          <p className="text-text-muted mt-1">Real-time stock tracking with AI alerts</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus size={18} /> Add Fabric
        </Button>
      </div>

      {/* AI Alerts Placeholder */}
      <div className="neo-card p-6 border-l-4 border-yellow-500 flex items-start gap-4">
        <AlertCircle className="text-yellow-500 mt-1" />
        <div>
          <h3 className="font-semibold text-lg">AI Stock Alert</h3>
          <p className="text-text-muted">Silk and Linen stocks are predicted to run out in 14 days based on current order trends. Recommended bulk reorder: 50 meters.</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="glass rounded-2xl overflow-hidden mt-8">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Current Fabric Stock</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface/50 text-text-muted">
              <tr>
                <th className="p-4 font-medium">Code</th>
                <th className="p-4 font-medium">Fabric Name</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Stock Available</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {inventory.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-text-muted">
                    No inventory items found. Add some fabric to get started!
                  </td>
                </tr>
              ) : (
                inventory.map(item => {
                  const isLow = item.quantity_available <= item.minimum_stock_level;
                  return (
                    <tr key={item.id} className="hover:bg-surface/30 transition-colors">
                      <td className="p-4 font-medium">{item.fabric_code}</td>
                      <td className="p-4">{item.fabric_name} <span className="text-sm text-text-muted ml-2">({item.color})</span></td>
                      <td className="p-4 capitalize">{item.fabric_type}</td>
                      <td className="p-4">{item.quantity_available} {item.unit}s</td>
                      <td className="p-4">
                        {isLow ? (
                          <span className="inline-flex items-center gap-1 text-red-500 text-sm font-medium bg-red-500/10 px-2 py-1 rounded-full">
                            <TrendingDown size={14} /> Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-green-500 text-sm font-medium bg-green-500/10 px-2 py-1 rounded-full">
                            Optimal
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SmartInventory;
