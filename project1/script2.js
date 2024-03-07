let logOutButton = document.querySelector("#logOut");
let newPostButton = document.querySelector("#submitPost");
let sortPostsButton = document.querySelector("#sort");
let newPostContent = document.querySelector("#newPostBox");
let feedList = document.querySelector(".feedItems");
let emptyPostError = document.querySelector("#emptyPost");
let postAtTop = true;
let allLikeButtons = [];

//functions
function logOut () {
    logOutButton.addEventListener("click", function () {
        window.location.href = "index.html";
    });
}

function sortPosts() {
    sortPostsButton.addEventListener("click", function () {
        let posts = document.querySelectorAll(".singlePost");

        if (sortPostsButton.innerHTML === "Newest First") {
            sortPostsButton.innerHTML = "Oldest First";
        } else {
            sortPostsButton.innerHTML = "Newest First";
        }

        postAtTop = !postAtTop;
        posts.reverse;
        feedList.innerHTML = "";
        posts.forEach(element => {
            feedList.insertAdjacentHTML("afterbegin", '<div class = "singlePost">' + element.innerHTML + '</div>');
        });
    });
}

function createPost() {
    newPostButton.addEventListener("click", function () {
        if (newPostContent.value !== "") {
            let topOrBottom;

            if (postAtTop === true) {
                topOrBottom = 'afterbegin';
            } else {
                topOrBottom = 'beforeend';
            }

            feedList.insertAdjacentHTML(topOrBottom, `<div class="singlePost">` + newPostContent.value + `<br><br><button class="Like">Like<div class="likeCounter">0</div></button><hr></div>`);

            allLikeButtons = [];

            for (let i = 0; (feedList.childNodes).length > i; i++) {
                allLikeButtons.push(feedList.childNodes[i]);

                allLikeButtons[i].addEventListener("click", function () {
                    let likeNumber = parseInt(allLikeButtons[i].querySelector(".likeCounter").innerHTML);
                    console.log(likeNumber);
                    allLikeButtons[i].querySelector(".likeCounter").innerHTML = likeNumber + 1;
                });
            }

            newPostContent.value = "";
            emptyPostError.style.display = "none";
        } else {
            emptyPostError.style.display = "flex";
        }
    });
}

//runtime Space
logOut();
createPost();
sortPosts();