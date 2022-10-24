import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import {Routes} from '../routes';
import {useDrawerActions} from './drawer';

const INITIAL_ROUTE = Routes.TaskForm;

type ChildrenProps = {
  children: ReactNode;
};

type RouteActions = {
  navigate: (route: number, params: any) => void;
  goBack: () => void;
};

type RouteState = {
  route: number;
  params: any;
};

const ActionsContext = createContext<RouteActions>(undefined);
const StateContext = createContext<RouteState>({
  route: INITIAL_ROUTE,
  params: undefined,
});

export const useRouteAction = (): RouteActions => {
  return useContext(ActionsContext);
};

export const useRouteState = (): RouteState => {
  return useContext(StateContext);
};

const previous: number[] = [];

export default function RouterProvider({children}: ChildrenProps) {
  const [route, setRoute] = useState<number>(INITIAL_ROUTE);
  const [params, setParams] = useState<any>();
  const {closeDrawer} = useDrawerActions();

  const state: RouteState = useMemo(() => ({route, params}), [route, params]);

  const actions: RouteActions = useMemo(
    () => ({
      navigate: (newRoute, newParams) => {
        closeDrawer();
        previous.push(route);
        setRoute(newRoute);
        setParams(newParams);
      },
      goBack: () => {
        closeDrawer();
        setRoute(previous.pop() || INITIAL_ROUTE);
      },
    }),
    [route, closeDrawer],
  );

  return (
    <ActionsContext.Provider value={actions}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </ActionsContext.Provider>
  );
}
