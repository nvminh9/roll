// --------------------*** BUTTON MOVE SLIDE POST IMAGES ***---------------------
// tất cả các slide hình của các bài viết đã được load...
const postImages = document.getElementsByClassName('postImages');
// nút di chuyển slide hình qua trái
const btnLeftPostImages = document.getElementsByClassName('btnLeftPostImages');
// nút di chuyển slide hình qua phải
const btnRightPostImages = document.getElementsByClassName('btnRightPostImages');
//
for (let i = 0; i < postImages.length; i++) {
    btnLeftPostImages[i].addEventListener('click', function (e) {
        postImages[i].scrollLeft = postImages[i].scrollLeft - 350;
    });
    btnRightPostImages[i].addEventListener('click', function (e) {
        postImages[i].scrollLeft = postImages[i].scrollLeft + 350;
    });
}
// ------------------------------------------------------------------------------
