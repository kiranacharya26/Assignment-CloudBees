"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitter_username: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

const UserDetails = () => {
  const { login } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof login === 'string') {
      const fetchUser = async () => {
        const response = await fetch(`https://api.github.com/users/${login}`);
        const data: User = await response.json();
        setUser(data);
      };

      fetchUser();
    }
  }, [login]);

  if (!user) return <div className="text-center py-8 text-lg">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-6">
        {/* Large profile picture */}
        <img className="w-48 h-48 rounded-full ring-8 ring-blue-500" src={user.avatar_url} alt={user.login} />
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">{user.name || user.login}</h1>
          <p className="text-xl text-gray-600 mt-1">@{user.login}</p>
          <p className="mt-3 text-gray-700">{user.bio || 'No bio available.'}</p>
          <div className="mt-4 space-y-2">
            {user.location && <p className="text-gray-800"><strong>Location:</strong> {user.location}</p>}
            {user.company && <p className="text-gray-800"><strong>Company:</strong> {user.company}</p>}
            {user.blog && (
              <p className="text-gray-800"><strong>Website:</strong> <a href={user.blog} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{user.blog}</a></p>
            )}
            {user.twitter_username && (
              <p className="text-gray-800"><strong>Twitter:</strong> <a href={`https://twitter.com/${user.twitter_username}`} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">@{user.twitter_username}</a></p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm text-center hover:bg-gray-200 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-gray-700">Followers</h3>
          <p className="text-3xl font-bold text-gray-900">{user.followers}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm text-center hover:bg-gray-200 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-gray-700">Following</h3>
          <p className="text-3xl font-bold text-gray-900">{user.following}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm text-center hover:bg-gray-200 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-gray-700">Public Repos</h3>
          <p className="text-3xl font-bold text-gray-900">{user.public_repos}</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-500 hover:underline text-lg font-medium">
          &larr; Back to User List
        </Link>
      </div>
    </div>
  );
};

export default UserDetails;
