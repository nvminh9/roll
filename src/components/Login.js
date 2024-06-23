import { useRef, useState, useEffect } from 'react';
import useAuth from '~/hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
//
import '~/components/register.css';
import roll_logo_blue from '~/resource/images/roll_logo_blue.png';
//
import axios from '~/api/axios';
const LOGIN_URL = '/api/login';

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    // from sẽ là đường dẫn trước khi user bị logout (nếu có) hoặc ko thì là '/' (trang home)
    const from = location.state?.from?.pathname || '/';

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        if (localStorage.getItem('rAct_T')) {
            navigate('/', { replace: true });
        }

        document.title = 'Đăng nhập';
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({ email: user, password: pwd }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            console.log(JSON.stringify(response?.data));
            //
            localStorage.setItem('rAct_T', response?.data?.data?.access_token + 'XrXoXlXl092B73');
            localStorage.setItem('rAct_R', response?.data?.data?.user?.role + 'XrXoXlXl092B73');
            //
            localStorage.setItem('nHuRsE8raEvatRa', response?.data?.data?.user?.name + 'XrXoXlXl092B73');
            localStorage.setItem('jssE9SdeWedeE4S', response?.data?.data?.user?.avatar + 'XrXoXlXl092B73');
            //
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.data?.access_token;
            const roles = [response?.data?.data?.user?.role];
            //
            setAuth({ user, pwd, roles, accessToken });
            // console.log('Local ACT:', localStorage.getItem('rAct_T').slice(0, -14));
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Email hoặc mật khẩu chưa chính xác');
            } else if (err.response?.status === 401) {
                setErrMsg('Email hoặc mật khẩu chưa chính xác');
            } else {
                setErrMsg('Đăng nhập không thành công');
            }
            errRef.current.focus();
        }
    };

    const togglePersist = () => {
        setPersist((prev) => !prev);
    };

    useEffect(() => {
        localStorage.setItem('persist', persist);
    }, [persist]);

    return (
        <div className="registerContainer">
            <section className="sectionRegister">
                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
                    {errMsg}
                </p>
                <img src={roll_logo_blue} style={{ width: '55px', margin: '10px' }}></img>
                <h1 style={{ fontWeight: '600', fontSize: '28px', color: 'black' }}>Đăng nhập</h1>
                <form onSubmit={handleSubmit} className="formRegister">
                    <label htmlFor="username"></label>
                    <input
                        placeholder="Email"
                        type="email"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                    <label htmlFor="password"></label>
                    <input
                        placeholder="Mật khẩu"
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button
                        type="submit"
                        style={{
                            fontFamily: 'Nunito, sans-serif',
                            fontSize: '16px',
                            padding: '1rem',
                            border: 'none',
                            borderRadius: '10px',
                            marginTop: '1rem',
                            cursor: 'pointer',
                            color: 'whitesmoke',
                            background: 'black',
                        }}
                        className="btnRegister"
                    >
                        Đăng nhập
                    </button>
                </form>
                <p style={{ color: 'black' }}>
                    Chưa có tài khoản ?
                    <span className="line" style={{ marginLeft: '5px' }}>
                        <Link to="/register">Đăng ký</Link>
                    </span>
                </p>
            </section>
        </div>
    );
};

export default Login;
