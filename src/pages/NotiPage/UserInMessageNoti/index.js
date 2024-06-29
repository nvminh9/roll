import axios from '~/api/axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserInMessageNoti({ children }) {
    //
    const [userInMessageNoti, setUserInMessageNoti] = useState();
    //
    const getUserInMessageNoti = async (e) => {
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        // axios
        try {
            const response = await axios.get(`/api/profile/${children}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            setUserInMessageNoti(response.data.data);
            //
        } catch (err) {
            console.error(err);
        }
    };
    //
    useEffect(() => {
        getUserInMessageNoti();
        //
    }, []);

    return (
        <>
            {userInMessageNoti?.user?.length ? (
                <>
                    <div className="posterAvatar">
                        <button className="btnPosterAvatar">
                            <img src={userInMessageNoti.user[0].avatar} alt=""></img>
                        </button>
                    </div>
                    <div className="posterInfo" style={{ textAlign: 'left' }}>
                        <button style={{ color: 'whitesmoke', fontSize: '17px' }}>
                            <Link to={`/profile/${userInMessageNoti.user[0].id}`} style={{ textDecoration: 'none' }}>
                                <span className="posterName" style={{ color: 'lightgrey' }}>
                                    {userInMessageNoti.user[0].name}
                                </span>
                            </Link>
                        </button>
                    </div>
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
        </>
    );
}

export default UserInMessageNoti;
