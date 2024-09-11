"use client";
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  const Partition = ({ partition, onAction }) => {
    
    return (
      <div
        className={`relative border border-black flex flex-${partition.direction === 'V' ? 'row' : 'col'} h-full w-full `}
        style={{ backgroundColor: partition.color, flex: partition.size }}
      >
        {!partition.children.length && (
          <div className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] space-x-1 ">
            <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => onAction(partition.id, 'split', 'V')}>V</button>
            <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => onAction(partition.id, 'split', 'H')}>H</button>
            <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => onAction(partition.id, 'remove')}>-</button>
          </div>
        )}
        {partition.children.map((child) => (
          <Partition key={child.id} partition={child} onAction={onAction} />
        ))}
      </div>
    );
  };

const RecursivePartitioning = () => {
   
  const [layout, setLayout] = useState({
    id: uuidv4(),
    size: 1,
    color: getRandomColor(),
    direction: null,
    children: [],
  });

  
  const handleAction = (id, action, direction = null) => {
    const updateLayout = (node) => {
      if (node.id === id) {
        if (action === 'split') {
          node.direction = direction;
          node.children = [
            {
              id: uuidv4(),
              size: 1,
              color: node.color,
              direction: null,
              children: [],
            },
            {
              id: uuidv4(),
              size: 1,
              color: getRandomColor(),
              direction: null,
              children: [],
            },
          ];
          return node; 
        }
        
        if (action === 'remove') {
          return null;
        }
      }
  
      if (node.children.length > 0) {
        node.children = node.children
          .map(updateLayout)   
          .filter(child => child !== null); 
      }
  
      return node; 
    };
  
    setLayout(updateLayout({ ...layout }));
  };
  
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex h-full w-full ">
        <Partition partition={layout} onAction={handleAction} />
      </div>
    </div>
  );
};

export default RecursivePartitioning;