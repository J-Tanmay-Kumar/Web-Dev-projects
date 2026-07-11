import React, { useState } from 'react';

function HistoryCounter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);

  const handleIncrement = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    setHistory([...history, nextCount]);
  };

  const handleDecrement = () => {
    const nextCount = count - 1;
    setCount(nextCount);
    setHistory([...history, nextCount]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        
        {/* Header Display */}
        <div className="text-center mb-6">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Current Count</p>
          <h2 className="text-6xl font-extrabold text-gray-800 mt-1 transition-all">
            {count}
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={handleDecrement}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition duration-200 active:scale-95 shadow-md shadow-red-200"
          >
            Decrement
          </button>
          <button 
            onClick={handleIncrement}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition duration-200 active:scale-95 shadow-md shadow-emerald-200"
          >
            Increment
          </button>
        </div>

        {/* Click History Section */}
        <div>
          <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center justify-between">
            <span>Click History</span>
            <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
              {history.length - 1} actions
            </span>
          </h3>
          
          <div className="max-h-48 overflow-y-auto border border-gray-100 rounded-xl bg-gray-50 p-2">
            {history.length <= 1 ? (
              <p className="text-gray-400 text-sm text-center py-4">No activity yet</p>
            ) : (
              <ul className="space-y-1.5">
                {history.map((value, index) => (
                  <li 
                    key={index} 
                    className="flex justify-between items-center text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100"
                  >
                    <span className="font-medium text-gray-400">Step {index}</span>
                    <span className={`font-bold ${value >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default HistoryCounter;
