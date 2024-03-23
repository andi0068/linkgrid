import { useState, useEffect } from 'react';

export interface UseFlashProps {
  duration?: number;
}

export default function useFlash({ duration }: UseFlashProps) {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (!(duration && isOn)) return;

    const timeout = setTimeout(turnOff, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [duration, isOn]);

  function turnOn() {
    setIsOn(true);
  }

  function turnOff() {
    setIsOn(false);
  }

  return {
    isOn,
    turnOn,
    turnOff,
  } as const;
}
