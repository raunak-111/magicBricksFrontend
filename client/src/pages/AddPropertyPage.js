import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaRupeeSign, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaCloudUploadAlt, FaList } from 'react-icons/fa';

const AddPropertyPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Apartment',
    status: 'For Sale',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    features: {
      airConditioning: false,
      parking: false,
      swimmingPool: false,
      internet: false,
      gym: false,
      security: false,
      balcony: false,
      garden: false,
      elevator: false,
      furnished: false
    },
    images: []
  });
  
  const [errors, setErrors] = useState({});
  
  const propertyTypes = [
    'Apartment', 'House', 'Villa', 'Penthouse', 'Studio', 'Office', 'Shop', 'Land'
  ];
  
  const propertyStatuses = [
    'For Sale', 'For Rent', 'Sold', 'Rented'
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFeatureChange = (feature) => {
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [feature]: !formData.features[feature]
      }
    });
  };
  
  const handleImageUpload = (e) => {
    // In a real app, would handle file uploads to storage
    // For now, just create object URLs for preview
    const newImages = Array.from(e.target.files).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setFormData({
      ...formData,
      images: [...formData.images, ...newImages]
    });
  };
  
  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({
      ...formData,
      images: updatedImages
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.area) newErrors.area = 'Area is required';
    if (!formData.bedrooms) newErrors.bedrooms = 'Number of bedrooms is required';
    if (!formData.bathrooms) newErrors.bathrooms = 'Number of bathrooms is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Here we would dispatch to Redux/API
    console.log('Property data:', formData);
    
    // Navigate to property listing page
    navigate('/my-properties');
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Property</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaHome className="mr-2" />
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
                placeholder="Property Title"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Property Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
              >
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
              >
                {propertyStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium flex items-center">
                <FaRupeeSign className="mr-1" />
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
                placeholder="Enter Price"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2.5 border border-gray-300 rounded-lg"
            placeholder="Describe your property..."
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaList className="mr-2" />
            Property Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium flex items-center">
                <FaRulerCombined className="mr-1" />
                Area (sq.ft)
              </label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
                placeholder="Area in sq.ft"
              />
              {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area}</p>}
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium flex items-center">
                <FaBed className="mr-1" />
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
                placeholder="Number of bedrooms"
              />
              {errors.bedrooms && <p className="text-red-500 text-xs mt-1">{errors.bedrooms}</p>}
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium flex items-center">
                <FaBath className="mr-1" />
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
                placeholder="Number of bathrooms"
              />
              {errors.bathrooms && <p className="text-red-500 text-xs mt-1">{errors.bathrooms}</p>}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            Location
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
                placeholder="Street address"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
                placeholder="City"
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
                placeholder="State/Province"
              />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium">Zipcode</label>
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
                placeholder="Postal/Zip Code"
              />
              {errors.zipcode && <p className="text-red-500 text-xs mt-1">{errors.zipcode}</p>}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Features & Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.keys(formData.features).map(feature => (
              <div key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  id={feature}
                  checked={formData.features[feature]}
                  onChange={() => handleFeatureChange(feature)}
                  className="w-4 h-4 mr-2"
                />
                <label htmlFor={feature} className="text-sm">
                  {feature.replace(/([A-Z])/g, ' $1').trim().charAt(0).toUpperCase() + 
                   feature.replace(/([A-Z])/g, ' $1').trim().slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaCloudUploadAlt className="mr-2" />
            Property Images
          </h2>
          
          <div className="mb-4">
            <label 
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center">
                <FaCloudUploadAlt className="text-3xl text-gray-500 mb-2" />
                <p className="text-sm text-gray-500">Click to upload images</p>
              </div>
              <input 
                type="file" 
                multiple 
                className="hidden" 
                onChange={handleImageUpload}
                accept="image/*"
              />
            </label>
          </div>
          
          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img 
                    src={image.preview} 
                    alt={`Preview ${index}`} 
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Submit Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPropertyPage;