// Note: This code is a simplified version of a digit span task. It includes basic functionality for starting rounds, displaying digits, handling input, and scoring. The UI is styled using Tailwind CSS classes for a clean look. Adjustments can be made to enhance the user experience or add more features as needed.
// The code also includes a log of each round's results, which can be useful for debugging or analysis.
// The `useEffect` hook logs the session data when the phase changes to 'instructions', allowing you to see the results of the task after completion.
// The component uses React Router's `useNavigate` for navigation, allowing users to return to the home page easily.
// The component is designed to be responsive and user-friendly, with clear instructions and feedback for each phase of the task.
// The code is structured to allow for easy modifications, such as changing the number of digits, display time, and delay time, making it flexible for different testing scenarios.   
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InProgress() {
  const [phase, setPhase] = useState('instructions');
  const [digit, setDigit] = useState('');
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [digitLength, setDigitLength] = useState(3);
  const [displayTime, setDisplayTime] = useState(1);
  const [delayTime, setDelayTime] = useState(0.5);
  const [totalRounds, setTotalRounds] = useState(10);
  const [log, setLog] = useState([]);

  const navigate = useNavigate();

  const generateDigit = () => Array.from({ length: digitLength }, () => Math.floor(Math.random() * 10)).join('');

  const startRound = () => {
    const newDigit = generateDigit();
    setDigit(newDigit);
    setInput('');
    setPhase('show');
    setTimeout(() => setPhase('wait'), displayTime * 1000);
    setTimeout(() => setPhase('input'), (displayTime + delayTime) * 1000);
  };

  const handleInputSubmit = () => {
    const reverseDigit = digit.split('').reverse().join('');
    if (input === digit) {
      setInput('');
      setPhase('inputReverse');
      return;
    }
    const points = input === reverseDigit ? 1 : 0.5;
    finalizeRound(points);
  };

  const handleReverseSubmit = () => {
    const reverseDigit = digit.split('').reverse().join('');
    const points = input === reverseDigit ? 1 : 0.5;
    finalizeRound(points, true);
  };

  const finalizeRound = (points, isReverse = false) => {
    setScore(prev => prev + points);
    setLog(prev => [
      ...prev,
      { round, digit, input, phase: isReverse ? 'reverse' : 'input', points }
    ]);
    if (round >= totalRounds) {
      setPhase('summary');
    } else {
      setRound(prev => prev + 1);
      setPhase('instructions');
    }
    setInput('');
  };

  useEffect(() => {
    if (phase === 'instructions') console.log('Session log:', log);
  }, [phase]);

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex flex-col items-center">
      <div className="w-full flex justify-between mb-6">
        <button onClick={() => navigate('/')} className="text-blue-600 hover:underline text-lg">← Back to Home</button>
        <div className="text-xl font-semibold">Digit Span Task</div>
        <div className="text-md">Score: {score}</div>
      </div>

      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        {phase === 'instructions' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ul className="list-disc list-inside mb-4 text-left">
              <li>A number will appear briefly. Try to remember it.</li>
              <li>After a delay, input the number you saw.</li>
              <li>If correct, input the number in reverse next.</li>
              <li>Each correct answer earns points. Incorrect = partial credit.</li>
            </ul>
            <div className="flex flex-col gap-2">
              <label>
                Digits to remember:
                <input type="number" value={digitLength} min={1} onChange={(e) => setDigitLength(Number(e.target.value))} className="border p-1 rounded w-full" />
              </label>
              <label>
                Display time (seconds):
                <input type="number" value={displayTime} onChange={(e) => setDisplayTime(Number(e.target.value))} className="border p-1 rounded w-full" />
              </label>
              <label>
                Delay after number disappears (seconds):
                <input type="number" value={delayTime} onChange={(e) => setDelayTime(Number(e.target.value))} className="border p-1 rounded w-full" />
              </label>
              <label>
                Total number of rounds:
                <input type="number" value={totalRounds} min={1} onChange={(e) => setTotalRounds(Number(e.target.value))} className="border p-1 rounded w-full" />
              </label>
              <button onClick={startRound} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">Start Task</button>
            </div>
          </div>
        )}

        {phase === 'show' && <div className="text-3xl text-center">{digit}</div>}
        {phase === 'wait' && <div className="text-center">...</div>}

        {(phase === 'input' || phase === 'inputReverse') && (
          <div className="mt-4">
            <p className="mb-2 text-center">
              {phase === 'inputReverse' ? 'Enter the number in reverse' : 'Enter the number you saw'}
            </p>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            <div className="flex justify-center">
              <button
                onClick={phase === 'input' ? handleInputSubmit : handleReverseSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {phase === 'summary' && (
          <div>
            <h2 className="text-xl font-bold text-center mb-4">Session Summary</h2>
            <p className="text-center mb-2">Total Score: {score.toFixed(1)} / {totalRounds * 2}</p>
            <ul className="text-left text-sm mb-4 space-y-2">
              {log.map((entry, idx) => (
                <li key={idx}>
                  <strong>Round {entry.round}:</strong> Target: {entry.digit} | Your input: {entry.input} | Phase: {entry.phase} | Points: {entry.points}
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setRound(1);
                  setScore(0);
                  setLog([]);
                  setPhase('instructions');
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-500 text-center">
          Round: {round} • Phase: {phase}
        </div>
      </div>
    </div>
  );
}
