import { useState, useEffect } from 'react';
import { getCustomerProfiles } from '../api';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] =useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await getCustomerProfiles();
                setIsAuthenticated(true);
                setUser({username: response.data.username});
            } catch (error) {
                console.error('you dont login!');
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return { isAuthenticated, loading, user };
};

export default useAuth;
