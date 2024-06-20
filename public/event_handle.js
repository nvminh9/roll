window.onload = function () {
    const middleCtn = document.getElementById('middleContainerID');
    const leftCtn = document.getElementById('leftContainerID');

    // ---------------*** HIDE HEADER BAR WHEN SCROLL ***------------------
    var prevScrollpos = middleCtn.scrollTop;
    middleCtn.onscroll = function () {
        var currentScrollPos = middleCtn.scrollTop;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById('headerContainerID').style.top = '0';
            document.getElementById('leftContainerID').style.top = '0';
            document.getElementById('rightContainerID').style.top = '0';
            window.scrollTo(0, 0);
            prevScrollpos = currentScrollPos;
        } else if (currentScrollPos > prevScrollpos + 60) {
            document.getElementById('headerContainerID').style.top = '-70px';
            document.getElementById('leftContainerID').style.top = '-70px';
            document.getElementById('rightContainerID').style.top = '-60px';
            window.scrollTo(0, 1);
            prevScrollpos = currentScrollPos;
        }
    };
    // ------------------------------------------------------------------------------
    // ----------------------------------*** EXPAND MEMU ***-------------------------------------
    var checkExpandMenu = false;
    const btnExpandMenu = document.getElementById('btnExpandMenuID');

    // query DOM

    const expandMenu = () => {
        leftCtn.className = 'col l-2 m-12 c-12 leftContainer';
        middleCtn.className = 'col l-7 m-0 c-0 middleContainer';
        checkExpandMenu = true;
        // console.log('Mở Menu')
    };

    const closeMenu = () => {
        leftCtn.className = 'col l-2 m-0 c-0 leftContainer';
        middleCtn.className = 'col l-7 m-12 c-12 middleContainer';
        checkExpandMenu = false;
        // console.log('Đóng Menu')
    };

    btnExpandMenu.addEventListener('click', () => {
        // kiểm tra xem menu đang đóng hay mở và thực hiện hành động ngược lại
        if (checkExpandMenu === false) {
            expandMenu();
        } else {
            closeMenu();
        }
    });
    // ------------------------------------------------------------------------------------------
};
