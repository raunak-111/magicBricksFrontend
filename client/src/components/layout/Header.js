import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { FaUser, FaSignOutAlt, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/properties?search=${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">Magic</span>
            <span className="text-2xl font-bold text-secondary">Bricks</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link to="/properties" className="text-gray-700 hover:text-primary">
              Properties
            </Link>
            <Link to="/agents" className="text-gray-700 hover:text-primary">
              Agents
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary">
              Contact Us
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search properties..."
                className="px-4 py-2 border border-gray-300 rounded-l focus:outline-none text-gray-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="bg-primary text-white p-2 rounded-r hover:bg-red-700"
              >
                <FaSearch />
              </button>
            </form>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {userInfo ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-primary">
                  <FaUser />
                  <span>{userInfo.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  {(userInfo.role === 'agent' || userInfo.role === 'admin') && (
                    <Link
                      to="/my-properties"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      My Properties
                    </Link>
                  )}
                  <Link
                    to="/favorites"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Favorites
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-primary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-red-700"
                >
                  Sign Up
                </Link>
              </>
            )}
            {(userInfo?.role === 'agent' || userInfo?.role === 'admin') && (
              <Link
                to="/add-property"
                className="px-4 py-2 bg-secondary text-white rounded hover:bg-blue-900"
              >
                Add Property
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none text-gray-900"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-primary text-white p-2 rounded-r hover:bg-red-700"
                >
                  <FaSearch />
                </button>
              </div>
            </form>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/properties"
                className="text-gray-700 hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                to="/agents"
                className="text-gray-700 hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Agents
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-primary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              {userInfo ? (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-primary py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  {(userInfo.role === 'agent' || userInfo.role === 'admin') && (
                    <Link
                      to="/my-properties"
                      className="text-gray-700 hover:text-primary py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Properties
                    </Link>
                  )}
                  <Link
                    to="/favorites"
                    className="text-gray-700 hover:text-primary py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Favorites
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-gray-700 hover:text-primary py-2 flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-primary py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-700 hover:text-primary py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              {(userInfo?.role === 'agent' || userInfo?.role === 'admin') && (
                <Link
                  to="/add-property"
                  className="bg-secondary text-white rounded py-2 px-4 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Property
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 