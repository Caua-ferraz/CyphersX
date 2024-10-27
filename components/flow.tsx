import React from 'react';
import { calculatePositions, generatePath } from './ui/flowUtils';
import { Step } from './types/flowTypes';

const FlowStep: React.FC<{ step: Step }> = ({ step }) => {
  return (
    <div className="bg-slate-800 border-2 border-emerald-400 rounded-md p-2 w-32 h-16 flex items-center justify-center text-center text-sm font-semibold text-gray-100 shadow-md">
      {step.name}
    </div>
  );
};

const FlowPreviewEditor: React.FC = () => {
  const flowSteps: Step[] = [
    { id: 'start', name: 'Start', next: ['enrich'] },
    { id: 'enrich', name: 'Enrich Data', next: ['aiAnalysis', 'apollo'] },
    { id: 'apollo', name: 'Apollo Application', next: ['aiAnalysis'] },
    { id: 'aiAnalysis', name: 'AI Analysis', next: ['email', 'schedule'] },
    { id: 'email', name: 'Email Outreach', next: ['end'] },
    { id: 'schedule', name: 'Schedule Meeting', next: ['end'] },
    { id: 'end', name: 'End', next: [] },
  ];

  const renderFlowChart = () => {
    const stepWidth = 130;
    const stepHeight = 60;
    const verticalGap = 100;
    const horizontalGap = 200;

    const stepPositions = calculatePositions(flowSteps, stepWidth, stepHeight, verticalGap, horizontalGap);

    const svgPaths: JSX.Element[] = [];

    // Create SVG paths between steps
    flowSteps.forEach((step) => {
      const from = stepPositions[step.id];
      step.next.forEach((nextId) => {
        const to = stepPositions[nextId];
        if (from && to) {
          const path = generatePath(from, to, stepHeight);
          svgPaths.push(
            <g key={`${step.id}-${nextId}`}>
              <path
                d={path}
                fill="none"
                stroke="#34D399" // emerald-400
                strokeWidth="2"
              />
              <path
                d={path}
                fill="none"
                stroke="#34D399" // emerald-400
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
                strokeDasharray="5,5"
              />
            </g>
          );
        }
      });
    });

    const maxX = Math.max(...Object.values(stepPositions).map(p => p.x));
    const minX = Math.min(...Object.values(stepPositions).map(p => p.x));
    const maxY = Math.max(...Object.values(stepPositions).map(p => p.y));
    const width = maxX - minX + stepWidth + 200; // Add some padding
    const height = maxY + stepHeight * 2;

    return (
      <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#34D399" /> {/* emerald-400 */}
            </marker>
          </defs>
          <g transform={`translate(${-minX + 100}, 50)`}>
            {svgPaths}
          </g>
        </svg>
        {flowSteps.map((step) => (
          <div
            key={step.id}
            className="absolute transition-all duration-300 ease-in-out"
            style={{
              left: `${stepPositions[step.id].x - minX + 100}px`,
              top: `${stepPositions[step.id].y + 50}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <FlowStep step={step} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="editor-preview border border-slate-700 rounded-lg shadow-md overflow-hidden">
      <div className="editor-header bg-slate-800 p-3 border-b border-slate-700">
        <h2 className="text-base font-semibold text-emerald-400">Flow Editor Preview</h2>
      </div>
      <div className="editor-content bg-slate-700 p-4 overflow-hidden h-[600px]">
        <div className="flow-editor-container bg-black-dots p-3 rounded-md h-[600px] overflow-auto scrollbar-hide cursor-grab active:cursor-grabbing">
          {renderFlowChart()}
        </div>
      </div>
    </div>
  );
};

export default FlowPreviewEditor;
