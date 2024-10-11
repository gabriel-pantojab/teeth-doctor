import { useEffect, useState } from "react";
import { secondsToFomattedTime } from "../utils/timer-utils";

interface TimerProps {
  duration: number;
  decresing?: boolean;
  endTime?: () => void;
  paused?: boolean;
}

export default function Timer({
  duration,
  decresing = false,
  paused = false,
}: TimerProps) {
  const [time, setTime] = useState<number>(decresing ? duration : 0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) {
        clearInterval(interval);
        return;
      }
      setTime((prevTime) => {
        const isFished = decresing ? prevTime === 0 : prevTime === duration;
        if (isFished) {
          clearInterval(interval);
          return prevTime;
        }
        return decresing ? prevTime - 1 : prevTime + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, decresing, paused]);

  useEffect(() => {}, [time]);

  return <div>{secondsToFomattedTime(time)}</div>;
}
