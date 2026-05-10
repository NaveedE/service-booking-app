import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async () => {
    try {
      const res = await API.post("/auth/verify-otp", { email, otp });
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.detail || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm text-center">
        <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-indigo-600 text-3xl">🛡️</div>
        <h1 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Security Check</h1>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">Enter the code sent to <span className="font-bold text-slate-800 break-all">{email || "your email"}</span></p>
        
        <div className="space-y-4">
          <input 
            type="text" 
            maxLength="6" 
            placeholder="000000" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            className="w-full text-center text-2xl tracking-[0.5em] font-mono border border-slate-300 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
          />
          <button onClick={handleVerify} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 shadow-md transition-all active:scale-95">Verify Account</button>
        </div>
        
        <button onClick={() => navigate("/signup")} className="mt-8 text-xs text-slate-400 font-bold uppercase tracking-widest hover:text-indigo-600 transition-colors">← Back to Signup</button>
      </div>
    </div>
  );
}

export default VerifyOTP;