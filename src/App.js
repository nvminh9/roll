import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layouts';

function App() {
    return (
        <Router>
            <div className="App">
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
