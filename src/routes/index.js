// import { HeaderOnly } from '~/components/Layouts';
//
import NewFeed from '~/pages/NewFeed';
import NotiPage from '~/pages/NotiPage';
import Message from '~/pages/Message';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import SettingPage from '~/pages/SettingPage';

// routes cho user không cần đăng nhập {...}
const publicRoutes = [];

// routes cho user cần đăng nhập {path: đường dẫn, component: React Component sẽ trả về, layout*: Layout sử dụng}
// *layout:
/*
    - mặc định không truyền vào thì sẽ sử dụng Layout mặc định (có đầy đủ Header, LeftContainer, RightContainer)
    - null: là ko sử dụng layout nào
    - HeaderOnly: là layout chỉ có phần Header
*/
const privateRoutes = [
    { path: '/', component: NewFeed },
    { path: '/profile', component: Profile },
    { path: '/notification', component: NotiPage },
    { path: '/search', component: Search },
    { path: '/message', component: Message },
    { path: '/setting', component: SettingPage },
];

export { publicRoutes, privateRoutes };
