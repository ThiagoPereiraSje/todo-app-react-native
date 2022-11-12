export type Status = 'TODO' | 'DONE';

export type Task = {
  id: string;
  subtitle: string;
  title: string;
  duration: number;
  runtime: number;
  completed_time: number;
  status: string;
  fullyCompletedAt: number;
};

export type QueryTasks = {
  tasks: Task[];
};

export type CreateTask = {
  input: Omit<Task, 'id'>;
};

export type UpdateTask = {
  id: string;
  input: Omit<Task, 'id'>;
};

export type DeleteTask = {
  id: string;
};
