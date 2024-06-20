function NewFeed() {
    return (
        <>
            {/* <!-- Bài đăng --> */}
            <div className="row postWrapper">
                <div className="col l-12 m-12 c-12 postContainer">
                    <div className="col l-12 m-12 c-12 postBack postHeader">
                        <div className="poster">
                            <div className="posterAvatar">
                                <button className="btnPosterAvatar">
                                    <img src="" alt=""></img>
                                </button>
                            </div>
                            <div className="posterInfo">
                                <button>
                                    <span className="posterName">username</span>
                                </button>
                                <button>
                                    <span className="posterTime">create_at</span>
                                </button>
                            </div>
                        </div>
                        <div className="postExtend"></div>
                    </div>
                    <div className="col l-12 m-12 c-12 postCaption">
                        <span>content</span>
                    </div>
                    <div className="col l-12 m-12 c-12 postBack postContent">
                        <div className="btnLeftPostImagesContainer">
                            <button className="btnLeftPostImages">
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>
                        </div>
                        <div className="postImages">
                            <div className="postImageContainer">
                                <img
                                    className="postImage"
                                    src="https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
                                    alt=""
                                ></img>
                            </div>
                        </div>
                        <div className="btnRightPostImagesContainer">
                            <button className="btnRightPostImages">
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                    <div className="col l-12 m-12 c-12 postBack postInteract">
                        <div className="postReact">
                            <div className="btnReactContainer btnLikeContainer">
                                <button className="btnReact btnLike">
                                    <i className="fa-regular fa-heart"></i>
                                </button>
                                <span style={{ color: 'white' }}>like_count</span>
                            </div>
                            <div className="btnReactContainer btnCommentContainer">
                                <button className="btnReact btnComment">
                                    <i className="fa-regular fa-comment"></i>
                                </button>
                                <span style={{ color: 'white' }}>comment_count</span>
                            </div>
                        </div>
                        <div className="postComment">
                            <form className="forminputComment" action="#">
                                <input className="inputComment" type="text" placeholder="Bình luận..."></input>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewFeed;
