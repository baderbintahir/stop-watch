import './Timer.css';

function Timer(props) {
  return (
    <div className={`timer ${props.className}`}>
        <span>
            {("0" + Math.floor((props.time / 360000) % 60)).slice(-2)}:
        </span>
        <span>
            {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
        </span>
        <span>
            {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
        </span>
        <span>
            {("0" + ((props.time / 10) % 1000)).slice(-2)}
        </span>
    </div>
  );
}

export default Timer;
