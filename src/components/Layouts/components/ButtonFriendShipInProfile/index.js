import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '~/api/axios';

function ButtonFriendShipInProfile({ usListRequestFriend, myListRequestFriend, children }) {
    // id_User của lc (id_User người đang đăng nhập)
    const lcIdUser = localStorage.getItem('rAct_I').slice(0, -14);
    // id_User của params của Route truyền vào
    let { id_User } = useParams();

    //
    // hàm check đã là bạn chưa
    const checkIsFriend = (e) => {
        //

        children?.data?.friends.length
            ? //
              children.data.friends.map((friend) => {
                  if (friend.id_User + '' === lcIdUser && friend.id_friend + '' === id_User) {
                      document.getElementById(`${id_User}`).innerText = 'Hủy kết bạn';
                      // document.getElementById(`${id_User}`).style = 'color: #db0a0a;';
                      return 'Hủy kết bạn';
                  } else if (friend.id_friend + '' === lcIdUser && friend.id_User + '' === id_User) {
                      document.getElementById(`${id_User}`).innerText = 'Hủy kết bạn';
                      return 'Hủy kết bạn';
                  } else if (myListRequestFriend.data.length > 0) {
                      myListRequestFriend.data.map((friend) => {
                          if (friend.id + '' === id_User) {
                              document.getElementById(`${id_User}`).innerText = 'Đã gửi lời mời kết bạn';
                              {
                                  /* document.getElementById(`${id_User}`).style = 'color: #db0a0a;'; */
                              }
                              return 'Đã gửi lời mời kết bạn';
                          } else {
                              usListRequestFriend.data.map((friend) => {
                                  if (friend.id + '' === id_User) {
                                      document.getElementById(`${id_User}`).innerText = 'Xác nhận lời mời kết bạn';
                                      {
                                          /* document.getElementById(`${id_User}`).style = 'color: #db0a0a;'; */
                                      }
                                      return 'Xác nhận lời mời kết bạn';
                                  }
                              });
                          }
                      });
                      //
                      // document.getElementById(`${id_User}`).innerText = 'Kết bạn';
                      // return 'Kết bạn';
                  } else if (usListRequestFriend.data.length > 0) {
                      usListRequestFriend.data.map((friend) => {
                          if (friend.id + '' === id_User) {
                              document.getElementById(`${id_User}`).innerText = 'Xác nhận lời mời kết bạn';
                              {
                                  /* document.getElementById(`${id_User}`).style = 'color: #db0a0a;'; */
                              }
                              return 'Xác nhận lời mời kết bạn';
                          } else {
                              myListRequestFriend.data.map((friend) => {
                                  if (friend.id + '' === id_User) {
                                      document.getElementById(`${id_User}`).innerText = 'Đã gửi lời mời kết bạn';
                                      {
                                          /* document.getElementById(`${id_User}`).style = 'color: #db0a0a;'; */
                                      }
                                      return 'Đã gửi lời mời kết bạn';
                                  }
                              });
                          }
                      });
                  }
                  // friend.id_User + '' != lcIdUser && friend.id_friend + '' != lcIdUser
              })
            : myListRequestFriend.data.map((friend) => {
                  if (friend.id + '' === id_User) {
                      document.getElementById(`${id_User}`).innerText = 'Đã gửi lời mời kết bạn';
                      {
                          /* document.getElementById(`${id_User}`).style = 'color: #db0a0a;'; */
                      }
                      return 'Đã gửi lời mời kết bạn';
                  } else {
                      usListRequestFriend.data.map((friend) => {
                          if (friend.id + '' === id_User) {
                              document.getElementById(`${id_User}`).innerText = 'Xác nhận lời mời kết bạn';
                              {
                                  /* document.getElementById(`${id_User}`).style = 'color: #db0a0a;'; */
                              }
                              return 'Xác nhận lời mời kết bạn';
                          }
                      });
                  }
              });
    };

    // hàm check List gửi lời mời kb của mình gửi
    const checkMyListFriendRequest = () => {
        //
        myListRequestFriend.data.map((friend) => {
            if (friend.id + '' === id_User) {
                document.getElementById(`${id_User}`).innerText = 'Đã gửi lời mời kết bạn';
                document.getElementById(`${id_User}`).style = 'color: #db0a0a;';
                return 'Đã gửi lời mời kết bạn';
            }
        });
        //
    };
    // hàm check List gửi lời mời kb của người khác gửi
    const checkUsListFriendRequest = () => {
        //
        usListRequestFriend.data.map((friend) => {
            if (friend.id + '' === id_User) {
                document.getElementById(`${id_User}`).innerText = 'Xác nhận lời mời kết bạn';
                document.getElementById(`${id_User}`).style = 'color: #db0a0a;';
                return 'Xác nhận lời mời kết bạn';
            }
        });
        //
    };

    useEffect(() => {
        // Khi Render Profile check trường hợp để trả về nút friendship tương ứng
        checkIsFriend();
        //
    }, [id_User]);

    return;
}

export default ButtonFriendShipInProfile;
