import Pusher from 'pusher-js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function NotificationMessage() {
    //
    const lcIdUser = localStorage.getItem('rAct_I').slice(0, -14);
    //
    const [newMessageNotification, setNewMessageNotification] = useState([]);
    const [isNewMessageNotification, setIsNewMessageNotification] = useState(false);
    //
    console.log('newMessageNotification:');
    console.log(newMessageNotification);
    //
    useEffect(() => {
        //
        Pusher.logToConsole = true;
        var pusher = new Pusher('1df7880258365400d735', {
            cluster: 'ap1',
        });
        var channel = pusher.subscribe(`messagesNotification`);
        //
        channel.bind(`MessageSent`, function (data) {
            setNewMessageNotification([data]);
            setIsNewMessageNotification(true);
            // alert để test connect thông báo
            // alert(JSON.stringify(data));
        });
        //
    }, []);
    //
    if (document.getElementById('messageNotificationContainerID')) {
        const messageNotificationContainerID = document.getElementById('messageNotificationContainerID');

        // Thêm lớp fadeOut sau 3 giây khi thẻ div xuất hiện
        isNewMessageNotification === true &&
            setTimeout(() => {
                messageNotificationContainerID.classList.add('fadeOut');
                setIsNewMessageNotification(false);
            }, 4000); // 3000ms = 3 giây
        isNewMessageNotification === false &&
            setTimeout(() => {
                messageNotificationContainerID.classList.remove('fadeOut');
            }, 4000); //
    }
    //
    return (
        <>
            {/* Phần Hiện thông báo PopUp */}
            {isNewMessageNotification === true ? (
                <>
                    {newMessageNotification?.length ? (
                        <>
                            {newMessageNotification[0].message.receiver_id + '' === lcIdUser + '' ? (
                                <>
                                    <Link to={`/message/${newMessageNotification[0].user[0].id}`}>
                                        <div
                                            id="messageNotificationContainerID"
                                            className="col l-12 m-12 c-12 messageNotificationContainer"
                                            style={{
                                                position: 'absolute',
                                                top: '15px',
                                                right: '15px',
                                                background:
                                                    'linear-gradient(0deg, rgb(255 255 255 / 56%) 0%, rgb(202 202 202 / 54%) 100%)',
                                                borderRadius: '15px',
                                                zIndex: '5',
                                                color: 'black',
                                                backdropFilter: 'blur(10px)',
                                                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: '5px',
                                            }}
                                        >
                                            <img
                                                src={newMessageNotification[0].user[0].avatar}
                                                style={{
                                                    verticalAlign: 'middle',
                                                    width: '55px',
                                                    height: '55px',
                                                    borderRadius: '50%',
                                                    objectPosition: 'center',
                                                    objectFit: 'cover',
                                                    margin: '5px',
                                                }}
                                            ></img>
                                            <h4 style={{ fontSize: '14px', fontWeight: '300', margin: '5px' }}>
                                                {newMessageNotification[0].message.message}
                                            </h4>
                                        </div>
                                    </Link>
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <></>
            )}
        </>
    );
}

export default NotificationMessage;
