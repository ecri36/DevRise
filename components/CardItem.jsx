import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function CardItem({ data, index }) {
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-md p-3 m-3 mt-0 last:mb-0"
        >
          <h5 className="text-md my-3 text-lg leading-6">{data.title}</h5>
        </div>
      )}
    </Draggable>
  );
}

export default CardItem;
