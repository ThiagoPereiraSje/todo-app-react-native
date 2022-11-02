import Timer from 'react-native-background-timer-android';

type Callback = () => void;
type Updater = (value: number) => void;

export default class TimerService {
  static _refInteval: number;
  static current: number = 0;
  static final: number = 0;
  static callback: Callback;
  static updater: Updater;

  static start(
    di: number,
    df: number,
    onTimeUpdate: Updater,
    onTimeEnd: Callback,
  ) {
    this.current = di;
    this.final = df;
    this.updater = onTimeUpdate;
    this.callback = onTimeEnd;

    console.log('Start');

    this.play();
  }

  static pause() {
    Timer.clearInterval(this._refInteval);
  }

  static stop() {
    this.current = 0;
    Timer.clearInterval(this._refInteval);
  }

  static play() {
    this._refInteval = Timer.setInterval(() => {
      if (this.current >= this.final) {
        Timer.clearInterval(this._refInteval);
        this.callback();
      }

      this.current += 1;

      console.log('current: ', this.current);

      this.updater(this.current);
    }, 1000);
  }
}
