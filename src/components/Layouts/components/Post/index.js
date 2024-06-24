import { useEffect, useState } from 'react';
import axios from '~/api/axios';
import User from '../User';
import PostComment from '../PostComment';
import { Link } from 'react-router-dom';

function Post({ key, children }) {
    const [isOpenComment, setIsOpenComment] = useState(false);
    const [postCommentContent, setPostCommentContent] = useState();
    // Hàm mở hộp hiện Comments
    const openComment = () => {
        // let postComment = document.getElementById(`postComment${children.id}`);

        if (isOpenComment === false) {
            // postComment.style.display = 'block';
            setIsOpenComment(true);
        } else {
            // postComment.style.display = 'none';
            setIsOpenComment(false);
        }
    };
    // Hàm post Comment và thêm ngay dưới bài viết
    const postComment = async (e) => {
        e.preventDefault();
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        const userName = localStorage.getItem('nHuRsE8raEvatRa').slice(0, -14);
        const userAvatarUrl = localStorage.getItem('jssE9SdeWedeE4S').slice(0, -14);
        //
        try {
            const response = await axios.post(
                `/api/comment/${children.id}`,
                JSON.stringify({ content: postCommentContent }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                },
            );
            console.log('Response :', response);
            //
            let cmtTemp = `<div class="comment">
                            <div class="poster">
                                <div class="posterAvatar">
                                    <button class="btnPosterAvatar">
                                        <img src=${userAvatarUrl} alt=""></img>
                                    </button>
                                </div>
                                <div class="posterInfo">
                                    <button>
                                        <span class="posterName">${userName}</span>
                                    </button>
                                    <button>
                                        <span class="posterTime">${timeAgo(response.data.data.created_at)}</span>
                                    </button>
                                </div>
                            </div>
                            <div class="commentContent">
                                <span style="color: whitesmoke;">${response.data.data.content}</span>
                            </div>
                        </div>`;

            // document.getElementById(`myPostComment${children.id}`).innerHTML = cmtTemp;
        } catch (err) {
            console.log(err);
        }
        console.log('comment :', postCommentContent, 'của bài viết ID:', children.id);
        //
        setPostCommentContent('');
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
        // --------------------*** BUTTON MOVE SLIDE POST IMAGES ***---------------------
        // tất cả các slide hình của các bài viết đã được load...
        const postImages = document.getElementsByClassName('postImages');
        // nút di chuyển slide hình qua trái
        const btnLeftPostImages = document.getElementsByClassName('btnLeftPostImages');
        // nút di chuyển slide hình qua phải
        const btnRightPostImages = document.getElementsByClassName('btnRightPostImages');
        //
        for (let i = 0; i < postImages.length; i++) {
            btnLeftPostImages[i].addEventListener('click', function (e) {
                postImages[i].scrollLeft = postImages[i].scrollLeft - 350;
            });
            btnRightPostImages[i].addEventListener('click', function (e) {
                postImages[i].scrollLeft = postImages[i].scrollLeft + 350;
            });
        }
        // ------------------------------------------------------------------------------
    }, []);

    return (
        <>
            {/* <!-- Bài đăng --> */}
            <div className="row postWrapper">
                <div id={`post_${children.id}`} className="col l-12 m-12 c-12 postContainer">
                    <div className="col l-12 m-12 c-12 postBack postHeader">
                        <div id={`poster_${children.id_User}`} key={children.id_User} className="poster">
                            <div className="posterAvatar">
                                <Link to="/profile">
                                    <button className="btnPosterAvatar">
                                        <img src={children.user.avatar} alt=""></img>
                                    </button>
                                </Link>
                            </div>
                            <div className="posterInfo">
                                <Link to="/profile">
                                    <button>
                                        <span className="posterName">{children.user.name}</span>
                                    </button>
                                </Link>
                                {/*
                                 */}
                                {/* '2024-06-24T13:16:26.000000Z'.split('T')[1].split('.')[0].split(':').join("") */}
                                <button>
                                    <span className="posterTime">{timeAgo(children.created_at)}</span>
                                    {/* <span className="posterTime">{children.created_at}</span> */}
                                </button>
                            </div>
                        </div>
                        <div className="postExtend"></div>
                    </div>
                    <div className="col l-12 m-12 c-12 postCaption">
                        <span>{children.content}</span>
                    </div>
                    <div className="col l-12 m-12 c-12 postBack postContent">
                        <div
                            className="btnLeftPostImagesContainer"
                            style={
                                children.photos.length > 0
                                    ? { display: 'block' }
                                    : children.videos.length > 0
                                    ? { display: 'block' }
                                    : { display: 'none' }
                            }
                        >
                            <button key={children.id} className="btnLeftPostImages">
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>
                        </div>
                        <div className="postImages">
                            {children.photos.map((photo, i) => (
                                <>
                                    <div key={photo.id} className="postImageContainer">
                                        <img className="postImage" src={photo.photoUrl} alt=""></img>
                                    </div>
                                </>
                            ))}
                            {children.videos.map((video, i) => (
                                <>
                                    <div key={video.id} className="postImageContainer">
                                        <video
                                            className="postImage"
                                            src={video.videoUrl}
                                            alt=""
                                            controls
                                            playsInline
                                        ></video>
                                    </div>
                                </>
                            ))}
                        </div>
                        <div
                            className="btnRightPostImagesContainer"
                            style={
                                children.photos.length > 0
                                    ? { display: 'block' }
                                    : children.videos.length > 0
                                    ? { display: 'block' }
                                    : { display: 'none' }
                            }
                        >
                            <button key={children.id} className="btnRightPostImages">
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                    <div className="col l-12 m-12 c-12 postBack postInteract">
                        <div className="postReact">
                            <div className="btnReactContainer btnLikeContainer">
                                <button key={children.id} className="btnReact btnLike">
                                    <i className="fa-regular fa-heart"></i>
                                </button>
                                <span style={{ color: 'white' }}>{children.likes.length}</span>
                            </div>
                            <div className="btnReactContainer btnCommentContainer">
                                <button key={children.id} className="btnReact btnComment" onClick={openComment}>
                                    <i className="fa-regular fa-comment"></i>
                                </button>
                                <span style={{ color: 'white' }}>{children.comments.length}</span>
                            </div>
                        </div>
                        <div className="postComment">
                            <form className="forminputComment" onSubmit={postComment}>
                                <input
                                    key={children.id}
                                    className="inputComment"
                                    type="text"
                                    maxLength="350"
                                    placeholder="Bình luận..."
                                    autoComplete="off"
                                    onChange={(e) => setPostCommentContent(e.target.value)}
                                    value={postCommentContent}
                                ></input>
                                <button type="submit">Gửi</button>
                            </form>
                        </div>
                    </div>
                    {/* To Display My New Comment */}
                    <div
                        id={`myPostComment${children.id}`}
                        className="col l-12 m-12 c-12 postCommentContainer"
                        style={{ height: 'fit-content', border: 'none' }}
                    >
                        {/* <div className="comment">
                            <div key={children.id_User} className="poster">
                                <div className="posterAvatar">
                                    <button className="btnPosterAvatar">
                                        <img src="http://127.0.0.1:8000/uploads/image/667840541e743.png" alt=""></img>
                                    </button>
                                </div>
                                <div className="posterInfo">
                                    <button>
                                        <span className="posterName">minhcorn</span>
                                    </button>
                                    <button>
                                        <span className="posterTime">12313</span>
                                    </button>
                                </div>
                            </div>
                            <div className="commentContent">
                                <span style={{ color: 'whitesmoke' }}>Hello bro</span>
                            </div>
                        </div> */}
                    </div>
                    {/* Comments */}
                    <PostComment isOpenComment={isOpenComment}>{children}</PostComment>
                </div>
            </div>
        </>
    );
}

export default Post;
