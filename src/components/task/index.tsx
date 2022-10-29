import React from 'react';
import Task from '../../entities/task';
import {Text, Stack, Progress, Menu} from 'native-base';
import IconButton from '../IconButton';

type TaskProps = {
  task: Task;
};

function calcPercent(n1: number, n2: number) {
  return ((n1 / n2) * 100).toFixed(0);
}

export default function index({task}: TaskProps) {
  const icon =
    task.status === 'DONE'
      ? {iconName: 'flag', color: '#10b981'}
      : {iconName: 'bookmark', color: '#f55'};

  return (
    <Stack
      direction="row"
      space="3"
      bgColor="sec.550"
      marginBottom="2"
      alignItems="center"
      paddingLeft="3"
      height="20">
      <IconButton {...icon} />
      <Stack direction="column" space={0.4} flex={1}>
        <Text fontWeight="bold">{task.title}</Text>
        <Text>{task.subtitle}</Text>
        <Progress
          size="md"
          marginTop="1"
          min={0}
          max={task.duration}
          value={task.completed_time}
        />
      </Stack>
      <Text>{`${calcPercent(task.completed_time, task.duration)} %`}</Text>
      <Menu
        w="190"
        bgColor="sec.700"
        trigger={props => (
          <IconButton iconName="ellipsis-v" color="white" {...props} />
        )}>
        <Menu.Item>Iniciar</Menu.Item>
        <Menu.Item>Editar</Menu.Item>
        <Menu.Item>Resetar Progresso</Menu.Item>
        <Menu.Item>Excluir</Menu.Item>
      </Menu>
    </Stack>
  );
}
