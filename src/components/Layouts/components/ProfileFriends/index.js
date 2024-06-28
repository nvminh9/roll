import { useEffect, useState } from 'react';
import axios from '~/api/axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ProfileFriends({ idUserProfile }) {
    const [friends, setFriends] = useState();
    // id_User của params
    const { id_User } = useParams();
    // Lấy User của Bài viết
    useEffect(() => {
        let isMounted = true;
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);

        const getFriends = async () => {
            try {
                const response = await axios.get(`/api/friend`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                });
                //
                isMounted && setFriends(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        getFriends();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>
            {friends?.data.length ? (
                <>
                    {friends.data.map((friend, i) => (
                        <>
                            <div key={friend.id} className="poster">
                                <div className="posterAvatar">
                                    <Link to={`/profile/${friend.id}`}>
                                        <button className="btnPosterAvatar">
                                            <img src={friend.avatar} alt=""></img>
                                        </button>
                                    </Link>
                                </div>
                                <div className="posterInfo">
                                    <Link to={`/profile/${friend.id}`}>
                                        <button>
                                            <span className="posterName">{friend.name}</span>
                                        </button>
                                    </Link>
                                    <button>
                                        <span className="posterTime">{friend.updated_at}</span>
                                    </button>
                                </div>
                            </div>
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
        </>
    );
}

export default ProfileFriends;
