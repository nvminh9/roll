import { useEffect, useState } from 'react';
import axios from '~/api/axios';
import { Link } from 'react-router-dom';

function PostComment({ isOpenComment, children }) {
    const [newComments, setNewComments] = useState();
    // Lấy Comment của Bài viết
    const getNewComments = async () => {
        let isMounted = true;
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);

        try {
            const response = await axios.get(`/api/comment/${children.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            isMounted && setNewComments(response.data.data);
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
        getNewComments();
    }, [isOpenComment]);

    // console.log(commentList);
    // console.log('Open Comment: ', isOpenComment);

    return isOpenComment ? (
        <>
            {newComments.length > 0 ? (
                <div
                    id={`postComment${children.id}`}
                    className="col l-12 m-12 c-12 postCommentContainer"
                    // style={{ display: 'none' }}
                >
                    <>
                        {newComments.map((comment) => (
                            <>
                                <div className="comment">
                                    <div id={`poster_${comment.id_User}`} key={comment.id_User} className="poster">
                                        <div className="posterAvatar">
                                            <Link to="/profile">
                                                <button className="btnPosterAvatar">
                                                    <img src={comment.user.avatar} alt=""></img>
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="posterInfo">
                                            <Link to="/profile">
                                                <button>
                                                    <span className="posterName">{comment.user.name}</span>
                                                </button>
                                            </Link>
                                            <button>
                                                <span className="posterTime">{timeAgo(comment.created_at)}</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="commentContent">
                                        <span style={{ color: 'whitesmoke' }}>{comment.content}</span>
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
                            Chưa có bình luận nào
                        </h1>
                    </div>
                </>
            )}
        </>
    ) : (
        <></>
    );
}

export default PostComment;
