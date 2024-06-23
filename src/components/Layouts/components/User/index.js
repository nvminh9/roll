import { useEffect, useState } from 'react';
import axios from '~/api/axios';
import { Link } from 'react-router-dom';

function User({ children, key }) {
    const [users, setUsers] = useState();
    // Lấy User của Bài viết
    useEffect(() => {
        let isMounted = true;
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);

        const getUsers = async () => {
            try {
                const response = await axios.get(`/api/profile/${children.id_User}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                });
                //
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        getUsers();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>
            {users?.data?.user.length ? (
                <>
                    {users.data.user.map((user, i) => (
                        <>
                            <div key={children.id_User} className="poster">
                                <div className="posterAvatar">
                                    <Link to="/profile">
                                        <button className="btnPosterAvatar">
                                            <img src={user.avatar} alt=""></img>
                                        </button>
                                    </Link>
                                </div>
                                <div className="posterInfo">
                                    <Link to="/profile">
                                        <button>
                                            <span className="posterName">{user.name}</span>
                                        </button>
                                    </Link>
                                    <button>
                                        <span className="posterTime">{children.created_at}</span>
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

export default User;
