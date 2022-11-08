import React from 'react';
import {DrawerLayoutAndroid} from 'react-native';
import {ChevronRightIcon, Pressable} from 'native-base';
import NavView from './NavView';
import {useDrawerActions, useDrawerState} from '../../contexts/drawer';

type DrawerProps = {
  menu?: JSX.Element;
  children: JSX.Element;
};

export default function Drawer({menu, children}: DrawerProps) {
  const buttonSize = '88';
  const {setDrawer, openDrawer} = useDrawerActions();
  const {disabled} = useDrawerState();

  return (
    <DrawerLayoutAndroid
      ref={setDrawer}
      drawerWidth={300}
      drawerPosition="left"
      drawerLockMode="locked-closed"
      renderNavigationView={() => <NavView content={menu} />}>
      {children}

      <Pressable
        disabled={disabled}
        w={buttonSize}
        h={buttonSize}
        borderRadius="full"
        justifyContent="center"
        alignItems="flex-end"
        paddingRight="1"
        bgColor="rgba(0,0,0,0.2)"
        _pressed={{bgColor: 'rgba(0,0,0,0.5)'}}
        opacity={disabled ? 0.2 : 1}
        position="absolute"
        top="2/5"
        left="-58"
        onPress={openDrawer}>
        <ChevronRightIcon color="white" size="sm" />
      </Pressable>
    </DrawerLayoutAndroid>
  );
}
