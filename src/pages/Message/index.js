import { useEffect, useState } from 'react';
import axios from '~/api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '~/ThemeContext';
import default_avatar from '~/resource/images/default_avatar.jpg';

function Message() {
    const { theme } = useContext(ThemeContext);
    // search người trò chuyện
    const [searchInputContentInMessage, setSearchInputContentInMessage] = useState();
    const [isSubmitNewSearchInMessage, setIsSubmitNewSearchInMessage] = useState();
    const [searchResultInMessage, setSearchResultInMessage] = useState();
    //
    const [boxMessages, setBoxMessages] = useState();
    //
    const handleSearchInMessage = async (e) => {
        e.preventDefault();
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        //
        try {
            const response = await axios.post(`/api/search/`, JSON.stringify({ search: searchInputContentInMessage }), {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            console.log('Kết quả tìm kiếm:', response);
            setSearchResultInMessage(response.data);
            // setSearchInputContent('');
            setIsSubmitNewSearchInMessage(true);
            //
            console.log('Response :', response);
        } catch (err) {
            console.log(err);
        }
        //
        document.getElementById('resultSearchInMessageID').style.display = 'block';
    };
    //
    const hideResultSearchInMessage = () => {
        document.getElementById('resultSearchInMessageID').style.display = 'none';
    };
    //
    const getBoxMessages = async (e) => {
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        // axios
        try {
            const response = await axios.get(`/api/boxMessages/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            setBoxMessages(response.data);
            //
            console.log(response);
            //
        } catch (err) {
            console.error(err);
        }
    };
    //
    // Hàm tính thời gian
    function timeAgo(date) {
        date = new Date(date + '');

        const seconds = Math.floor((new Date() - date) / 1000);

        const interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + ' năm trước';
        }
        if (interval === 1) {
            return interval + ' năm trước';
        }

        const months = Math.floor(seconds / 2628000);
        if (months > 1) {
            return months + ' tháng trước';
        }
        if (months === 1) {
            return months + ' tháng trước';
        }

        const days = Math.floor(seconds / 86400);
        if (days > 1) {
            return days + ' ngày trước';
        }
        if (days === 1) {
            return days + ' ngày trước';
        }

        const hours = Math.floor(seconds / 3600);
        if (hours > 1) {
            return hours + ' tiếng trước';
        }
        if (hours === 1) {
            return hours + ' tiếng trước';
        }

        const minutes = Math.floor(seconds / 60);
        if (minutes > 1) {
            return minutes + ' phút trước';
        }
        if (minutes === 1) {
            return minutes + ' phút trước';
        }

        return 'mới đây';
    }
    //
    useEffect(() => {
        //
        getBoxMessages();
        //
        document.title = 'Nhắn tin / Roll';
        //
        document.getElementById('headerTitleID').innerText = 'Nhắn tin';
    }, []);

    return (
        <>
            {/* <!-- Phần Giao diện trang tìm kiếm --> */}
            <div className="row profileContainer">
                <div className="col l-12 m-12 c-12 searchInMessage">
                    <form
                        onSubmit={handleSearchInMessage}
                        className="formSearchInMessage"
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <input
                            type="text"
                            className="inputSearchInMessage"
                            placeholder="Tìm kiếm người trò chuyện ..."
                            style={{ width: '85%' }}
                            onChange={(e) => setSearchInputContentInMessage(e.target.value)}
                            value={searchInputContentInMessage}
                            required
                        ></input>
                        <button
                            type="submit"
                            style={{
                                width: '10%',
                                padding: '1.3rem',
                                border: '0.3px solid darkgrey',
                                borderRadius: '10px',
                                color: 'dimgray',
                                cursor: 'pointer',
                                marginLeft: '10px',
                            }}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>
                </div>
                <div
                    id="resultSearchInMessageID"
                    className="col l-12 m-12 c-12 searchInMessage"
                    style={{
                        margin: '10px 0px',
                        height: '230px',
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        border: '.5px solid rgba(135, 135, 135, 0.3137254902)',
                        borderRadius: '10px',
                        position: 'relative',
                        display: 'none',
                    }}
                >
                    <button
                        type="button"
                        id="btnHideResultSearchInMessageID"
                        style={{
                            float: 'right',
                            right: '0px',
                            top: '0',
                            border: 'none',
                            cursor: 'pointer',
                            margin: '10px 0px',
                            padding: '3px',
                            borderRadius: '5px',
                        }}
                        onClick={hideResultSearchInMessage}
                    >
                        {' '}
                        Ẩn kết quả tìm kiếm <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                    </button>
                    {isSubmitNewSearchInMessage ? (
                        <>
                            {searchResultInMessage.data.users.length ? (
                                searchResultInMessage.data.users.map((user) => (
                                    <>
                                        <Link to={`/message/${user.id}`} style={{ textDecoration: 'none' }}>
                                            <div
                                                className="poster posterInMessage"
                                                style={{
                                                    position: 'relative',
                                                    display: 'flex',
                                                    justifyContent: 'left',
                                                    alignItems: 'center',
                                                    padding: '10px',
                                                    width: '95%',
                                                    margin: '10px auto',
                                                    borderRadius: '10px',
                                                }}
                                            >
                                                <div className="posterAvatar">
                                                    <button
                                                        className="btnPosterAvatar"
                                                        style={{ background: 'none', border: 'none' }}
                                                    >
                                                        <Link
                                                            to={`/profile/${user.id}`}
                                                            style={{ textDecoration: 'none' }}
                                                        >
                                                            <img
                                                                src={user.avatar ? user.avatar : default_avatar}
                                                                alt=""
                                                                style={{
                                                                    verticalAlign: 'middle',
                                                                    width: '55px',
                                                                    height: '55px',
                                                                    borderRadius: '50%',
                                                                    objectPosition: 'center',
                                                                    objectFit: 'cover',
                                                                }}
                                                            ></img>
                                                        </Link>
                                                    </button>
                                                </div>
                                                <div
                                                    className="posterInfo"
                                                    style={{ display: 'grid', margin: '0px 10px' }}
                                                >
                                                    <Link to={`/profile/${user.id}`} style={{ textDecoration: 'none' }}>
                                                        <span
                                                            className="posterName posterInListMessage"
                                                            style={{ color: theme === 'dark' ? 'whitesmoke' : 'black' }}
                                                        >
                                                            {user.name}
                                                        </span>
                                                    </Link>
                                                    <span
                                                        className="posterName posterInListMessage"
                                                        style={{
                                                            color: theme === 'dark' ? 'whitesmoke' : 'black',
                                                            fontSize: '14px',
                                                            fontWeight: '300',
                                                            color: 'grey',
                                                        }}
                                                    >
                                                        Tham gia vào: {timeAgo(user.created_at)}
                                                    </span>
                                                </div>
                                                <div
                                                    className="posterInfo"
                                                    style={{ position: 'absolute', right: '10px' }}
                                                >
                                                    <button
                                                        className="btnToBoxMessage"
                                                        style={{
                                                            textDecoration: 'none',
                                                            color: 'black',
                                                            background: 'white',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            padding: '10px 13px',
                                                            borderRadius: '8px',
                                                        }}
                                                    >
                                                        <span id="" className="posterTime">
                                                            Nhắn tin
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                ))
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div className="row profileContainer">
                <div
                    className="col l-12 m-12 c-12 listBoxMessage"
                    style={{ height: '100%', width: '100%', display: 'grid', overflowY: 'auto', overflowX: 'hidden' }}
                >
                    <h4 style={{ fontWeight: '600', fontSize: '18px', margin: '25px', marginBottom: '0px' }}>
                        Những người đã trò chuyện:
                    </h4>
                    {boxMessages?.data?.length ? (
                        <>
                            {boxMessages.data.map((boxMessage) => (
                                <>
                                    <Link to={`/message/${boxMessage.user.id}`} style={{ textDecoration: 'none' }}>
                                        <div
                                            className="poster posterInMessage"
                                            style={{
                                                position: 'relative',
                                                display: 'flex',
                                                justifyContent: 'left',
                                                alignItems: 'center',
                                                padding: '10px',
                                                width: '95%',
                                                margin: '10px auto',
                                                borderRadius: '10px',
                                            }}
                                        >
                                            <div className="posterAvatar">
                                                <button
                                                    className="btnPosterAvatar"
                                                    style={{ background: 'none', border: 'none' }}
                                                >
                                                    <img
                                                        src={
                                                            boxMessage.user.avatar
                                                                ? boxMessage.user.avatar
                                                                : default_avatar
                                                        }
                                                        alt=""
                                                        style={{
                                                            verticalAlign: 'middle',
                                                            width: '55px',
                                                            height: '55px',
                                                            borderRadius: '50%',
                                                            objectPosition: 'center',
                                                            objectFit: 'cover',
                                                        }}
                                                    ></img>
                                                </button>
                                            </div>
                                            <div className="posterInfo" style={{ display: 'grid', margin: '0px 10px' }}>
                                                <Link
                                                    to={`/profile/${boxMessage.user.id}`}
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <span
                                                        className="posterName posterInListMessage"
                                                        style={{ color: theme === 'dark' ? 'whitesmoke' : 'black' }}
                                                    >
                                                        {boxMessage.user.name}
                                                    </span>
                                                </Link>
                                            </div>
                                            <div className="posterInfo" style={{ position: 'absolute', right: '10px' }}>
                                                <button
                                                    className="btnToBoxMessage"
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: 'black',
                                                        background: 'white',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        padding: '10px 13px',
                                                        borderRadius: '50%',
                                                    }}
                                                >
                                                    <span id="" className="posterTime">
                                                        <FontAwesomeIcon icon={faArrowRight} />
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            ))}
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
}

export default Message;
