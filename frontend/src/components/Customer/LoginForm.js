import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    // ユーザー情報を管理するために
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    // apiにユーザー情報送信トライ
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('', {
            username,
            password
          });
          setMessage('Login Success!');
          console.log(response.data);
        } catch (error) {
          console.error('There was an error registering!', error);
          setMessage('There was an error registering!');
        }
    };
    // 描画用のhtml
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">ログイン</h1>
            </div>

            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-medium leading-5  text-gray-700">Username</label>
                            <div class="mt-1 relative rounded-md shadow-sm">
                                <input
                                    type="text"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <div class="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6">
                            <label className="block text-sm font-medium leading-5 text-gray-700">Password</label>
                            <div class="mt-1 rounded-md shadow-sm">
                            <input
                                type="password"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            </div>
                        </div>

                        <div class="mt-6">
                            <span class="block w-full rounded-md shadow-sm">
                                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                    ログイン
                                </button>
                            </span>
                        </div>
                    </form>
                    {message && <p className="mt-4 text-center text-sm text-green-500">{message}</p>}
                </div>
            </div>
        </div>
    );
    
};
  
export default LoginForm;
