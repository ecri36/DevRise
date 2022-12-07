'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Signup = () => {
  const router = useRouter();
  const logTHis = code => {
    console.log(code);
  };
  useEffect(() => {
    const { code, state } = router.query;
    const handleOAuth = async () => {
      if (code) {
        let query = '';
        // login state code
        if (state === 'login') {
          query = `mutation {
            signin(
              signinType: "oauth",
              code: "${code}") {
                success,
                token
            }
          }`;
          const { data } = await axios.post(
            'http://localhost:4000/graphql',
            {
              query: query,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          console.log(data);
          const { signin } = data.data;
          if (signin.success) {
            localStorage.setItem('token', signin.token);
            router.push('/app');
          }
        }
        // register state code
        if (state === 'register') {
          query = `mutation {
            register(
              registerType: "oauth",
              code: "${code}") {
                success,
                token
              }
          }`;
          const { data } = await axios.post(
            'http://localhost:4000/graphql',
            {
              query: query,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          const { register } = data.data;
          if (register.success) {
            localStorage.setItem('token', register.token);
            router.push('/app');
          }
        }
      }
    };
    handleOAuth();
  });

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
            <Link
              href={{
                pathname: 'https://github.com/login/oauth/authorize',
                query: {
                  client_id: '6d90f6ec2d021298591c',
                  state: 'login',
                  user: 'email',
                },
              }}
            >
              or Sign In via GitHub
            </Link>
          </p>
        </div>

        {/* button code starts here */}
        <div>
          <Link
            href={{
              pathname: 'https://github.com/login/oauth/authorize',
              query: {
                client_id: '6d90f6ec2d021298591c',
                state: 'register',
                user: 'email',
              },
            }}
          >
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
            text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up via GitHub
            </button>
          </Link>
          <p className="mt-2 text-center text-sm text-gray-600">
            *Strictly reserved for real coders in the trenches. Only via GitHub.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
