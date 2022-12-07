import React from 'react';
import { SearchIcon, AtSymbolIcon, BellIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

function TopBar({ userName }) {
  const router = useRouter();
  return (
    <div
      className="h-16 pl-40 fixed bg-gradient-to-r from-purple-400
        to-blue-500 w-full flex items-center justify-between pr-5"
    >
      <div className="flex px-5 items-center">
        <SearchIcon className="w-5 h-5 text-white" />
        <input
          type="text"
          placeholder="Search for company"
          className=" bg-transparent border-0 text-white placeholder-gray-200
                outline-none focus:ring-0 text-lg"
        />
      </div>
      <div className="flex space-x-6">
        <div className="flex items-center text-white">
          <h3 className="font-bold mr-3">{userName}</h3>
        </div>

        <div className="flex items-center text-white">
          <Link href={{ pathname: '/' }}>
            <button
              onClick={() => window.localStorage.removeItem('token')}
              class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-600 hover:border-red-500 rounded"
            >
              Log Out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
