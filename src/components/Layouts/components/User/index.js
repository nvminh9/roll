import { useEffect, useState } from 'react';
import axios from '~/api/axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import default_avatar from '~/resource/images/default_avatar.jpg';

function User({ friend, children, key }) {
    const [users, setUsers] = useState();
    // id_User của params
    const { id_User } = useParams();
    // Lấy User
    const getUsers = async () => {
        let isMounted = true;
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);

        try {
            const response = await axios.get(
                `/api/profile/${friend.id_friend + '' === id_User ? friend.id_User : friend.id_friend}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                },
            );
            //
            isMounted && setUsers(response.data.data.user);
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
        getUsers();
    }, []);

    return (
        <>
            {users?.length ? (
                <>
                    {users.map((user, i) => (
                        <>
                            <div key={user.id} className="poster">
                                <div className="posterAvatar">
                                    <Link to={`/profile/${user.id}`}>
                                        <button className="btnPosterAvatar">
                                            <img src={user.avatar ? user.avatar : default_avatar} alt=""></img>
                                        </button>
                                    </Link>
                                </div>
                                <div className="posterInfo">
                                    <Link to={`/profile/${user.id}`}>
                                        <button>
                                            <span className="posterName">{user.name}</span>
                                        </button>
                                    </Link>
                                    {/* <button>
                                        <span className="posterTime">{children.acceptDate}</span>
                                    </button> */}
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

export default User;
