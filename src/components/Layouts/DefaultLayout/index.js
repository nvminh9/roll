import Header from '~/components/Layouts/components/Header';
import LeftContainer from './LeftContainer';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <LeftContainer />
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
