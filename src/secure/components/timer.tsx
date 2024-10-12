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
  endTime,
}: TimerProps) {
  const [time, setTime] = useState<number>(decresing ? duration : 0);
  const [end, setEnd] = useState<boolean>(false);

  useEffect(() => {
    if (!paused) {
      setEnd(false);
    }
  }, [paused]);

  useEffect(() => {
    setTime(decresing ? duration : 0);
  }, [end, duration, decresing]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (paused) {
        clearInterval(interval);
        return;
      }
      setTime((prevTime) => {
        const isFished = decresing ? prevTime === 0 : prevTime === duration;
        if (isFished) {
          setEnd(true);
          if (endTime) {
            setTimeout(() => {
              endTime();
            }, 0);
          }
          clearInterval(interval);
          return prevTime;
        }
        return decresing ? prevTime - 1 : prevTime + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, duration]);

  return <div>{secondsToFomattedTime(time)}</div>;
}
