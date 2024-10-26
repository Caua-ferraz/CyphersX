// components/FlowNode.d.ts

import React from 'react';

interface FlowNodeProps {
  icon: React.ReactElement;
  label: string;
  title: string;
  bgColor: string;
}

declare const FlowNode: React.FC<FlowNodeProps>;

export default FlowNode;
