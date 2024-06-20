import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layouts';

function App() {
    return (
        <Router>
            <div id="wrapperID" className="grid wide App wrapper">
                <Routes>
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layouts = DefaultLayout;
                        if (route.layout) {
                            Layouts = route.layout;
                        } else if (route.layout === null) {
                            Layouts = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    // Layout mặc định sẽ là DefaultLayout hoặc layout khác,
                                    // còn Page truyền vào sẽ là children của Layout
                                    <Layouts>
                                        <Page />
                                    </Layouts>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
