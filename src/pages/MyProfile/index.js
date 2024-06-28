// themeContext
import { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '~/ThemeContext';
import Post from '~/components/Layouts/components/Post';
import User from '~/components/Layouts/components/User';
import ProfileFriends from '~/components/Layouts/components/ProfileFriends';
import default_coverImage from '~/resource/images/background_auth.avif';
import default_avatar from '~/resource/images/default_avatar.jpg';
import no_post_yet from '~/resource/images/no_post_yet.png';
import no_friend_yet from '~/resource/images/no_friend_yet.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import axios from '~/api/axios';
import ButtonFriendShipInProfile from '~/components/Layouts/components/ButtonFriendShipInProfile';

function MyProfile({}) {
    const theme = useContext(ThemeContext);
    const [userInfo, setUserInfo] = useState();
    const [isOpenProfilePost, setIsOpenProfilePost] = useState(true);
    const [isOpenProfileFriends, setIsOpenProfileFriends] = useState(false);
    const [isOpenFormUpdateProfile, setIsOpenFormUpdateProfile] = useState(false);
    const [isOpenUpPost, setIsOpenUpPost] = useState();
    const [isOpenUpStory, setIsOpenUpStory] = useState();
    // state của form cập nhật profile
    const [profileName, setProfileName] = useState(userInfo?.data.user[0].name);
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    // state của form up bài viết
    const [contentUpPost, setContentUpPost] = useState();
    const [privacyUpPost, setPrivacyUpPost] = useState();
    const [photosUpPost, setPhotosUpPost] = useState([]);
    const [videosUpPost, setVideosUpPost] = useState([]);
    // state của form up Story
    const [privacyUpStory, setPrivacyUpStory] = useState();
    const [videosUpStory, setVideosUpStory] = useState();
    const [videosUpStoryPreview, setVideosUpStoryPreview] = useState();
    // const [profilePhoneNumber, setProfilePhoneNumber] = useState(); để làm bên cài đặt chức năng sửa sđt, đổi mật khẩu
    const [profileBirth, setProfileBirth] = useState();
    const [profileAvatar, setProfileAvatar] = useState();
    const [profileAvatarPreview, setProfileAvatarPreview] = useState();
    const [profileCoverImage, setProfileCoverImage] = useState();
    const [profileCoverImagePreview, setProfileCoverImagePreview] = useState();
    const userRef = useRef();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    //
    // state để check ds gửi lời kb mình gửi đi
    const [myListRequestFriend, setMyListRequestFriend] = useState();
    // state để check ds gửi lời kb người khác gửi mình
    const [usListRequestFriend, setUsListRequestFriend] = useState();
    //
    // console.log('Lc IdUser:', lcIdUser);
    // id_User của lc (id_User người đang đăng nhập)
    const lcIdUser = localStorage.getItem('rAct_I').slice(0, -14);
    // id_User của params của Route truyền vào
    let { id_User } = useParams();
    // Hàm mở hộp hiện Posts trong Profile
    const openProfilePost = () => {
        if (isOpenProfilePost === false) {
            setIsOpenProfilePost(true);
            setIsOpenProfileFriends(false);
            //
            document.getElementById('btnProfilePostListID').style = 'border-bottom: 3px solid #243cfc';
            document.getElementById('btnProfileFriendListID').style = 'border-bottom: 3px solid transparent';
        } else {
            setIsOpenProfilePost(false);
            setIsOpenProfileFriends(true);
            //
            document.getElementById('btnProfileFriendListID').style = 'border-bottom: 3px solid #243cfc';
            document.getElementById('btnProfilePostListID').style = 'border-bottom: 3px solid transparent';
        }
    };
    // Hàm mở hộp hiện Friends trong Profile
    const openProfileFriends = () => {
        if (isOpenProfileFriends === false) {
            setIsOpenProfileFriends(true);
            setIsOpenProfilePost(false);
            //
            document.getElementById('btnProfileFriendListID').style = 'border-bottom: 3px solid #243cfc';
            document.getElementById('btnProfilePostListID').style = 'border-bottom: 3px solid transparent';
        } else {
            setIsOpenProfileFriends(false);
            setIsOpenProfilePost(true);
            //
            document.getElementById('btnProfilePostListID').style = 'border-bottom: 3px solid #243cfc';
            document.getElementById('btnProfileFriendListID').style = 'border-bottom: 3px solid transparent';
        }
    };
    // Hàm lấy thông tin user
    const getUserInfo = async (e) => {
        let isMounted = true;
        // e.preventDefault();
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        //
        try {
            const response = await axios.get(`/api/profile/${id_User}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            isMounted && setUserInfo(response?.data);
            //
            console.log('Response :', response);
            //
            response.data.data.posts.likes.map((like) => {
                if (like.id_User === lcIdUser) {
                    document.getElementById(`btnLike_post_${like.id_Post}`).style =
                        'color: #ff3838; background-color: rgba(131, 131, 131, 0.438);';
                }
            });
            //
            console.log('Status check: ', response.data?.status);
        } catch (err) {
            console.log(err);
        }
        //
        return () => {
            isMounted = false;
        };
    };
    // Hàm lấy thông tin user chính mình
    const getMyUserInfo = async (e) => {
        let isMounted = true;
        // e.preventDefault();
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        //
        try {
            const response = await axios.get(`/api/profile/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            isMounted && setUserInfo(response?.data);
            //
            console.log('Response :', response);
            // xử nút like đã like rồi thành màu đỏ
            // response.data.data.posts.likes.map((like) => {
            //     if (like.id_User === lcIdUser) {
            //         document.getElementById(`btnLike_post_${like.id_Post}`).style =
            //             'color: #ff3838; background-color: rgba(131, 131, 131, 0.438);';
            //     }
            // });
            //
            console.log('Status check: ', response.data?.status);
        } catch (err) {
            console.log(err);
        }
        //
        return () => {
            isMounted = false;
        };
    };
    // Hàm thực hiện chỉnh sửa trang cá nhân
    const updateProfile = async (e) => {
        e.preventDefault();
        //
        const form = document.getElementById('form');
        //
        const formData = new FormData(form);
        //
        let isMounted = true;
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        //
        try {
            const response = await axios.post(`/api/profile/${lcIdUser}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            console.log('Response :', response);
            //
            localStorage.setItem('nHuRsE8raEvatRa', response?.data?.data?.user?.name + 'XrXoXlXl092B73');
            localStorage.setItem('jssE9SdeWedeE4S', response?.data?.data?.user?.avatar + 'XrXoXlXl092B73');
            //
        } catch (err) {
            console.log(err);
        }
        //
        alert('Cập nhật trang cá nhân thành công');
        //
        return () => {
            isMounted = false;
            // alert('Cập nhật trang cá nhân thành công');
        };
    };
    // Hàm thực hiện việc đăng bài
    const upPostInProfile = async (e) => {
        e.preventDefault();
        //
        const formUpPost = document.getElementById('formUpPost');
        //
        const formDataUpPost = new FormData(formUpPost);
        //
        let isMounted = true;
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        //
        try {
            const response = await axios.post(`/api/post`, formDataUpPost, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            console.log('Response :', response);
            //
        } catch (err) {
            console.log(err);
        }
        //
        alert('Đăng bài thành công');
        //
        return () => {
            isMounted = false;
            // alert('Cập nhật trang cá nhân thành công');
        };
    };
    // Hàm thực hiện việc đăng Story
    const upStoryInProfile = async (e) => {
        e.preventDefault();
        //
        const formUpStory = document.getElementById('formUpStory');
        //
        const formDataUpStory = new FormData(formUpStory);
        //
        let isMounted = true;
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        //
        try {
            const response = await axios.post(`/api/story`, formDataUpStory, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            console.log('Response :', response);
            //
        } catch (err) {
            console.log(err);
        }
        //
        alert('Đăng Story thành công');
        //
        return () => {
            isMounted = false;
        };
    };
    // xử lý ảnh đại diện cập nhật profile
    const handleProfileAvatarUpdate = (e) => {
        // thay đổi file trong form (file truyền đi)
        setProfileAvatar(e.target.value);
        //
        e.preventDefault();
        // tạo URL ảo để hiện khi chọn hình khác từ máy
        const file = e.target.files[0];
        if (file) {
            let filePreview = URL.createObjectURL(file);
            // Url ảo cho ảnh đại diện
            setProfileAvatarPreview(filePreview);
        }
        //
        console.log(URL.createObjectURL(file));
    };
    // xử ảnh bìa cập nhật profile
    const handleProfileCoverImageUpdate = (e) => {
        // thay đổi file trong form (file truyền đi)
        setProfileCoverImage(e.target.value);
        //
        e.preventDefault();
        // tạo URL ảo để hiện khi chọn hình khác từ máy
        const fileCoverImage = e.target.files[0];
        if (fileCoverImage) {
            let fileCoverImagePreview = URL.createObjectURL(fileCoverImage);
            // Url ảo cho ảnh bìa
            setProfileCoverImagePreview(fileCoverImagePreview);
        }
        //
        console.log(URL.createObjectURL(fileCoverImage));
    };
    // xử lý ảnh đăng bài viết
    const handlePhotosUpPost = (e) => {
        // thay đổi file trong form (file truyền đi)
        setPhotosUpPost(e.target.value);
        //
        e.preventDefault();
        // tạo URL ảo để hiện khi chọn hình khác từ máy
        // const files = e.target.files[0];
        // if (file) {
        //     let filePreview = URL.createObjectURL(file);
        //     // Url ảo cho ảnh đại diện
        //     setProfileAvatarPreview(filePreview);
        // }
        // //
        // console.log(URL.createObjectURL(file));
    };
    // xử lý video đăng bài viết
    const handleVideosUpPost = (e) => {
        // thay đổi file trong form (file truyền đi)
        setVideosUpPost(e.target.value);
        //
        e.preventDefault();
        // tạo URL ảo để hiện khi chọn hình khác từ máy
        // const fileCoverImage = e.target.files[0];
        // if (fileCoverImage) {
        //     let fileCoverImagePreview = URL.createObjectURL(fileCoverImage);
        //     // Url ảo cho ảnh bìa
        //     setProfileCoverImagePreview(fileCoverImagePreview);
        // }
        // //
        // console.log(URL.createObjectURL(fileCoverImage));
    };
    // xứ lý video đăng Story
    const handleVideosUpStory = (e) => {
        // thay đổi file trong form (file truyền đi)
        setVideosUpStory(e.target.value);
        //
        e.preventDefault();
        //
        // tạo URL ảo để hiện khi chọn video Story
        const file = e.target.files[0];
        if (file) {
            let filePreview = URL.createObjectURL(file);
            // Url ảo cho ảnh đại diện
            setVideosUpStoryPreview(filePreview);
        }
        //
        console.log(URL.createObjectURL(file));
    };
    // đóng mở form update profile
    const closeFormUpdateProfile = (e) => {
        setIsOpenFormUpdateProfile(false);
        setProfileName(userInfo?.data.user[0].name);
        setProfileBirth(userInfo?.data.user[0].birth);
        setProfileAvatar(null);
        setProfileCoverImage(null);
    };
    const openFormUpdateProfile = (e) => {
        setIsOpenFormUpdateProfile(true);
    };
    // đóng mở form đăng bài
    const closeFormUpPost = (e) => {
        setIsOpenUpPost(false);
        setContentUpPost('');
        setPrivacyUpPost('');
        setPhotosUpPost(null);
        setVideosUpPost(null);
    };
    const openFormUpPost = (e) => {
        setIsOpenUpPost(true);
    };
    // đóng mở form đăng story
    const closeFormUpStory = (e) => {
        setIsOpenUpStory(false);
        // setContentUpPost('');
        setPrivacyUpStory('');
        // setPhotosUpStory(null);
        setVideosUpStory(null);
        setVideosUpStoryPreview(null);
    };
    const openFormUpStory = (e) => {
        setIsOpenUpStory(true);
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
    // Kiểm tra tiếng việt
    function removeAscent(str) {
        if (str === null || str === undefined) return str;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
        return str;
    }
    // kiểm tra tiếng việt và tên người dùng nhập trong form update trang cá nhân
    function isValid(string) {
        var re = /^[a-zA-Z!@#\s\$%\^\&*\)\(+=._-]{4,14}$/g; // regex here
        return re.test(removeAscent(string));
    }
    //
    useEffect(() => {
        //
        // Khi Render Post nếu mình đã like thì nút like có màu đỏ (Xử lý trong useEffect của component Post)
        // console.log('userInfo callbacl', userInfo);
        // Gọi hàm lấy thông tin user để load ra giao diện profile
        getMyUserInfo();
        //
    }, [id_User, isOpenProfilePost, isOpenProfileFriends, profileAvatar]);
    // isOpenProfilePost từng ở depency ở trên
    useEffect(() => {
        // document.getElementById('headerTitleID').innerText = 'Trang cá nhân';
        document.title = `${userInfo?.data?.user[0]?.name ? userInfo?.data?.user[0]?.name : 'Roll'}`;
        document.getElementById('headerTitleID').innerText = `${
            userInfo?.data?.user[0]?.name ? userInfo?.data?.user[0]?.name : 'Trang cá nhân'
        }`;
    }, [id_User]);
    // cho update profile
    useEffect(() => {
        setValidName(isValid(profileName));
    }, [profileName]);
    useEffect(() => {
        setErrMsg('');
    }, [profileName]);
    useEffect(() => {
        return () => {
            profileAvatarPreview && URL.revokeObjectURL(profileAvatarPreview);
        };
    }, [profileAvatarPreview]);
    useEffect(() => {
        return () => {
            profileCoverImagePreview && URL.revokeObjectURL(profileCoverImagePreview);
        };
    }, [profileCoverImagePreview]);
    useEffect(() => {
        return () => {
            videosUpStoryPreview && URL.revokeObjectURL(videosUpStoryPreview);
        };
    }, [videosUpStoryPreview]);
    //
    if (userInfo) {
        document.title = `${userInfo?.data?.user[0]?.name ? userInfo?.data?.user[0]?.name : 'Roll'}`;
        document.getElementById('headerTitleID').innerText = `${
            userInfo?.data?.user[0]?.name ? userInfo?.data?.user[0]?.name : 'Trang cá nhân'
        }`;
    }
    //
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
    // // ------------------------------------------------------------------------
    //
    return userInfo?.status === false ? (
        <>
            <div className="row profileContainer">
                <div className="col l-12 m-12 c-12 profileTopInfo">
                    <h3>Trang cá nhân này không tồn tại hoặc đã bị xóa</h3>
                </div>
            </div>
        </>
    ) : userInfo?.data?.user.length > 0 ? (
        <>
            {/* <!-- Phần Giao diện trang cá nhân --> */}
            <div className="row profileContainer" style={{ position: 'relative' }}>
                <div className="col l-12 m-12 c-12 profileTopInfo">
                    <div className="coverImageContainer">
                        <img
                            className="postImage"
                            src={
                                userInfo?.data?.user[0].coverimage
                                    ? userInfo?.data?.user[0].coverimage
                                    : default_coverImage
                            }
                            alt=""
                        ></img>
                    </div>
                    <div className="avatarImageContainer">
                        <img
                            className="postImage"
                            src={userInfo?.data?.user[0]?.avatar ? userInfo?.data?.user[0]?.avatar : default_avatar}
                            alt=""
                        ></img>
                        <div className="profileName">
                            <span>{userInfo?.data?.user[0].name}</span>
                        </div>
                    </div>
                    <div className="profileOptions">
                        {userInfo?.data?.user[0].id === lcIdUser - 0 ? (
                            <button className="btnEditProfile" onClick={openFormUpdateProfile}>
                                Chỉnh sửa trang cá nhân
                            </button>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="col l-12 m-12 c-12 profileBottomInfo">
                    <div className="profileJoinAt">
                        <i class="fa-regular fa-calendar"></i> Đã tham gia vào:{' '}
                        <span>{timeAgo(userInfo?.data?.user[0].created_at)} </span>
                    </div>
                    <div className="profileFriendCount">
                        <i class="fa-solid fa-cake-candles"></i> Ngày sinh:{' '}
                        <span>{userInfo?.data?.user[0].birth} </span>
                    </div>
                    <div className="profileFriendCount">
                        <i class="fa-solid fa-user-group"></i> Bạn bè: <span>{userInfo?.data?.friends.length} </span>
                    </div>
                    <div className="profileFriendCount">
                        <i class="fa-regular fa-newspaper"></i> Bài viết đã đăng:{' '}
                        <span>{userInfo?.data?.posts.length} </span>
                    </div>
                </div>
                <div className="col l-12 m-12 c-12 profileFeatures" style={{ position: 'relative' }}>
                    <button
                        id="btnProfilePostListID"
                        onClick={openProfilePost}
                        // style={{borderBottom: '3px solid #243cfc'}}
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
                        id="btnProfileFriendListID"
                        onClick={openProfileFriends}
                        className={[
                            'btnProfileFeatures',
                            'btnProfileFriendList',
                            theme.theme === 'dark' ? 'textDarkMode' : '',
                        ].join(' ')}
                    >
                        Danh sách bạn bè
                    </button>
                    {/* Đăng bài */}
                    <button
                        id="btnProfileUpPost"
                        onClick={openFormUpPost}
                        className={[
                            'btnProfileFeatures',
                            'btnProfileFriendList',
                            theme.theme === 'dark' ? 'textDarkMode' : '',
                        ].join(' ')}
                        style={{
                            position: 'absolute',
                            right: '140px',
                            bottom: '5px',
                            background: 'black',
                            color: 'whitesmoke',
                            border: '.5px solid whitesmoke',
                            borderRadius: '20px',
                        }}
                    >
                        Đăng bài +
                    </button>

                    {/* Đăng story */}
                    <button
                        id="btnProfileUpStory"
                        onClick={openFormUpStory}
                        className={[
                            'btnProfileFeatures',
                            'btnProfileFriendList',
                            theme.theme === 'dark' ? 'textDarkMode' : '',
                        ].join(' ')}
                        style={{
                            position: 'absolute',
                            right: '5px',
                            bottom: '5px',
                            background: 'black',
                            color: 'whitesmoke',
                            border: '.5px solid whitesmoke',
                            borderRadius: '20px',
                        }}
                    >
                        Đăng Story{' '}
                        <i className="fa-solid fa-star-of-life" aria-hidden="true" style={{ color: '#243cfc' }}></i>
                    </button>
                </div>
                <div id={`profileContent_ID`} className="col l-12 m-12 c-12 profileContent">
                    {isOpenProfilePost ? (
                        userInfo?.data.posts.length ? (
                            userInfo.data.posts.map((post, i) => (
                                <>
                                    <Post>{post}</Post>
                                </>
                            ))
                        ) : (
                            <>
                                <div
                                    style={{
                                        display: 'grid',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <h2 style={{ textAlign: 'center' }}>Chưa có bài viết nào</h2>
                                    <img
                                        src={no_post_yet}
                                        style={{
                                            width: '250px',
                                            textAlign: 'center',
                                            borderRadius: '30px',
                                            background: 'black',
                                        }}
                                    ></img>
                                </div>
                            </>
                        )
                    ) : isOpenProfileFriends ? (
                        userInfo?.data.friends.length ? (
                            userInfo.data.friends.map((friend, i) => (
                                <>
                                    <div className="col l-12 m-12 c-12 profileFriendList">
                                        <User friend={friend}></User>
                                    </div>
                                </>
                            ))
                        ) : (
                            <>
                                <div
                                    style={{
                                        display: 'grid',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <h2 style={{ textAlign: 'center' }}>Chưa có bạn bè nào</h2>
                                    <img
                                        src={no_friend_yet}
                                        style={{
                                            width: '250px',
                                            textAlign: 'center',
                                            borderRadius: '30px',
                                            background: 'black',
                                        }}
                                    ></img>
                                </div>
                            </>
                        )
                    ) : (
                        <></>
                    )}
                </div>
                {isOpenFormUpdateProfile ? (
                    <div
                        className="col l-12 m-12 c-12 containerFormUpdateProfile"
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            display: 'grid',
                            justifyContent: 'center',
                            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.56) 0%, rgba(0, 0, 0, 0.54) 100%)',
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        <form
                            id="form"
                            onSubmit={updateProfile}
                            method="post"
                            style={{
                                width: 'fit-content',
                                height: 'fit-content',
                                marginTop: '10px',
                                display: 'grid',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: 'whitesmoke',
                                padding: '15px',
                                borderRadius: '15px',
                                boxShadow:
                                    'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
                            }}
                        >
                            {/* Nút thoát */}
                            <div style={{ width: '100%' }}>
                                <button
                                    onClick={closeFormUpdateProfile}
                                    type="button"
                                    style={{
                                        border: 'none',
                                        borderRadius: '5px',
                                        width: 'fit-content',
                                        padding: '3px 5px',
                                        background: 'black',
                                        color: 'whitesmoke',
                                        margin: '3px 0px',
                                        cursor: 'pointer',
                                        float: 'right',
                                    }}
                                >
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <h3 style={{ textAlign: 'center', margin: '0' }}>Chỉnh sửa thông tin</h3>
                            {/* Hình ảnh bìa */}
                            <span>Chọn ảnh bìa: </span>
                            <img
                                src={profileCoverImage ? profileCoverImagePreview : userInfo?.data.user[0].coverimage}
                                style={{
                                    verticalAlign: 'middle',
                                    width: '380px',
                                    borderRadius: '10px',
                                    objectPosition: 'center',
                                    objectFit: 'cover',
                                    margin: '3px auto',
                                }}
                            ></img>
                            {/* Ảnh bìa */}
                            <input
                                placeholder={
                                    profileCoverImage ? profileCoverImagePreview : userInfo?.data.user[0].coverimage
                                }
                                type="file"
                                // id={`update_profileCoverImage_${id_User}`}
                                id="coverimage"
                                name="coverimage"
                                autoComplete="off"
                                onChange={handleProfileCoverImageUpdate}
                                value={profileCoverImage}
                                style={{ margin: '5px' }}
                            />
                            {/* Hình Avatar */}
                            <span style={{ marginTop: '5px' }}>Chọn ảnh đại diện: </span>
                            <img
                                src={profileAvatar ? profileAvatarPreview : userInfo?.data.user[0].avatar}
                                style={{
                                    verticalAlign: 'middle',
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    objectPosition: 'center',
                                    objectFit: 'cover',
                                    margin: '3px auto',
                                }}
                            ></img>
                            {/* Avatar */}
                            <input
                                placeholder={userInfo?.data.user[0].avatar}
                                type="file"
                                // id={`update_profileAvatar_${id_User}`}
                                id="avatar"
                                name="avatar"
                                autoComplete="off"
                                onChange={handleProfileAvatarUpdate}
                                value={profileAvatar}
                                style={{ margin: '5px' }}
                            />
                            {/* Tên */}
                            <span style={{ marginTop: '5px' }}>Tên người dùng: </span>
                            <label htmlFor={`update_profileName_${id_User}`}>
                                <FontAwesomeIcon icon={faCheck} className={validName ? 'valid' : 'hide'} />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className={validName || !profileName ? 'hide' : 'invalid'}
                                />
                            </label>
                            <input
                                placeholder={userInfo?.data.user[0].name}
                                type="text"
                                // id={`update_profileName_${id_User}`}
                                id="name"
                                name="name"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setProfileName(e.target.value)}
                                value={profileName ? profileName : userInfo?.data.user[0].name}
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                style={{ margin: '5px' }}
                            />
                            <p
                                id="uidnote"
                                className={userFocus && profileName && !validName ? 'instructions' : 'offscreen'}
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Yêu cầu từ 4 đến 24 ký tự.
                                <br />
                                Phải bắt đầu bằng chữ.
                                <br />
                                Cho phép chữ cái, chữ hoa, chữ thường và dấu cách.
                            </p>
                            {/* Ngày sinh */}
                            <span style={{ marginTop: '5px' }}>Ngày sinh: </span>
                            <input
                                placeholder={userInfo?.data.user[0].birth}
                                type="date"
                                // id={`update_profileBirth_${id_User}`}
                                id="birth"
                                name="birth"
                                autoComplete="off"
                                onChange={(e) => setProfileBirth(e.target.value)}
                                value={profileBirth ? profileBirth : userInfo?.data.user[0].birth}
                                style={{ margin: '5px' }}
                            />
                            {/* PUT method */}
                            <input
                                type="text"
                                id="_method"
                                key="_method"
                                name="_method"
                                value="PUT"
                                style={{ display: 'none' }}
                            />
                            {/* Submit */}
                            <input
                                placeholder="Xác nhận"
                                type="submit"
                                id={`update_profileSubmit_${id_User}`}
                                style={{
                                    margin: '3px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '5px',
                                    background: 'black',
                                    color: 'whitesmoke',
                                    cursor: 'pointer',
                                }}
                            />
                        </form>
                    </div>
                ) : (
                    <></>
                )}
                {isOpenUpPost ? (
                    <div
                        className="col l-12 m-12 c-12 containerFormUpdateProfile"
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            display: 'grid',
                            justifyContent: 'center',
                            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.56) 0%, rgba(0, 0, 0, 0.54) 100%)',
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        <form
                            id="formUpPost"
                            onSubmit={upPostInProfile}
                            method="post"
                            style={{
                                width: 'fit-content',
                                height: 'fit-content',
                                marginTop: '10px',
                                display: 'grid',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: 'whitesmoke',
                                padding: '15px',
                                borderRadius: '15px',
                                boxShadow:
                                    'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
                            }}
                        >
                            {/* Nút thoát */}
                            <div style={{ width: '100%' }}>
                                <button
                                    onClick={closeFormUpPost}
                                    type="button"
                                    style={{
                                        border: 'none',
                                        borderRadius: '5px',
                                        width: 'fit-content',
                                        padding: '3px 5px',
                                        background: 'black',
                                        color: 'whitesmoke',
                                        margin: '3px 0px',
                                        cursor: 'pointer',
                                        float: 'right',
                                    }}
                                >
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <h3 style={{ textAlign: 'center', margin: '0' }}>Đăng bài viết</h3>
                            {/* Nội dung bài viết */}
                            <span style={{ marginTop: '5px' }}>Nội dung bài viết: </span>
                            <input
                                placeholder="Nội dung bài viết"
                                type="text"
                                // id={`update_profileName_${id_User}`}
                                id="content"
                                name="content"
                                maxLength={400}
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setContentUpPost(e.target.value)}
                                value={contentUpPost}
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                style={{ margin: '5px' }}
                            />
                            {/* Ngày sinh */}
                            <span style={{ marginTop: '5px' }}>Chế độ đăng bài: </span>
                            <input
                                placeholder="Nhập 0 để đăng công khai, 1 để chỉ mình tôi"
                                type="text"
                                // id={`update_profileBirth_${id_User}`}
                                id="privacy"
                                name="privacy"
                                autoComplete="off"
                                onChange={(e) => setPrivacyUpPost(e.target.value)}
                                value={privacyUpPost}
                                style={{ margin: '5px' }}
                                maxLength={1}
                                required
                            />
                            {/* Chọn ảnh đăng */}
                            <span>Đăng kèm ảnh (có thể chọn nhiều ảnh cùng một lúc): </span>
                            <div style={{ display: 'grid' }}>
                                {/* {photosUpPost.map((photo) => (
                                    <img
                                        src={
                                            profileCoverImage
                                                ? profileCoverImagePreview
                                                : userInfo?.data.user[0].coverimage
                                        }
                                        style={{
                                            verticalAlign: 'middle',
                                            width: '380px',
                                            borderRadius: '10px',
                                            objectPosition: 'center',
                                            objectFit: 'cover',
                                            margin: '3px auto',
                                        }}
                                    ></img>
                                ))} */}
                            </div>
                            {/* Chọn ảnh */}
                            <input
                                placeholder={
                                    profileCoverImage ? profileCoverImagePreview : userInfo?.data.user[0].coverimage
                                }
                                type="file"
                                // id={`update_profileCoverImage_${id_User}`}
                                id="photoUrl[]"
                                name="photoUrl[]"
                                autoComplete="off"
                                onChange={handlePhotosUpPost}
                                value={photosUpPost}
                                style={{ margin: '5px' }}
                                multiple
                            />
                            {/* Chọn video đăng */}
                            <span style={{ marginTop: '5px' }}>
                                Đăng kèm video (có thể chọn nhiều video cùng một lúc):{' '}
                            </span>
                            {/* Chọn video */}
                            <input
                                // placeholder={userInfo?.data.user[0].avatar}
                                type="file"
                                // id={`update_profileAvatar_${id_User}`}
                                id="avatar"
                                name="avatar"
                                autoComplete="off"
                                onChange={handleVideosUpPost}
                                value={videosUpPost}
                                style={{ margin: '5px' }}
                                multiple
                            />
                            {/* Submit */}
                            <input
                                placeholder="Xác nhận"
                                type="submit"
                                id={`upPost_${id_User}`}
                                style={{
                                    margin: '3px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '5px',
                                    background: 'black',
                                    color: 'whitesmoke',
                                    cursor: 'pointer',
                                }}
                            />
                        </form>
                    </div>
                ) : (
                    <></>
                )}
                {isOpenUpStory ? (
                    <div
                        className="col l-12 m-12 c-12 containerFormUpdateProfile"
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            display: 'grid',
                            justifyContent: 'center',
                            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.56) 0%, rgba(0, 0, 0, 0.54) 100%)',
                            backdropFilter: 'blur(8px)',
                        }}
                    >
                        <form
                            id="formUpStory"
                            onSubmit={upStoryInProfile}
                            method="post"
                            style={{
                                width: 'fit-content',
                                height: 'fit-content',
                                marginTop: '10px',
                                display: 'grid',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: 'whitesmoke',
                                padding: '15px',
                                borderRadius: '15px',
                                boxShadow:
                                    'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
                            }}
                        >
                            {/* Nút thoát */}
                            <div style={{ width: '100%' }}>
                                <button
                                    onClick={closeFormUpStory}
                                    type="button"
                                    style={{
                                        border: 'none',
                                        borderRadius: '5px',
                                        width: 'fit-content',
                                        padding: '3px 5px',
                                        background: 'black',
                                        color: 'whitesmoke',
                                        margin: '3px 0px',
                                        cursor: 'pointer',
                                        float: 'right',
                                    }}
                                >
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <h3 style={{ textAlign: 'center', margin: '0' }}>Đăng Story</h3>
                            {/* Chế độ đăng story */}
                            <span style={{ marginTop: '5px' }}>Chế độ đăng: </span>
                            <input
                                placeholder="Nhập 0 để đăng công khai, 1 để chỉ mình tôi"
                                type="text"
                                // id={`update_profileName_${id_User}`}
                                id="privacy"
                                name="privacy"
                                maxLength={1}
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setPrivacyUpStory(e.target.value)}
                                value={privacyUpStory}
                                aria-invalid={validName ? 'false' : 'true'}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                style={{ margin: '5px' }}
                                required
                            />
                            {/* Chọn video đăng */}
                            <span style={{ marginTop: '5px' }}>Chọn video: </span>
                            {/* Chọn video */}
                            <video
                                src={videosUpStoryPreview ? videosUpStoryPreview : ''}
                                style={{
                                    verticalAlign: 'middle',
                                    width: '380px',
                                    borderRadius: '10px',
                                    objectPosition: 'center',
                                    objectFit: 'cover',
                                    margin: '3px auto',
                                }}
                                autoPlay
                                loop
                                playsInline
                                controls
                            ></video>
                            <input
                                // placeholder={userInfo?.data.user[0].avatar}
                                type="file"
                                // id={`update_profileAvatar_${id_User}`}
                                id="videoUrl[]"
                                name="videoUrl[]"
                                autoComplete="off"
                                onChange={handleVideosUpStory}
                                value={videosUpStory}
                                style={{ margin: '5px' }}
                                required
                            />
                            {/* Submit */}
                            <input
                                placeholder="Xác nhận"
                                type="submit"
                                id={`upPost_${id_User}`}
                                style={{
                                    margin: '3px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '5px',
                                    background: 'black',
                                    color: 'whitesmoke',
                                    cursor: 'pointer',
                                }}
                            />
                        </form>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    ) : (
        <>
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
        </>
    );
}

export default MyProfile;
