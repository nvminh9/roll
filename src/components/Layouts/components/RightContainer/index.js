import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ThemeContext } from '~/ThemeContext';
import Story from '../Story';
import default_avatar from '~/resource/images/default_avatar.jpg';
import axios from '~/api/axios';
import Pusher from 'pusher-js';
import NotificationMessage from '../NotificationMessage';

const RightContainer = () => {
    const theme = useContext(ThemeContext);
    const [listStory, setListStory] = useState();
    //
    // Hàm lấy Bài viết
    const getListStory = async () => {
        let isMounted = true;
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        //
        try {
            const response = await axios.get('/api/story', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            isMounted && setListStory(response);
            //
            console.log('Response: ', response.data.data);
            // console.log('Response: ', listStory);
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
        //
        //
        getListStory();
        //
        console.log('RightContainer');
        console.log(listStory);
    }, []);
    //
    console.log('RightContainer');
    console.log(listStory);
    //
    // --------------------TEST HOVER ON STORY--------------------------
    setTimeout(() => {
        const storyContent = document.getElementsByClassName('storyContent');
        for (let i = 0; i < storyContent.length; i++) {
            storyContent[i].addEventListener('mouseover', function (e) {
                this.play();
            });
        }
        for (let i = 0; i < storyContent.length; i++) {
            storyContent[i].addEventListener('mouseleave', function (e) {
                this.pause();
            });
        }
    }, 15000);
    // -----------------------------------------------------------------
    // -------------------*** ACTIVE STORY ***--------------------------------
    setTimeout(() => {
        const storyActiveContainer = document.getElementById('storyActiveContainerID');
        var listStoryContent = document.getElementsByClassName('storyContent');
        var listStoryInfo = document.getElementsByClassName('storyInfo');
        const btnPlayStory = document.getElementsByClassName('btnPlayStory');
        const btnCancelStoryActive = document.getElementById('btnCancelStoryActiveID');
        // function cancelStoryActive() {
        //     storyActiveContainer.style = '';
        //     storyActiveContainer.innerHTML = '';
        // }
        var storyActiveTemplate = '';
        for (let i = 0; i < btnPlayStory.length; i++) {
            btnPlayStory[i].addEventListener('click', function (e) {
                // index của video story;
                let indexStoryActive = i;
                console.log(indexStoryActive);
                storyActiveContainer.style =
                    'height: 100%;width: 100%;padding: 0;position: absolute;z-index:1;background: linear-gradient(0deg, rgba(0, 0, 0, 0.56) 0%, rgba(0, 0, 0, 0.54) 100%);-webkit-backdrop-filter: blur(20px);backdrop-filter: blur(8px);';
                storyActiveTemplate =
                    `<div id="storyActiveID" class="storyActive">
                            <button id="btnLeftStoryActiveID" class="col l-1 m-2 c-2 btnLeftStoryActive">
                                <i class="fa-solid fa-chevron-left"></i>
                            </button>
                            <div id="storyActiveContentID" class="col l-10 m-8 c-8 storyActiveContent">
                                <div class="infoStoryActiveContainer">
                                    <img id="avatarStoryActiveID" src="` +
                    listStoryInfo[indexStoryActive].children[0].src +
                    `" alt="" class="avatarStoryActive">
                                    <span id="nameStoryActiveID" class="nameStoryActive">` +
                    listStoryInfo[indexStoryActive].children[1].textContent +
                    `</span>
                                    <!-- <button id="" class="btnPlayPauseStoryActive"><i class="fa-solid fa-play"></i></button> -->
                                    <button id="btnMuteStoryActiveID" class="btnMuteStoryActive"><!-- <i class="fa-solid fa-volume-xmark"></i> --><i class="fa-solid fa-volume-high"></i></button>
                                    <button id="btnCancelStoryActiveID" class="btnCancelStoryActive"><i class="fa-solid fa-xmark"></i></button>
                                </div>
                                <video id="videoStoryActiveID" class="storyActiveContentSize" src="` +
                    listStoryContent[indexStoryActive].src +
                    `" autoplay loop playsinline></video>
                                <div class="interactStoryActive">
                                    <button class="btnLikeStoryActive"><i class="fa-solid fa-heart"></i></button>
                                </div>
                            </div>
                            <button id="btnRightStoryActiveID" class="col l-1 m-2 c-2 btnRightStoryActive">
                                <i class="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>`;
                storyActiveContainer.innerHTML = storyActiveTemplate;
                // khung tên, avatar, video của story
                var nameStoryActive = document.getElementById('nameStoryActiveID');
                var avatarStoryActive = document.getElementById('avatarStoryActiveID');
                var videoStoryActive = document.getElementById('videoStoryActiveID');
                // nút lùi về story trước
                document.getElementById('btnLeftStoryActiveID').addEventListener('click', function (e) {
                    if (indexStoryActive != 0) {
                        indexStoryActive = indexStoryActive - 1;
                        nameStoryActive.textContent = listStoryInfo[indexStoryActive].children[1].textContent;
                        avatarStoryActive.src = listStoryInfo[indexStoryActive].children[0].src;
                        videoStoryActive.src = listStoryContent[indexStoryActive].src;
                    } else {
                        indexStoryActive = indexStoryActive;
                        // alert("Hết rồi :v");
                    }
                });
                // nút tiến tới story tiếp theo
                document.getElementById('btnRightStoryActiveID').addEventListener('click', function (e) {
                    if (indexStoryActive < btnPlayStory.length - 1) {
                        indexStoryActive = indexStoryActive + 1;
                        nameStoryActive.textContent = listStoryInfo[indexStoryActive].children[1].textContent;
                        avatarStoryActive.src = listStoryInfo[indexStoryActive].children[0].src;
                        videoStoryActive.src = listStoryContent[indexStoryActive].src;
                    } else {
                        indexStoryActive = indexStoryActive;
                        // alert("Hết rồi :v");
                    }
                });
                // btnCancelStoryActive = document.getElementById('btnCancelStoryActiveID');
                if (btnCancelStoryActive) {
                    btnCancelStoryActive.addEventListener('click', function (e) {
                        storyActiveContainer.style = '';
                        storyActiveContainer.innerHTML = '';
                        console.log('Out Story');
                    });
                }
                // nút tắt âm lượng của story
                document.getElementById('btnMuteStoryActiveID').addEventListener('click', function (e) {});
            });
        }
    }, 15000);
    // -----------------------------------------------------------------

    //
    return (
        <>
            {/* <!-- Phần khung bên phải --> */}
            <div id="rightContainerID" className="col l-3 m-0 c-0 rightContainer" style={{ position: 'relative' }}>
                {/* Thông báo PopUp Message */}
                <NotificationMessage></NotificationMessage>
                {/* <!-- Phần thừa để đẩy bài đầu xuống ko bị che --> */}
                <div className="row headerBack"></div>
                <div className="col l-12 m-12 c-12 storyContainer">
                    <div className="storyContainerTitle">
                        <div className="storyContainerIcon">
                            <img src="" alt=""></img>
                            <i className="fa-solid fa-star-of-life"></i>
                        </div>
                        <span>Stories</span>
                    </div>
                    <div className="listStoryContainer">
                        <ul className="listStory">
                            {listStory?.data.data.All.length ? (
                                <>
                                    {listStory.data.data.All.sort(() => Math.random() - 0.5).map((story, i) => (
                                        <>
                                            <li id={story.id} className="story ">
                                                <button className="btnPlayStory">
                                                    <video
                                                        className="storyContent "
                                                        src={story.videos[0].videoUrl}
                                                        loop
                                                        playsInline
                                                    ></video>
                                                </button>
                                                <div className="storyInfo">
                                                    <img
                                                        src={story.user.avatar ? story.user.avatar : default_avatar}
                                                        alt=""
                                                    ></img>
                                                    <span className="storyInfoUserName">{story.user.name}</span>
                                                </div>
                                            </li>
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
                        </ul>
                    </div>
                </div>
                <div className="col l-12 m-12 c-12 suggestContainer">
                    <div className="suggestContainerTitle">
                        <div className="suggestContainerIcon">
                            <img src="" alt=""></img>
                        </div>
                        <span>Bạn bè đề xuất</span>
                    </div>
                    <div className="listSuggestContainer">
                        <ul className="listSuggest">
                            <li className="suggest">
                                <img className="suggestAvatar" src="" alt=""></img>
                                <span className="suggestName"></span>
                                <button
                                    className={['btnAddfriend', theme.theme === 'dark' ? 'textDarkMode' : ''].join(' ')}
                                >
                                    Kết bạn
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RightContainer;
