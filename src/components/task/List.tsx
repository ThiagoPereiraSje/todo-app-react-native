import React, {useState, useEffect} from 'react';
import {Box, Text, ScrollView} from 'native-base';
import MenuItem from '../MenuItem';
import Spinner from '../Spinner';

import Task, {Status as TaskStatus} from '../../entities/task';
import TaskDAO from '../../services/database/taskDAO';
import TitleBar from '../TitleBar';

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
  const [loading, setLoading] = useState(true);
  const [taskStatus] = useState<TaskStatus>('TODO');
  const [tasks, setTasks] = useState<Task[]>([]);

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

  useEffect(() => {
    handleLoad(taskStatus);
  }, [taskStatus]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <TitleBar leftTitle="Tarefas" />

          {tasks.length ? (
            <ScrollView marginBottom={7}>
              {tasks.map(t => (
                <Text key={t.id}>{t.title}</Text>
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
