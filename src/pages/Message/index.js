import { useEffect } from 'react';

function Message() {
    useEffect(() => {
        document.getElementById('headerTitleID').innerText = 'Nhắn tin';
    }, []);

    return (
        <>
            {/* <!-- Phần Giao diện trang tìm kiếm --> */}
            <div className="row profileContainer">Phần nhắn tin</div>
        </>
    );
}

export default Message;
