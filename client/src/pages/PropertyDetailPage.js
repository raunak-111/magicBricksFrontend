import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPropertyById } from '../redux/slices/propertySlice';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaPhone, FaHeart } from 'react-icons/fa';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { property, isLoading, isError, message } = useSelector((state) => state.property);
  
  useEffect(() => {
    dispatch(getPropertyById(id));
  }, [id, dispatch]);

  // Format price to INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl text-red-600 mb-4">Error Loading Property</h2>
        <p>{message}</p>
        <Link to="/properties" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">
          Back to Properties
        </Link>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl mb-4">Property Not Found</h2>
        <Link to="/properties" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">
          Back to Properties
        </Link>
      </div>
    );
  }

  const defaultImage = "https://via.placeholder.com/800x600?text=No+Image";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Property Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <p className="flex items-center text-gray-600 mb-2">
            <FaMapMarkerAlt className="mr-2" />
            {property.address?.street}, {property.address?.city}, {property.address?.state}
          </p>
          <div className="flex gap-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {property.type?.charAt(0).toUpperCase() + property.type?.slice(1)}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
            </span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-3xl font-bold text-blue-600">{formatPrice(property.price)}</p>
        </div>
      </div>

      {/* Property Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {property.images && property.images.length > 0 ? (
          property.images.map((image, index) => (
            <div key={index} className={index === 0 ? "col-span-1 md:col-span-2 lg:col-span-2 row-span-2" : ""}>
              <img 
                src={image} 
                alt={`${property.title} - view ${index + 1}`} 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2">
            <img 
              src={defaultImage} 
              alt="No property image available" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4">About This Property</h2>
            <p className="text-gray-700 mb-6">{property.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <FaBed className="text-blue-500 text-2xl mb-2" />
                <span className="font-bold text-lg">{property.bedrooms}</span>
                <span className="text-gray-600 text-sm">Bedrooms</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <FaBath className="text-blue-500 text-2xl mb-2" />
                <span className="font-bold text-lg">{property.bathrooms}</span>
                <span className="text-gray-600 text-sm">Bathrooms</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <FaRulerCombined className="text-blue-500 text-2xl mb-2" />
                <span className="font-bold text-lg">{property.area}</span>
                <span className="text-gray-600 text-sm">Sq. Ft.</span>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-3">Features</h3>
            <ul className="grid grid-cols-2 gap-2">
              {property.amenities && property.amenities.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
              {property.parking && (
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Parking
                </li>
              )}
              {property.furnishing && property.furnishing !== 'unfurnished' && (
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {property.furnishing === 'fully-furnished' ? 'Fully Furnished' : 'Semi-Furnished'}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Agent Info and Sidebar */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold mb-4">Contact Agent</h3>
            {property.owner ? (
              <>
                <div className="flex items-center mb-4">
                  <img 
                    src={property.owner.profilePicture || "https://randomuser.me/api/portraits/men/1.jpg"} 
                    alt={property.owner.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover" 
                  />
                  <div>
                    <p className="font-bold">{property.owner.name}</p>
                    <p className="text-gray-600 text-sm">{property.owner.email}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <a 
                    href={`tel:${property.owner.phone}`}
                    className="flex items-center justify-center w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                  >
                    <FaPhone className="mr-2" />
                    Call Agent
                  </a>
                  <button 
                    className="flex items-center justify-center w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50"
                  >
                    <FaHeart className="mr-2" />
                    Add to Favorites
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-600">Agent information not available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage; 