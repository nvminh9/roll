import { useEffect, useState, useContext } from 'react';
import axios from '~/api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPaperPlane, faCircle } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '~/ThemeContext';
import default_avatar from '~/resource/images/default_avatar.jpg';
import pusherJs from 'pusher-js';
import Pusher from 'pusher-js';
import { useParams } from 'react-router-dom';

function BoxMessage() {
    const [screenHeight, setScreenHeight] = useState();
    const { theme } = useContext(ThemeContext);
    // state dùng cho phần chat
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [pusherMessages, setPusherMessages] = useState([]);
    const [isNewPusherMessages, setIsNewPusherMessages] = useState(false);
    let allMessages = [];
    //
    const lcIdUser = localStorage.getItem('rAct_I').slice(0, -14);
    //
    const { id_User } = useParams();
    //
    // hàm lấy tất cả tin nhắn đã nhắn
    const getAllOldMessage = async (e) => {
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        // axios
        try {
            const response = await axios.get(`/api/messages`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            setMessages(response);
            //
            console.log(response.data);
            //
        } catch (err) {
            console.error(err);
        }
    };
    // hàm gửi tin nhắn đi
    const handleSentMessage = async (e) => {
        e.preventDefault();
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        // axios
        try {
            const response = await axios.post(
                `/api/messages`,
                JSON.stringify({
                    receiver_id: id_User,
                    message: message,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                },
            );
            //
            console.log(response);
            //
            setMessage('');
        } catch (err) {
            console.error(err);
        }
    };
    //
    useEffect(() => {
        // lấy tất cả tin nhắn đã nhắn
        // getAllOldMessage();
        //
        console.log(id_User);
        //
        document.title = 'Nhắn tin / Roll';
        //
        //
        document.getElementById('headerTitleID').innerText = 'Nhắn tin';
    }, []);
    // pusherMessages (đang xem coi có để depency pusherMessages ở trên ko)
    // Pusher useEffect (đăng ký và lăng nghe chanel đó trên Pusher)
    useEffect(() => {
        //
        let boxMessageContainerID = document.getElementById('boxMessageContainerID');
        boxMessageContainerID.scrollTo(0, boxMessageContainerID.scrollHeight); // tự động cuộn xuống dưới cùng
        //
        Pusher.logToConsole = true;
        var pusher = new Pusher('1df7880258365400d735', {
            cluster: 'ap1',
        });
        var channel = pusher.subscribe('messages');
        channel.bind('MessageSent', function (data) {
            allMessages.push(data);
            console.log(allMessages);
            setPusherMessages(allMessages);
        });
        //
        console.log(messages);
        //
    }, [allMessages, pusherMessages]);
    useEffect(() => {
        // load và hiện ra tin nhắn mới khi allMessages thay đổi (allMessages nhận về từ Pusher)
        if (isNewPusherMessages === false) {
            setIsNewPusherMessages(true);
        } else {
            setIsNewPusherMessages(false);
        }
    }, []);
    //
    // console.log(allMessages);
    //
    return (
        <>
            <div className="backGroundBoxMessage" style={{ height: '91.2%' }}>
                <div
                    className="row profileContainer"
                    style={{
                        width: '100%',
                        position: 'relative',
                        height: '10%',
                        background:
                            theme === 'dark'
                                ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.56) 0%, rgba(0, 0, 0, 0.54) 100%)'
                                : 'linear-gradient(0deg, rgba(255, 255, 255, 0.56) 0%, rgba(255, 255, 255, 0.54) 100%)',
                        margin: '0px',
                    }}
                >
                    <div
                        className="poster"
                        style={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'center',
                            padding: '5px',
                            width: '100%',
                            margin: '0px auto',
                            background:
                                theme === 'dark'
                                    ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.56) 0%, rgba(0, 0, 0, 0.54) 100%)'
                                    : 'linear-gradient(0deg, rgba(255, 255, 255, 0.56) 0%, rgba(255, 255, 255, 0.54) 100%)',
                            backdropFilter: 'blur(20px)',
                        }}
                    >
                        <div className="posterAvatar">
                            <button className="btnPosterAvatar" style={{ background: 'none', border: 'none' }}>
                                <img
                                    src={default_avatar}
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
                            <span
                                className="posterName posterInListMessage"
                                style={{ color: theme === 'dark' ? 'whitesmoke' : 'black' }}
                            >
                                Minh
                            </span>
                            <span
                                className="posterTime"
                                style={{ margin: '5px', fontSize: '13px', fontWeight: '300', color: 'dimgray' }}
                            >
                                <FontAwesomeIcon icon={faCircle} style={{ color: '#2ed573' }}></FontAwesomeIcon> Đang
                                online
                            </span>
                        </div>
                        {/* <div className="posterInfo" style={{ position: 'absolute', right: '10px' }}>
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
                        </div> */}
                    </div>
                </div>
                <div
                    id="boxMessageContainerID"
                    className="row profileContainer"
                    style={{
                        width: '100%',
                        height: '80.5%',
                        position: 'relative',
                        margin: '0px',
                        background:
                            theme === 'dark'
                                ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.56) 0%, rgba(0, 0, 0, 0.54) 100%)'
                                : 'linear-gradient(0deg, rgba(255, 255, 255, 0.56) 0%, rgba(255, 255, 255, 0.54) 100%)',
                        backdropFilter: 'blur(20px)',
                        overflowX: 'hidden',
                        overflowY: 'auto',
                    }}
                >
                    <div
                        className="col l-12 m-12 c-12 boxMessage"
                        style={{
                            background: 'transparent',
                            width: '100%',
                            height: 'fit-content',
                            overflowX: 'hidden',
                            overflowY: 'auto',
                            display: 'grid',
                        }}
                    >
                        {messages?.data?.data?.length ? (
                            <>
                                {messages.data.data.map((eachOldMessage) => (
                                    <>
                                        {eachOldMessage.sender_id === lcIdUser - 0 ? (
                                            <div
                                                className="row"
                                                style={{
                                                    background: 'none',
                                                    padding: '5px',
                                                    margin: '5px',
                                                    borderRadius: '10px',
                                                    width: '100%',
                                                    height: 'fit-content',
                                                    // float: 'right',
                                                    display: 'grid',
                                                    justifyContent: 'right',
                                                }}
                                            >
                                                <span style={{ textAlign: 'right ' }}>
                                                    Người dùng {eachOldMessage.sender_id}
                                                </span>
                                                <div
                                                    style={{
                                                        display: 'grid',
                                                        justifyContent: 'right',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <h1
                                                        style={{
                                                            fontSize: '16px',
                                                            fontWeight: '300',
                                                            margin: '8px',
                                                            textAlign: 'center',
                                                            background: '#4c4c4c',
                                                            color: 'white',
                                                            padding: '10px',
                                                            borderRadius: '30px',
                                                            width: '100%',
                                                        }}
                                                    >
                                                        {eachOldMessage.message}
                                                    </h1>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className="row"
                                                style={{
                                                    background: 'none',
                                                    padding: '5px',
                                                    margin: '5px',
                                                    borderRadius: '10px',
                                                    width: '100%',
                                                    height: 'fit-content',
                                                    // float: 'right',
                                                    display: 'grid',
                                                    justifyContent: 'left',
                                                }}
                                            >
                                                <span style={{ textAlign: 'left' }}>
                                                    Người dùng {eachOldMessage.sender_id}
                                                </span>
                                                <div
                                                    style={{
                                                        display: 'grid',
                                                        justifyContent: 'left',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <h1
                                                        style={{
                                                            fontSize: '16px',
                                                            fontWeight: '300',
                                                            margin: '8px',
                                                            textAlign: 'center',
                                                            background: '#4c4c4c',
                                                            color: 'white',
                                                            padding: '10px',
                                                            borderRadius: '30px',
                                                            width: '100%',
                                                        }}
                                                    >
                                                        {eachOldMessage.message}
                                                    </h1>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ))}
                            </>
                        ) : (
                            <></>
                        )}
                        {/* {pusherMessages.length ? ( */}
                        <>
                            {pusherMessages.map((eachNewMessage) => (
                                <>
                                    {eachNewMessage.message.sender_id + '' === lcIdUser ? (
                                        <div
                                            className="row"
                                            style={{
                                                background: 'none',
                                                padding: '5px',
                                                margin: '5px',
                                                borderRadius: '10px',
                                                width: '100%',
                                                height: 'fit-content',
                                                // float: 'right',
                                                display: 'grid',
                                                justifyContent: 'right',
                                            }}
                                        >
                                            <span style={{ textAlign: 'right' }}>
                                                Người dùng {eachNewMessage.message.sender_id}
                                            </span>
                                            <div
                                                style={{
                                                    display: 'grid',
                                                    justifyContent: 'right',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <h1
                                                    style={{
                                                        fontSize: '16px',
                                                        fontWeight: '300',
                                                        margin: '8px',
                                                        textAlign: 'center',
                                                        background: '#4c4c4c',
                                                        color: 'white',
                                                        padding: '10px',
                                                        borderRadius: '30px',
                                                        width: '100%',
                                                    }}
                                                >
                                                    {eachNewMessage.message.message}
                                                </h1>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="row"
                                            style={{
                                                background: 'none',
                                                padding: '5px',
                                                margin: '5px',
                                                borderRadius: '10px',
                                                width: '100%',
                                                height: 'fit-content',
                                                // float: 'right',
                                                display: 'grid',
                                                justifyContent: 'left',
                                            }}
                                        >
                                            <span style={{ textAlign: 'left' }}>
                                                Người dùng {eachNewMessage.message.sender_id}
                                            </span>
                                            <div
                                                style={{
                                                    display: 'grid',
                                                    justifyContent: 'left',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <h1
                                                    style={{
                                                        fontSize: '16px',
                                                        fontWeight: '300',
                                                        margin: '8px',
                                                        textAlign: 'center',
                                                        background: '#4c4c4c',
                                                        color: 'white',
                                                        padding: '10px',
                                                        borderRadius: '30px',
                                                        width: '100%',
                                                    }}
                                                >
                                                    {eachNewMessage.message.message}
                                                </h1>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ))}
                        </>
                        {/* ) : (
                            <>
                                {pusherMessages.map((eachNewMessage) => (
                                    <>
                                        {eachNewMessage.message.sender_id + '' === lcIdUser ? (
                                            <div
                                                className="row"
                                                style={{
                                                    background: 'none',
                                                    padding: '5px',
                                                    margin: '5px',
                                                    borderRadius: '10px',
                                                    width: '100%',
                                                    height: 'fit-content',
                                                    // float: 'right',
                                                    display: 'grid',
                                                    justifyContent: 'right',
                                                }}
                                            >
                                                <span style={{ textAlign: 'right' }}>
                                                    Người dùng {eachNewMessage.message.sender_id}
                                                </span>
                                                <div
                                                    style={{
                                                        display: 'grid',
                                                        justifyContent: 'right',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <h1
                                                        style={{
                                                            fontSize: '16px',
                                                            fontWeight: '300',
                                                            margin: '8px',
                                                            textAlign: 'center',
                                                            background: '#4c4c4c',
                                                            color: 'white',
                                                            padding: '10px',
                                                            borderRadius: '30px',
                                                            width: '100%',
                                                        }}
                                                    >
                                                        {eachNewMessage.message.message}
                                                    </h1>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className="row"
                                                style={{
                                                    background: 'none',
                                                    padding: '5px',
                                                    margin: '5px',
                                                    borderRadius: '10px',
                                                    width: '100%',
                                                    height: 'fit-content',
                                                    // float: 'right',
                                                    display: 'grid',
                                                    justifyContent: 'left',
                                                }}
                                            >
                                                <span style={{ textAlign: 'left' }}>
                                                    Người dùng {eachNewMessage.message.sender_id}
                                                </span>
                                                <div
                                                    style={{
                                                        display: 'grid',
                                                        justifyContent: 'left',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <h1
                                                        style={{
                                                            fontSize: '16px',
                                                            fontWeight: '300',
                                                            margin: '8px',
                                                            textAlign: 'center',
                                                            background: '#4c4c4c',
                                                            color: 'white',
                                                            padding: '10px',
                                                            borderRadius: '30px',
                                                            width: '100%',
                                                        }}
                                                    >
                                                        {eachNewMessage.message.message}
                                                    </h1>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ))}
                            </>
                        )} */}
                    </div>
                </div>
                <div
                    className="row profileContainer"
                    style={{
                        width: '100%',
                        height: '7%',
                        position: 'relative',
                        padding: '10px',
                        margin: '0px',
                        background:
                            theme === 'dark'
                                ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.56) 0%, rgba(0, 0, 0, 0.54) 100%)'
                                : 'linear-gradient(0deg, rgba(255, 255, 255, 0.56) 0%, rgba(255, 255, 255, 0.54) 100%)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    <div
                        className="col l-12 m-12 c-12 searchInMessage"
                        style={{ width: '100%', left: '0', right: '0', bottom: '0' }}
                    >
                        <form
                            onSubmit={handleSentMessage}
                            className="formSearchInMessage"
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <input
                                type="text"
                                className="inputSearchInMessage"
                                placeholder="Nhập tin nhắn ..."
                                style={{ width: '85%' }}
                                required
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
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
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BoxMessage;
