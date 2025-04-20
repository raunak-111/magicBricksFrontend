import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About MagicBricks</h3>
            <p className="text-gray-300 mb-4">
              MagicBricks is India's leading property portal that provides a platform for property buyers and sellers to connect in a convenient, effective and stress-free manner.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary">
                <FaLinkedin size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-primary">Properties</Link>
              </li>
              <li>
                <Link to="/agents" className="text-gray-300 hover:text-primary">Agents</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-primary">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?type=apartment" className="text-gray-300 hover:text-primary">Apartments</Link>
              </li>
              <li>
                <Link to="/properties?type=house" className="text-gray-300 hover:text-primary">Houses</Link>
              </li>
              <li>
                <Link to="/properties?type=villa" className="text-gray-300 hover:text-primary">Villas</Link>
              </li>
              <li>
                <Link to="/properties?type=office" className="text-gray-300 hover:text-primary">Commercial</Link>
              </li>
              <li>
                <Link to="/properties?type=land" className="text-gray-300 hover:text-primary">Land</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-primary" />
                <p className="text-gray-300">Times Square, 123 Main Street<br />New Delhi, 110001, India</p>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-3 text-primary" />
                <p className="text-gray-300">+91 12345 67890</p>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-primary" />
                <p className="text-gray-300">info@magicbricks.com</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <p className="text-center text-gray-300">
            &copy; {currentYear} MagicBricks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 