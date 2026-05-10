import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
    setIsOpen(false);
  };

  const navItemClasses = "text-slate-600 hover:text-blue-600 font-semibold transition-colors cursor-pointer text-sm uppercase tracking-wider";

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20 items-center">
          
          {/* LOGO */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
              <span className="text-white font-black text-xl">S</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter">
              Service<span className="text-blue-600">Hub</span>
            </h1>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            <span className={navItemClasses} onClick={() => navigate("/")}>Home</span>
            
            {!role ? (
              <div className="flex items-center gap-4 ml-4">
                <button 
                  onClick={() => navigate("/login")}
                  className="px-5 py-2 text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  LOG IN
                </button>
                <button 
                  onClick={() => navigate("/signup")}
                  className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95"
                >
                  SIGN UP
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6 ml-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                    {role}
                  </span>
                </div>
                <button 
                  onClick={logout}
                  className="px-5 py-2 border-2 border-red-50 text-red-500 text-sm font-bold rounded-full hover:bg-red-50 transition-colors"
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 p-2 outline-none"
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16m-7 6h7" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`md:hidden bg-white border-t border-slate-50 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-64' : 'max-h-0'}`}>
        <div className="px-4 pt-4 pb-6 space-y-4 shadow-inner">
          <div className="block py-2 text-base font-bold text-slate-700" onClick={() => {navigate("/"); setIsOpen(false);}}>Home</div>
          {!role ? (
            <div className="space-y-3">
              <button onClick={() => {navigate("/login"); setIsOpen(false);}} className="w-full text-left py-2 font-bold text-slate-700">Log In</button>
              <button onClick={() => {navigate("/signup"); setIsOpen(false);}} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold">Sign Up Free</button>
            </div>
          ) : (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Signed in as {role}</p>
              <button onClick={logout} className="w-full py-3 bg-red-50 text-red-500 rounded-xl font-bold">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;