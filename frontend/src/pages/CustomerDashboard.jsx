import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function CustomerDashboard() {
  const [services, setServices] = useState([]);
  const [myBookings, setMyBookings] = useState([]);

  const fetchData = async () => {
    try {
      const [sRes, bRes] = await Promise.all([
        API.get("/services"),
        API.get("/bookings/my-bookings")
      ]);
      setServices(sRes.data);
      setMyBookings(bRes.data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBooking = async (serviceId) => {
    try {
      const res = await API.post("/bookings", { service_id: serviceId });
      alert(res.data.message);
      fetchData();
    } catch (err) { console.log(err); }
  };

  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === "confirmed" || s === "delivered") return "bg-green-100 text-green-700";
    if (s === "pending") return "bg-amber-100 text-amber-700";
    return "bg-blue-100 text-blue-700";
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] pb-10">
      <Navbar />
      <div className="bg-gradient-to-b from-[#051322] to-[#15457b] pt-12 pb-24 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">Services</h1>
        <p className="text-blue-200 text-sm opacity-80">Book professional help at your doorstep</p>
      </div>

      <div className="max-w-7xl mx-auto -mt-12 px-4">
        <div className="bg-white rounded-xl shadow-lg p-1 overflow-hidden">
          <div className="flex border-b border-gray-100 px-6 py-4">
            <span className="text-blue-600 font-bold border-b-4 border-blue-600 pb-4 -mb-4 text-xs uppercase tracking-wider">Available Services</span>
          </div>
          <div className="p-4 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const booking = myBookings.find(b => b.service_id === service.id);
              return (
                <div key={service.id} className="flex flex-col border border-gray-100 rounded-2xl p-6 hover:shadow-2xl transition-all bg-white group">
                  <h2 className="text-xl font-black text-slate-800 mb-2">{service.title}</h2>
                  <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">{service.description}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto pt-4 border-t border-gray-50 gap-4">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Price</p>
                      <p className="text-2xl font-black text-slate-900">₹{service.price}</p>
                    </div>
                    {!booking ? (
                      <button onClick={() => handleBooking(service.id)} className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-md transition-all active:scale-95">Book</button>
                    ) : (
                      <div className="text-left sm:text-right">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${getStatusStyle(booking.status)}`}>{booking.status}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;