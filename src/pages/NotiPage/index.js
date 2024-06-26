// themeContext
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '~/ThemeContext';
import LoiMoiGuiDen from '~/components/Layouts/components/LoiMoiGuiDen';
import axios from '~/api/axios';
import UserInMessageNoti from './UserInMessageNoti';
import { Link } from 'react-router-dom';

function NotiPage() {
    const theme = useContext(ThemeContext);
    const lcIdUser = localStorage.getItem('rAct_I').slice(0, -14);
    //
    const [isOpenTuongTac, setIsOpenTuongTac] = useState(true);
    const [isOpenLoiMoiKb, setIsOpenLoiMoiKb] = useState(false);
    const [isOpenTinNhan, setIsOpenTinNhan] = useState(false);
    //
    const [listLoiMoiGuiDen, setListLoiMoiGuiDen] = useState();
    const [lastestMessages, setLastestMessages] = useState();
    //
    const [userInfos, setUserInfos] = useState();
    //
    // hàm mở tb tương tác
    const openTuongTac = async (e) => {
        if (isOpenTuongTac === false) {
            setIsOpenTuongTac(true);
            setIsOpenLoiMoiKb(false);
            setIsOpenTinNhan(false);
            //
            // document.getElementById('btnProfilePostListID').style = 'border-bottom: 3px solid #243cfc';
            // document.getElementById('btnProfileFriendListID').style = 'border-bottom: 3px solid transparent';
        }
    };
    // hàm mở tb lời mời kết bạn
    const openLoiMoiKb = async (e) => {
        let isMounted = true;
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        //
        try {
            const response = await axios.get(`/api/RequestFriend/${lcIdUser}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            setListLoiMoiGuiDen(response);
            //
            console.log('Response :', response);
            //
        } catch (err) {
            console.log(err);
        }
        //
        if (isOpenLoiMoiKb === false) {
            setIsOpenLoiMoiKb(true);
            setIsOpenTuongTac(false);
            setIsOpenTinNhan(false);
        }
        //
        return () => {
            isMounted = false;
        };
    };
    // hàm mở tb tin nhắn
    const openTinNhan = async (e) => {
        if (isOpenTinNhan === false) {
            setIsOpenTinNhan(true);
            setIsOpenTuongTac(false);
            setIsOpenLoiMoiKb(false);
            //
            // document.getElementById('btnProfilePostListID').style = 'border-bottom: 3px solid #243cfc';
            // document.getElementById('btnProfileFriendListID').style = 'border-bottom: 3px solid transparent';
        }
    };
    // lấy tin nhắn mới nhất
    const getLastestMessages = async (e) => {
        //
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        // axios
        try {
            const response = await axios.get(`/api/lastestMessages/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            setLastestMessages(response.data);
            //
        } catch (err) {
            console.error(err);
        }
    };
    //
    useEffect(() => {
        //
        getLastestMessages();
        //
        document.title = 'Thông báo / Roll';
        //
        document.getElementById('headerTitleID').innerText = 'Thông báo';
    }, []);
    //
    console.log('lastestMessages: ');
    console.log(lastestMessages);

    return (
        <>
            {/* <!-- Phần Giao diện trang thông báo --> */}
            <div className="row profileContainer">
                <div className="col l-12 m-12 c-12 profileFeatures">
                    <button
                        onClick={openTuongTac}
                        id="btnTbCacTuongTac"
                        className={[
                            'btnProfileFeatures',
                            'btnProfilePostList',
                            'btnProfileFeaturesActive',
                            theme.theme === 'dark' ? 'textDarkMode' : '',
                        ].join(' ')}
                        style={{ borderBottom: isOpenTuongTac ? '3px solid #243cfc' : '3px solid transparent' }}
                    >
                        Các tương tác
                    </button>
                    <button
                        onClick={openLoiMoiKb}
                        id="btnTbLoiMoiKb"
                        className={[
                            'btnProfileFeatures',
                            'btnProfileFriendList',
                            theme.theme === 'dark' ? 'textDarkMode' : '',
                        ].join(' ')}
                        style={{ borderBottom: isOpenLoiMoiKb ? '3px solid #243cfc' : '3px solid transparent' }}
                    >
                        Lời mời kết bạn
                    </button>
                    <button
                        onClick={openTinNhan}
                        id="btnTbTinNhan"
                        className={[
                            'btnProfileFeatures',
                            'btnProfileFriendList',
                            theme.theme === 'dark' ? 'textDarkMode' : '',
                        ].join(' ')}
                        style={{ borderBottom: isOpenTinNhan ? '3px solid #243cfc' : '3px solid transparent' }}
                    >
                        Tin nhắn
                    </button>
                </div>
                <div id="contentNotificationID" className="col l-12 m-12 c-12 profileContent">
                    {isOpenTuongTac ? (
                        <>
                            {/* <!-- Thông báo tương tác --> */}
                            <div className="row postWrapper">
                                <div className="col l-12 m-12 c-12 postContainer">
                                    <div
                                        className="col l-12 m-12 c-12 postBack postHeader"
                                        style={{ borderRadius: '15px', border: '.5px solid whitesmoke' }}
                                    >
                                        <div
                                            className="poster"
                                            style={{ justifyContent: 'left', alignItems: 'center' }}
                                        >
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
                                                        Minh
                                                    </span>{' '}
                                                    đã thích bài viết của bạn
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                    {isOpenLoiMoiKb ? (
                        listLoiMoiGuiDen.data.data.length ? (
                            listLoiMoiGuiDen.data.data
                                .toReversed()
                                .map((loimoi) => (
                                    <LoiMoiGuiDen loimoi={loimoi} isOpenLoiMoiKb={isOpenLoiMoiKb}></LoiMoiGuiDen>
                                ))
                        ) : (
                            <>
                                <h4 style={{ textAlign: 'center', fontWeight: '400' }}>
                                    Chưa có lời mời nào được gửi đến
                                </h4>
                            </>
                        )
                    ) : (
                        <></>
                    )}
                    {isOpenTinNhan ? (
                        <>
                            {/* <!-- Thông báo Tin nhắn --> */}
                            <div className="row postWrapper" style={{ display: 'grid' }}>
                                {lastestMessages?.data?.length ? (
                                    <>
                                        {lastestMessages.data.map((lastestmessage) => (
                                            <>
                                                <Link
                                                    to={`/message/${lastestmessage.sender_id}`}
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <div
                                                        className="col l-12 m-12 c-12 postContainer"
                                                        style={{ background: 'none' }}
                                                    >
                                                        <div
                                                            className="col l-12 m-12 c-12 postBack postHeader posterInMessageNoti"
                                                            style={{
                                                                borderRadius: '15px',
                                                                border: '.5px solid whitesmoke',
                                                                transition: 'all .2s',
                                                            }}
                                                        >
                                                            <div
                                                                className="poster"
                                                                style={{ justifyContent: 'left', alignItems: 'center' }}
                                                            >
                                                                <UserInMessageNoti>
                                                                    {lastestmessage.sender_id}
                                                                </UserInMessageNoti>
                                                                {/* <div className="posterAvatar">
                                                                    <button className="btnPosterAvatar">
                                                                        <img
                                                                            src="https://i.pinimg.com/236x/5a/e1/9a/5ae19a4705e9083c1ed5efcb99ceaf94.jpg"
                                                                            alt=""
                                                                        ></img>
                                                                    </button>
                                                                </div>
                                                                <div className="posterInfo" style={{ textAlign: 'left' }}>
                                                                    <button
                                                                        style={{ color: 'whitesmoke', fontSize: '17px' }}
                                                                    >
                                                                        <span
                                                                            className="posterName"
                                                                            style={{ color: 'whitesmoke' }}
                                                                        >
                                                                            Huy
                                                                        </span>{' '}
                                                                        đã thích bài viết của bạn
                                                                    </button>
                                                                </div> */}
                                                                <h4
                                                                    style={{
                                                                        fontWeight: '300',
                                                                        fontSize: '18px',
                                                                        color: 'whitesmoke',
                                                                        textAlign: 'center',
                                                                        margin: '5px',
                                                                        color: 'lightgrey',
                                                                    }}
                                                                >
                                                                    {lastestmessage.message}
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <i className="fa-solid fa-spinner newFeedsLoad"></i>
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
}

export default NotiPage;
