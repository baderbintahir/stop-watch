import './SplitTime.css';

function SplitTime(props) {
  return (
    <div className="split-time-container">
        <span className="split-time">{props.splitTime}</span>
    </div>
  );
}

export default SplitTime;
