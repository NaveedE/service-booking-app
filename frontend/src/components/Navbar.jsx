import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    navigate("/login");
  };

  return (

    <div className="bg-white shadow-md px-10 py-4 flex justify-between items-center">

      <h1
        className="text-3xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        ServiceHub
      </h1>

      <div className="flex gap-5 items-center">

        {!role && (

          <>
            <button
              onClick={() => navigate("/login")}
              className="text-lg"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Signup
            </button>
          </>
        )}

        {role && (

          <>
            <p className="font-semibold capitalize">
              {role}
            </p>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </div>
  );
}

export default Navbar;