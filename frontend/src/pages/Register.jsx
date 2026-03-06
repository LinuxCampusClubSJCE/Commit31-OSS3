import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

function Register() {
  
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Registration failed");
        return;
      }

      if (result.user && result.token) {
        login(result.user, result.token);
        navigate("/"); 
      } else {
        navigate("/login", {
          state: { message: "Account created successfully. Please login." },
        });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white py-12 px-4 mt-15">
      <div className="max-w-md w-full border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-black uppercase mb-6 italic tracking-tighter">
          Join <span className="bg-yellow-300 px-2">UniFind</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-bold uppercase text-sm mb-1">Name</label>
            <input 
              name="name" 
              type="text" 
              required 
              className="border-2 border-black p-2 focus:bg-yellow-300 outline-none transition-colors"
            />
          </div>

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

          <div className="flex flex-col">
            <label className="font-bold uppercase text-sm mb-1">Confirm Password</label>
            <input 
              name="confirmPassword" 
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
            type="submit" 
            className="w-full bg-yellow-300 border-2 border-black py-3 font-black uppercase hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}


export default Register;