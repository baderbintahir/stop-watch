import { useState, useEffect } from 'react';
import ControlButtons from '../ControlButttons/ControlButtons';
import Lap from '../Lap/Lap';
import Timer from '../Timer/Timer';
import './StopWatch.css';

const initialBtnCondition = {
    isStart: false, 
    isPause: false
}

const initialTimes = {
    mainTime: 0, 
    splitTime: 0
}

function StopWatch() {
    const [btnCondition, setBtnCondition] = useState(initialBtnCondition)
    const [times, setTimes] = useState(initialTimes)
    const [laps, setLaps] = useState([])

    useEffect(() => {
        let timeInterval = null

        if (btnCondition.isStart) {
            timeInterval = setInterval(() => {
                setTimes(prevState => ({
                    mainTime: prevState.mainTime + 10,
                    splitTime: prevState.splitTime + 10
                }))
            }, 10)
        } else {
            clearInterval(timeInterval)
        }

        return () => {
            clearInterval(timeInterval);
        }

    }, [btnCondition.isStart, times])

    const addLap = lapType => {
        setLaps([...laps, {
            srNo: laps.length + 1,
            timeInstance: times.mainTime,
            type: lapType
        }])
    }

    const handleStart = () => {
        setBtnCondition(prevState => ({
            ...prevState,
            isStart: !prevState.isStart
        }))

        if (times.mainTime) {
            setBtnCondition(prevState => ({
                ...prevState,
                isPause: !prevState.isPause
            }))

            if (!btnCondition.isPause) {
                addLap('pause')
                setTimes(prevState => ({
                    ...prevState,
                    splitTime: 0
                }))
            }
        }

    }

    const handleSplit = () => {
        addLap('split')
        setTimes(prevState => ({
            ...prevState,
            splitTime: 0
        }))
    }

    const handleReset = () => {
        setBtnCondition(initialBtnCondition)
        setTimes(initialTimes)
        setLaps([])
    }

    return (
        <div className="stop-watch">
            <Timer 
                className="main-timer"
                time={times.mainTime}
            />
            <Timer 
                className="split-time"
                time={times.splitTime}
            />
            <ControlButtons
                isStart={btnCondition.isStart}
                isPause={btnCondition.isPause}
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