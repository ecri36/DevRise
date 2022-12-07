import React from 'react';
import {
  PencilIcon, CalendarIcon, MenuIcon,
  CogIcon
} from '@heroicons/react/outline';

function SideBar(props) {
  return (
    <div style={{zIndex: 1}} className="fixed inset-y-0 left-0 bg-white w-40 z-1">
      <h1 className="flex items-center justify-center text-2xl
            h-16 bg-purple-600 text-white font-bold">DevRise</h1>

      <ul className="flex flex-col text-lg h-full">

        <li className="flex justify-center items-center flex-col
                py-7 border-l-4 border-purple-500 text-purple-500
                font-bold">
          <MenuIcon className="w-7 h-7" />
          Dashboard
        </li>
        <li className="flex justify-center items-center flex-col
                py-7 text-gray-500">
          <PencilIcon className="w-7 h-7" />
          Notes
        </li>
        <li className="flex justify-center items-center flex-col
                py-7 text-gray-500">
          <CalendarIcon className="w-7 h-7" />
          Training
        </li>

        <li className="flex justify-center items-center flex-col
                py-7 text-gray-500 mt-auto mb-16">
          <CogIcon className="w-7 h-7" />
          Settings
        </li>
      </ul>
    </div>
  );
}

export default SideBar;