import React from 'react';

function NotFoundPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-8">
    
  

        <div className="bg-white rounded-b-lg p-8 text-center shadow-lg">
          <h1 className="text-6xl font-bold text-[#20c997] mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been removed.
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <button className="bg-[#20c997] hover:bg-[#1bb88a] text-white font-semibold py-2 px-6 rounded-lg">
              Go back to Dashboard
            </button>
            <button className="bg-[#e9ecef] hover:bg-[#dee2e6] text-gray-700 font-semibold py-2 px-6 rounded-lg">
              Report Issue
            </button>
          </div>

          <p className="text-gray-600">
            Need help? <a href="#" className="text-[#20c997] hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
  );
}

export default NotFoundPage;