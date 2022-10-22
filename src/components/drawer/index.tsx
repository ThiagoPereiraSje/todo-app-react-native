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
  const buttonSize = 70;
  const {setDrawer, openDrawer} = useDrawerActions();
  const {disabled} = useDrawerState();

  return (
    <DrawerLayoutAndroid
      ref={setDrawer}
      drawerWidth={200}
      drawerPosition="left"
      drawerLockMode="locked-closed"
      renderNavigationView={() => <NavView content={menu} />}>
      {children}

      <Pressable
        disabled={disabled}
        w={buttonSize}
        h={buttonSize}
        borderRadius={buttonSize}
        justifyContent="center"
        alignItems="flex-end"
        paddingRight="1"
        bgColor="rgba(0,0,0,0.4)"
        _pressed={{bgColor: 'rgba(0,0,0,0.5)'}}
        opacity={disabled ? 0.2 : 1}
        position="absolute"
        top="2/5"
        left={-45}
        onPress={openDrawer}>
        <ChevronRightIcon color="white" size="sm" />
      </Pressable>
    </DrawerLayoutAndroid>
  );
}
