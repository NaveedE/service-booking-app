import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function VendorDashboard() {
  const [formData, setFormData] = useState({ title: "", description: "", price: "" });
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);

  const fetchData = async () => {
    try {
      const [bRes, sRes] = await Promise.all([API.get("/bookings"), API.get("/services")]);
      setBookings(bRes.data);
      setServices(sRes.data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddService = async () => {
    try {
      await API.post("/services", formData);
      fetchData();
      setFormData({ title: "", description: "", price: "" });
    } catch (err) { console.log(err); }
  };

  const updateStatus = async (id, action) => {
    try {
      await API.put(`/bookings/${id}/${action}`);
      fetchData();
    } catch (err) { console.log(err); }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <header className="bg-white border-b border-slate-200 py-6 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Vendor Console</h1>
            <p className="text-slate-500 text-sm">Control your offerings and orders</p>
          </div>
          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">● System Live</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: FORM */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-6 underline decoration-indigo-200 decoration-4">Add Service</h2>
            <div className="space-y-4">
              <input name="title" value={formData.title} placeholder="Title" onChange={handleChange} className="w-full border border-slate-200 p-3 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              <textarea name="description" value={formData.description} placeholder="Description" onChange={handleChange} rows="3" className="w-full border border-slate-200 p-3 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              <input name="price" type="number" value={formData.price} placeholder="Price ₹" onChange={handleChange} className="w-full border border-slate-200 p-3 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              <button onClick={handleAddService} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-all text-sm uppercase tracking-widest">Publish</button>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-black text-slate-800 uppercase text-xs tracking-widest px-1">Active Services</h2>
            {services.map(s => (
              <div key={s.id} className="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center shadow-sm">
                <div><h3 className="font-bold text-slate-900 text-sm">{s.title}</h3><p className="text-xs text-slate-500">₹{s.price}</p></div>
                <button onClick={async () => { await API.delete(`/services/${s.id}`); fetchData(); }} className="text-slate-300 hover:text-red-500 transition-colors text-lg">🗑️</button>
              </div>
            ))}
          </section>
        </div>

        {/* RIGHT COLUMN: BOOKINGS */}
        <div className="lg:col-span-8 overflow-hidden">
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h2 className="font-black text-slate-800 uppercase text-xs tracking-widest">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <tr><th className="px-6 py-4">Customer</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-900">{b.customer_name}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{b.service_title} • ₹{b.service_price}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${b.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{b.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {b.status === 'pending' && <button onClick={() => updateStatus(b.id, 'accept')} className="bg-indigo-600 text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700">Accept</button>}
                          {b.status === 'accepted' && <button onClick={() => updateStatus(b.id, 'deliver')} className="bg-emerald-600 text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-700">Mark Done</button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default VendorDashboard;