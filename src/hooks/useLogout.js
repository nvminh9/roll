import axios from '../api/axios';
import useAuth from './useAuth';

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios.post('/api/logout', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('rAct_T').slice(0, -14)}`,
                },
                withCredentials: true,
            });
        } catch (err) {
            console.error(err);
        }
    };

    return logout;
};

export default useLogout;
