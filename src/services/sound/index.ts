import RNSound from 'react-native-sound';

RNSound.setCategory('Playback');

const Sound = new RNSound('alarm.mp3', RNSound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // when loaded successfully
  console.log('Som carregado com sucesso!');
});

Sound.setVolume(1);
Sound.setNumberOfLoops(-1);

export default Sound;
