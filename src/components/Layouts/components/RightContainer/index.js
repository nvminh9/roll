import { useContext } from 'react';
import { ThemeContext } from '~/ThemeContext';

function RightContainer() {
    const theme = useContext(ThemeContext);

    return (
        <>
            {/* <!-- Phần khung bên phải --> */}
            <div id="rightContainerID" className="col l-3 m-0 c-0 rightContainer">
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
                            <li className="story ">
                                <button className="btnPlayStory">
                                    <video className="storyContent " src="" loop playsInline></video>
                                </button>
                                <div className="storyInfo">
                                    <img src="" alt=""></img>
                                    <span className="storyInfoUserName"></span>
                                </div>
                            </li>
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
}

export default RightContainer;
