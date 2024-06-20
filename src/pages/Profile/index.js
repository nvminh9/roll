// themeContext
import { useContext } from 'react';
import { ThemeContext } from '~/ThemeContext';
import default_coverImage from '~/resource/images/default_coverImage.jpg';
import default_avatar from '~/resource/images/default_avatar.jpg';

function Profile() {
    const theme = useContext(ThemeContext);

    return (
        <>
            {/* <!-- Phần Giao diện trang cá nhân --> */}
            <div className="row profileContainer">
                <div className="col l-12 m-12 c-12 profileTopInfo">
                    <div className="coverImageContainer">
                        <img className="postImage" src={default_coverImage} alt=""></img>
                    </div>
                    <div className="avatarImageContainer">
                        <img className="postImage" src={default_avatar} alt=""></img>
                        <div className="profileName">
                            <span>username</span>
                        </div>
                    </div>
                    <div className="profileOptions">
                        <button className="btnEditProfile">Edit profile</button>
                    </div>
                </div>
                <div className="col l-12 m-12 c-12 profileBottomInfo">
                    <div className="profileJoinAt">
                        Ngày tham gia: <span>create_at</span>
                    </div>
                    <div className="profileFriendCount">
                        Bạn bè: <span>friend_count</span>
                    </div>
                </div>
                <div className="col l-12 m-12 c-12 profileFeatures">
                    <button
                        className={[
                            'btnProfileFeatures',
                            'btnProfilePostList',
                            'btnProfileFeaturesActive',
                            theme.theme === 'dark' ? 'textDarkMode' : '',
                        ].join(' ')}
                    >
                        Bài viết
                    </button>
                    <button
                        className={[
                            'btnProfileFeatures',
                            'btnProfileFriendList',
                            theme.theme === 'dark' ? 'textDarkMode' : '',
                        ].join(' ')}
                    >
                        Danh sách bạn bè
                    </button>
                </div>
                <div className="col l-12 m-12 c-12 profileContent">
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
                                <div id="cc" className="postImages">
                                    <div className="postImageContainer">
                                        <img className="postImage" src={{}} alt=""></img>
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
                                        <span style={{ color: 'white' }}>350</span>
                                    </div>
                                    <div className="btnReactContainer btnCommentContainer">
                                        <button className="btnReact btnComment">
                                            <i className="fa-regular fa-comment"></i>
                                        </button>
                                        <span style={{ color: 'white' }}>30</span>
                                    </div>
                                    <div className="btnReactContainer btnShareContainer">
                                        <button className="btnReact btnShare">
                                            <i className="fa-solid fa-share"></i>
                                        </button>
                                        <span style={{ color: 'white' }}>25</span>
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
                </div>
            </div>
        </>
    );
}

export default Profile;
