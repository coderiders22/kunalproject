import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data) throw new Error("Invalid JSON format");

      const response = await axios.post("https://influential-shark-webinorbit-e39b8e45.koyeb.app/bfhl", parsedData);
      setResponseData(response.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    setSelectedFilters((prev) =>
      checked ? [...prev, value] : prev.filter((filter) => filter !== value)
    );
  };

  return (
    <div>
      <h1>CU12345</h1>
      <textarea
        placeholder='Enter JSON { "data": ["A", "B", "1", "2"] }'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {responseData && (
        <>
          <div>
            <label>
              <input
                type="checkbox"
                value="numbers"
                onChange={handleFilterChange}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="alphabets"
                onChange={handleFilterChange}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="highest_alphabet"
                onChange={handleFilterChange}
              />
              Highest Alphabet
            </label>
          </div>

          <h2>Response:</h2>
          <pre>
            {JSON.stringify(
              Object.fromEntries(
                Object.entries(responseData).filter(([key]) =>
                  selectedFilters.includes(key)
                )
              ),
              null,
              2
            )}
          </pre>
        </>
      )}
    </div>
  );
}

export default App;