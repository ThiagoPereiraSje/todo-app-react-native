import React, {useState, useEffect, useRef} from 'react';
import {Box, Text, ScrollView, Modal, Stack, Pressable} from 'native-base';
import {Circle} from 'react-native-progress';
import MenuItem from '../MenuItem';
import Spinner from '../Spinner';

import client from '../../graphql/client';
import {FILTER_TASKS} from '../../graphql/queries';
import {QueryTasks} from '../../graphql/types';

import Task, {Status as TaskStatus} from '../../entities/task';
import TaskDAO from '../../services/database/taskDAO';
import TitleBar from '../TitleBar';
import TaskComponent from './index';
import {useRouteAction} from '../../contexts/route';
import {Routes} from '../../routes';
import {StyleProp, TextStyle} from 'react-native';
import IconButton from '../IconButton';
import {useTimerActions, useTimerState} from '../../contexts/timer';
import Sound from '../../services/sound';
import {useTaskActions, useTaskState} from '../../contexts/task';

const textStyle: StyleProp<TextStyle> = {
  fontWeight: 'bold',
};

export function Menu() {
  const {navigate} = useRouteAction();
  const {status} = useTaskState();
  const {toggleStatus} = useTaskActions();

  const props = status
    ? {iconName: 'eye', label: 'Mostrar a Fazer'}
    : {iconName: 'eye-slash', label: 'Mostrar Concluídas'};

  return (
    <>
      <Box>
        <MenuItem
          iconName="plus"
          label="Adicionar Tarefa"
          onPress={() => navigate(Routes.TaskForm)}
        />
        <MenuItem {...props} onPress={toggleStatus} />
      </Box>
    </>
  );
}

export default function TaskList() {
  const _refTask = useRef<Task | undefined>();
  const [timerModal, setTimerModal] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const {status} = useTaskState();
  const [tasks, setTasks] = useState<Task[]>([]);

  const {current, final} = useTimerState();
  const {start, stop, pause, play} = useTimerActions();

  // const handleLoad = async (status: TaskStatus) => {
  //   const order =
  //     status === 'TODO'
  //       ? ' ORDER BY completed_time ASC LIMIT 50 '
  //       : ' ORDER BY fullyCompletedAt DESC LIMIT 50 ';

  //   const newTasks = await TaskDAO.list(` WHERE status = ? ${order}`, [status]);

  //   if (tasks) {
  //     setTasks(newTasks);
  //     setLoading(false);
  //   }
  // };

  const handleLoad2 = async (status: TaskStatus) => {
    const variables = {
      filter: {
        status: {
          _eq: 'TODO',
        },
      },
      sort: ['completed_time'],
    };

    const result = await client.request<QueryTasks>(FILTER_TASKS, variables);
    console.log({result});
  };

  const handleStart = (task: Task) => {
    _refTask.current = task;
    const missingTime = task.duration - task.completed_time;
    const runtime = missingTime < task.runtime ? missingTime : task.runtime;

    start(0, runtime, async time => {
      _refTask.current.completed_time =
        (_refTask.current.completed_time || 0) + time;

      await TaskDAO.save(_refTask.current);

      Sound.play();
      setIsPlaying(true);
    });

    setTimerStarted(true);
    setTimerModal(true);
  };

  const handleStop = () => {
    setTimerModal(false);
    stop();
  };

  const handlePause = () => {
    pause();
    setTimerStarted(false);
  };

  const handlePlay = () => {
    play();
    setTimerStarted(true);
  };

  const handleStopSound = () => {
    Sound.stop();
    setIsPlaying(false);
    setTimerStarted(false);
    setTimerModal(false);
    handleLoad2(status ? 'TODO' : 'DONE');
  };

  useEffect(() => {
    handleLoad2(status ? 'TODO' : 'DONE');
  }, [status]);

  return (
    <>
      <Modal isOpen={timerModal} bgColor="rgba(0,0,0,0.6)">
        {isPlaying ? (
          <>
            <Stack direction="column" space="8" alignItems="center">
              <Text style={textStyle} fontSize="3xl">
                Ciclo finalizado com sucesso!
              </Text>

              <Text style={textStyle} fontSize="3xl">
                Parabéns!
              </Text>

              <Pressable
                onPress={handleStopSound}
                bgColor="pri.800"
                _pressed={{bgColor: 'rgba(0,0,0,0.5)'}}
                p="5"
                alignItems="center">
                <Text fontSize="18">Parar Alarme</Text>
              </Pressable>
            </Stack>
          </>
        ) : (
          <>
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
              {timerStarted ? (
                <IconButton iconName="pause" size="42" onPress={handlePause} />
              ) : (
                <IconButton iconName="play" size="42" onPress={handlePlay} />
              )}
              <IconButton iconName="stop" size="42" onPress={handleStop} />
            </Stack>
          </>
        )}
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
                  onPlay={() => handleStart(t)}
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
