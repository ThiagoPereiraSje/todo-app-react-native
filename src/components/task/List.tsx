import React, {useState, useEffect, useRef} from 'react';
import {Box, Text, ScrollView, Modal, Stack} from 'native-base';
import {Circle} from 'react-native-progress';
import MenuItem from '../MenuItem';
import Spinner from '../Spinner';

import Task, {Status as TaskStatus} from '../../entities/task';
import TaskDAO from '../../services/database/taskDAO';
import TitleBar from '../TitleBar';
import TaskComponent from './index';
import {useRouteAction} from '../../contexts/route';
import {Routes} from '../../routes';
import {StyleProp, TextStyle} from 'react-native';
import IconButton from '../IconButton';
import {useTimerActions, useTimerState} from '../../contexts/timer';

const textStyle: StyleProp<TextStyle> = {
  fontWeight: 'bold',
};

export function Menu() {
  const {navigate} = useRouteAction();

  return (
    <>
      <Box>
        <MenuItem
          iconName="plus-square"
          label="Adicionar tarefa"
          onPress={() => navigate(Routes.TaskForm)}
        />
        <MenuItem iconName="eye" label="Mostrar concluídas" />
      </Box>
    </>
  );
}

export default function TaskList() {
  const _refTask = useRef<Task | undefined>();
  const [timerModal, setTimerModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [taskStatus] = useState<TaskStatus>('TODO');
  const [tasks, setTasks] = useState<Task[]>([]);

  const {current, final} = useTimerState();
  const {start, stop} = useTimerActions();

  const handleLoad = async (status: TaskStatus) => {
    const order =
      status === 'TODO'
        ? ' ORDER BY completed_time ASC LIMIT 50 '
        : ' ORDER BY fullyCompletedAt DESC LIMIT 50 ';

    const newTasks = await TaskDAO.list(` WHERE status = ? ${order}`, [status]);

    if (tasks) {
      setTasks(newTasks);
      setLoading(false);
    }
  };

  const handlePlay = (task: Task) => {
    _refTask.current = task;
    const missingTime = task.duration - task.completed_time;
    const runtime = missingTime < task.runtime ? missingTime : task.runtime;

    console.log('play');

    // Timer.start(
    //   0,
    //   runtime,
    //   currentTime => setTimer(currentTime),
    //   () => console.log('Tempo esgotado!'),
    // );

    start(0, runtime, () => {
      console.log('Tempo esgotado!');
    });

    setTimerModal(true);
  };

  const handleStop = () => {
    setTimerModal(false);
    stop();
  };

  useEffect(() => {
    handleLoad(taskStatus);
  }, [taskStatus]);

  return (
    <>
      <Modal isOpen={timerModal} bgColor="rgba(0,0,0,0.6)">
        <Text style={textStyle} fontSize="3xl">
          {_refTask.current?.title}
        </Text>
        <Text style={textStyle} fontSize="2xl">
          {_refTask.current?.subtitle}
        </Text>

        <Box margin="8">
          <Circle
            size={250}
            progress={current / final || 1}
            thickness={20}
            color="#06b6d4"
            unfilledColor="#444257"
            borderWidth={0}
            showsText
          />
        </Box>

        <Stack direction="row" space="8">
          <IconButton iconName="pause" size="42" />
          <IconButton iconName="play" size="42" />
          <IconButton iconName="stop" onPress={handleStop} size="42" />
        </Stack>
      </Modal>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <TitleBar leftTitle="Tarefas" />

          {tasks.length ? (
            <ScrollView marginBottom="1" h="full">
              {tasks.map(t => (
                <TaskComponent
                  key={t.id}
                  task={t}
                  onPlay={() => handlePlay(t)}
                />
              ))}
            </ScrollView>
          ) : (
            <Box height="full" alignItems="center" bgColor="sec.650">
              <Text
                marginTop="2/3"
                marginLeft={6}
                marginRight={6}
                fontSize="22px"
                fontWeight="bold"
                textAlign="center">
                Nenhuma Tarefa foi encontrada!
              </Text>
            </Box>
          )}
        </>
      )}
    </>
  );
}
