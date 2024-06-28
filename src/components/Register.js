import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import '~/components/register.css';
import roll_logo_blue from '~/resource/images/roll_logo_blue.png';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//
const REGISTER_URL = '/api/register';

function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    return str;
}

function isValid(string) {
    var re = /^[a-zA-Z!@#\s\$%\^\&*\)\(+=._-]{4,14}$/g; // regex here
    return re.test(removeAscent(string));
}

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();

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
        if (localStorage.getItem('rAct_T')) {
            navigate('/', { replace: true });
        }

        document.title = 'Đăng ký';
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(isValid(name));
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
        const v1 = isValid(name);
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
            } else if (err.response?.status === 404) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Email đã đăng ký rồi');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <div className="registerContainer">
                    <section className="sectionRegister">
                        <h1 style={{ fontWeight: '600', fontSize: '28px', color: 'black' }}>
                            Tạo tài khoản thành công{' '}
                        </h1>
                        <i class="fa-solid fa-circle-check" style={{ color: '#63E6BE', fontSize: '45px' }}></i>
                        <p>
                            <Link to={'/login'}>Đăng nhập</Link>
                        </p>
                    </section>
                </div>
            ) : (
                <div className="registerContainer">
                    <section className="sectionRegister">
                        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
                            {errMsg}
                        </p>
                        <img src={roll_logo_blue} style={{ width: '55px' }}></img>
                        <h1 style={{ fontWeight: '600', fontSize: '28px', color: 'black' }}>Tạo tài khoản</h1>
                        <form className="formRegister" onSubmit={handleSubmit}>
                            <label htmlFor="name">
                                <FontAwesomeIcon icon={faCheck} className={validName ? 'valid' : 'hide'} />
                                <FontAwesomeIcon icon={faTimes} className={validName || !name ? 'hide' : 'invalid'} />
                            </label>
                            <input
                                placeholder="Tên người dùng"
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
                                Yêu cầu từ 4 đến 24 ký tự.
                                <br />
                                Phải bắt đầu bằng chữ.
                                <br />
                                Cho phép chữ cái, chữ hoa, chữ thường và dấu cách.
                            </p>
                            <label htmlFor="password">
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={validPwd || !password ? 'hide' : 'invalid'}
                                />
                            </label>
                            <input
                                placeholder="Mật khẩu"
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
                                Yêu cầu từ 8 đến 24 ký tự.
                                <br />
                                Phải bao gồm chữ hoa và chữ thường, số và ký tự đặc biệt.
                                <br />
                                Cho phép các ký tự đặc biệt: <span aria-label="exclamation mark">!</span>{' '}
                                <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>{' '}
                                <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>
                            <label htmlFor="password_confirmation">
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
                                placeholder="Xác nhận mật khẩu"
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
                                Phải khớp với mật khẩu ở trên.
                            </p>
                            {/* email */}
                            <label htmlFor="email"></label>
                            <input
                                placeholder="Email"
                                type="email"
                                id="email"
                                // autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            {/* phoneNumber */}
                            <label htmlFor="phoneNumber"></label>
                            <input
                                placeholder="Số điện thoại"
                                maxLength="10"
                                type="tel"
                                id="phoneNumber"
                                // autoComplete="off"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phoneNumber}
                                required
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            {/* birth */}
                            <label htmlFor="birth"></label>
                            <input
                                placeholder="Ngày sinh"
                                type="date"
                                id="birth"
                                // autoComplete="off"
                                onChange={(e) => setBirth(e.target.value)}
                                value={birth}
                                required
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            {/* gender */}
                            <label htmlFor="gender"></label>
                            <input
                                placeholder="Nam nhập 1, Nữ nhập 0"
                                className="inputGenderRegister"
                                id="gender"
                                // autoComplete="off"
                                onChange={(e) => setGender(e.target.value)}
                                value={gender}
                                required
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <button
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
                                disabled={!validName || !validPwd || !validMatch ? true : false}
                            >
                                Đăng ký
                            </button>
                        </form>
                        <p style={{ color: 'black' }}>
                            Đã có tài khoản ?
                            <span className="line" style={{ marginLeft: '5px' }}>
                                {/*put router link here*/}
                                <Link to="/login">Đăng nhập</Link>
                            </span>
                        </p>
                    </section>
                </div>
            )}
        </>
    );
};

export default Register;
