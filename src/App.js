import React from 'react';
import './App.css';
import MyStocks from  './components/MyStocks'

function App() {
  return (
    <div className="App">
      <div className="header">
        <strong>FInancial Portfolio Tracker</strong>
      </div>
      <MyStocks/>
    </div>
  );
}

export default App;
