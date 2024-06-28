import { useEffect, useState, useContext } from 'react';
import axios from '~/api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPaperPlane, faCircle } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '~/ThemeContext';
import default_avatar from '~/resource/images/default_avatar.jpg';
// import Pusher from 'pusher-js/types/src/core/pusher';
import pusherJs from 'pusher-js';

function BoxMessage() {
    const [screenHeight, setScreenHeight] = useState();
    const { theme } = useContext(ThemeContext);
    //
    useEffect(() => {
        document.title = 'Nhắn tin / Roll';
        //
        //
        document.getElementById('headerTitleID').innerText = 'Nhắn tin';
    }, []);
    //
    return (
        <>
            <div className="backGroundBoxMessage" style={{ height: '91.2%' }}>
                <div
                    className="row profileContainer"
                    style={{
                        width: '100%',
                        position: 'relative',
                        height: '10%',
                        background:
                            theme === 'dark'
                                ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.56) 0%, rgba(0, 0, 0, 0.54) 100%)'
                                : 'linear-gradient(0deg, rgba(255, 255, 255, 0.56) 0%, rgba(255, 255, 255, 0.54) 100%)',
                        margin: '0px',
                    }}
                >
                    <div
                        className="poster"
                        style={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'center',
                            padding: '5px',
                            width: '100%',
                            margin: '0px auto',
                            background:
                                theme === 'dark'
                                    ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.56) 0%, rgba(0, 0, 0, 0.54) 100%)'
                                    : 'linear-gradient(0deg, rgba(255, 255, 255, 0.56) 0%, rgba(255, 255, 255, 0.54) 100%)',
                            backdropFilter: 'blur(20px)',
                        }}
                    >
                        <div className="posterAvatar">
                            <button className="btnPosterAvatar" style={{ background: 'none', border: 'none' }}>
                                <img
                                    src={default_avatar}
                                    alt=""
                                    style={{
                                        verticalAlign: 'middle',
                                        width: '55px',
                                        height: '55px',
                                        borderRadius: '50%',
                                        objectPosition: 'center',
                                        objectFit: 'cover',
                                    }}
                                ></img>
                            </button>
                        </div>
                        <div className="posterInfo" style={{ display: 'grid', margin: '0px 10px' }}>
                            <span
                                className="posterName posterInListMessage"
                                style={{ color: theme === 'dark' ? 'whitesmoke' : 'black' }}
                            >
                                Minh
                            </span>
                            <span
                                className="posterTime"
                                style={{ margin: '5px', fontSize: '13px', fontWeight: '300', color: 'dimgray' }}
                            >
                                <FontAwesomeIcon icon={faCircle} style={{ color: '#2ed573' }}></FontAwesomeIcon> Đang
                                online
                            </span>
                        </div>
                        {/* <div className="posterInfo" style={{ position: 'absolute', right: '10px' }}>
                            <button
                                className="btnToBoxMessage"
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                    background: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '10px 13px',
                                    borderRadius: '50%',
                                }}
                            >
                                <span id="" className="posterTime">
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </span>
                            </button>
                        </div> */}
                    </div>
                </div>
                <div
                    className="row profileContainer"
                    style={{
                        width: '100%',
                        height: '80.5%',
                        position: 'relative',
                        margin: '0px',
                        background:
                            theme === 'dark'
                                ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.56) 0%, rgba(0, 0, 0, 0.54) 100%)'
                                : 'linear-gradient(0deg, rgba(255, 255, 255, 0.56) 0%, rgba(255, 255, 255, 0.54) 100%)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    <div
                        className="col l-12 m-12 c-12 boxMessage"
                        style={{ background: 'transparent', width: '100%', height: '100%' }}
                    >
                        Hello
                    </div>
                </div>
                <div
                    className="row profileContainer"
                    style={{
                        width: '100%',
                        height: '7%',
                        position: 'relative',
                        padding: '10px',
                        margin: '0px',
                        background:
                            theme === 'dark'
                                ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.56) 0%, rgba(0, 0, 0, 0.54) 100%)'
                                : 'linear-gradient(0deg, rgba(255, 255, 255, 0.56) 0%, rgba(255, 255, 255, 0.54) 100%)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    <div
                        className="col l-12 m-12 c-12 searchInMessage"
                        style={{ width: '100%', left: '0', right: '0', bottom: '0' }}
                    >
                        <form
                            className="formSearchInMessage"
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <input
                                type="text"
                                className="inputSearchInMessage"
                                placeholder="Nhập tin nhắn ..."
                                style={{ width: '85%' }}
                                required
                            ></input>
                            <button
                                type="submit"
                                style={{
                                    width: '10%',
                                    padding: '1.3rem',
                                    border: '0.3px solid darkgrey',
                                    borderRadius: '10px',
                                    color: 'dimgray',
                                    cursor: 'pointer',
                                    marginLeft: '10px',
                                }}
                            >
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BoxMessage;
