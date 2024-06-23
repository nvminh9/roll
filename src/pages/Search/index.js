import { useEffect } from 'react';

function Search() {
    useEffect(() => {
        document.getElementById('headerTitleID').innerText = 'Tìm kiếm';
    }, []);

    return (
        <>
            {/* <!-- Phần Giao diện trang tìm kiếm --> */}
            <div className="row profileContainer">Search</div>
        </>
    );
}

export default Search;
