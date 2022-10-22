import React from 'react';
import {Box} from 'native-base';
import Drawer from './drawer';

import TaskList from './task/List';
import {useRouteState} from '../contexts/route';

type Route = {
  component: React.ReactNode;
  menu?: JSX.Element;
};

const routes: Route[] = [{component: <TaskList />}];

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
