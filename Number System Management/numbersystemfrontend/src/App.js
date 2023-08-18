import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [urls, setUrls] = useState('');
  const [error, setError] = useState('');

  const fetchNumbers = async () => {
    setError('');
    try {
      const response = await axios.get(`http://localhost:8008/numbers?url=${urls}`);
      setNumbers(response.data.numbers);
    } catch (error) {
      setError('Error fetching numbers. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Number Management Service</h1>
      <div>
        <input
          type="text"
          placeholder="Enter URLs separated by comma"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
        />
        <button onClick={fetchNumbers}>Fetch Numbers</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div>
        {numbers.length > 0 && (
          <div>
            <h2>Merged Unique Numbers</h2>
            <ul>
              {numbers.map((number) => (
                <li key={number}>{number}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;