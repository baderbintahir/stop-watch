import { useState, useEffect } from 'react';
import ControlButtons from '../ControlButttons/ControlButtons';
import Lap from '../Lap/Lap';
import Timer from '../Timer/Timer';
import './StopWatch.css';

function StopWatch() {
    const [isStart, setIsStart] = useState(false)
    const [isPause, setIsPause] = useState(false)
    const [time, setTime] = useState(0)
    const [splitTime, setSplitTime] = useState(0)
    const [laps, setLaps] = useState([])

    useEffect(() => {
        let timeInterval = null

        if (isStart) {
            timeInterval = setInterval(() => {
                setTime((time) => time + 10)
                setSplitTime((splitTime) => splitTime + 10)
            }, 10)
        } else {
            clearInterval(timeInterval)
        }

        return () => {
            clearInterval(timeInterval);
        }

    }, [isStart, time, splitTime])

    const addLap = lapType => {
        setLaps([...laps, {
            srNo: laps.length + 1,
            timeInstance: time,
            type: lapType
        }])
    }

    const handleStart = () => {
        setIsStart(!isStart)

        if (time) {
            setIsPause(!isPause)

            if (!isPause) {
                addLap('pause')
                setSplitTime(0)
            }
        }

    }

    const handleSplit = () => {
        addLap('split')
        setSplitTime(0)
    }

    const handleReset = () => {
        setIsStart(false)
        setIsPause(false)
        setTime(0)
        setSplitTime(0)
        setLaps([])
    }

    return (
        <div className="stop-watch">
            <Timer 
                className="main-timer"
                time={time}
            />
            <Timer 
                className="split-time"
                time={splitTime}
            />
            <ControlButtons
                isStart={isStart}
                isPause={isPause}
                handleStart={handleStart}
                handleSplit={handleSplit}
                handleReset={handleReset}
            />
            <hr />
            <Lap laps={laps} />
        </div>
    );
}

export default StopWatch;