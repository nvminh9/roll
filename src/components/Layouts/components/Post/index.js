import { useEffect, useState } from 'react';
import axios from '~/api/axios';
import User from '../User';
import PostComment from '../PostComment';

function Post({ key, children }) {
    const [isOpenComment, setIsOpenComment] = useState(false);
    //
    const openComment = () => {
        let postComment = document.getElementById(`postComment${children.id}`);

        if (isOpenComment === false) {
            postComment.style.display = 'block';
            setIsOpenComment(true);
        } else {
            postComment.style.display = 'none';
            setIsOpenComment(false);
        }
    };
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
                        <User key={children.id_User}>{children}</User>
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
                            <form className="forminputComment" action="#">
                                <input
                                    key={children.id}
                                    className="inputComment"
                                    type="text"
                                    placeholder="Bình luận..."
                                ></input>
                            </form>
                        </div>
                    </div>
                    {/* Comments */}
                    <div
                        id={`postComment${children.id}`}
                        className="col l-12 m-12 c-12 postCommentContainer"
                        style={{ display: 'none' }}
                    >
                        <PostComment>{children}</PostComment>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;
