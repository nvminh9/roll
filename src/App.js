import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, redirect } from 'react-router-dom';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layouts';
import useAuth from './hooks/useAuth';
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';

const ROLES = {
    User: 1,
    Admin: 0,
};

function App() {
    const { auth } = useAuth();

    console.log('Authed Role :', auth?.roles);
    console.log('Authed access_token :', auth?.accessToken);
    console.log('Authed User :', auth?.user);

    if (auth?.user && auth?.roles == 1) {
        return (
            <Router>
                <div id="wrapperID" className="grid wide App wrapper">
                    <Routes>
                        {privateRoutes.map((route, index) => {
                            // Page sẽ nhận về một component tùy theo đường dẫn
                            const Page = route.component;
                            // mặc định Layouts là DefaultLayout nếu layout ko đc truyền vào
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
    } else if (auth?.user && auth?.roles == 0) {
        return <h1>Admin</h1>;
    } else if (auth?.user) {
        return <h1>Unauthorized</h1>;
    } else {
        return (
            <Router>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        // Page sẽ nhận về một component tùy theo đường dẫn
                        const Page = route.component;
                        // mặc định Layouts là DefaultLayout nếu layout ko đc truyền vào
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
            </Router>
        );
    }
}

export default App;
