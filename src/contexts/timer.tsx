import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useRef,
} from 'react';

import Timer from 'react-native-background-timer-android';

type Callback = () => void;

type TimerState = {
  current: number;
  final: number;
};

type TimerActions = {
  start: (
    initialTime: number,
    finalTime: number,
    newCallback: Callback,
  ) => void;
  pause: () => void;
  stop: () => void;
  play: () => void;
};

const StateContext = createContext<TimerState>({
  current: 0,
  final: 0,
});

const ActionsContext = createContext<TimerActions>(undefined);

export const useTimerState = (): TimerState => {
  return useContext(StateContext);
};

export const useTimerActions = (): TimerActions => {
  return useContext(ActionsContext);
};

type TimerProviderProps = {
  children: ReactNode;
};

export default function TimerProvider({children}: TimerProviderProps) {
  const refInterval = useRef<number>();
  const refCurrent = useRef<number>(0);
  const refFinal = useRef<number>(0);
  const refCallback = useRef<Callback>(() => {});
  const [current, setCurrent] = useState(0);
  const [final, setFinal] = useState(0);

  const handlePlay = () => {
    refInterval.current = Timer.setInterval(() => {
      if (refCurrent.current >= refFinal.current) {
        Timer.clearInterval(refInterval.current);
        refCallback.current();
      }

      refCurrent.current += 1;
      console.log('current: ', refCurrent.current);
      setCurrent(refCurrent.current);
    }, 1000);
  };

  const handlePause = () => {
    Timer.clearInterval(refInterval.current);
  };

  const handleStop = () => {
    refCurrent.current = 0;
    Timer.clearInterval(refInterval.current);
  };

  const state: TimerState = useMemo(() => ({current, final}), [current, final]);

  const actions: TimerActions = useMemo(
    () => ({
      start: (initialTimer, finalTimer, newCallback) => {
        refCurrent.current = initialTimer;
        refFinal.current = finalTimer;
        refCallback.current = newCallback;
        setFinal(finalTimer);

        handlePlay();
      },
      pause: () => {
        handlePause();
      },

      stop: () => {
        handleStop();
      },

      play: () => {
        handlePlay();
      },
    }),
    [],
  );

  return (
    <ActionsContext.Provider value={actions}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </ActionsContext.Provider>
  );
}
