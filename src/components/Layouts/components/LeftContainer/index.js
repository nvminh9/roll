import { Link } from 'react-router-dom';
// themeContext
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '~/ThemeContext';
import { useParams } from 'react-router-dom';
import axios from '~/api/axios';
import default_avatar from '~/resource/images/default_avatar.jpg';

function LeftContainer() {
    const theme = useContext(ThemeContext);
    const userName = localStorage.getItem('nHuRsE8raEvatRa').slice(0, -14);
    const userAvatarUrl = localStorage.getItem('jssE9SdeWedeE4S').slice(0, -14);
    const lcIdUser = localStorage.getItem('rAct_I').slice(0, -14);
    //
    const [userInfo, setUserInfo] = useState();
    //
    // id_User của params
    const { id_User } = useParams();
    // Lấy thông tin user
    const getUserInfo = async () => {
        let isMounted = true;
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);

        try {
            const response = await axios.get(`/api/profile/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            isMounted && setUserInfo(response.data.data);
        } catch (err) {
            console.error(err);
        }
        //
        return () => {
            isMounted = false;
        };
    };
    //

    useEffect(() => {
        // gọi hàm lấy thông tin user
        getUserInfo();
    }, [id_User]);

    return (
        <>
            {/* <!-- Phần khung bên trái --> */}
            <div id="leftContainerID" className="col l-2 m-0 c-0 leftContainer">
                {/* <!-- Vùng chứa logo --> */}
                <div id="logoZoneID" className="row logoZone">
                    <div className="col l-12 m-12 c-12 logoImg">
                        {/* <!-- <a href=""><img src="assets/img/thefamlogo1.jpg" alt=""></a>  --> */}
                    </div>
                </div>
                {/* <!-- Vùng chứa menu --> */}
                <div className="row menuZone">
                    <div className="col l-12 m-12 c-12 CtnbtnProfile">
                        <Link to={`/profile/`}>
                            <button
                                id="btnProfileid"
                                className={[
                                    'btnMenu',
                                    'btnProfile',
                                    theme.theme === 'dark' ? 'btnMenuDarkMode' : '',
                                ].join(' ')}
                            >
                                <>
                                    <img
                                        src={userInfo?.user[0].avatar ? userInfo?.user[0].avatar : default_avatar}
                                    ></img>
                                    <span>{userInfo?.user[0].name}</span>
                                </>
                            </button>
                        </Link>
                    </div>
                    <div className="col l-12 m-12 c-12 CtnbtnNewsFeed">
                        <Link to={'/'}>
                            <button
                                id="btnNewsFeedid"
                                className={[
                                    'btnMenu',
                                    'btnNewsFeed',
                                    theme.theme === 'dark' ? 'btnMenuDarkMode' : '',
                                ].join(' ')}
                            >
                                <i className="fa-solid fa-house"></i>
                                <span>Bảng tin</span>
                            </button>
                        </Link>
                    </div>
                    <div className="col l-12 m-12 c-12 CtnbtnNoti">
                        <Link to={'/notification'}>
                            <button
                                id="btnNotiid"
                                className={['btnMenu', 'btnNoti', theme.theme === 'dark' ? 'btnMenuDarkMode' : ''].join(
                                    ' ',
                                )}
                            >
                                <i className="fa-solid fa-bell"></i>
                                <span className="notiTxt">Thông báo</span>
                                <span className="numberNoti">3</span>
                            </button>
                        </Link>
                    </div>
                    <div className="col l-12 m-12 c-12 CtnbtnSearch">
                        <Link to={'/search'}>
                            <button
                                id="btnSearchid"
                                className={[
                                    'btnMenu',
                                    'btnSearch',
                                    theme.theme === 'dark' ? 'btnMenuDarkMode' : '',
                                ].join(' ')}
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <span>Tìm kiếm</span>
                            </button>
                        </Link>
                    </div>
                    <div className="col l-12 m-12 c-12 CtnbtnMessages">
                        <Link to={'/message'}>
                            <button
                                id="btnMessagesid"
                                className={[
                                    'btnMenu',
                                    'btnMessages',
                                    theme.theme === 'dark' ? 'btnMenuDarkMode' : '',
                                ].join(' ')}
                            >
                                <i className="fa-solid fa-message"></i>
                                <span>Nhắn tin</span>
                            </button>
                        </Link>
                    </div>
                    <div className="col l-12 m-12 c-12 CtnbtnSettings">
                        <Link to={'/setting'}>
                            <button
                                id="btnSettingsid"
                                className={[
                                    'btnMenu',
                                    'btnSettings',
                                    theme.theme === 'dark' ? 'btnMenuDarkMode' : '',
                                ].join(' ')}
                            >
                                <i className="fa-solid fa-gear"></i>
                                <span>Cài đặt</span>
                            </button>
                        </Link>
                    </div>
                </div>
                {/* <!-- Vùng chứa music player --> */}
                <div className="row musicPlayerZone">
                    <div className="col l-12 m-12 c-12 CtnmusicPlayer">
                        <div className="musicPLayerTop">
                            <div className="col l-5 m-5 c-5 musicPlayerTopSongImg">
                                <img src="https://images.genius.com/8e2c3c0e076e066fa40966001b956663.1000x1000x1.jpg"></img>
                            </div>
                            <div className="col l-7 m-7 c-7 musicPlayerTopInfo">
                                <div className="row">
                                    <div className="col l-12 m-12 c-12 musicPlayerTopSettings">
                                        <button>
                                            <i className="fa-solid fa-list-check"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col l-12 m-12 c-12 musicPlayerTopSongName">
                                        <span>Venom</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col l-12 m-12 c-12 musicPlayerTopFeature">
                                        <div className="row">
                                            <div className="col l-4 m-4 c-4">
                                                <button>
                                                    <i className="fa-solid fa-caret-left"></i>
                                                </button>
                                            </div>
                                            <div className="col l-4 m-4 c-4">
                                                <button>
                                                    <i className="fa-solid fa-pause"></i>
                                                </button>
                                            </div>
                                            <div className="col l-4 m-4 c-4">
                                                <button>
                                                    <i className="fa-solid fa-caret-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="musicPLayerBottom">
                            <div className="col l-12 m-12 c-12 musicPlayerBottomTimeLine">
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LeftContainer;
