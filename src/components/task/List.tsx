import React, {useState, useEffect} from 'react';
import {Box, Text} from 'native-base';
import MenuItem from '../MenuItem';
import Spinner from '../Spinner';

import Task, {Status as TaskStatus} from '../../entities/task';
import TaskDAO from '../../services/database/taskDAO';

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
        <Box>
          <Text>Task List</Text>
        </Box>
      )}
    </>
  );
}
