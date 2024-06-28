import { useEffect, useState } from 'react';
import axios from '~/api/axios';
import User from '../User';
import PostComment from '../PostComment';
import PostLike from '../PostLike';
import { Link, useNavigate, useParams } from 'react-router-dom';
import default_avatar from '~/resource/images/default_avatar.jpg';

function Post({ key, children }) {
    const [isOpenComment, setIsOpenComment] = useState(false);
    const [isOpenLike, setIsOpenLike] = useState(false);
    const [postCommentContent, setPostCommentContent] = useState();
    //
    // id_User của params của Route truyền vào

    //
    const lcIdUser = localStorage.getItem('rAct_I').slice(0, -14) - 0;
    // Hàm mở hộp hiện Comments
    const openComment = () => {
        if (isOpenComment === false) {
            setIsOpenComment(true);
        } else {
            setIsOpenComment(false);
        }
    };
    // Hàm mở hộp hiện Likes
    const openLike = () => {
        if (isOpenLike === false) {
            setIsOpenLike(true);
        } else {
            setIsOpenLike(false);
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
                                            <span class="posterTime newestPersonalPosterComment" style="text-decoration:none;">Bình luận mới nhất của bạn</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="commentContent">
                                    <span style="color: whitesmoke;">${response.data.data.content}</span>
                                </div>
                            </div>
                        `;

            document.getElementById(`myPostComment${children.id}`).innerHTML = cmtTemp;
            let commentNewCount = document.getElementById(`post_comment_count_${children.id}`).getHTML() - 0 + 1;
            document.getElementById(`post_comment_count_${children.id}`).innerHTML = commentNewCount;
            openComment();
        } catch (err) {
            console.log(err);
        }
        console.log('comment :', postCommentContent, 'của bài viết ID:', children.id);
        //
        setPostCommentContent('');
    };
    // Hàm like bài viết
    const likeOrCancelLikePost = async (e) => {
        e.preventDefault();
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        //
        try {
            const response = await axios.get(`/api/like/${children.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            if (response?.data?.message === 'Đã like thành công') {
                document.getElementById(`btnLike_post_${children.id}`).style =
                    'color: #ff3838; background-color: rgba(131, 131, 131, 0.438);';
                document.getElementById(`btnLike_post_${children.id}`).classList.add('youLiked'); // thêm nhưng ch làm gì :)
            } else {
                document.getElementById(`btnLike_post_${children.id}`).style = '';
                document.getElementById(`btnLike_post_${children.id}`).classList.remove('youLiked'); // thêm nhưng ch làm gì :)
            }
            document.getElementById(`likeAmount_post_${children.id}`).innerText = response?.data?.data?.likes;
            //
            console.log('Response :', response);
        } catch (err) {
            console.log(err);
        }
    };
    // // Hàm xóa Comment
    // ...
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
        const lcIdUser = localStorage.getItem('rAct_I').slice(0, -14) - 0;
        // Khi Render Post nếu mình đã like thì nút like có màu đỏ
        children.likes.map((like) => {
            if (like.id_User === lcIdUser) {
                document.getElementById(`btnLike_post_${children.id}`).style =
                    'color: #ff3838; background-color: rgba(131, 131, 131, 0.438);';
            }
        });
    }, []);
    //
    // // --------------------*** BUTTON MOVE SLIDE POST IMAGES ***---------------------
    // // tất cả các slide hình của các bài viết đã được load...
    // const postImages = document.getElementsByClassName('postImages');
    // // nút di chuyển slide hình qua trái
    // const btnLeftPostImages = document.getElementsByClassName('btnLeftPostImages');
    // // nút di chuyển slide hình qua phải
    // const btnRightPostImages = document.getElementsByClassName('btnRightPostImages');
    // //
    // for (let i = 0; i < postImages.length; i++) {
    //     btnLeftPostImages[i].addEventListener('click', function (e) {
    //         postImages[i].scrollLeft = postImages[i].scrollLeft - 350;
    //     });
    //     btnRightPostImages[i].addEventListener('click', function (e) {
    //         postImages[i].scrollLeft = postImages[i].scrollLeft + 350;
    //     });
    // }
    // // ------------------------------------------------------------------------------
    // // -------------------------*** ACTIVE IMAGE ***--------------------------
    // // list các hình của tất cả các bài viết
    // var postImage = document.getElementsByClassName('postImage');
    // // khung imageActiveContainer
    // const imageActiveContainer = document.getElementById('imageActiveContainerID');
    // // template imageActive
    // var imageActive = '';

    // for (let i = 0; i < postImage.length; i++) {
    //     postImage[i].addEventListener('click', function (e) {
    //         // imageActiveSrc lưu index hiện tại của hình khi được chọn.
    //         let imageActiveSrc = i;
    //         imageActiveContainer.style = `height: 100%;width: 100%;padding: 0;position: absolute;z-index:1;background: linear-gradient(0deg, rgba(0, 0, 0, 0.56) 0%, rgba(0, 0, 0, 0.54) 100%);-webkit-backdrop-filter: blur(20px);backdrop-filter: blur(8px);`;
    //         imageActive =
    //             `<div id="imageActiveID" class="imageActive">
    //     <button id="btnLeftImageActiveID" class="col l-1 m-2 c-2 btnLeftImageActive">
    //     <i class="fa-solid fa-circle-chevron-left"></i>
    //     </button>
    //     <div id="imageActiveContentID" class="col l-10 m-8 c-8 imageActiveContent">
    //         <img class="imageActiveContentSize" src="` +
    //             postImage[imageActiveSrc].src +
    //             `" alt="">
    //     </div>
    //     <button id="btnRightImageActiveID" class="col l-1 m-2 c-2 btnRightImageActive">
    //         <i class="fa-solid fa-circle-chevron-right"></i>
    //     </button>
    // </div>`;
    //         imageActiveContainer.innerHTML = imageActive;
    //         // khung chứa hình
    //         var imageActiveContent = document.getElementById('imageActiveContentID');
    //         imageActiveContent.addEventListener('click', function (e) {
    //             imageActiveContainer.style = '';
    //             imageActiveContainer.innerHTML = '';
    //         });
    //         // nút lùi về hình bên trái
    //         document.getElementById('btnLeftImageActiveID').addEventListener('click', function (e) {
    //             // console.log('index trước đó: ', imageActiveSrc);
    //             // sau khi nhấn nút lùi cập nhật index (imageActiveSrc) giảm đi 1, và show hình với index đó
    //             if (imageActiveSrc != 0) {
    //                 imageActiveSrc = imageActiveSrc - 1;
    //                 imageActiveContent.innerHTML =
    //                     `<img class="imageActiveContentSize" src="` + postImage[imageActiveSrc].src + `" alt="">`;
    //             } else {
    //                 imageActiveSrc = imageActiveSrc;
    //                 // alert("Hết rồi :v");
    //             }
    //         });
    //         // nút tiến tới hình bên phải
    //         document.getElementById('btnRightImageActiveID').addEventListener('click', function (e) {
    //             // console.log('index trước đó: ', imageActiveSrc);
    //             // sau khi nhấn nút tăng cập nhật index (imageActiveSrc) tăng lên 1, và show hình với index đó
    //             if (imageActiveSrc < postImage.length - 1) {
    //                 imageActiveSrc = imageActiveSrc + 1;
    //                 imageActiveContent.innerHTML =
    //                     `<img class="imageActiveContentSize" src="` + postImage[imageActiveSrc].src + `" alt="">`;
    //             } else {
    //                 imageActiveSrc = imageActiveSrc;
    //                 // alert("Hết rồi :v");
    //             }
    //         });
    //     });
    // }
    // // -----------------------------------------------------------------
    //

    return (
        <>
            {/* <!-- Bài đăng --> */}
            <div className="row postWrapper">
                <div id={`post_${children.id}`} className="col l-12 m-12 c-12 postContainer">
                    <div className="col l-12 m-12 c-12 postBack postHeader">
                        <div id={`poster_${children.id_User}`} key={children.id_User} className="poster">
                            <div className="posterAvatar">
                                <Link to={`/profile/${children.id_User === lcIdUser ? '' : children.id_User}`}>
                                    <button className="btnPosterAvatar">
                                        <img
                                            src={children.user.avatar ? children.user.avatar : default_avatar}
                                            alt=""
                                        ></img>
                                    </button>
                                </Link>
                            </div>
                            <div className="posterInfo">
                                <Link to={`/profile/${children.id_User === lcIdUser ? '' : children.id_User}`}>
                                    <button>
                                        <span className="posterName">{children.user.name}</span>
                                    </button>
                                </Link>
                                {/**/}
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
                                            className="postVideo"
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
                                <button
                                    id={`btnLike_post_${children.id}`}
                                    key={children.id}
                                    className="btnReact btnLike"
                                    onClick={likeOrCancelLikePost}
                                >
                                    <i className="fa-regular fa-heart"></i>
                                </button>
                                <span
                                    id={`likeAmount_post_${children.id}`}
                                    className="likeAmount"
                                    style={{ color: 'white' }}
                                    onClick={openLike}
                                >
                                    {children.likes.length}
                                </span>
                            </div>
                            <div className="btnReactContainer btnCommentContainer">
                                <button
                                    id={`post_btnComment_${children.id}`}
                                    key={children.id}
                                    className="btnReact btnComment"
                                    onClick={openComment}
                                >
                                    <i className="fa-regular fa-comment"></i>
                                </button>
                                <span
                                    className="commentAmout"
                                    id={`post_comment_count_${children.id}`}
                                    style={{ color: 'white' }}
                                >
                                    {children.comments.length}
                                </span>
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
                        {/* Comment popup */}
                    </div>
                    {/* Comments */}
                    <PostComment openComment={openComment} isOpenComment={isOpenComment} isOpenLike={isOpenLike}>
                        {children}
                    </PostComment>
                    {/* Likes */}
                    <PostLike isOpenComment={isOpenComment} isOpenLike={isOpenLike}>
                        {children}
                    </PostLike>
                </div>
            </div>
        </>
    );
}

export default Post;
