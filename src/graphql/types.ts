export type Status = 'TODO' | 'DONE';

export type Task = {
  id?: string;
  subtitle: string;
  title: string;
  duration: string;
  runtime: string;
  completed_time: string;
  status: Status;
  fullyCompletedAt: string;
};

export type QueryTasks = {
  tasks: Task[];
};

export type QueryTaskById = {
  task: Task;
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
