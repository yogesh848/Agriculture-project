import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios"


export const Register = () => {
  const [name, SetName] = useState()
  const [email, SetEmail] = useState()
  const [password, SetPassword] = useState()
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post("http://localhost:3001/register",{name,email,password})
    .then (result=>{ console.log(result)
  
    navigate("/")
  })
    .catch (err => console.log(err))
  }
  return (
    <div className="relative w-full h-screen">
      <img className="w-full h-full object-cover" src="BG2.jpg" alt="bg" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-sm bg-white opacity-90 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                onChange={(e) => SetName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                onChange={(e) => SetEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                onChange={(e) => SetPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-800 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
