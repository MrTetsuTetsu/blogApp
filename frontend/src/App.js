import React from 'react';
import NewCustomerCreate from './components/Customer/NewCustomerCreate';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<NewCustomerCreate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
