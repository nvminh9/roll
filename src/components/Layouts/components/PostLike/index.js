import { useEffect, useState, useParams } from 'react';
import axios from '~/api/axios';
import { Link } from 'react-router-dom';
import default_avatar from '~/resource/images/default_avatar.jpg';

function PostLike({ isOpenComment, isOpenLike, children }) {
    const [newLikes, setNewLikes] = useState();
    //
    // id_User của params của Route truyền vào
    //
    const lcIdUser = localStorage.getItem('rAct_I').slice(0, -14) - 0;
    //
    // Lấy Comment của Bài viết
    const getNewLikes = async () => {
        let isMounted = true;
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);

        try {
            const response = await axios.get(`/api/likes/${children.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            isMounted && setNewLikes(response.data.data);
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
    //
    useEffect(() => {
        getNewLikes();
        // isOpenLike
        //     ? (document.getElementById(`post_btnComment_${children.id}`).style =
        //           'color: #3ae374; background-color: rgba(131, 131, 131, 0.438);')
        //     : (document.getElementById(`post_btnComment_${children.id}`).style = '');
    }, [isOpenLike]);
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
    //
    return isOpenLike ? (
        <>
            {newLikes.length > 0 ? (
                <div
                    id={`postLike${children.id}`}
                    className="col l-12 m-12 c-12 postCommentContainer"
                    style={{ color: 'whitesmoke', paddingTop: '10px' }}
                >
                    <>
                        <span style={{ padding: '10px', fontSize: '16px', fontWeight: '400' }}>
                            Người đã thích bài viết này :
                        </span>
                        {newLikes.map((like, i) => (
                            <>
                                <div key={i} className="like comment">
                                    <div id={`poster_${like.id_User}`} key={like.id_User} className="poster">
                                        <div className="posterAvatar">
                                            <Link to={`/profile/${like.id_User === lcIdUser ? '' : like.id_User}`}>
                                                <button className="btnPosterAvatar">
                                                    <img
                                                        src={like.user.avatar ? like.user.avatar : default_avatar}
                                                        alt=""
                                                    ></img>
                                                </button>
                                            </Link>
                                        </div>
                                        <div
                                            className="posterInfo"
                                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        >
                                            <Link to={`/profile/${like.id_User === lcIdUser ? '' : like.id_User}`}>
                                                <button>
                                                    <span className="posterName">{like.user.name}</span>
                                                </button>
                                            </Link>
                                            <button>
                                                <span className="posterTime">{timeAgo(like.created_at)}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
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
                            Chưa có lượt thích nào
                        </h1>
                    </div>
                </>
            )}
        </>
    ) : (
        <></>
    );
}

export default PostLike;
