import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import {DrawerLayoutAndroid} from 'react-native';

type ChildrenProps = {
  children: ReactNode;
};

type DrawerActions = {
  setDrawer: (drawer: DrawerLayoutAndroid) => void;
  setDisable: (disable: boolean) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

type DrawerState = {
  drawer: DrawerLayoutAndroid;
  disable: boolean;
};

const ActionsContext = createContext<DrawerActions>(undefined);
const StateContext = createContext<DrawerState>(undefined);

export const useDrawerActions = (): DrawerActions => {
  return useContext(ActionsContext);
};

export const useDrawerState = (): DrawerState => {
  return useContext(StateContext);
};

export default function DrawerProvider({children}: ChildrenProps) {
  const [drawer, setDrawer] = useState<DrawerLayoutAndroid>();
  const [disable, setDisable] = useState(false);

  const state: DrawerState = useMemo(
    () => ({drawer, disable}),
    [drawer, disable],
  );

  const actions: DrawerActions = useMemo(
    () => ({
      setDrawer: curDrawer => {
        setDrawer(curDrawer);
      },
      setDisable: curValue => {
        setDisable(curValue);
      },
      openDrawer: () => {
        drawer?.openDrawer();
      },
      closeDrawer: () => {
        drawer?.closeDrawer();
      },
    }),
    [drawer],
  );

  return (
    <ActionsContext.Provider value={actions}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </ActionsContext.Provider>
  );
}
