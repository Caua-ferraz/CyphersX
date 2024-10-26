import { Step, Position } from '../types/flowTypes';

export const calculatePositions = (
  flowSteps: Step[],
  stepWidth: number,
  stepHeight: number,
  verticalGap: number,
  horizontalGap: number
): { [key: string]: Position } => {
  const positions: { [key: string]: Position } = {};
  const levels: { [key: number]: string[] } = {};

  const assignLevel = (stepId: string, level: number) => {
    if (!levels[level]) levels[level] = [];
    levels[level].push(stepId);
    const step = flowSteps.find(s => s.id === stepId);
    if (step) {
      step.next.forEach(nextId => assignLevel(nextId, level + 1));
    }
  };

  assignLevel('start', 0);

  Object.entries(levels).forEach(([level, stepsInLevel]) => {
    const levelWidth = stepsInLevel.length * stepWidth + (stepsInLevel.length - 1) * horizontalGap;
    stepsInLevel.forEach((stepId, index) => {
      positions[stepId] = {
        x: (index * (stepWidth + horizontalGap)) - (levelWidth / 2) + (stepWidth / 2),
        y: parseInt(level) * (stepHeight + verticalGap)
      };
    });
  });

  return positions;
};

export const generatePath = (from: Position, to: Position, stepHeight: number): string => {
  const midY = (from.y + to.y) / 2;
  const controlPoint1 = { x: from.x, y: midY };
  const controlPoint2 = { x: to.x, y: midY };

  return `M${from.x},${from.y + stepHeight / 2} 
          C${controlPoint1.x},${controlPoint1.y} 
          ${controlPoint2.x},${controlPoint2.y} 
          ${to.x},${to.y - stepHeight / 2}`;
};