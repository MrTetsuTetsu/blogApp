import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api/customers/',
    withCredentials: true,
});

export const login = async (username, password) => {
    try {
        const response = await API.post('login/', { username, password });
        return response;
    } catch (error) {
        throw error;
    }
};

// ログアウトリクエストを送信する関数
export const logout = async () => {
    try {
        const csrfToken = await fetchCsrfToken();
        const response = await API.post('logout/', {}, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });
        console.log('Logout successful', response.data);
    } catch (error) {
        console.error('There was an error!', error);
    }
  };

export const fetchCsrfToken = async () => {
    try {
        const response = await API.get('csrf-token/');
        return response.data.csrfToken;
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
    }
};

export const getCustomerProfiles = async() => {
    try {
        const response = await API.get('profile/');
        return response;
    } catch (error) {
        throw error;
    }
}
