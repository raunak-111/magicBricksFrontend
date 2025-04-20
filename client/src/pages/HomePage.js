import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFeaturedProperties } from '../redux/slices/propertySlice';
import { FaSearch, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';

const HomePage = () => {
  const [searchType, setSearchType] = useState('buy');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [budget, setBudget] = useState('');

  const dispatch = useDispatch();
  const { featuredProperties, isLoading } = useSelector((state) => state.property);

  useEffect(() => {
    dispatch(getFeaturedProperties());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Build query parameters
    const params = new URLSearchParams();
    
    if (searchType === 'buy') {
      params.append('status', 'for-sale');
    } else if (searchType === 'rent') {
      params.append('status', 'for-rent');
    }
    
    if (location) params.append('city', location);
    if (propertyType) params.append('type', propertyType);
    if (budget) {
      const [min, max] = budget.split('-');
      if (min) params.append('minPrice', min);
      if (max) params.append('maxPrice', max);
    }
    
    window.location.href = `/properties?${params.toString()}`;
  };

  // Function to format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary text-white py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Find Your Dream Property
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Search from millions of properties for sale and rent across India
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto transform -translate-y-0 md:-translate-y-6">
            <div className="flex justify-center mb-4">
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                    searchType === 'buy'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSearchType('buy')}
                >
                  Buy
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium ${
                    searchType === 'rent'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSearchType('rent')}
                >
                  Rent
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                    searchType === 'sell'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSearchType('sell')}
                >
                  Sell
                </button>
              </div>
            </div>

            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="location"
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-1 sm:text-sm p-2 border text-gray-900"
                      placeholder="City, Locality"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="property-type" className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type
                  </label>
                  <select
                    id="property-type"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-1 sm:text-sm p-2 border text-gray-900"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option value="">All Property Types</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="office">Office Space</option>
                    <option value="shop">Shop</option>
                    <option value="land">Land</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                    Budget
                  </label>
                  <select
                    id="budget"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary focus:ring-1 sm:text-sm p-2 border text-gray-900"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    <option value="">All Budgets</option>
                    <option value="0-2000000">Under ₹20 Lakh</option>
                    <option value="2000000-5000000">₹20 Lakh - ₹50 Lakh</option>
                    <option value="5000000-10000000">₹50 Lakh - ₹1 Crore</option>
                    <option value="10000000-20000000">₹1 Crore - ₹2 Crore</option>
                    <option value="20000000-50000000">₹2 Crore - ₹5 Crore</option>
                    <option value="50000000-">Above ₹5 Crore</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full bg-primary text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <FaSearch className="mr-2" />
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary">Featured Properties</h2>
            <Link to="/properties" className="text-primary hover:text-red-700 font-medium">
              View All Properties
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-10">
              <div className="spinner"></div>
              <p className="mt-4 text-gray-600">Loading properties...</p>
            </div>
          ) : featuredProperties.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600">No featured properties found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((property) => (
                <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Link to={`/properties/${property._id}`}>
                    <div className="relative h-48 md:h-56">
                      <img
                        src={property.images[0] || 'https://via.placeholder.com/500x300?text=No+Image'}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1 m-2 rounded-md text-sm font-medium">
                        {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link to={`/properties/${property._id}`}>
                      <h3 className="text-lg font-semibold text-secondary hover:text-primary mb-2 truncate">
                        {property.title}
                      </h3>
                    </Link>
                    <div className="flex items-center text-gray-500 mb-2">
                      <FaMapMarkerAlt className="mr-1" />
                      <span className="truncate">{property.address.city}, {property.address.state}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-gray-700">
                        <FaBed className="mr-1" />
                        <span className="mr-3">{property.bedrooms}</span>
                        <FaBath className="mr-1" />
                        <span className="mr-3">{property.bathrooms}</span>
                        <FaRulerCombined className="mr-1" />
                        <span>{property.area} sq.ft</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-bold text-primary">
                        {formatPrice(property.price)}
                        {property.status === 'for-rent' && <span className="text-sm text-gray-500">/month</span>}
                      </div>
                      <Link
                        to={`/properties/${property._id}`}
                        className="px-3 py-1 bg-secondary text-white rounded hover:bg-blue-900 text-sm"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">Why Choose MagicBricks</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the most comprehensive property search experience with unique features to make your property journey easier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary bg-opacity-10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Wide Range of Properties</h3>
              <p className="text-gray-600">
                Explore from thousands of verified properties across various locations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary bg-opacity-10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Listings</h3>
              <p className="text-gray-600">
                All properties are verified by our team to ensure authenticity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary bg-opacity-10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Best Deals</h3>
              <p className="text-gray-600">
                Get the best deals and offers on properties across India.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary bg-opacity-10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our dedicated team is always ready to assist you with any query.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 