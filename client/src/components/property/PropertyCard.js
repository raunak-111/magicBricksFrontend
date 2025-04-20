import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/slices/authSlice';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaHeart } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  // Check if property is in user's favorites
  const isFavorite = userInfo?.favorites?.includes(property._id);

  // Function to handle toggling favorites
  const handleToggleFavorite = () => {
    if (!userInfo) {
      // Redirect to login if not logged in
      window.location.href = '/login';
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(property._id));
    } else {
      dispatch(addToFavorites(property._id));
    }
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
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
          {property.featured && (
            <div className="absolute top-0 right-0 bg-secondary text-white px-3 py-1 m-2 rounded-md text-sm font-medium">
              Featured
            </div>
          )}
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
          
          <div className="flex space-x-2">
            {userInfo && (
              <button
                onClick={handleToggleFavorite}
                className={`p-2 rounded-full ${
                  isFavorite
                    ? 'text-red-500 hover:text-red-700'
                    : 'text-gray-400 hover:text-red-500'
                }`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <FaHeart />
              </button>
            )}
            
            <Link
              to={`/properties/${property._id}`}
              className="px-3 py-1 bg-secondary text-white rounded hover:bg-blue-900 text-sm"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard; 