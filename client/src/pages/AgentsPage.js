import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAgents } from '../redux/slices/authSlice';
import { FaPhone, FaEnvelope, FaBuilding, FaUser } from 'react-icons/fa';

const AgentsPage = () => {
  const dispatch = useDispatch();
  const { agents, isLoading } = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(getAgents());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Real Estate Agents</h1>
      <p className="text-gray-600 mb-8 max-w-3xl">
        Our experienced professionals are here to help you find your dream property. With extensive market knowledge and a commitment to exceptional service, our agents will guide you through every step of your real estate journey.
      </p>
      
      {agents.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">No agents available at the moment. Please check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map(agent => (
            <div key={agent._id} className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg">
              <div className="relative">
                <img 
                  src={agent.profilePicture || `https://randomuser.me/api/portraits/${agent.name.toLowerCase().includes('a') ? 'women' : 'men'}/${Math.floor(Math.random() * 70) + 1}.jpg`} 
                  alt={agent.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-white text-xl font-bold">{agent.name}</h2>
                  <p className="text-white text-sm opacity-90">Property Consultant</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FaBuilding className="text-blue-600 mr-2" />
                  <span>Magic Bricks Realty</span>
                  <span className="mx-2">•</span>
                  <span>{agent.experience} years exp.</span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {agent.bio}
                </p>
                
                <div className="flex justify-between text-sm text-gray-600 mb-6">
                  <div>
                    <span className="font-semibold">{agent.listings}</span> listings
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-semibold">{agent.ratings}</span>/5
                  </div>
                </div>
                
                <div className="border-t pt-4 flex justify-between">
                  <a 
                    href={`tel:${agent.phone}`}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <FaPhone className="mr-2" />
                    Call
                  </a>
                  <a 
                    href={`mailto:${agent.email}`}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <FaEnvelope className="mr-2" />
                    Email
                  </a>
                  <a 
                    href={`/agent/${agent._id}`}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <FaUser className="mr-2" />
                    Profile
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Are you a passionate real estate professional looking for new opportunities? We're always looking for talented agents to join our growing team.
        </p>
        <a 
          href="/careers" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Learn About Careers
        </a>
      </div>
    </div>
  );
};

export default AgentsPage; 