import Timer from 'react-native-background-timer-android';

type Callback = () => void;

export default class TimerService {
  static _refInteval: number;
  static current: number = 0;
  static final: number = 0;
  static callback: Callback;

  static start(di: number, df: number, exec: Callback) {
    this.current = di;
    this.final = df;
    this.callback = exec;

    this._refInteval = Timer.setInterval(() => {
      if (this.current >= this.final) {
        Timer.clearInterval(this._refInteval);
        this.callback();
      }

      this.current += 1;
    }, 1000);
  }

  static pause() {
    Timer.clearInterval(this._refInteval);
  }

  static play() {
    this.start(this.current, this.final, this.callback);
  }
}
