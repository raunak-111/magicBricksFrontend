import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary text-white rounded-md hover:bg-red-700 transition duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage; 