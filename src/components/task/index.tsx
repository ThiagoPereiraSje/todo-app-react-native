import React from 'react';
import {Task} from '../../graphql/types';
import {Text, Stack, Progress} from 'native-base';
import IconButton from '../IconButton';
import {useRouteAction} from '../../contexts/route';
import {Routes} from '../../routes';

type TaskProps = {
  task: Task;
  onPlay: () => void;
};

function calcPercent(n1: number, n2: number) {
  return ((n1 / n2) * 100).toFixed(0);
}

export default function index({task, onPlay}: TaskProps) {
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
        size="46"
        onPress={() => navigate(Routes.TaskForm, task.id)}
      />
      <Stack direction="column" space={0.4} flex={1}>
        <Text isTruncated fontWeight="bold" fontSize="18">
          {task.title}
        </Text>
        <Text isTruncated fontSize="14">
          {task.subtitle}
        </Text>
      </Stack>
      <Progress
        size="xl"
        w="150"
        marginTop="1"
        min={0}
        max={Number(task.duration)}
        value={Number(task.completed_time)}
      />
      <Text fontSize="16">{`${calcPercent(
        Number(task.completed_time),
        Number(task.duration),
      )} %`}</Text>

      {task.status === 'TODO' && (
        <>
          <IconButton
            key="play"
            iconName="play"
            color="white"
            size="46"
            onPress={onPlay}
          />
        </>
      )}
    </Stack>
  );
}
