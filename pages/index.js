<<<<<<< HEAD
import Layout from '../components/Layout';
import Image from 'next/dist/client/image';
import {
  ChevronDownIcon,
  PlusIcon,
  DotsVerticalIcon,
  PlusCircleIcon,
} from '@heroicons/react/outline';
import CardItem from '../components/CardItem';
import BoardData from '../data/board-data.json';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function createGuidId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function Home() {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);
=======
'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
>>>>>>> dev

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
        if (state === 'c2lnbmlu') {
          query = `mutation {
            signin(signinType: "oauth", code: "${code}") {
                success,
                token
            }
          }`;
        }
        // register state code
        if (state === 'cmVnaXN0ZXI') {
          query = `mutation register (
            registerType: "oauth",
            code: "${code}") {
              success,
              token
          }`;
        }
        console.log(query);
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
        router.push('/app');
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
                  state: 'cmVnaXN0ZXI',
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
                state: 'c2lnbmlu',
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
