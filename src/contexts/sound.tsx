import RNSound from 'react-native-sound';

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';

type SoundActions = {
  init: () => void;
  play: () => void;
  stop: () => void;
  release: () => void;
};

type SoundState = {
  isPlaying: boolean;
};

const ActionsContext = createContext<SoundActions>(undefined);
const StateContext = createContext<SoundState>({
  isPlaying: false,
});

export const useSoundActions = (): SoundActions => {
  return useContext(ActionsContext);
};

export const useSoundState = (): SoundState => {
  return useContext(StateContext);
};

type SoundProviderProps = {
  children: ReactNode;
};

export default function SoundProvider({children}: SoundProviderProps) {
  const [sound, setSound] = useState<RNSound>();
  const [isPlaying, setIsPlaying] = useState(false);

  const state: SoundState = useMemo(() => ({isPlaying}), [isPlaying]);

  const actions: SoundActions = useMemo(
    () => ({
      init: () => {
        setSound(new RNSound(require('./alarm.mp3')));
      },
      play: () => {
        sound.play();
        setIsPlaying(true);
      },
      stop: () => {
        sound.stop();
        setIsPlaying(false);
      },
      release: () => {
        sound.release();
      },
    }),
    [isPlaying],
  );

  return (
    <ActionsContext.Provider value={actions}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </ActionsContext.Provider>
  );
}
