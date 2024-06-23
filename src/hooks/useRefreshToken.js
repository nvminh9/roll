// Hook này dùng để gọi tới API Refresh token, trả về token
import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const access_token = localStorage.getItem('rAct_T').slice(0, -14);

    const refresh = async () => {
        const response = await axios.get('/api/refresh', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
            withCredentials: true,
        });
        setAuth((prev) => {
            console.log(JSON.stringify(prev));
            console.log(response.data.access_token);
            return { ...prev, accessToken: response.data.access_token };
        });
        return response.data.access_token;
    };

    return refresh;
};

export default useRefreshToken;
