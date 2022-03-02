import './elevator.css';

import { useState, useEffect } from 'react';

const FLOORS = 10;

function Elevator() {
  const [state, setState] = useState({
    target: null,
    currentFloor: 0,
    activeFloors: new Set([0]),
    isNextFloorStop: false,
  });
  useEffect(() => {
    if (state.target === null && state.activeFloors.size === 0) return;
    if (state.target === state.currentFloor && state.activeFloors.size === 0)
      return;

    let target = state.target;
    if (state.target === null || state.target === state.currentFloor) {
      const sortedFloors = [...state.activeFloors]
        .map((f) => [f, Math.abs(f - state.currentFloor)])
        .sort((a, b) => a[1] - b[1])
        .map((a) => a[0]);
      target = sortedFloors[0];
    }

    const currentFloor =
      state.currentFloor + Math.sign(target - state.currentFloor);
    const activeFloors = new Set(state.activeFloors);
    const isNextFloorStop = activeFloors.delete(currentFloor);

    setTimeout(
      () => {
        setState({
          currentFloor,
          target,
          activeFloors,
          isNextFloorStop,
        });
      },
      state.isNextFloorStop ? 2000 : 1000
    );
  }, [state]);

  console.log(state);

  return (
    <div>
      {Array(FLOORS)
        .fill()
        .map((_, i) => (
          <div className="floor">
            <div
              className="elevator"
              style={{
                background: i === state.currentFloor ? 'Aqua' : 'white',
              }}
            ></div>

            <div className="controls">
              {i}
              <button
                style={{
                  border: state.activeFloors.has(i)
                    ? '1px solid red'
                    : '1px solid black',
                }}
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    activeFloors: new Set([...prev.activeFloors, i]),
                  }))
                }
              ></button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Elevator;
