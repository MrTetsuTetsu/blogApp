import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewCustomerCreate = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageStatus, setMessageStatus] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [loading, setLoading] = useState(false); // ローディング状態を管理
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setLoading(true); // ローディング開始
            await axios.post('http://localhost:8000/api/customers/create/', {
                username,
                email,
                password
            });
            setMessage('新規登録が完了しました。ログイン画面に遷移します');
            setMessageStatus('success');
            setTimeout(() => navigate('/customer/login'), 4000);
        } catch (error) {
            setLoading(false); // エラー時にローディング解除
            setMessage('既に登録されているか、不正な値です');
            setMessageStatus('error');
        }
        setShowMessage(false); // メッセージを一旦非表示に
        setTimeout(() => setShowMessage(true), 100); // 少し遅らせて再表示
    };

    const handleDeleteMessage = () => {
        setMessage(null);
        setMessageStatus(null);
        setShowMessage(false);
    };

    return (
        <div className="min-h-screen translate-y-12 bg-white flex flex-col justify-center sm:px-6 lg:px-8 px-6 relative">
            {loading && ( // ローディング中はオーバーレイを表示
                <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="loader">
                        {showMessage && message && messageStatus === 'success' && (
                            <div id="toast-default" className="flex transform w-full items-center mt-4 z-50 text-green-600 bg-green-100 animate-fadeInExpand p-2 rounded-md border border-green-600" role="alert">
                                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg text-green-500 bg-green-100">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    <span className="sr-only">Check icon</span>
                                </div>
                                <div className="ms-1 text-sm font-normal">{message}</div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-3xl leading-9 font-extrabold text-gray-900 mt-5">新規登録</h1>
            </div>

            <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md relative">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleRegister}>
                        <div>
                            <label className="block text-sm font-medium leading-5 text-gray-700">Username</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    type="text"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium leading-5 text-gray-700">Email</label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input
                                    type="email"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium leading-5 text-gray-700">Password</label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input
                                    type="password"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <span className="block w-full rounded-md shadow-sm">
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                    Create
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
                {!loading && showMessage && message && (
                    <div id="toast-default" className={`absolute flex left-1/2 transform -translate-x-1/2 w-full items-center mt-4 z-50 ${messageStatus === 'success' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'} animate-fadeInExpand p-2 rounded-md border ${messageStatus === 'success' ? 'border-green-600' : 'border-red-600'}`} role="alert">
                        <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${messageStatus === 'success' ? 'text-green-500 bg-green-100' : 'text-red-500 bg-red-100'}`}>
                            {messageStatus === 'success' ? (
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"/>
                                </svg>
                            )}
                            <span className="sr-only">{messageStatus === 'success' ? 'Check icon' : 'Fire icon'}</span>
                        </div>
                        <div className="ms-1 text-sm font-normal">{message}</div>
                        <button type="button" onClick={handleDeleteMessage} className="ms-auto -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewCustomerCreate;
