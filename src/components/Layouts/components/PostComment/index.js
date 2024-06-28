import { useEffect, useState } from 'react';
import axios from '~/api/axios';
import { Link, useParams } from 'react-router-dom';

function PostComment({ openComment, isOpenComment, isOpenLike, children }) {
    const [newComments, setNewComments] = useState();
    //
    // id_User của params của Route truyền vào
    //
    const lcIdUser = localStorage.getItem('rAct_I').slice(0, -14) - 0;
    //
    let isLoadDone = false;
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
            // if (newComments) {
            //     document.getElementById(`post_comment_count_${children.id}`).innerText = newComments.length;
            // }
            //
            setNewComments(response.data.data);
            //
            isLoadDone = true;
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
    // Hàm xóa Comment
    const deleteComment = async (e) => {
        console.log('idComment chuẩn bị xóa:', e.target.id);
        //
        e.preventDefault();
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        //
        try {
            const response = await axios.delete(`/api/comment/${e.target.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            let postCommentAmount = document.getElementById(`post_comment_count_${children.id}`).getHTML() - 0;
            if (response.data.message === 'Bình luận đã được xóa') {
                document.getElementById(`post_comment_count_${children.id}`).innerText = postCommentAmount - 1;
                document.getElementById(`comment_${e.target.id}`).style.display = 'none';
                // console.log('DICHME');
            }
            //
            console.log('idComment bị xóa:', e.target.id);
            //
            console.log('Response :', response);
            //
            // openComment();
        } catch (err) {
            console.log(err);
        }
    };
    //
    useEffect(() => {
        getNewComments();
        //
        if (newComments) {
            document.getElementById(`post_comment_count_${children.id}`).innerText = newComments.length;
        }
        //
        isOpenComment
            ? (document.getElementById(`post_btnComment_${children.id}`).style =
                  'color: #3ae374; background-color: rgba(131, 131, 131, 0.438);')
            : (document.getElementById(`post_btnComment_${children.id}`).style = '');
    }, [isOpenComment]);
    //
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
    // -------------------------*** ACTIVE IMAGE ***--------------------------
    // list các hình của tất cả các bài viết
    var postImage = document.getElementsByClassName('postImage');
    // khung imageActiveContainer
    const imageActiveContainer = document.getElementById('imageActiveContainerID');
    // template imageActive
    var imageActive = '';

    for (let i = 0; i < postImage.length; i++) {
        postImage[i].addEventListener('click', function (e) {
            // imageActiveSrc lưu index hiện tại của hình khi được chọn.
            let imageActiveSrc = i;
            imageActiveContainer.style = `height: 100%;width: 100%;padding: 0;position: absolute;z-index:1;background: linear-gradient(0deg, rgba(0, 0, 0, 0.56) 0%, rgba(0, 0, 0, 0.54) 100%);-webkit-backdrop-filter: blur(20px);backdrop-filter: blur(8px);`;
            imageActive =
                `<div id="imageActiveID" class="imageActive">
        <button id="btnLeftImageActiveID" class="col l-1 m-2 c-2 btnLeftImageActive">
        <i class="fa-solid fa-circle-chevron-left"></i>
        </button>
        <div id="imageActiveContentID" class="col l-10 m-8 c-8 imageActiveContent">
            <img class="imageActiveContentSize" src="` +
                postImage[imageActiveSrc].src +
                `" alt="">
        </div>
        <button id="btnRightImageActiveID" class="col l-1 m-2 c-2 btnRightImageActive">
            <i class="fa-solid fa-circle-chevron-right"></i>
        </button>
    </div>`;
            imageActiveContainer.innerHTML = imageActive;
            // khung chứa hình
            var imageActiveContent = document.getElementById('imageActiveContentID');
            imageActiveContent.addEventListener('click', function (e) {
                imageActiveContainer.style = '';
                imageActiveContainer.innerHTML = '';
            });
            // nút lùi về hình bên trái
            document.getElementById('btnLeftImageActiveID').addEventListener('click', function (e) {
                // console.log('index trước đó: ', imageActiveSrc);
                // sau khi nhấn nút lùi cập nhật index (imageActiveSrc) giảm đi 1, và show hình với index đó
                if (imageActiveSrc != 0) {
                    imageActiveSrc = imageActiveSrc - 1;
                    imageActiveContent.innerHTML =
                        `<img class="imageActiveContentSize" src="` + postImage[imageActiveSrc].src + `" alt="">`;
                } else {
                    imageActiveSrc = imageActiveSrc;
                    // alert("Hết rồi :v");
                }
            });
            // nút tiến tới hình bên phải
            document.getElementById('btnRightImageActiveID').addEventListener('click', function (e) {
                // console.log('index trước đó: ', imageActiveSrc);
                // sau khi nhấn nút tăng cập nhật index (imageActiveSrc) tăng lên 1, và show hình với index đó
                if (imageActiveSrc < postImage.length - 1) {
                    imageActiveSrc = imageActiveSrc + 1;
                    imageActiveContent.innerHTML =
                        `<img class="imageActiveContentSize" src="` + postImage[imageActiveSrc].src + `" alt="">`;
                } else {
                    imageActiveSrc = imageActiveSrc;
                    // alert("Hết rồi :v");
                }
            });
        });
    }
    // -----------------------------------------------------------------
    // console.log(commentList);
    // console.log('Open Comment: ', isOpenComment);

    return isOpenComment ? (
        <>
            {children.comments?.length > 0 ? (
                <div
                    id={`postComment${children.id}`}
                    className="col l-12 m-12 c-12 postCommentContainer"
                    // style={{ display: 'none' }}
                >
                    <>
                        {newComments.length > 0 ? (
                            newComments.map((comment) => (
                                <>
                                    <div id={`comment_${comment.id}`} className="comment">
                                        <div id={`poster_${comment.id_User}`} key={comment.id_User} className="poster">
                                            <div className="posterAvatar">
                                                <Link
                                                    to={`/profile/${
                                                        comment.id_User === lcIdUser ? '' : comment.id_User
                                                    }`}
                                                >
                                                    <button className="btnPosterAvatar">
                                                        <img src={comment.user.avatar} alt=""></img>
                                                    </button>
                                                </Link>
                                            </div>
                                            <div className="posterInfo">
                                                <Link
                                                    to={`/profile/${
                                                        comment.id_User === lcIdUser ? '' : comment.id_User
                                                    }`}
                                                >
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
                                        {comment.id_User === lcIdUser ? (
                                            <div
                                                id={`containerBtnDeleteComment_${comment.id}`}
                                                className="btnDeleteComment"
                                                style={{
                                                    width: 'fit-content',
                                                    position: 'absolute',
                                                    right: '-3px',
                                                    top: '-3px',
                                                }}
                                            >
                                                <button
                                                    onClick={deleteComment}
                                                    id={`${comment.id}`}
                                                    style={{
                                                        border: 'none',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                        background: 'rgba(135, 135, 135, 0.3137254902)',
                                                        color: 'dimgray',
                                                    }}
                                                    className="btnDeleteComment"
                                                >
                                                    Xóa <i class="fa-solid fa-xmark" style={{ color: 'red' }}></i>
                                                </button>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </>
                            ))
                        ) : (
                            <>
                                <h3>Loading...</h3>
                            </>
                        )}
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
