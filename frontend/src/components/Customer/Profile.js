import { useEffect, useState } from 'react';
import { getCustomerProfiles, updateCustomerProfile, deleteCustomer } from '../../api';
import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom'; // react-router-domをインポート

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [message, setMessage] = useState(null);
  const [messageStatus, setMessageStatus] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const { checkAuth } = useAuth();
  const navigate = useNavigate(); // useNavigateフックを使用

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCustomerProfiles();
        if (response) {
          setUser(response.data);
          setFormData({
            username: response.data.username,
            email: response.data.email,
          });
        }
      } catch (error) {
        setMessage('ユーザー情報の取得に失敗しました。');
        setMessageStatus('error');
      }
    }
    fetchData();
  }, []);

  const handleUpdateClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setFormData({
      username: user.username,
      email: user.email,
    });
    setIsEditing(false);
    setMessage(null);
    setMessageStatus('');
  };

  const handleSaveClick = async () => {
    try {
      await updateCustomerProfile(formData);
      setUser({ ...user, username: formData.username, email: formData.email });
      setIsEditing(false);
      setMessage('プロファイルが正常に更新されました。');
      setMessageStatus('success');
      setShowMessage(true);
      checkAuth();
      setTimeout(() => { setMessage(null); setShowMessage(false); }, 5000);
    } catch (error) {
      setMessage('プロファイルの更新に失敗しました。');
      setMessageStatus('error');
      setShowMessage(false); // メッセージを一旦非表示に
      setTimeout(() => setShowMessage(true), 100); // 少し遅らせて再表示
    }
  };

  const handleDeleteClick = async() => {
    const confirmed = window.confirm('本当に退会しますか？');
    if(confirmed) {
      try{
        await deleteCustomer(formData);
        setMessage('退会が完了しました。\nログイン画面に遷移します。');
        setMessageStatus('success');
        setShowMessage(true);
        setTimeout(() => checkAuth(), 2000)
      } catch (error) {
        setMessage('退会に失敗しました。');
        setMessageStatus('error');
        setShowMessage(false); // メッセージを一旦非表示に
        setTimeout(() => setShowMessage(true), 100); // 少し遅らせて再表示
      }
    }
  };

  const handleDeleteMessage = () => {
    setMessage(null);
    setMessageStatus(null);
    setShowMessage(false);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePasswordChangeClick = () => {
    navigate('/customer/change-password'); // パスワード変更画面に遷移
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen translate-y-2 bg-white flex flex-col justify-center sm:px-6 lg:px-8 px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-3xl leading-9 font-extrabold text-gray-900 mt-5">Profile</h1>
            </div>

      <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md relative">
        <div className={`bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ${message ? 'animate-expand-top' : ''}`}>
          <ProfileField label="Username" value={formData.username} isEditing={isEditing} onChange={handleChange} name="username" />
          <ProfileField label="Email" value={formData.email} isEditing={isEditing} onChange={handleChange} name="email" />

          
            
            <div className="mt-6 flex justify-between">
              {isEditing ? (
                <>
                <button onClick={handleDeleteClick} className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out">退会</button>
                <div className="flex space-x-4">
                  <button onClick={handleSaveClick} className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">保存</button>
                  <button onClick={handleCancelClick} className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:border-gray-400 focus:shadow-outline-gray active:bg-gray-400 transition duration-150 ease-in-out">戻る</button>
                </div>
                </>
              ) : (
                <>
                <button onClick={handlePasswordChangeClick} className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">パスワード変更</button>
                <div className="flex space-x-4">
                <button onClick={handleUpdateClick} className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">更新</button>
                </div>
                </>
              )}
            </div>
        </div>
        {showMessage && message && (
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

const ProfileField = ({ label, value, isEditing, onChange, name, type = "text" }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium leading-5 text-gray-700">{label}</label>
    <div className="mt-1 relative rounded-md shadow-sm">
      {isEditing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
        />
      ) : (
        <p className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900">{value}</p>
      )}
    </div>
  </div>
);

export default Profile;
