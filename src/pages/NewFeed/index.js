import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '~/api/axios';
import useAuth from '~/hooks/useAuth';
import Post from '~/components/Layouts/components/Post';
import move_slide from './move_slide.js';

const NEWFEEDS_URL = '/api/post';

const NewFeed = () => {
    const [posts, setPosts] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    //
    // const { auth } = useAuth();
    //
    // Lấy Bài viết
    useEffect(() => {
        // Đặt tiêu đề của Header
        document.getElementById('headerTitleID').innerText = 'Bảng tin';
        //
        let isMounted = true;
        const access_token = localStorage.getItem('rAct_T').slice(0, -14);

        const getPosts = async () => {
            try {
                const response = await axios.get(NEWFEEDS_URL, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    },
                });
                //
                //
                // console.log(response.data);
                isMounted && setPosts(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        };

        getPosts();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>
            {posts?.data.length ? (
                <>
                    {posts.data.map((post) => (
                        <Post key={post.id}>{post}</Post>
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
};

export default NewFeed;
