import { useEffect, useState } from 'react';
import { getCustomerProfiles, updateCustomerProfile } from '../../api';
import { useAuth } from '../../hooks/AuthContext';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [message, setMessage] = useState(null);
  const [messageStatus, setMessageStatus] = useState('');
  const { checkAuth } = useAuth();

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
      setUser(formData);
      setIsEditing(false);
      setMessage('プロファイルが正常に更新されました。');
      setMessageStatus('success');
      checkAuth();
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setMessage('プロファイルの更新に失敗しました。');
      setMessageStatus('error');
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">Profile</h1>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ${message ? 'animate-expand-top' : ''}`}>
          {message && (
            <div className={`mb-4 text-sm ${messageStatus === 'success' ? 'text-green-600' : 'text-red-600'} animate-fadeInExpand`}>
              {message}
            </div>
          )}
          <ProfileField label="Username" value={formData.username} isEditing={isEditing} onChange={handleChange} name="username" />
          <ProfileField label="Email" value={formData.email} isEditing={isEditing} onChange={handleChange} name="email" />

          <div className="mt-6 flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button onClick={handleSaveClick} className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">保存</button>
                <button onClick={handleCancelClick} className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:border-gray-400 focus:shadow-outline-gray active:bg-gray-400 transition duration-150 ease-in-out">戻る</button>
              </>
            ) : (
              <button onClick={handleUpdateClick} className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">更新</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value, isEditing, onChange, name }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium leading-5 text-gray-700">{label}</label>
    <div className="mt-1 relative rounded-md shadow-sm">
      {isEditing ? (
        <input
          type={name === 'email' ? 'email' : 'text'}
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