import './ControlButtons.css';

function ControlButtons(props) {
    return (
        <div className="control-btns">
            <button className="control-btn start-btn" onClick={props.handleStart}>{props.isStart ? 'Pause': 'Start'}</button>
            <button className="control-btn split-btn" onClick={props.handleSplit} disabled={!props.isStart}>Split</button>
            <button className="control-btn reset-btn" onClick={props.handleReset} disabled={!props.isPause}>Reset</button>
        </div>
    );
}

export default ControlButtons;
