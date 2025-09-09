import React, { useState, useContext } from 'react';
import bg from '../assets/authBg.png';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext.jsx';
import axios from 'axios';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl, setUserData } = useContext(userDataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );

      setUserData(result.data);
      navigate("/customize");
    } catch (error) {
      if (error.response?.data?.message) {
        setErr(error.response.data.message);
      } else if (error.message) {
        setErr(error.message);
      } else {
        setErr("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        onSubmit={handleSignUp}
        className="w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur 
                   shadow-lg shadow-black flex flex-col items-center justify-center 
                   gap-[20px] px-[20px]"
      >
        <h1 className="text-white text-[30px] font-semibold mb-[30px]">
          Register to <span className="text-blue-400">Voice Assistant</span>
        </h1>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Enter your Name"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent 
                     text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent 
                     text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <div className="w-full h-[60px] border-2 border-white bg-transparent text-white 
                        rounded-full text-[18px] relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-[60px] outline-none border-2 border-white bg-transparent 
                       text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {showPassword ? (
            <IoEyeOff
              className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoEye
              className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {/* Error Message */}
        {err && (
          <p className="text-red-500 text-[17px]">*{err}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold 
                     bg-white rounded-full text-[19px] disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        {/* Navigate to Sign In */}
        <p
          className="text-white text-[18px] cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account?{" "}
          <span className="text-blue-400">Sign In</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
