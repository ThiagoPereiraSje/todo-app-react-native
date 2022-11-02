import React from 'react';
import Task from '../../entities/task';
import {Text, Stack, Progress} from 'native-base';
import IconButton from '../IconButton';
import {useRouteAction} from '../../contexts/route';
import {Routes} from '../../routes';

type TaskProps = {
  task: Task;
};

function calcPercent(n1: number, n2: number) {
  return ((n1 / n2) * 100).toFixed(0);
}

export default function index({task}: TaskProps) {
  const {navigate} = useRouteAction();

  const icon =
    task.status === 'DONE'
      ? {iconName: 'flag', color: '#10b981'}
      : {iconName: 'pencil', color: '#f55'};

  return (
    <Stack
      direction="row"
      space="3"
      bgColor="sec.550"
      marginBottom="2"
      alignItems="center"
      paddingLeft="3"
      paddingRight="3"
      height="20">
      <IconButton
        {...icon}
        onPress={() => navigate(Routes.TaskForm, task.id)}
      />
      <Stack direction="column" space={0.4} flex={1}>
        <Text fontWeight="bold">{task.title}</Text>
        <Text>{task.subtitle}</Text>
      </Stack>
      <Progress
        size="xl"
        w="150"
        marginTop="1"
        min={0}
        max={task.duration}
        value={task.completed_time}
      />
      <Text>{`${calcPercent(task.completed_time, task.duration)} %`}</Text>

      {task.status === 'TODO' ? (
        <>
          <IconButton key="play" iconName="play" color="white" />
        </>
      ) : (
        <>
          <IconButton key="reset" iconName="rotate-left" color="white" />
        </>
      )}
    </Stack>
  );
}
