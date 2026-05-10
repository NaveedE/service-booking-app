import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const services = [
    { title: "AC Repair", desc: "Expert technicians for all cooling needs.", icon: "❄️" },
    { title: "Plumbing", desc: "Leaking pipes? We've got you covered.", icon: "🚰" },
    { title: "Cleaning", desc: "Deep home cleaning by professionals.", icon: "🧹" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative bg-gradient-to-r from-[#0a2351] to-[#1259a2] pt-16 pb-32 sm:pt-24 sm:pb-48 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Home services, <span className="text-blue-400">on demand.</span>
          </h1>
          <p className="text-base sm:text-xl text-blue-100 opacity-90 max-w-2xl mx-auto mb-10">
            Find and book trusted professionals for AC repair, plumbing, and more with just a few clicks.
          </p>

          {/* RESPONSIVE SEARCH BAR */}
          <div className="max-w-4xl mx-auto bg-white p-2 rounded-2xl sm:rounded-full shadow-2xl flex flex-col md:flex-row items-center border border-white/20">
            <div className="w-full md:flex-grow px-6 py-3 text-left border-b md:border-b-0 md:border-r border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
              <input type="text" placeholder="Select your city" className="w-full outline-none text-gray-800 font-medium" />
            </div>
            <div className="w-full md:flex-grow px-6 py-3 text-left">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Search</p>
              <input type="text" placeholder="What are you looking for?" className="w-full outline-none text-gray-800 font-medium" />
            </div>
            <button className="w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-xl sm:rounded-full font-bold uppercase text-sm tracking-wider transition-all active:scale-95 hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* POPULAR SERVICES SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 sm:-mt-24 relative z-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-12 border border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Popular Services</h2>
              <p className="text-slate-500 font-medium mt-1">Top-rated professionals in your area</p>
            </div>
            <button onClick={() => navigate("/signup")} className="text-blue-600 font-bold text-sm uppercase tracking-wider text-left hover:text-blue-800">
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {services.map((service, index) => (
              <div key={index} className="group p-6 sm:p-8 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300">
                <div className="w-14 h-14 bg-white shadow-sm rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">{service.desc}</p>
                <div className="text-blue-600 font-bold text-xs uppercase tracking-widest cursor-pointer group-hover:translate-x-2 transition-transform">
                  Explore Now →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="text-center py-16 text-slate-400 text-xs font-bold uppercase tracking-widest">
        © 2026 Service App • Built for excellence
      </footer>
    </div>
  );
}

export default Home;