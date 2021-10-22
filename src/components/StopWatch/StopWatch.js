import { useState, useEffect } from 'react';
import BigClock from '../BigClock/BigClock';
import ControlButtons from '../ControlButttons/ControlButtons';
import Lap from '../Lap/Lap';
import SplitTime from '../SplitTime/SplitTime';
import './StopWatch.css';

function StopWatch() {
    const [isStart, setIsStart] = useState(false)
    const [isPause, setIsPause] = useState(false)
    const [time, setTime] = useState(0)
    const [timeString, setTimeString] = useState('00:00:00.00')
    const [splitTime, setSplitTime] = useState(0)
    const [splitTimeString, setSplitTimeString] = useState('SPLIT TIME')
    const [laps, setLaps] = useState([])

    useEffect(() => {
        let timeInterval = null

        if (isStart) {
            timeInterval = setInterval(() => {
                setTime((time) => time + 10)
                setTimeString(timeStringGenerator(time))

                setSplitTime((splitTime) => splitTime + 10)
                setSplitTimeString(timeStringGenerator(splitTime))
            }, 10)
        } else {
            clearInterval(timeInterval)
        }

        return () => {
            clearInterval(timeInterval);
        }

    }, [isStart, time, splitTime])

    const timeStringGenerator = time => {
        return `${("0" + Math.floor((time / 360000) % 60)).slice(-2)}:${("0" + Math.floor((time / 60000) % 60)).slice(-2)}:${("0" + Math.floor((time / 1000) % 60)).slice(-2)}.${("0" + ((time / 10) % 1000)).slice(-2)}`
    }

    const addLap = lapType => {
        setLaps([...laps, {
            srNo: laps.length + 1,
            timeInstance: timeString,
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
        setTimeString('00:00:00.00')
        setSplitTime(0)
        setSplitTimeString('SPLIT TIME')
        setLaps([])
    }

    return (
        <div className="stop-watch">
            <BigClock
                time={timeString}
            />
            <SplitTime
                splitTime={splitTimeString}
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
