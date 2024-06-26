import { useEffect, useState } from 'react';
import axios from '~/api/axios';
import { Link } from 'react-router-dom';

function PostLike({ isOpenComment, isOpenLike, children }) {
    const [newLikes, setNewLikes] = useState();
    // Lấy Comment của Bài viết
    const getNewLikes = async () => {
        let isMounted = true;
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);

        try {
            const response = await axios.get(`/api/likes/${children.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            isMounted && setNewLikes(response.data.data);
        } catch (err) {
            console.error(err);
        }

        return () => {
            isMounted = false;
        };
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
        getNewLikes();
        // isOpenLike
        //     ? (document.getElementById(`post_btnComment_${children.id}`).style =
        //           'color: #3ae374; background-color: rgba(131, 131, 131, 0.438);')
        //     : (document.getElementById(`post_btnComment_${children.id}`).style = '');
    }, [isOpenLike]);

    return isOpenLike ? (
        <>
            {newLikes.length > 0 ? (
                <div
                    id={`postLike${children.id}`}
                    className="col l-12 m-12 c-12 postCommentContainer"
                    style={{ color: 'whitesmoke', paddingTop: '10px' }}
                >
                    <>
                        <span style={{ padding: '10px', fontSize: '16px', fontWeight: '400' }}>
                            Người đã thích bài viết này :
                        </span>
                        {newLikes.map((like, i) => (
                            <>
                                <div key={i} className="like comment">
                                    <div id={`poster_${like.id_User}`} key={like.id_User} className="poster">
                                        <div className="posterAvatar">
                                            <Link to={`/profile/${like.id_User}`}>
                                                <button className="btnPosterAvatar">
                                                    <img src={like.user.avatar} alt=""></img>
                                                </button>
                                            </Link>
                                        </div>
                                        <div
                                            className="posterInfo"
                                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        >
                                            <Link to={`/profile/${like.id_User}`}>
                                                <button>
                                                    <span className="posterName">{like.user.name}</span>
                                                </button>
                                            </Link>
                                            <button>
                                                <span className="posterTime">{timeAgo(like.created_at)}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                    </>
                </div>
            ) : (
                <>
                    <div
                        style={{
                            background: 'black',
                        }}
                    >
                        <h1 style={{ color: 'whitesmoke', fontSize: '14px', fontWeight: '300', textAlign: 'center' }}>
                            Chưa có lượt thích nào
                        </h1>
                    </div>
                </>
            )}
        </>
    ) : (
        <></>
    );
}

export default PostLike;
