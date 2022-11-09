export type Task = {
  id?: string;
  subtitle: string;
  title: string;
  duration: number;
  runtime: number;
  completed_time: number;
  status: string;
  fullyCompletedAt: number;
};

export type QueryTask = {
  tasks: Task[];
};

export type CreateTask = {
  input: Task;
};

export type UpdateTask = {
  id: string;
  input: Task;
};

export type DeleteTask = {
  id: string;
};
