"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.github.com/users');
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">User List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map(user => (
          <div key={user.login} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <img className="w-full h-32 object-cover" src={user.avatar_url} alt={user.login} />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900">{user.name || user.login}</h2>
              <p className="text-gray-600 mt-1">@{user.login}</p>
              <p className="text-gray-700 mt-2">{user.bio || 'No bio available.'}</p>
              <Link href={`/users/${user.login}`} className="block mt-4 text-blue-500 hover:underline">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
