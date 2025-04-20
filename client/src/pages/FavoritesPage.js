import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaHeart, FaMapMarkerAlt } from 'react-icons/fa';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in a real app, would fetch from API
  useEffect(() => {
    setTimeout(() => {
      setFavorites([
        {
          id: 1,
          title: "Luxury Apartment with Sea View",
          price: 450000,
          address: "123 Ocean Drive, Mumbai, Maharashtra",
          bedrooms: 2,
          bathrooms: 2,
          area: 1200,
          type: "Apartment",
          status: "For Sale",
          image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop"
        },
        {
          id: 2,
          title: "Modern Villa with Garden",
          price: 750000,
          address: "456 Park Avenue, Delhi, Delhi",
          bedrooms: 4,
          bathrooms: 3,
          area: 2500,
          type: "Villa",
          status: "For Sale",
          image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&auto=format&fit=crop"
        },
        {
          id: 3,
          title: "Cozy Studio in City Center",
          price: 25000,
          address: "789 Main Street, Bangalore, Karnataka",
          bedrooms: 1,
          bathrooms: 1,
          area: 600,
          type: "Studio",
          status: "For Rent",
          image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(property => property.id !== id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Favorite Properties</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-2xl mb-4">No Favorite Properties</h2>
          <p className="text-gray-600 mb-6">You haven't added any properties to your favorites yet.</p>
          <Link 
            to="/properties" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Browse Properties
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(property => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-48 object-cover" 
                />
                <button 
                  onClick={() => removeFromFavorites(property.id)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-50"
                >
                  <FaHeart className="text-red-500" />
                </button>
                <div className="absolute bottom-0 left-0 bg-blue-600 text-white px-3 py-1">
                  {property.status}
                </div>
              </div>
              
              <div className="p-4">
                <Link to={`/properties/${property.id}`}>
                  <h2 className="text-xl font-bold mb-2 hover:text-blue-600">{property.title}</h2>
                </Link>
                <p className="text-gray-600 mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-1" />
                  {property.address}
                </p>
                <p className="text-2xl font-bold text-blue-600 mb-4">₹{property.price.toLocaleString()}</p>
                
                <div className="flex justify-between text-gray-600">
                  <div className="flex items-center">
                    <FaBed className="mr-1" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center">
                    <FaBath className="mr-1" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center">
                    <FaRulerCombined className="mr-1" />
                    <span>{property.area} sq.ft</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage; 