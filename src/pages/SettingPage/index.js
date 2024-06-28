import { useContext, useEffect } from 'react';
import { ThemeContext } from '~/ThemeContext';
import useLogout from '~/hooks/useLogout';
import { useNavigate, Link } from 'react-router-dom';
import axios from '~/api/axios';
import useAuth from '~/hooks/useAuth';

function SettingPage() {
    const theme = useContext(ThemeContext);
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        document.title = 'Cài đặt / Roll';
        //
        document.getElementById('headerTitleID').innerText = 'Cài đặt';
    }, []);

    const logout = async () => {
        try {
            const response = await axios.get('/api/logout', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('rAct_T').slice(0, -14)}`,
                },
            });
        } catch (err) {
            console.error(err);
        }
        //
        localStorage.setItem('rAct_T', '');
        localStorage.setItem('rAct_R', '');
        localStorage.setItem('nHuRsE8raEvatRa', '');
        localStorage.setItem('jssE9SdeWedeE4S', '');
        setAuth({});
        //
        navigate('/login');
    };

    return (
        <>
            {/* <!-- Phần Giao diện trang cài đặt --> */}
            <div
                className="row profileContainer"
                style={{ borderRadius: '10px', background: 'rgba(135, 135, 135, 0.3137254902)', margin: '10px' }}
            >
                {/* Thay đổi giao diện */}
                <div className="col l-12 m-12 c-12 CtnbtnDarkMode">
                    Thay đổi giao diện :
                    <button
                        id="btnDarkmodeid"
                        className="btnMenu btnDarkmode"
                        onClick={theme.toggleTheme}
                        style={{ marginLeft: '10px' }}
                    >
                        <i className={['fa-solid', theme.theme === 'dark' ? 'fa-sun' : 'fa-moon'].join(' ')}></i>
                        <span style={{ marginLeft: '5px' }}>{theme.theme === 'dark' ? 'Sáng' : 'Tối'}</span>
                    </button>
                </div>
                {/* Đăng xuất */}
                <div className="col l-12 m-12 c-12 CtnbtnDarkMode">
                    Đăng xuất tài khoản :
                    <button
                        id="btnDarkmodeid"
                        className="btnMenu btnDarkmode"
                        style={{ marginLeft: '10px' }}
                        onClick={logout}
                    >
                        <span style={{ marginLeft: '5px' }}>Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default SettingPage;
