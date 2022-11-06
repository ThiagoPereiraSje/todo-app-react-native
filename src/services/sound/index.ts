import SoundPlayer from 'react-native-sound-player';

export default class Sound {
  static play() {
    SoundPlayer.playSoundFile('alarm', 'mp3');
  }

  static stop() {
    SoundPlayer.stop();
  }
}
