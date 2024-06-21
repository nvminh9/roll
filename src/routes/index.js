// import { HeaderOnly } from '~/components/Layouts';
//
import NewFeed from '~/pages/NewFeed';
import NotiPage from '~/pages/NotiPage';
import Message from '~/pages/Message';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import SettingPage from '~/pages/SettingPage';
import Login from '~/components/Login';
import Register from '~/components/Register';
import Unauthorized from '~/pages/Unauthorized';
import { HeaderOnly } from '~/components/Layouts';

// routes cho user không cần đăng nhập {...}
// public routes
const publicRoutes = [
    { path: '/', component: Login, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '*', component: Unauthorized, layout: null },
];

// routes cho user cần đăng nhập {path: đường dẫn, component: React Component sẽ trả về, layout*: Layout sử dụng}
// *layout:
/*
    - mặc định không truyền vào thì sẽ sử dụng Layout mặc định (có đầy đủ Header, LeftContainer, RightContainer)
    - null: là ko sử dụng layout nào
    - HeaderOnly: là layout chỉ có phần Header
*/
// protect routes
const privateRoutes = [
    //
    { path: '/', component: NewFeed },
    { path: '/profile', component: Profile },
    { path: '/notification', component: NotiPage },
    { path: '/search', component: Search },
    { path: '/message', component: Message },
    { path: '/setting', component: SettingPage },
    //
    { path: '/unauthorized', component: Unauthorized },
];

export { publicRoutes, privateRoutes };
