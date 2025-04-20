import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';

const ProfilePage = () => {
  // Mock user data - in a real app, this would come from Redux store
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    userType: 'buyer',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
  });

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordForm, setPasswordForm] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Update user logic would go here
    setMessage({ type: 'success', text: 'Profile updated successfully!' });
    setTimeout(() => setMessage(null), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    
    // Password update logic would go here
    setMessage({ type: 'success', text: 'Password updated successfully!' });
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      {message && (
        <div 
          className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          {message.text}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Profile picture section */}
          <div className="md:w-1/3 bg-gray-50 p-6 flex flex-col items-center">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-bold mb-1">{user.name}</h2>
            <p className="text-gray-600 mb-4">{user.userType === 'buyer' ? 'Buyer/Tenant' : 'Agent/Seller'}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
              Change Photo
            </button>
          </div>
          
          {/* Profile form section */}
          <div className="md:w-2/3 p-6">
            <div className="flex mb-4 border-b">
              <button 
                onClick={() => setPasswordForm(false)}
                className={`pb-2 px-4 font-medium ${!passwordForm ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              >
                Personal Info
              </button>
              <button 
                onClick={() => setPasswordForm(true)}
                className={`pb-2 px-4 font-medium ${passwordForm ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              >
                Change Password
              </button>
            </div>
            
            {!passwordForm ? (
              <form onSubmit={handleProfileSubmit}>
                <div className="mb-4">
                  <label className="flex items-center mb-2 text-sm font-medium">
                    <FaUser className="mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="flex items-center mb-2 text-sm font-medium">
                    <FaEnvelope className="mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="flex items-center mb-2 text-sm font-medium">
                    <FaPhone className="mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-4">
                  <label className="flex items-center mb-2 text-sm font-medium">
                    <FaLock className="mr-2" />
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="flex items-center mb-2 text-sm font-medium">
                    <FaLock className="mr-2" />
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="flex items-center mb-2 text-sm font-medium">
                    <FaLock className="mr-2" />
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Update Password
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 