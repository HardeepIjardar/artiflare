import React from 'react';

const OccasionsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-dark mb-6">Browse by Occasion</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Occasion cards will go here */}
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="w-20 h-20 bg-sand-300 rounded-full mx-auto mb-4"></div>
          <h3 className="font-bold text-dark">Birthday</h3>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="w-20 h-20 bg-sand-300 rounded-full mx-auto mb-4"></div>
          <h3 className="font-bold text-dark">Anniversary</h3>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="w-20 h-20 bg-sand-300 rounded-full mx-auto mb-4"></div>
          <h3 className="font-bold text-dark">Wedding</h3>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="w-20 h-20 bg-sand-300 rounded-full mx-auto mb-4"></div>
          <h3 className="font-bold text-dark">Date Night</h3>
        </div>
      </div>
    </div>
  );
};

export default OccasionsPage; 