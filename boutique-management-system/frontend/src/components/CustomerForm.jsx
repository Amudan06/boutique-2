import React, { useState } from 'react';
import axios from 'axios';
import { Ruler } from 'lucide-react';

const CustomerForm = ({ onCustomerAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    chest: '',
    waist: '',
    shoulder: '',
    neck: '',
    back_width: '',
    hip: '',
    inseam: '',
    outseam: '',
    thigh: '',
    knee: '',
    calf: '',
    ankle: '',
    sleeve_length: '',
    armhole: '',
    wrist: '',
    front_length: '',
    back_length: '',
    body_type: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Create Customer
      const customerPayload = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      };
      const customerRes = await axios.post('http://localhost:5000/customers', customerPayload);
      const newCustomer = customerRes.data;

      // 2. Check if any measurement data is provided
      const measurementFields = ['chest', 'waist', 'shoulder', 'neck', 'back_width', 'hip', 'inseam', 'outseam', 'thigh', 'knee', 'calf', 'ankle', 'sleeve_length', 'armhole', 'wrist', 'front_length', 'back_length', 'body_type'];
      const hasMeasurements = measurementFields.some(field => formData[field] !== '');
      
      if (hasMeasurements) {
        const measurementPayload = {
          customer_id: newCustomer.id,
          measurement_date: new Date().toISOString().split('T')[0],
          chest: formData.chest || null,
          waist: formData.waist || null,
          hip: formData.hip || null,
          shoulder: formData.shoulder || null,
          sleeve_length: formData.sleeve_length || null,
          armhole: formData.armhole || null,
          bicep: null, // Note: added bicep to db but not in current form
          wrist: formData.wrist || null,
          neck: formData.neck || null,
          back_width: formData.back_width || null,
          front_length: formData.front_length || null,
          back_length: formData.back_length || null,
          inseam: formData.inseam || null,
          outseam: formData.outseam || null,
          thigh: formData.thigh || null,
          knee: formData.knee || null,
          calf: formData.calf || null,
          ankle: formData.ankle || null,
          body_type: formData.body_type || null,
          notes: formData.notes || null,
          created_by: 1 // Default admin user ID
        };
        // The mount path might be /measurements or /api/measurements. Assuming /measurements based on /customers
        await axios.post('http://localhost:5000/measurements/history', measurementPayload);
      }

      onCustomerAdded(newCustomer);
      
      // Reset form
      setFormData({
        name: '', phone: '', address: '', chest: '', waist: '', shoulder: '', neck: '', back_width: '', 
        hip: '', inseam: '', outseam: '', thigh: '', knee: '', calf: '', ankle: '', sleeve_length: '', 
        armhole: '', wrist: '', front_length: '', back_length: '', body_type: '', notes: ''
      });
      alert('Customer and measurements saved successfully!');
    } catch (error) {
      console.error('Error adding customer or measurements:', error);
      alert('Failed to add customer. Ensure backend server is running and routes match.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm mb-8 space-y-8">
      {/* Basic Info Section */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-4">Add New Customer</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
            <input
              type="text" name="name" value={formData.name} onChange={handleChange} required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
            <input
              type="tel" name="phone" value={formData.phone} onChange={handleChange} required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Address & Notes</label>
            <textarea
              name="address" value={formData.address} onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-24 resize-none"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Body Measurements Section */}
      <div className="border-t border-slate-100 pt-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Ruler className="text-indigo-600" size={24} /> Body Measurements <span className="text-sm font-normal text-slate-500">(Optional)</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Upper Body */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
            <h4 className="font-semibold text-indigo-700 border-b border-indigo-100 pb-2">Upper Body (inches)</h4>
            <div><label className="text-sm font-medium text-slate-600">Chest</label><input type="number" step="0.1" name="chest" value={formData.chest} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-indigo-500" /></div>
            <div><label className="text-sm font-medium text-slate-600">Waist</label><input type="number" step="0.1" name="waist" value={formData.waist} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-indigo-500" /></div>
            <div><label className="text-sm font-medium text-slate-600">Shoulder</label><input type="number" step="0.1" name="shoulder" value={formData.shoulder} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-indigo-500" /></div>
            <div><label className="text-sm font-medium text-slate-600">Neck</label><input type="number" step="0.1" name="neck" value={formData.neck} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-indigo-500" /></div>
            <div><label className="text-sm font-medium text-slate-600">Back Width</label><input type="number" step="0.1" name="back_width" value={formData.back_width} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-indigo-500" /></div>
          </div>
          
          {/* Lower Body */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
            <h4 className="font-semibold text-indigo-700 border-b border-indigo-100 pb-2">Lower Body (inches)</h4>
            <div><label className="text-sm font-medium text-slate-600">Hip</label><input type="number" step="0.1" name="hip" value={formData.hip} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-indigo-500" /></div>
            <div><label className="text-sm font-medium text-slate-600">Inseam</label><input type="number" step="0.1" name="inseam" value={formData.inseam} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-indigo-500" /></div>
            <div><label className="text-sm font-medium text-slate-600">Outseam</label><input type="number" step="0.1" name="outseam" value={formData.outseam} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-indigo-500" /></div>
            <div className="flex gap-2">
              <div className="flex-1"><label className="text-sm font-medium text-slate-600">Thigh</label><input type="number" step="0.1" name="thigh" value={formData.thigh} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-indigo-500" /></div>
              <div className="flex-1"><label className="text-sm font-medium text-slate-600">Knee</label><input type="number" step="0.1" name="knee" value={formData.knee} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-indigo-500" /></div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1"><label className="text-sm font-medium text-slate-600">Calf</label><input type="number" step="0.1" name="calf" value={formData.calf} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-indigo-500" /></div>
              <div className="flex-1"><label className="text-sm font-medium text-slate-600">Ankle</label><input type="number" step="0.1" name="ankle" value={formData.ankle} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-indigo-500" /></div>
            </div>
          </div>

          {/* Arms & Details */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
            <h4 className="font-semibold text-indigo-700 border-b border-indigo-100 pb-2">Arms & Details</h4>
            <div><label className="text-sm font-medium text-slate-600">Sleeve Length</label><input type="number" step="0.1" name="sleeve_length" value={formData.sleeve_length} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-indigo-500" /></div>
            <div className="flex gap-2">
              <div className="flex-1"><label className="text-sm font-medium text-slate-600">Armhole</label><input type="number" step="0.1" name="armhole" value={formData.armhole} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-indigo-500" /></div>
              <div className="flex-1"><label className="text-sm font-medium text-slate-600">Wrist</label><input type="number" step="0.1" name="wrist" value={formData.wrist} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-indigo-500" /></div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1"><label className="text-sm font-medium text-slate-600">Front Len.</label><input type="number" step="0.1" name="front_length" value={formData.front_length} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-indigo-500" /></div>
              <div className="flex-1"><label className="text-sm font-medium text-slate-600">Back Len.</label><input type="number" step="0.1" name="back_length" value={formData.back_length} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-indigo-500" /></div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Body Type</label>
              <select name="body_type" value={formData.body_type} onChange={handleChange} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md outline-none focus:border-indigo-500 bg-white">
                <option value="">Select...</option>
                <option value="Slim">Slim</option>
                <option value="Athletic">Athletic</option>
                <option value="Average">Average</option>
                <option value="Plus">Plus</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-100">
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-70 text-lg w-full md:w-auto"
        >
          {loading ? 'Processing...' : 'Save Customer & Measurements'}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
