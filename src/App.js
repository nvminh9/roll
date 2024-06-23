import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from '~/components/Layouts';
import { Admin, Message, Missing, NewFeed, NotiPage, Profile, Search, SettingPage, Unauthorized } from '~/pages';
import Login from './components/Login';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';

const ROLES = {
    Admin: '5150',
    User: '2001',
    Editor: '1984',
};

function App() {
    return (
        <Routes>
            {/* public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/* catch all */}
            <Route path="*" element={<Missing />} />
            {/*  */}
            {/* route with Layout mặc định */}
            <Route path="/" element={<DefaultLayout />}>
                {/* we want to protect these routes */}
                <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                    <Route path="/" element={<NewFeed />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/notification" element={<NotiPage />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/message" element={<Message />} />
                    <Route path="/setting" element={<SettingPage />} />
                </Route>
                {/*  */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                    <Route path="/admin" element={<Admin />} />
                </Route>
                {/* end protect routes */}
            </Route>
        </Routes>
    );
}

export default App;
