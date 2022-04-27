import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  BrowserRouter
} from "react-router-dom";
import Stocks from './components/stocks/stocks';
import Quotes from './components/quotes/quote';


function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/quotes/:id" element={<Quotes />} />
            <Route path="/" element={<Stocks />} />
          </Routes>
        </BrowserRouter>
      </div>


    </>
  )
}
export default App;
