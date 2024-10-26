// components/FlowNode.tsx

import React from 'react';

interface FlowNodeProps {
  icon: React.ReactElement;
  title: string;
  bgColor: string;
}

const FlowNode: React.FC<FlowNodeProps> = ({ icon, title, bgColor }) => {
  return (
    <div className="flex items-center mb-2 p-2 rounded-lg shadow-md bg-white">
      <div className={`${bgColor} p-2 rounded-full mr-3 flex-shrink-0`}>
        {React.cloneElement(icon, { className: 'text-2xl text-white' })}
      </div>
      <div>
        <p className="font-sans text-sm text-gray-800 font-medium">{title}</p>
      </div>
    </div>
  );
};

export default FlowNode;
