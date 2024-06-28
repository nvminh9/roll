// Compent dùng để làm mỗi bạn bè trong danh sách bạn bè
import { useEffect, useState } from 'react';
import axios from '~/api/axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import default_avatar from '~/resource/images/default_avatar.jpg';

function User({ friend, children, key }) {
    const [users, setUsers] = useState();
    //
    const [isDeleteFriendClick, setIsDeleteFriendClick] = useState(false);
    //
    // id_User của params
    const { id_User } = useParams();
    // id_User của lc (id_User người đang đăng nhập)
    const lcIdUser = localStorage.getItem('rAct_I').slice(0, -14);
    // Lấy User
    const getUsers = async () => {
        let isMounted = true;
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);

        try {
            const response = await axios.get(
                `/api/profile/${friend.id_friend + '' === id_User ? friend.id_User : friend.id_friend}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                },
            );
            //
            isMounted && setUsers(response.data.data.user);
        } catch (err) {
            console.error(err);
        }
        //
        return () => {
            isMounted = false;
        };
    };
    // Hàm hủy kết bạn
    const deleteFriend = async (e) => {
        e.preventDefault();
        // let isMounted = true;
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        // axios
        try {
            const response = await axios.delete(`/api/friend/${e.target.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            setIsDeleteFriendClick(true);
            document.getElementById(`poster_id_friend_${e.target.id}`).style.display = 'none';
            // isMounted && setUsers(response.data.data.user);
        } catch (err) {
            console.error(err);
        }
        // console.log(e.target.id);
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
        getUsers();
    }, []);

    return (
        <>
            {users?.length ? (
                <>
                    {users.map((user, i) => (
                        <>
                            <div
                                id={`poster_id_friend_${user.id}`}
                                key={user.id}
                                className="poster"
                                style={{ position: 'relative' }}
                            >
                                <div className="posterAvatar">
                                    <Link to={`/profile/${user.id === lcIdUser - 0 ? '' : user.id}`}>
                                        <button className="btnPosterAvatar">
                                            <img src={user.avatar ? user.avatar : default_avatar} alt=""></img>
                                        </button>
                                    </Link>
                                </div>
                                <div className="posterInfo">
                                    <Link to={`/profile/${user.id === lcIdUser - 0 ? '' : user.id}`}>
                                        <button>
                                            <span className="posterName">{user.name}</span>
                                        </button>
                                    </Link>
                                    <button style={{ textDecoration: 'none' }}>
                                        <span className="posterTime">Thời gian: {timeAgo(user.updated_at)}</span>
                                    </button>
                                </div>
                                <div
                                    className="posterInfo"
                                    style={{
                                        background: 'whitesmoke',
                                        padding: '2.5px',
                                        border: 'none',
                                        borderRadius: '9px',
                                        cursor: 'pointer',
                                        position: 'absolute',
                                        right: '25px',
                                    }}
                                >
                                    <button
                                        id={user.id}
                                        style={{ textDecoration: 'none', color: 'black' }}
                                        onClick={deleteFriend}
                                    >
                                        <span id={user.id} className="posterTime">
                                            Hủy bạn bè
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </>
                    ))}
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
            )}
        </>
    );
}

export default User;
