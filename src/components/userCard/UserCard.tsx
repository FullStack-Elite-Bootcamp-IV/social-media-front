'use client';

import React from 'react';

interface UserProps {
  avatarUrl: string;
  name: string;
  description?: string;
}

const UserCard: React.FC<UserProps> = ({ avatarUrl, name, description }) => {
  return (
    <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700">
      <img
        src={avatarUrl}
        alt={name}
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h2>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        )}
      </div>
    </div>
  );
};

export default UserCard;
