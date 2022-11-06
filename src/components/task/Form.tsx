import React, {useState, useEffect} from 'react';
import moment from 'moment';
import 'moment-duration-format';
import TitleBar from '../TitleBar';
import {Input, VStack, Select, Button, Icon} from 'native-base';
import MtIcon from 'react-native-vector-icons/MaterialIcons';
import InputMask from '../InputMask';
import Task, {Status} from '../../entities/task';
import TaskDAO from '../../services/database/taskDAO';
import {useRouteAction, useRouteState} from '../../contexts/route';

export default function TaskForm() {
  const [task, setTask] = useState<Task>(new Task());
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
    const fullyCompletedAt = status === 'DONE' ? Date.now() : undefined;
    setTask({...task, status, fullyCompletedAt});
  };

  const handleLoad = async (taskId: number) => {
    const loadedTask = await TaskDAO.get(taskId);
    const loadedDuration = moment
      .duration(loadedTask.duration, 'seconds')
      .format('hh:mm:ss');
    const loadedRuntime = moment
      .duration(loadedTask.runtime, 'seconds')
      .format('hh:mm:ss');

    setTask(loadedTask);
    setDuration(loadedDuration);
    setRuntime(loadedRuntime);
  };

  const handleSubmit = async () => {
    const taskToSave: Task = {
      ...task,
      duration: moment.duration(duration).asSeconds(),
      runtime: moment.duration(runtime).asSeconds(),
    };

    await TaskDAO.save(taskToSave);
    goBack();
  };

  useEffect(() => {
    if (typeof params === 'number') {
      handleLoad(Number(params));
    }
  }, [params]);

  return (
    <>
      <TitleBar leftTitle="Nova Tarefa" />

      <VStack padding="10px" space={8}>
        <Input
          variant="underlined"
          type="text"
          paddingLeft="3"
          placeholder="Título"
          fontSize="16"
          value={task.title}
          onChangeText={title => setTask({...task, title})}
        />

        <Input
          variant="underlined"
          type="text"
          paddingLeft="3"
          placeholder="Subtítulo"
          fontSize="16"
          value={task.subtitle}
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
          selectedValue={task.status}
          onValueChange={setStatus}>
          <Select.Item label="A Fazer" value="TODO" />
          <Select.Item label="Concluída" value="DONE" />
        </Select>

        <Button
          marginTop="5"
          bgColor="fourth.700"
          p="4"
          _pressed={{bgColor: 'fourth.800'}}
          _text={{fontWeight: 'bold'}}
          leftIcon={<Icon as={MtIcon} name="save" />}
          disabled={isInvalidTask()}
          onPress={handleSubmit}>
          SALVAR
        </Button>
      </VStack>
    </>
  );
}
