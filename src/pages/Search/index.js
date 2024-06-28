import { useEffect, useState } from 'react';
import axios from '~/api/axios';
import User from '~/components/Layouts/components/User';
import { Link } from 'react-router-dom';
import default_avatar from '~/resource/images/default_avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Post from '~/components/Layouts/components/Post';

function Search() {
    //
    const lcIdUser = localStorage.getItem('rAct_I').slice(0, -14);
    //
    const [searchInputContent, setSearchInputContent] = useState();
    const [isSubmitNewSearch, setIsSubmitNewSearch] = useState(false);
    const [searchResult, setSearchResult] = useState();
    //
    const handleSearch = async (e) => {
        e.preventDefault();
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);
        //
        try {
            const response = await axios.post(`/api/search/`, JSON.stringify({ search: searchInputContent }), {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            //
            console.log('Kết quả tìm kiếm:', response);
            setSearchResult(response.data);
            // setSearchInputContent('');
            setIsSubmitNewSearch(true);
            //
            console.log('Response :', response);
        } catch (err) {
            console.log(err);
        }
        //
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
        document.title = 'Tìm kiếm / Roll';
        //
        document.getElementById('headerTitleID').innerText = 'Tìm kiếm';
    }, []);
    //
    return (
        <>
            {/* <!-- Phần Giao diện trang tìm kiếm --> */}
            <div
                className="searchResult_everyone"
                style={{
                    display: 'grid',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#242526',
                    width: 'fit-content',
                    margin: '0 auto',
                    padding: '5px',
                    borderRadius: '15px',
                }}
            >
                <form
                    className="formSearch"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '0 auto',
                        borderRadius: '10px',
                        padding: '5px',
                        width: 'fit-content',
                    }}
                    onSubmit={handleSearch}
                >
                    <i class="fa-solid fa-magnifying-glass" style={{ color: 'whitesmoke', margin: '5px' }}></i>
                    <label htmlFor="search" style={{ margin: '5px', marginLeft: '5px' }}>
                        {/* Tìm kiếm:{' '} */}
                    </label>
                    <input
                        className="inputFormSearch"
                        id="search"
                        name="search"
                        type="text"
                        placeholder="Nhập nội dung tìm kiếm"
                        style={{}}
                        onChange={(e) => setSearchInputContent(e.target.value)}
                        value={searchInputContent}
                        required
                    ></input>
                    <button
                        type="submit"
                        style={{
                            border: '.5px solid black',
                            padding: '12.5px',
                            margin: '10px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                        }}
                    >
                        Gửi
                    </button>
                </form>
            </div>
            {isSubmitNewSearch ? (
                <div className="searchResult_everyone">
                    {searchResult.data.users.length ? (
                        <>
                            <div
                                className="searchResult_everyone"
                                style={{
                                    display: 'grid',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    background: 'black',
                                    width: 'fit-content',
                                    margin: '20px auto',
                                    padding: '35px',
                                    borderRadius: '15px',
                                }}
                            >
                                <span
                                    style={{
                                        color: 'whitesmoke',
                                        marginBottom: '30px',
                                        fontSize: '20px',
                                        fontWeight: '400',
                                    }}
                                >
                                    Mọi người
                                </span>
                                {searchResult.data.users.map((user, i) => (
                                    <>
                                        <Link to={`/profile/${user.id === lcIdUser - 0 ? '' : user.id}`}>
                                            <div
                                                id={`poster_id_friend_${user.id}`}
                                                key={user.id}
                                                className="poster"
                                                style={{
                                                    position: 'relative',
                                                    display: 'flex',
                                                    justifyContent: 'left',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <div className="posterAvatar">
                                                    <Link to={`/profile/${user.id === lcIdUser - 0 ? '' : user.id}`}>
                                                        <button
                                                            className="btnPosterAvatar"
                                                            style={{
                                                                background: 'none',
                                                                width: 'fit-content',
                                                                border: 'none',
                                                            }}
                                                        >
                                                            <img
                                                                src={user.avatar ? user.avatar : default_avatar}
                                                                alt=""
                                                                style={{
                                                                    verticalAlign: 'middle',
                                                                    width: '55px',
                                                                    height: '55px',
                                                                    borderRadius: '50%',
                                                                    objectPosition: 'center',
                                                                    objectFit: 'cover',
                                                                    border: 'none',
                                                                }}
                                                            ></img>
                                                        </button>
                                                    </Link>
                                                </div>
                                                <div className="posterInfo">
                                                    <Link to={`/profile/${user.id === lcIdUser - 0 ? '' : user.id}`}>
                                                        <button
                                                            style={{
                                                                border: 'none',
                                                                background: 'none',
                                                                color: 'whitesmoke',
                                                                fontWeight: '300',
                                                            }}
                                                        >
                                                            <span className="posterName">{user.name}</span>
                                                        </button>
                                                    </Link>
                                                    <button
                                                        style={{
                                                            textDecoration: 'none',
                                                            background: 'none',
                                                            border: 'none',
                                                            color: 'whitesmoke',
                                                            fontWeight: '300',
                                                        }}
                                                    >
                                                        <span className="posterTime">
                                                            Tham gia vào lúc: {timeAgo(user.created_at)}
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                ))}
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <></>
            )}
            {isSubmitNewSearch ? (
                <div className="searchResult_everyone">
                    {searchResult.data.posts.length ? (
                        <>
                            <div className="row container" style={{ width: '100%', height: 'fit-content' }}>
                                <div
                                    className="col l-12 m-12 c-12 middleContainer"
                                    style={{ padding: '25px', borderRadius: '10px' }}
                                >
                                    {/* <span
                                        style={{
                                            fontSize: '20px',
                                            fontWeight: '400',
                                            margin: '15px',
                                            background: 'black',
                                            color: 'whitesmoke',
                                            padding: '5px',
                                            borderRadius: '5px',
                                        }}
                                    >
                                        Bài viết
                                    </span> */}
                                    {searchResult.data.posts.map((post, i) => (
                                        <Post>{post}</Post>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default Search;
