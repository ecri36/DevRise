import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function CardItem({ data, index, deleteJob }) {
  return (
    <Draggable index={index} draggableId={data._id.toString()}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-md p-3 m-3 mt-0 last:mb-0"
        >
          <h5 className="text-md my-3 text-lg leading-6">{data.company}</h5>
          <p className='font-bold'>{data.job_title}</p>
          <p className='text-sm bold font-medium'>{data.location}</p>

          <div className='flex justify-between pt-4'>
            <button className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-1 px-3 border-b-4 border-purple-700 hover:border-purple-500 rounded">
              Edit
            </button>
            <button onClick={(e) => deleteJob(e, data)} className="bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-3 border-b-4 border-red-700 hover:border-red-500 rounded">
              X
            </button>
            
          </div>
          
        </div>
        
      )}
    
    </Draggable>
  );
}

export default CardItem;
