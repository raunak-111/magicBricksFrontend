import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome } from 'react-icons/fa';
import { register, reset } from '../redux/slices/authSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { userInfo, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: 'buyer', // default user type
  });

  const [errors, setErrors] = useState({});

  const { name, email, password, confirmPassword, phone, userType } = formData;

  useEffect(() => {
    // If registration was successful or user is already logged in
    if (isSuccess || userInfo) {
      navigate('/');
    }

    // Reset the auth state on component unmount
    return () => {
      dispatch(reset());
    }
  }, [isSuccess, userInfo, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!phone) newErrors.phone = 'Phone number is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Register the user using Redux
    const userData = {
      name,
      email,
      password,
      phone,
      role: userType === 'agent' ? 'agent' : 'user'
    };
    
    dispatch(register(userData));
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
      
      {isError && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{message}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="flex items-center mb-2 text-sm font-medium">
            <FaUser className="mr-2" />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="flex items-center mb-2 text-sm font-medium">
            <FaEnvelope className="mr-2" />
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900"
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="flex items-center mb-2 text-sm font-medium">
            <FaLock className="mr-2" />
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900"
            placeholder="******"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label className="flex items-center mb-2 text-sm font-medium">
            <FaLock className="mr-2" />
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900"
            placeholder="******"
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>

        <div className="mb-4">
          <label className="flex items-center mb-2 text-sm font-medium">
            <FaPhone className="mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900"
            placeholder="+1 (123) 456-7890"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div className="mb-4">
          <label className="flex items-center mb-2 text-sm font-medium">
            <FaHome className="mr-2" />
            I am a:
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="buyer"
                checked={userType === 'buyer'}
                onChange={handleChange}
                className="mr-2"
              />
              Buyer/Tenant
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="agent"
                checked={userType === 'agent'}
                onChange={handleChange}
                className="mr-2"
              />
              Agent/Seller
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage; 