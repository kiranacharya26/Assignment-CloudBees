import React from 'react';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Welcome to the User Details Page</h1>
        <Link
          href="/users"
          className="text-2xl font-semibold text-blue-500 hover:text-blue-700 hover:underline"
        >
          Go to User List
        </Link>
      </div>
    </div>
  );
};

export default Page;
