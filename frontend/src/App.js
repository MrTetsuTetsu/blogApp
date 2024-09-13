import React from 'react';
import NewCustomerCreate from './components/Customer/NewCustomerCreate';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './hooks/AuthContext';
import Navbar from './components/navibar';
import LoginForm from './components/Customer/LoginForms';
import Home from'./components/Home';
import Profile from './components/Customer/Profile'
import ChangePassword from './components/Customer/ChangePassword';



const IsAuthenticatedRoute = () => {
  const { isAuthenticated, loading, user } = useAuth();
  console.log('IsAuthenticatedRoute: loading:', loading);
  console.log('IsAuthenticatedRoute: isAuthenticated:', isAuthenticated);
  console.log('IsAuthenticatedRoute: user:', user);
  if(loading) {
    return <div>Loading...</div>
  }

  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/customer/login" />
  );
};

const IsnotAuthenticatedRoute = () => {
  const { isAuthenticated, loading, user } = useAuth();
  console.log('IsnotAuthenticatedRoute: loading:', loading);
  console.log('IsnotAuthenticatedRoute: isAuthenticated:', isAuthenticated);
  console.log('IsnotAuthenticatedRoute: user:', user);
  if(loading) {
    return <div>Loading...</div>
  }

  return (
    !isAuthenticated ? <Outlet /> : <Navigate to="/" />
  );
};



const App = () => {
  return (
      <Router>
        <div>
          <Navbar />
          <div>
            <Routes>
              {/* ログインしていないときに入れる */}
              <Route element={<IsnotAuthenticatedRoute/>}>
                <Route exact path="/customer/login" element={<LoginForm />} />
                <Route exact path="/customer/create" element={<NewCustomerCreate />} />
              </Route>
              {/* ログインしていると入れる */}
              <Route element={<IsAuthenticatedRoute />}>
                <Route exact path="/customer/profile" element={<Profile />} />
                <Route exact path="/customer/change-password" element={<ChangePassword />} />
              </Route>
              {/* 常に入れる */}
              <Route exact path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
