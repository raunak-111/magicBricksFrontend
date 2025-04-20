import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message) newErrors.message = 'Message is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Here we would send the data to an API endpoint
    console.log('Contact form data:', formData);
    
    // Show success message and reset form
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setErrors({});
  };
  
  const officeLocations = [
    {
      city: 'Mumbai',
      address: '123 Business Park, Andheri East, Mumbai, Maharashtra 400069',
      phone: '+91 22 4567 8901',
      email: 'mumbai@magicbricks.com',
      hours: 'Mon-Sat: 9:00 AM - 6:00 PM'
    },
    {
      city: 'Delhi',
      address: '456 Corporate Tower, Connaught Place, New Delhi 110001',
      phone: '+91 11 2345 6789',
      email: 'delhi@magicbricks.com',
      hours: 'Mon-Sat: 9:00 AM - 6:00 PM'
    },
    {
      city: 'Bangalore',
      address: '789 Tech Park, Whitefield, Bangalore, Karnataka 560066',
      phone: '+91 80 3456 7890',
      email: 'bangalore@magicbricks.com',
      hours: 'Mon-Sat: 9:00 AM - 6:00 PM'
    }
  ];
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-gray-600 mb-8 max-w-3xl">
        Have questions about our properties or services? We're here to help. Reach out to our team through the form below or contact one of our offices directly.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {officeLocations.map((office, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">{office.city} Office</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <p>{office.address}</p>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-blue-600 mr-3 flex-shrink-0" />
                <a href={`tel:${office.phone}`} className="hover:text-blue-600">{office.phone}</a>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-blue-600 mr-3 flex-shrink-0" />
                <a href={`mailto:${office.email}`} className="hover:text-blue-600">{office.email}</a>
              </div>
              <div className="flex items-center">
                <FaClock className="text-blue-600 mr-3 flex-shrink-0" />
                <p>{office.hours}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          
          {submitted ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-lg mb-2">Thank You!</h3>
              <p>Your message has been sent successfully. Our team will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg"
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                  placeholder="Property Inquiry"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full p-2.5 border border-gray-300 rounded-lg"
                  placeholder="I'm interested in a property..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Find Us on Map</h2>
          <div className="bg-gray-200 rounded-lg h-96 mb-6 flex items-center justify-center">
            {/* In a real app, we would embed a Google Map or similar here */}
            <p className="text-gray-500">Map will be displayed here</p>
          </div>
          
          <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
          <p className="text-gray-600 mb-4">
            Follow us on social media for the latest property listings, market updates, and real estate insights.
          </p>
          <div className="flex space-x-4">
            <a href="https://facebook.com/magicbricks" className="text-blue-600 hover:text-blue-800 text-2xl">
              <FaFacebook />
            </a>
            <a href="https://twitter.com/magicbricks" className="text-blue-400 hover:text-blue-600 text-2xl">
              <FaTwitter />
            </a>
            <a href="https://instagram.com/magicbricks" className="text-pink-600 hover:text-pink-800 text-2xl">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com/company/magicbricks" className="text-blue-800 hover:text-blue-900 text-2xl">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 