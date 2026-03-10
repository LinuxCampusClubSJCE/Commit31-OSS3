import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import  useAuth  from "../context/useAuth";
import api from "../api/client";

function Login() {
  
  const [error, setError] = useState("");
  const [isloading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      // Client validation
      if (!data.email || !data.password) {
        setError("All fields are required");
        return;
      }
  
      if (!emailRegex.test(data.email)) {
        setError("Invalid email format");
        return;
      }
    
    setisLoading(true);

    try {
      const result = await api.post("/api/auth/login", data);

      if (result.token) {
        const user = { _id: result._id, email: result.email, role: result.role };
        login(user, result.token);
        navigate("/"); 
      } else {
        setError("Invalid server response");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
    finally {
      setisLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white py-12 px-4 mt-15">
      <div className="max-w-md w-full border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-black uppercase mb-6 italic tracking-tighter">
          Login <span className="bg-yellow-300 px-2">UniFind</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
       

          <div className="flex flex-col">
            <label className="font-bold uppercase text-sm mb-1">Email</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="border-2 border-black p-2 focus:bg-yellow-300 outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-bold uppercase text-sm mb-1">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="border-2 border-black p-2 focus:bg-yellow-300 outline-none transition-colors"
            />
          </div>

      

          {error && (
            <div className="bg-red-500 text-white p-2 font-bold text-center border-2 border-black">
              {error}
            </div>
          )}

          <button 
            disabled={isloading}
            type="submit" 
            className="w-full bg-yellow-300 border-2 border-black py-3 font-black uppercase hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
          >
            {isloading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}


export default Login;