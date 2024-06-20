import { useContext } from 'react';
import { ThemeContext } from '~/ThemeContext';

function SettingPage() {
    const theme = useContext(ThemeContext);

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
                    <button id="btnDarkmodeid" className="btnMenu btnDarkmode" style={{ marginLeft: '10px' }}>
                        <span style={{ marginLeft: '5px' }}>Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default SettingPage;
