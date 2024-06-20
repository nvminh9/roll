import Header from '~/components/Layouts/components/Header';
import LeftContainer from '~/components/Layouts/components/LeftContainer';
import RightContainer from '~/components/Layouts/components/RightContainer';
import MiddleContainer from '../components/MiddleContainer';
import StoryActive from '../components/StoryActive';
import ImageActive from '../components/ImageActive';

function DefaultLayout({ children }) {
    return (
        <>
            <Header>{children}</Header>
            <div className="row container">
                <LeftContainer></LeftContainer>
                {/* middleContainer */}
                <MiddleContainer>{children}</MiddleContainer>
                {/* <div className="content">{children}</div> */}
                <RightContainer></RightContainer>
                <StoryActive></StoryActive>
                <ImageActive></ImageActive>
            </div>
        </>
    );
}

export default DefaultLayout;
