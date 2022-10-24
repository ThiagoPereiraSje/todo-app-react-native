import React from 'react';
import {Box} from 'native-base';
import Drawer from './drawer';

import TaskList, {Menu as TaskListMenu} from './task/List';
import {useRouteState} from '../contexts/route';
import TaskForm from './task/Form';

type Route = {
  component: React.ReactNode;
  menu?: JSX.Element;
};

const routes: Route[] = [
  {component: <TaskList />, menu: <TaskListMenu />},
  {component: <TaskForm />},
];

export default function Navigator() {
  const {route} = useRouteState();

  return (
    <Drawer menu={routes[route]?.menu}>
      <Box bgColor="sec.650" flex={1}>
        {routes[route].component}
      </Box>
    </Drawer>
  );
}
