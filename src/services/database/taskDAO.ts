import Task from '../../entities/task';
import Database from './index';

const fields =
  'id, title, subtitle, duration, runtime, completed_time, status, fullyCompletedAt';
const values = '?, ?, ?, ?, ?, ?, ?, ?';

export default class TaskDAO {
  static async save(task: Task) {
    const data = [
      task.id,
      task.title,
      task.subtitle,
      task.duration,
      task.runtime,
      task.completed_time,
      task.status,
      task.fullyCompletedAt,
    ];

    try {
      const sql_command = task.id ? 'REPLACE' : 'INSERT';

      await Database.instance.executeSql(
        `${sql_command} INTO tasks (${fields}) VALUES (${values})`,
        data,
      );
    } catch (e) {
      console.error(`Error on save task: ${e.message || e}`);
    }
  }
}
