import React from 'react';
import NewCustomerCreate from './components/Customer/NewCustomerCreate';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navibar';
import LoginForm from './components/Customer/LoginForm';


const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div>
          <Routes>
            <Route exact path="/customer/create" element={<NewCustomerCreate />} />
            <Route exact path="/customer/login" element={<LoginForm />} />
            <Route exact path="/" element={<NewCustomerCreate />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
