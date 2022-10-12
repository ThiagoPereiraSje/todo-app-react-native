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

  static async delete(id: number) {
    try {
      await Database.instance.executeSql('DELETE FROM tasks WHERE id = ?', [
        id,
      ]);
    } catch (e) {
      console.error(`Error on delete tasks: ${e.message || e}`);
    }
  }

  static async get(id: number): Promise<Task | undefined> {
    try {
      const results = await Database.instance.executeSql(
        'SELECT * FROM tasks WHERE id = ?',
        [id],
      );

      if (results[0].rows.length) {
        return results[0].rows.item(0);
      }

      return undefined;
    } catch (e) {
      console.error(`Error on get task: ${e.message || e}`);
    }
  }

  static async list(
    criteria: string = '',
    data: any[] = [],
  ): Promise<Task[] | undefined> {
    const stmt = `SELECT * FROM tasks ${criteria}`;
    const tasks: Task[] = [];

    try {
      const results = await Database.instance.executeSql(stmt, data);

      for (let i = 0; i < results[0].rows.length; i++) {
        tasks.push(results[0].rows.item(i));
      }

      return tasks;
    } catch (e) {
      console.error(`Error on list tasks: ${e.message || e}`);
    }
  }
}
