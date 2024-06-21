import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
// import './register.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//
const REGISTER_URL = '/api/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [password_confirmation, setPassword_confirmation] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    // email
    const [email, setEmail] = useState('');

    // sđt
    const [phoneNumber, setPhoneNumber] = useState('');

    // ngày sinh
    const [birth, setBirth] = useState('');

    // giới tính
    const [gender, setGender] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(name));
    }, [name]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === password_confirmation);
    }, [password, password_confirmation]);

    useEffect(() => {
        setErrMsg('');
    }, [name, password, password_confirmation]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(name);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg('Invalid Entry');
            return;
        }
        //
        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({ name, email, password, password_confirmation, phoneNumber, birth, gender }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                },
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response));
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setName('');
            setPassword('');
            setPassword_confirmation('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>Tạo tài khoản thành công !</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
                        {errMsg}
                    </p>
                    <h1>Tạo tài khoản</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">
                            Tên người dùng:
                            <FontAwesomeIcon icon={faCheck} className={validName ? 'valid' : 'hide'} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !name ? 'hide' : 'invalid'} />
                        </label>
                        <input
                            type="text"
                            id="name"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            aria-invalid={validName ? 'false' : 'true'}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && name && !validName ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.
                            <br />
                            Must begin with a letter.
                            <br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="password">
                            Mật khẩu:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? 'hide' : 'invalid'} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPwd ? 'false' : 'true'}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.
                            <br />
                            Must include uppercase and lowercase letters, a number and a special character.
                            <br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span>{' '}
                            <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>{' '}
                            <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="password_confirmation">
                            Xác nhận mật khẩu:
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={validMatch && password_confirmation ? 'valid' : 'hide'}
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={validMatch || !password_confirmation ? 'hide' : 'invalid'}
                            />
                        </label>
                        <input
                            type="password"
                            id="password_confirmation"
                            onChange={(e) => setPassword_confirmation(e.target.value)}
                            value={password_confirmation}
                            required
                            aria-invalid={validMatch ? 'false' : 'true'}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        {/* email */}
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            // autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            // aria-invalid={validName ? 'false' : 'true'}
                            // aria-describedby="uidnote"
                            // onFocus={() => setUserFocus(true)}
                            // onBlur={() => setUserFocus(false)}
                        />

                        {/* phoneNumber */}
                        <label htmlFor="phoneNumber">Số điện thoại:</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            ref={userRef}
                            // autoComplete="off"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                            required
                            // aria-invalid={validName ? 'false' : 'true'}
                            // aria-describedby="uidnote"
                            // onFocus={() => setUserFocus(true)}
                            // onBlur={() => setUserFocus(false)}
                        />

                        {/* birth */}
                        <label htmlFor="birth">Ngày sinh:</label>
                        <input
                            type="date"
                            id="birth"
                            ref={userRef}
                            // autoComplete="off"
                            onChange={(e) => setBirth(e.target.value)}
                            value={birth}
                            required
                            // aria-invalid={validName ? 'false' : 'true'}
                            // aria-describedby="uidnote"
                            // onFocus={() => setUserFocus(true)}
                            // onBlur={() => setUserFocus(false)}
                        />

                        {/* gender */}
                        <label htmlFor="gender">Giới tính:</label>
                        <input
                            // type="date"
                            id="gender"
                            ref={userRef}
                            // autoComplete="off"
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                            required
                            // aria-invalid={validName ? 'false' : 'true'}
                            // aria-describedby="uidnote"
                            // onFocus={() => setUserFocus(true)}
                            // onBlur={() => setUserFocus(false)}
                        />

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Đăng ký</button>
                    </form>
                    <p>
                        Đã đăng ký ?
                        <br />
                        <span className="line">
                            {/*put router link here*/}
                            <Link to="/login">Đăng nhập</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
};

export default Register;
