import { HeaderOnly } from '~/components/Layouts';
//
import Home from '~/pages/Home';
import Message from '~/pages/Message';
import Profile from '~/pages/Profile';

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
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/message', component: Message, layout: HeaderOnly },
];

export { publicRoutes, privateRoutes };
