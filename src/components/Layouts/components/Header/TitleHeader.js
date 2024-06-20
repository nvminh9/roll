function TitleHeader({ children }) {
    if (children.type.name === 'Profile') {
        return 'Trang cá nhân';
    }
    if (children.type.name === 'NewFeed') {
        return 'Bảng tin';
    }
    if (children.type.name === 'Message') {
        return 'Nhắn tin';
    }
    if (children.type.name === 'NotiPage') {
        return 'Thông báo';
    }
    if (children.type.name === 'Search') {
        return 'Tìm kiếm';
    }
    if (children.type.name === 'SettingPage') {
        return 'Cài đặt';
    }
}

export default TitleHeader;
