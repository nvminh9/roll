import { useNavigate } from 'react-router-dom';
import TitleHeader from './TitleHeader';
import { Link } from 'react-router-dom';
import roll_logo_black from '~/resource/images/roll_logo_black.png';
import roll_logo_white from '~/resource/images/roll_logo_white.png';
// themeContext để làm chế độ sáng tối
import { useContext } from 'react';
import { ThemeContext } from '~/ThemeContext';

function Header({ children }) {
    const navigate = useNavigate();
    const theme = useContext(ThemeContext);

    return (
        <>
            <div
                id="headerContainerID"
                className={['row', 'headerContainer', theme.theme === 'dark' ? 'headerDarkmode' : ''].join(' ')}
                style={{ margin: 0 }}
            >
                <div className="col l-0 m-1 c-1 btnExpandMenuContainer">
                    <button id="btnExpandMenuID" className="btnExpandMenu">
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </div>
                <div className="col l-2 m-2 c-2 logoImg">
                    <Link to={'/'}>
                        <img id="logoImgID" src={theme.theme === 'dark' ? roll_logo_white : roll_logo_black} />
                    </Link>
                </div>
                <div className="col l-7 m-9 c-9 headerContainerMiddle">
                    <ul>
                        <li>
                            <button
                                id="btnFeeds"
                                onClick={() => navigate(-1)}
                                className={[theme.theme === 'dark' ? 'textDarkMode' : ''].join(' ')}
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                        </li>
                        <li className="headerTitle">
                            <span>
                                <TitleHeader>{children}</TitleHeader>
                            </span>
                        </li>
                        <li className="hideStoryBtn" style={{ width: '157px' }}>
                            <button
                                id="btnExpandStory"
                                style={{ backgroundColor: 'black', color: 'whitesmoke', borderRadius: '10px' }}
                            >
                                <i className="fa-solid fa-star-of-life" style={{ color: '#243CFC' }}></i> Stories
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="col l-3 m-0 c-0 headerContainerRight"></div>
            </div>
        </>
    );
}

export default Header;
