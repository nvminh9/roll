import axios from '~/api/axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import default_avatar from '~/resource/images/default_avatar.jpg';

function LoiMoiGuiDen({ loimoi, isOpenLoiMoiKb }) {
    //
    const lcIdUser = localStorage.getItem('rAct_I').slice(0, -14);
    //
    const acceptFriendRequest = async (e) => {
        e.preventDefault();
        //
        let isMounted = true;
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        //
        try {
            const response = await axios.put(
                `/api/friend/${e.target.id}`,
                {},
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
            document.getElementById(`friendRequest_${loimoi.id}`).style.display = 'none';
            //
        } catch (err) {
            console.log(err);
        }
        //
        return () => {
            isMounted = false;
        };
    };
    //
    const declineFriendRequest = async (e) => {
        e.preventDefault();
        //
        let isMounted = true;
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        //
        try {
            const response = await axios.delete(`/api/unfriend/${e.target.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            console.log(response);
            //
            document.getElementById(`friendRequest_${loimoi.id}`).style.display = 'none';
            //
        } catch (err) {
            console.log(err);
        }
        //
        return () => {
            isMounted = false;
        };
    };
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
    }, [isOpenLoiMoiKb]);
    //

    return loimoi ? (
        <>
            <div id={`friendRequest_${loimoi.id}`} className="row postWrapper">
                <div className="col l-12 m-12 c-12 postContainer">
                    <div className="col l-12 m-12 c-12 postBack postHeader" style={{ borderRadius: '15px' }}>
                        <div className="poster" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="posterAvatar">
                                <button className="btnPosterAvatar">
                                    <Link to={`/profile/${loimoi.id === lcIdUser - 0 ? '' : loimoi.id}`}>
                                        <img src={loimoi.avatar ? loimoi.avatar : default_avatar} alt=""></img>
                                    </Link>
                                </button>
                            </div>
                            <div className="posterInfo" style={{ textAlign: 'left' }}>
                                <button style={{ color: 'whitesmoke', fontSize: '17px' }}>
                                    <Link
                                        to={`/profile/${loimoi.id === lcIdUser - 0 ? '' : loimoi.id}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <span className="posterName" style={{ color: 'whitesmoke' }}>
                                            {loimoi.name}
                                        </span>
                                    </Link>{' '}
                                    đã gửi lời mời kết bạn {'(' + timeAgo(loimoi.created_at) + ')'}
                                </button>
                            </div>
                            <div
                                className="friendInvitationOptions"
                                style={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <button
                                    id={loimoi.id}
                                    style={{
                                        border: 'none',
                                        backgroundColor: '#243CFC',
                                        padding: '5px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        color: 'whitesmoke',
                                        margin: '2px',
                                    }}
                                    onClick={acceptFriendRequest}
                                >
                                    Xác nhận
                                </button>
                                <button
                                    id={loimoi.id}
                                    style={{
                                        border: 'none',
                                        backgroundColor: 'grey',
                                        padding: '5px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        color: 'whitesmoke',
                                        margin: '2px',
                                    }}
                                    onClick={declineFriendRequest}
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <i className="fa-solid fa-spinner newFeedsLoad"></i>
            </div>
        </>
    );
}

export default LoiMoiGuiDen;
