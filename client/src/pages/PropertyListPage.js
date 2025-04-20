import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getProperties } from '../redux/slices/propertySlice';
import PropertyCard from '../components/property/PropertyCard';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const PropertyListPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { properties, isLoading, page, pages, totalProperties } = useSelector((state) => state.property);

  const [filters, setFilters] = useState({
    status: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    city: '',
    furnishing: '',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Extract query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialFilters = {
      status: params.get('status') || '',
      type: params.get('type') || '',
      minPrice: params.get('minPrice') || '',
      maxPrice: params.get('maxPrice') || '',
      bedrooms: params.get('bedrooms') || '',
      bathrooms: params.get('bathrooms') || '',
      city: params.get('city') || '',
      furnishing: params.get('furnishing') || '',
    };
    setFilters(initialFilters);
    setCurrentPage(Number(params.get('page')) || 1);
  }, [location.search]);

  // Fetch properties based on filters and page
  useEffect(() => {
    const queryParams = { ...filters, page: currentPage };
    // Remove empty values
    Object.keys(queryParams).forEach(
      (key) => !queryParams[key] && delete queryParams[key]
    );
    dispatch(getProperties(queryParams));
  }, [dispatch, filters, currentPage]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setIsFilterOpen(false);
    // Build query string and update URL
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        queryParams.append(key, filters[key]);
      }
    });
    queryParams.append('page', '1');
    window.history.pushState({}, '', `${location.pathname}?${queryParams.toString()}`);
  };

  const handleReset = () => {
    setFilters({
      status: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      city: '',
      furnishing: '',
    });
    setCurrentPage(1);
    window.history.pushState({}, '', location.pathname);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pages) return;
    setCurrentPage(newPage);
    // Update URL with new page
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', newPage.toString());
    window.history.pushState({}, '', `${location.pathname}?${queryParams.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-secondary">
          Properties
          {filters.city && ` in ${filters.city}`}
          {filters.status === 'for-sale' && ' for Sale'}
          {filters.status === 'for-rent' && ' for Rent'}
        </h1>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center bg-secondary text-white px-4 py-2 rounded-md hover:bg-blue-900 md:hidden"
        >
          {isFilterOpen ? <FaTimes className="mr-2" /> : <FaFilter className="mr-2" />}
          {isFilterOpen ? 'Close' : 'Filter'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter Sidebar */}
        <div
          className={`md:w-1/4 bg-white rounded-lg shadow-md p-4 ${
            isFilterOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={handleReset}
              className="text-primary hover:text-red-700 text-sm font-medium"
            >
              Reset All
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Property Status */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Status</label>
              <div className="grid grid-cols-2 gap-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="for-sale"
                    checked={filters.status === 'for-sale'}
                    onChange={handleFilterChange}
                    className="form-radio h-4 w-4 text-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">For Sale</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="for-rent"
                    checked={filters.status === 'for-rent'}
                    onChange={handleFilterChange}
                    className="form-radio h-4 w-4 text-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">For Rent</span>
                </label>
              </div>
            </div>

            {/* Property Type */}
            <div className="mb-4">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select
                id="type"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border"
              >
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="office">Office Space</option>
                <option value="shop">Shop</option>
                <option value="land">Land</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border"
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border"
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div className="mb-4">
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms
              </label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            {/* Bathrooms */}
            <div className="mb-4">
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms
              </label>
              <select
                id="bathrooms"
                name="bathrooms"
                value={filters.bathrooms}
                onChange={handleFilterChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            {/* City */}
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter city"
                value={filters.city}
                onChange={handleFilterChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border"
              />
            </div>

            {/* Furnishing */}
            <div className="mb-4">
              <label htmlFor="furnishing" className="block text-sm font-medium text-gray-700 mb-1">
                Furnishing
              </label>
              <select
                id="furnishing"
                name="furnishing"
                value={filters.furnishing}
                onChange={handleFilterChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border"
              >
                <option value="">Any</option>
                <option value="unfurnished">Unfurnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="fully-furnished">Fully-Furnished</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <FaSearch className="mr-2" />
              Apply Filters
            </button>
          </form>
        </div>

        {/* Property List */}
        <div className="md:w-3/4">
          {isLoading ? (
            <div className="text-center py-10">
              <div className="spinner"></div>
              <p className="mt-4 text-gray-600">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">No properties found matching your criteria.</p>
              <button
                onClick={handleReset}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-red-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-gray-600">
                  Showing {properties.length} of {totalProperties} properties
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="flex items-center">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`mx-1 px-3 py-2 rounded-md ${
                        currentPage === 1
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Previous
                    </button>

                    {[...Array(pages).keys()].map((x) => (
                      <button
                        key={x + 1}
                        onClick={() => handlePageChange(x + 1)}
                        className={`mx-1 px-3 py-2 rounded-md ${
                          currentPage === x + 1
                            ? 'bg-primary text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {x + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === pages}
                      className={`mx-1 px-3 py-2 rounded-md ${
                        currentPage === pages
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyListPage; 