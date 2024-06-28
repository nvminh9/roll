import Header from '~/components/Layouts/components/Header';
import LeftContainer from '~/components/Layouts/components/LeftContainer';
import RightContainer from '~/components/Layouts/components/RightContainer';
import MiddleContainer from '../components/MiddleContainer';
import StoryActive from '../components/StoryActive';
import ImageActive from '../components/ImageActive';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
    useEffect(() => {
        document.title = 'Roll';
        // hide HeaderBar khi cuộn
        let middleCtn = document.getElementById('middleContainerID');
        let rightCtn = document.getElementById('rightContainerID');
        var prevScrollpos = middleCtn.scrollTop;
        // middleCtn.onscroll = function () {
        //     var currentScrollPos = middleCtn.scrollTop;
        //     if (prevScrollpos > currentScrollPos) {
        //         document.getElementById('headerContainerID').style.top = '0';
        //         document.getElementById('leftContainerID').style.top = '0';
        //         document.getElementById('rightContainerID').style.top = '0';
        //         window.scrollTo(0, 0);
        //         prevScrollpos = currentScrollPos;
        //     } else if (currentScrollPos > prevScrollpos + 60) {
        //         document.getElementById('headerContainerID').style.top = '-70px';
        //         document.getElementById('leftContainerID').style.top = '-70px';
        //         document.getElementById('rightContainerID').style.top = '-60px';
        //         window.scrollTo(0, 1);
        //         prevScrollpos = currentScrollPos;
        //     }
        // };
        //
        // menu mở rộng trên Điện thoại
        var checkExpandMenu = false;
        if (document.getElementById('leftContainerID')) {
            const leftCtn = document.getElementById('leftContainerID');
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

            if (document.getElementById('btnExpandMenuID')) {
                const btnExpandMenu = document.getElementById('btnExpandMenuID');
                btnExpandMenu.addEventListener('click', () => {
                    // kiểm tra xem menu đang đóng hay mở và thực hiện hành động ngược lại
                    if (checkExpandMenu === false) {
                        expandMenu();
                    } else {
                        closeMenu();
                    }
                });
            }
        }
        // -------------------------*** Expand Storie Trên Mobile ***--------------------
        const btnExpandStory = document.getElementById('btnExpandStory');
        var checkExpandStory = false;

        const expandStoryContainer = () => {
            middleCtn.className = 'col l-7 m-0 c-0 middleContainer';
            rightCtn.className = 'col l-3 m-12 c-12 rightContainer';
            checkExpandStory = true;
            // console.log('Mở Menu')
        };

        const closeStoryContainer = () => {
            middleCtn.className = 'col l-7 m-12 c-12 middleContainer';
            rightCtn.className = 'col l-3 m-0 c-0 rightContainer';
            checkExpandStory = false;
            // console.log('Đóng Menu')
        };

        btnExpandStory.addEventListener('click', () => {
            // kiểm tra xem menu đang đóng hay mở và thực hiện hành động ngược lại
            if (checkExpandStory === false) {
                expandStoryContainer();
            } else {
                closeStoryContainer();
            }
        });
        // ------------------------------------------------------------------------------------------
    });
    //
    //

    return (
        <>
            <Header></Header>
            <div className="row container" style={{ margin: '0px' }}>
                <LeftContainer></LeftContainer>
                <MiddleContainer>
                    <Outlet />
                </MiddleContainer>
                <RightContainer></RightContainer>
                <StoryActive></StoryActive>
                <ImageActive></ImageActive>
            </div>
        </>
    );
};

export default DefaultLayout;
