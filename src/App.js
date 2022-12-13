import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [result, setResult] = useState();

  const [formData, setFormData] = useState({
    operation: '',
    firstNumber: 0,
    secondNumber: 0
  });

  const handleFormChange = (event) => {

    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });

  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { operation, firstNumber, secondNumber } = formData;

    console.log(operation, firstNumber, secondNumber);

    const response = await axios.post('http://localhost:8080/api/v1/do-math', {
      operation,
      operand1: firstNumber,
      operand2: secondNumber
    });

    setResult(response.data.calcResponse)
  };

  return (
    <div className="App">
      <h2 className='title' >DABAGIRE Valens - Calculator</h2>
      <div className="form-container">
        <form onSubmit={handleFormSubmit}>
          <div className="controller">
            <label htmlFor="operation">Operation</label>
            <select
              name="operation"
              id="operation"
              value={formData.operation}
              onChange={handleFormChange}
            >
              <option value="">Select Operation</option>
              <option value="+">Addition</option>
              <option value="-">Substraction</option>
              <option value="*">Multiplication</option>
              <option value="/">Division</option>
            </select>
          </div>
          <div className="controller">
            <label htmlFor="firstNumber">First Number</label>
            <input
              type="number"
              id="firstNumber"
              name='firstNumber'
              value={formData.firstNumber}
              onChange={handleFormChange}
            />
          </div>
          <div className="controller">
            <label htmlFor="secondNumber">Second Number</label>
            <input
              type="number"
              id="firstNumber"
              name='secondNumber'
              value={formData.secondNumber}
              onChange={handleFormChange}
            />
          </div>
          <button>
            Calculate
          </button>
        </form>
      </div>

      <div className="result">
        {result && <>
          <h3>Result</h3>
          <p>{formData.firstNumber} {formData.operation} {formData.secondNumber}  = {result}</p>
        </>}
      </div>
    </div>
  );
}

export default App;
