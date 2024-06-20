// themeContext
import { useContext } from 'react';
import { ThemeContext } from '~/ThemeContext';

function NotiPage() {
    const theme = useContext(ThemeContext);

    return (
        <>
            {/* <!-- Phần Giao diện trang thông báo --> */}
            <div className="row profileContainer">
                <div className="col l-12 m-12 c-12 profileFeatures">
                    <button
                        id="btnTbCacTuongTac"
                        className={[
                            'btnProfileFeatures',
                            'btnProfilePostList',
                            'btnProfileFeaturesActive',
                            theme.theme === 'dark' ? 'textDarkMode' : '',
                        ].join(' ')}
                    >
                        Các tương tác
                    </button>
                    <button
                        id="btnTbLoiMoiKb"
                        className={[
                            'btnProfileFeatures',
                            'btnProfileFriendList',
                            theme.theme === 'dark' ? 'textDarkMode' : '',
                        ].join(' ')}
                    >
                        Lời mời kết bạn
                    </button>
                    <button
                        id="btnTbTinNhan"
                        className={[
                            'btnProfileFeatures',
                            'btnProfileFriendList',
                            theme.theme === 'dark' ? 'textDarkMode' : '',
                        ].join(' ')}
                    >
                        Tin nhắn
                    </button>
                </div>
                <div id="contentNotificationID" className="col l-12 m-12 c-12 profileContent">
                    {/* <!-- Thông báo tương tác --> */}
                    <div className="row postWrapper">
                        <div className="col l-12 m-12 c-12 postContainer">
                            <div
                                className="col l-12 m-12 c-12 postBack postHeader"
                                style={{ borderRadius: '15px', border: '.5px solid whitesmoke' }}
                            >
                                <div className="poster" style={{ justifyContent: 'left', alignItems: 'center' }}>
                                    <div className="posterAvatar">
                                        <button className="btnPosterAvatar">
                                            <img
                                                src="https://i.pinimg.com/236x/5a/e1/9a/5ae19a4705e9083c1ed5efcb99ceaf94.jpg"
                                                alt=""
                                            ></img>
                                        </button>
                                    </div>
                                    <div className="posterInfo" style={{ textAlign: 'left' }}>
                                        <button style={{ color: 'whitesmoke', fontSize: '17px' }}>
                                            <span className="posterName" style={{ color: 'whitesmoke' }}>
                                                meowmeme
                                            </span>{' '}
                                            đã thích bài viết của bạn
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Thông báo tương tác --> */}
                    <div className="row postWrapper">
                        <div className="col l-12 m-12 c-12 postContainer">
                            <div
                                className="col l-12 m-12 c-12 postBack postHeader"
                                style={{ borderRadius: '15px', border: '.5px solid whitesmoke' }}
                            >
                                <div className="poster" style={{ justifyContent: 'left', alignItems: 'center' }}>
                                    <div className="posterAvatar">
                                        <button className="btnPosterAvatar">
                                            <img
                                                src="https://i.pinimg.com/564x/e2/01/65/e201653bbd985c7efe53bad36f612074.jpg"
                                                alt=""
                                            ></img>
                                        </button>
                                    </div>
                                    <div className="posterInfo" style={{ textAlign: 'left' }}>
                                        <button style={{ color: 'whitesmoke', fontSize: '17px' }}>
                                            <span className="posterName" style={{ color: 'whitesmoke' }}>
                                                woodfilms
                                            </span>{' '}
                                            đã bình luận vào bài viết của bạn
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Thông báo tương tác --> */}
                    <div className="row postWrapper">
                        <div className="col l-12 m-12 c-12 postContainer">
                            <div
                                className="col l-12 m-12 c-12 postBack postHeader"
                                style={{ borderRadius: '15px', border: '.5px solid whitesmoke' }}
                            >
                                <div className="poster" style={{ justifyContent: 'left', alignItems: 'center' }}>
                                    <div className="posterAvatar">
                                        <button className="btnPosterAvatar">
                                            <img
                                                src="https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1"
                                                alt=""
                                            ></img>
                                        </button>
                                    </div>
                                    <div className="posterInfo" style={{ textAlign: 'left' }}>
                                        <button style={{ color: 'whitesmoke', fontSize: '17px' }}>
                                            <span className="posterName" style={{ color: 'whitesmoke' }}>
                                                thinhngo
                                            </span>{' '}
                                            đã bình luận vào bài viết của bạn
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotiPage;
