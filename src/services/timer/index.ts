import Timer from 'react-native-background-timer-android';

export default class TimerService {
  static _refInteval: number;
  static current: number = 0;
  static final: number = 0;

  static start(di: number, df: number, exec = () => ({})) {
    this.current = di;
    this.final = df;

    this._refInteval = Timer.setInterval(() => {
      if (this.current >= this.final) {
        Timer.clearInterval(this._refInteval);
        exec();
      }

      this.current += 1;
    }, 1000);
  }
}
