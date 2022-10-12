type Status = 'TODO' | 'DONE';

export default class Task {
  constructor(
    public id: number = undefined,
    public title: string = undefined,
    public subtitle: string = undefined,
    public duration: number = 0,
    public runtime: number = 0,
    public completed_time: number = 0,
    public status: Status = 'TODO',
    public fullyCompletedAt: number = undefined,
  ) {}
}
