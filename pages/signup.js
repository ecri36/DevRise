import React from 'react';
//import { useRouter } from 'next/router';

const Signup = () => {
  //const router = useRouter();

  const gitimage = 'https://cdn-icons-png.flaticon.com/512/25/25231.png'; // insert url for github logo

  return (
    <div className="min-h-full flex items-center justify-center mt-32 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up via GitHub*
          </h2>
          <h6 className="mt-6 text-center text-1xl font-extrabold text-gray-900"></h6>
          <p className="mt-2 text-center text-sm text-gray-600">
            or
            <a
              href="./login"
              className="font-medium text-indigo-600 hover:text-indigo-500 px-2"
            >
              Sign In
            </a>
          </p>
        </div>

        <form>
          {/* button code starts here */}
          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
            text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up via GitHub
            </button>
            <p className="mt-2 text-center text-sm text-gray-600">
              *Strictly reserved for real coders in the trenches. Only via
              GitHub.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
