import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer"
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/signup",
        formData
      );

      console.log(res.data);

      alert(
        `${res.data.message}\nOTP: ${res.data.otp || "OTP not received"}`
      );

      navigate("/verify-otp", {
        state: {
          email: formData.email
        }
      });

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.detail ||
        "Something went wrong"
      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">

      <div className="w-full max-w-md space-y-8 bg-white p-6 sm:p-10 rounded-xl border border-slate-200 shadow-sm">

        <div className="text-center">

          <h2 className="text-3xl font-black text-slate-900">
            Create account
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Join our community of professionals
          </p>

        </div>

        <form
          className="mt-8 space-y-4"
          onSubmit={handleSignup}
        >

          <div className="grid grid-cols-1 gap-4">

            <div>

              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Full Name
              </label>

              <input
                name="name"
                type="text"
                required
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="John Doe"
              />

            </div>

            <div>

              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Email
              </label>

              <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="you@example.com"
              />

            </div>

            <div>

              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Password
              </label>

              <input
                name="password"
                type="password"
                required
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="••••••••"
              />

            </div>

            <div>

              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Role
              </label>

              <select
                name="role"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >

                <option value="customer">
                  Customer
                </option>

                <option value="vendor">
                  Vendor
                </option>

              </select>

            </div>

          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-md active:scale-95"
          >
            Signup
          </button>

        </form>

        <p className="text-center text-sm text-slate-600 mt-6">

          Already have an account?

          {" "}

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-bold hover:underline"
          >
            Log in
          </button>

        </p>

      </div>

    </div>
  );
}

export default Signup;