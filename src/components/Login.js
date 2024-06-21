import { useRef, useState, useEffect } from 'react';
import useAuth from '~/hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '~/api/axios';
const LOGIN_URL = '/api/login';

const Login = () => {
    const { setAuth } = useAuth();

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
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.data.access_token;
            const roles = response?.data?.data.user.role;
            setAuth({ user, pwd, roles, accessToken });
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

    return (
        <section>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
                {errMsg}
            </p>
            <h1>Đăng nhập</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Email:</label>
                <input
                    type="email"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Mật khẩu:</label>
                <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
                <button type="submit">Đăng nhập</button>
            </form>
            <p>
                Chưa có tài khoản ?
                <br />
                <span className="line">
                    <Link to="/register">Đăng ký</Link>
                </span>
            </p>
        </section>
    );
};

export default Login;
