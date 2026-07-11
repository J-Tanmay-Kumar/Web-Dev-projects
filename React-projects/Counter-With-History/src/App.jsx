import React, { useState } from 'react';

function HistoryCounter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);

  const handleIncrement = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    setHistory([...history, nextCount]); // Adds new value to history
  };

  const handleDecrement = () => {
    const nextCount = count - 1;
    setCount(nextCount);
    setHistory([...history, nextCount]); // Adds new value to history
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Current Count: {count}</h2>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>

      <h3>Click History:</h3>
      <ul>
        {history.map((value, index) => (
          <li key={index}>Step {index}: {value}</li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryCounter;

