import RNSound from 'react-native-sound';

export default class Sound {
  private static sound: RNSound;

  static init() {
    console.log('iniciar o som');
    // try {
    //   this.sound = new RNSound(require('./alarm.mp3'));
    //   this.sound.setNumberOfLoops(-1);
    // } catch (e) {
    //   console.warn('Erro: ', JSON.stringify(e));
    // }
  }

  static play() {
    // this.sound.play();
  }

  static stop() {
    // this.sound.stop();
  }

  static release() {
    // this.sound.release();
  }
}
