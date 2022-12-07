'use client';
import Layout from '../components/Layout';
import axios from 'axios';
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

function createGuidId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const postToBackEnd = async (query) => {
  return await axios.post(
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
};

// const deleteFromBackEnd = async query => {
//   return await axios.delete(
//     'http://localhost:4000/graphql/',
//     {
//       query: query,
//     },
//     {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }
//   );
// };

export default function Home() {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);
  console.log('-----BOARDSTATE-----', boardData);
  // The init value is hard coded for testing
  const [currentUser, setUser] = useState({ userId: 1 });
  const [columnMap, setColumns] = useState({
    0: 'Prospective',
    1: 'App Submitted',
    2: 'Interview Scheduled',
    3: 'Rejected',
  });

  const editJob = async (jobId, fieldName, value) => {
    const query = `mutation {
      updateJob(jobId: ${jobId}, jobField: "status", value: "${value}") {
        success
        updateType
        job {
          _id
        }
      }
    }`;
    await postToBackEnd(query);
  };

  const saveNewJob = async (userId, jobData) => {
    setShowForm(false);
    const { status, company, jobTitle, location } = jobData;
    const queryString = `mutation {
      createJob(
        userId: ${userId}, 
        status: "${status}", 
        company: "${company}",
        jobTitle: "${jobTitle}",
        location: "${location}",
      ) {
        success, 
        updateType,
        job {
          _id
          owner_id
          job_title 
          status 
          company 
          location 
          hyperlink
          position_type
          application_data
        }
      }
    }`;

    // Deconstruct the job from the response
    const { job } = await (
      await postToBackEnd(queryString)
    ).data.data.createJob;
    // get the current items array that needs to be changed
    const { items } = boardData.find((column) => column.name === status);
    // set a new items array so we are not affecting state directly
    const newItems = [...items, job];
    // set new state
    setBoardData((oldState) =>
      oldState.map((column) =>
        column.name === status ? { ...column, items: newItems } : column
      )
    );
  };

  // delete request:

  const deleteJob = async (_, jobData) => {
    console.log();
    // do we do anything with state here before proceeding?
    const { _id, status } = jobData;
    const queryString = `mutation {
    deleteJob(
      jobId: ${_id}
    ) {
      success
    }
  }`;

    // Deconstruct the job from the response
    const data = await postToBackEnd(queryString);

    const { items } = boardData.find((column) => column.name === status);
    // set a new items array so we are not affecting state directly
    const newItems = items.filter((job) => job._id !== _id);
    // set new state
    setBoardData((oldState) =>
      oldState.map((column) =>
        column.name === status ? { ...column, items: newItems } : column
      )
    );
  };

  //

  const handleJobAddSubmit = async (e, boardIndex) => {
    e.preventDefault();
    const { company, title, location } = e.target;

    await saveNewJob(currentUser.userId, {
      status: columnMap[boardIndex],
      company: company.value,
      jobTitle: title.value,
      location: location.value,
    });

    console.log(company.value, title.value, location.value);
  };
  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
    const getJobData = async () => {
      let data = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query GetJobs {
            jobs(userId: 1) {
              jobs {
                name
                items {
                  _id
                  owner_id
                  job_title
                  status
                  company
                  location
                  hyperlink
                  position_type
                  application_data
                }
              }
            }
          }`,
        }),
      });
      data = await data.json();
      setBoardData(data.data.jobs.jobs);
    };
    getJobData();
  }, []);

  const onDragEnd = async (re) => {
    if (!re.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    );
    await editJob(
      re.draggableId,
      'status',
      columnMap[re.destination.droppableId]
    );
    setBoardData(newBoardData);
  };

  const onTextAreaKeyPress = (e) => {
    if (e.keyCode === 13) {
      //Enter
      const val = e.target.value;
      if (val.length === 0) {
        setShowForm(false);
      } else {
        const boardId = e.target.attributes['data-id'].value;
        const item = {
          id: createGuidId(),
          title: val,
          priority: 0,
          chat: 0,
          attachment: 0,
          assignees: [],
        };
        let newBoardData = boardData;
        newBoardData[boardId].items.push(item);
        setBoardData(newBoardData);
        setShowForm(false);
        e.target.value = '';
      }
    }
  };
  return (
    <Layout>
      <div className="p-10 flex flex-col h-screen">
        {/* Board header */}

        {/* Board columns */}
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-4 gap-5 my-5">
              {boardData &&
                boardData.map((board, bIndex) => {
                  return (
                    <div key={board.name}>
                      <Droppable droppableId={bIndex.toString()}>
                        {(provided, snapshot) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            <div
                              className={`bg-gray-100 rounded-md shadow-md
                            flex flex-col relative overflow-auto
                            ${snapshot.isDraggingOver && 'bg-green-100'}`}
                            >
                              <span
                                className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200
                          absolute inset-x-0 top-0"
                              ></span>
                              <h4 className=" p-3 flex justify-between items-center mb-2">
                                <span className="text-2xl text-gray-600">
                                  {board.name}
                                </span>
                              </h4>

                              <div
                                className="overflow-y-auto overflow-x-auto h-auto"
                                style={{ maxHeight: 'calc(100vh - 290px)' }}
                              >
                                {board.items.length > 0 &&
                                  board.items.map((item, iIndex) => {
                                    return (
                                      <CardItem
                                        key={item._id}
                                        data={item}
                                        index={iIndex}
                                        className="m-3"
                                        deleteJob={deleteJob}
                                      />
                                    );
                                  })}
                                {provided.placeholder}
                              </div>

                              {showForm && selectedBoard === bIndex ? (
                                <div className="p-3">
                                  <div class="pt-6 relative flex text-gray-800 antialiased flex-col justify-center overflow-auto bg-gray-50">
                                    <div class="relative sm:w-72 mx-auto text-center">
                                      <span class="text-xl font-bold ">
                                        Add a New Application
                                      </span>
                                      <div class="bg-white shadow-md rounded-lg text-left">
                                        <div class="h-2 bg-blue-400 rounded-t-md"></div>
                                        <div class="px-8 py-6 ">
                                          <form
                                            onSubmit={(e) =>
                                              handleJobAddSubmit(e, bIndex)
                                            }
                                          >
                                            <label class="block font-semibold">
                                              {' '}
                                              Company{' '}
                                            </label>
                                            <input
                                              name="company"
                                              placeholder="Company Name"
                                              class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                                            ></input>
                                            <label class="block mt-3 font-semibold">
                                              {' '}
                                              Title{' '}
                                            </label>
                                            <input
                                              name="title"
                                              placeholder="Job Title"
                                              class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                                            ></input>
                                            <label class="block mt-3 font-semibold">
                                              {' '}
                                              Location
                                            </label>
                                            <input
                                              name="location"
                                              placeholder="Location"
                                              class="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
                                            ></input>
                                            <div class="flex justify-between items-baseline">
                                              <button
                                                type="submit"
                                                class="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 "
                                              >
                                                Add
                                              </button>
                                              <button
                                                onClick={() =>
                                                  setShowForm(false)
                                                }
                                                class="text-sm hover:underline"
                                              >
                                                Close
                                              </button>
                                            </div>
                                          </form>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <button
                                  className="flex justify-center items-center my-3 space-x-2 text-lg"
                                  onClick={() => {
                                    setSelectedBoard(bIndex);
                                    setShowForm(true);
                                  }}
                                >
                                  <PlusCircleIcon className="w-6 h-6 text-gray-500" />
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </Droppable>
                    </div>
                  );
                })}
            </div>
          </DragDropContext>
        )}
      </div>
    </Layout>
  );
}
