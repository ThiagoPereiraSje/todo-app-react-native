import React from 'react';
import {Box, Text} from 'native-base';
import MenuItem from '../MenuItem';

export function Menu() {
  return (
    <>
      <Box>
        <MenuItem iconName="plus-square" label="Adicionar tarefa" />
        <MenuItem iconName="eye" label="Mostrar concluídas" />
      </Box>
    </>
  );
}

export default function TaskList() {
  return (
    <>
      <Box>
        <Text>Task List</Text>
      </Box>
    </>
  );
}
