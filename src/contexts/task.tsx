import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';

type TaskState = {
  status: boolean;
};

type TaskActions = {
  toggleStatus: () => void;
};

const StateContext = createContext<TaskState>({
  status: true,
});

const ActionsContext = createContext<TaskActions>(undefined);

export const useTaskActions = (): TaskActions => {
  return useContext(ActionsContext);
};

export const useTaskState = (): TaskState => {
  return useContext(StateContext);
};

type TaskProviderProps = {
  children: ReactNode;
};

export default function TaskProvider({children}: TaskProviderProps) {
  const [status, setStatus] = useState(true);

  const state: TaskState = useMemo(() => ({status}), [status]);

  const actions: TaskActions = useMemo(
    () => ({
      toggleStatus: () => {
        setStatus(!status);
      },
    }),
    [status],
  );

  return (
    <ActionsContext.Provider value={actions}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </ActionsContext.Provider>
  );
}
