import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomerProfiles } from '../../api';
import { useAuth } from '../../hooks/AuthContext';


const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // useNavigate フックを使用
  const { logout } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const response = await getCustomerProfiles();
      if (response) {
        setUser(response.data);
      }
    }
    fetchData();
  }, []);

  const handleLogout = async() => {
    await logout();
    setUser(null);
    navigate('/customer/login')
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">Profile</h1>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6">
            <label className="block text-sm font-medium leading-5 text-gray-700">Username</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <p className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900">{user.username}</p>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium leading-5 text-gray-700">Email</label>
            <div className="mt-1 rounded-md shadow-sm">
              <p className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900">{user.email}</p>
            </div>
          </div>

          <div className="mt-6">
            <span className="block w-full rounded-md shadow-sm">
              <button 
                onClick={handleLogout}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
              >
                Logout
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
