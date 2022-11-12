import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {fromS} from 'hh-mm-ss';
import TitleBar from '../TitleBar';
import {Input, Stack, Select, Box} from 'native-base';
import InputMask from '../InputMask';

import client from '../../graphql/client';
import {
  TASK_BY_ID,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from '../../graphql/queries';
import {
  QueryTaskById,
  CreateTask,
  UpdateTask,
  DeleteTask,
  Task,
  Status,
} from '../../graphql/types';

import {useRouteAction, useRouteState} from '../../contexts/route';
import IconButton from '../IconButton';

const defaultState: Task = {
  completed_time: '0',
  duration: '0',
  fullyCompletedAt: null,
  runtime: '0',
  status: 'TODO',
  subtitle: '',
  title: '',
};

export default function TaskForm() {
  const [task, setTask] = useState<Task>(defaultState);
  const [duration, setDuration] = useState('');
  const [runtime, setRuntime] = useState('');
  const {goBack} = useRouteAction();
  const {params} = useRouteState();

  const isInvalidTask = (): boolean => {
    const {title, subtitle} = task;

    return !(
      title?.trim() &&
      subtitle?.trim() &&
      duration?.trim() &&
      runtime?.trim()
    );
  };

  const setStatus = (value: string) => {
    const status = value as Status;
    const fullyCompletedAt = status === 'DONE' ? String(Date.now()) : null;
    setTask({...task, status, fullyCompletedAt});
  };

  const handleLoad = async (taskId: string) => {
    const result = await client.request<QueryTaskById, Pick<Task, 'id'>>(
      TASK_BY_ID,
      {id: taskId},
    );
    const loadedTask = result.task || defaultState;
    const loadedDuration = fromS(Number(loadedTask?.duration) || 0, 'hh:mm:ss');
    const loadedRuntime = fromS(Number(loadedTask?.runtime) || 0, 'hh:mm:ss');

    setTask(loadedTask);
    setDuration(loadedDuration);
    setRuntime(loadedRuntime);
  };

  const handleSubmit = async () => {
    const taskToSave: Task = {
      ...task,
      duration: String(moment.duration(duration).asSeconds()),
      runtime: String(moment.duration(runtime).asSeconds()),
    };

    if (task.id) {
      await client.request<Task, UpdateTask>(UPDATE_TASK, {
        id: task.id,
        input: taskToSave,
      });
    } else {
      await client.request<Task, CreateTask>(CREATE_TASK, {input: taskToSave});
    }

    goBack();
  };

  const handleDelete = async () => {
    await client.request<Pick<Task, 'id'>, DeleteTask>(DELETE_TASK, {
      id: task.id,
    });
    goBack();
  };

  useEffect(() => {
    if (params) {
      handleLoad(params);
    }
  }, [params]);

  return (
    <>
      <TitleBar leftTitle={!task?.id ? 'Nova Tarefa' : 'Editar Tarefa'} />

      <Stack direction="column" padding="8" space={8}>
        <Input
          variant="underlined"
          type="text"
          paddingLeft="3"
          placeholder="Título"
          fontSize="16"
          value={task?.title}
          onChangeText={title => setTask({...task, title})}
        />

        <Input
          variant="underlined"
          type="text"
          paddingLeft="3"
          placeholder="Subtítulo"
          fontSize="16"
          value={task?.subtitle}
          onChangeText={subtitle => setTask({...task, subtitle})}
        />

        <InputMask
          variant="underlined"
          type="text"
          paddingLeft="3"
          fontSize="16"
          keyboardType="numeric"
          maxLength={8}
          placeholder="Duração"
          mask={/(\d{1,2})/g}
          replace={/\D/g}
          delimiter=":"
          value={duration}
          onChangeText={value => setDuration(value)}
        />

        <InputMask
          variant="underlined"
          type="text"
          paddingLeft="3"
          fontSize="16"
          keyboardType="numeric"
          maxLength={8}
          placeholder="Tempo de Execução"
          mask={/(\d{1,2})/g}
          replace={/\D/g}
          delimiter=":"
          value={runtime}
          onChangeText={value => setRuntime(value)}
        />

        <Select
          borderLeftWidth={0}
          borderTopWidth={0}
          borderRightWidth={0}
          borderBottomWidth={2}
          fontSize="16"
          selectedValue={task?.status}
          onValueChange={setStatus}>
          <Select.Item label="A Fazer" value="TODO" />
          <Select.Item label="Concluída" value="DONE" />
        </Select>

        <Box alignItems="center" marginTop="1/6">
          <Box flexDirection="row" justifyContent="space-between" w="1/2">
            <IconButton
              iconName="trash"
              size="54"
              color="danger.400"
              disabled={!task?.id}
              onPress={handleDelete}
            />
            <IconButton
              iconName="rotate-left"
              size="54"
              disabled={task?.completed_time === '0'}
              onPress={() => setTask({...task, completed_time: '0'})}
            />
            <IconButton
              iconName="save"
              size="54"
              color="fourth.400"
              disabled={isInvalidTask()}
              onPress={handleSubmit}
            />
          </Box>
        </Box>
      </Stack>
    </>
  );
}
