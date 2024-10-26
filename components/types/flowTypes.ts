export interface Step {
  id: string;
  name: string;
  next: string[];
}

export interface Position {
  x: number;
  y: number;
}
