import { useEffect, useState } from 'react';
import axios from '~/api/axios';
import User from '../User';

function PostComment({ children }) {
    const [comments, setComments] = useState();
    // Lấy Comment của Bài viết
    useEffect(() => {}, []);

    return (
        <>
            {children.comments.length > 0 ? (
                <>
                    {children.comments.map((comment) => (
                        <>
                            <div className="comment">
                                <User>{comment}</User>
                                <div className="commentContent">
                                    <span style={{ color: 'whitesmoke' }}>{comment.content}</span>
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
                        <h1 style={{ color: 'whitesmoke', fontSize: '14px', fontWeight: '300' }}>
                            Chưa có bình luận nào
                        </h1>
                    </div>
                </>
            )}
        </>
    );
}

export default PostComment;
