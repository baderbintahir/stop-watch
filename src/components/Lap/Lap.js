import Timer from '../Timer/Timer';
import './Lap.css';

function Lap(props) {
    return (
        <div className="Lap">
            <div className="laps-container">
                {
                    props.laps.map(lap => (
                        <div className="lap" key={lap.srNo}>
                            <span className="lap-sr-no">#{lap.srNo}</span>
                            <span className={`${lap.type} lap-time`}>
                                <Timer 
                                    className="lap-time"
                                    time={lap.timeInstance}
                                />
                            </span>
                            <span className="lap-type">{lap.type}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Lap;
