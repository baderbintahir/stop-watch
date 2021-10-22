import './BigClock.css';

function BigClock(props) {
    return (
        <div className="BigClock">
            <div className="big-clock-container">
                {props.time}
            </div>
        </div>
    );
}

export default BigClock;
