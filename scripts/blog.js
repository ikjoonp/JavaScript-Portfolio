/**
 * @typedef {{
 *  title: string,
 *  date: string,
 *  summary: string
 * }} Post
 */

/*
    STORAGE
*/

//Updates the 'posts' key with the database array.
function storePosts(posts) {
    localStorage.setItem("posts", JSON.stringify(posts));
    reload();
}
//Returns an array of the database.
export function loadPosts() {
    return JSON.parse(localStorage.getItem("posts") || "[]");
}

/*
    CRUD
*/
// Adds the post object to the array and adds it to local storage.
export function createPost(post) {
    let posts = loadPosts();
    posts.push(post);
    storePosts(posts);
}
// Replaces the post object with the new one.
export function updatePost(post) {
    let posts = loadPosts();
    posts[postID] = post;
    storePosts(posts);
}
// Deletes a post object.
export function deletePost(title) {
    let postContainer = document.getElementById('posts');
    let posts = loadPosts();
    const indexOfObject = posts.findIndex(object => {
        return object.title === title;
    });
    posts.splice(indexOfObject, 1);
    storePosts(posts);
    redisplayAllPosts(postContainer);
    reload();
}

export function countPosts() {
    let posts = loadPosts();
    return posts.length;
}

export function renderPost(post) {
    let template = document.getElementById("blogpost-template");
    let postEl = template.content.cloneNode(true);
    let titleH2 = postEl.querySelector('post-title > h2');
    titleH2.textContent = post.title;
    let postDate = postEl.querySelector('post-title > p');
    postDate.textContent = post.date;
    let postSummary = postEl.querySelector('post-summary > p');
    postSummary.textContent = post.summary;
    let postEditBtn = postEl.querySelector('.editPostBtn');
    postEditBtn.setAttribute('data-title', post.title);
    postEditBtn.setAttribute('data-date', post.date);
    postEditBtn.setAttribute('data-summary', post.summary);
    return postEl;
}

export function redisplayAllPosts(container) {
    let posts = loadPosts();
    let postContainer = document.getElementById('posts');
    postContainer.innerHTML = '';

    for (let post of posts) {
        let postEl = renderPost(post);
        container.appendChild(postEl);
    }
}

document.addEventListener('DOMContentLoaded', function(e){
    hide();
    let postContainer = document.getElementById('posts');
    let editPostForm = document.getElementById('editPostForm');
    let addPostForm = document.getElementById('insert-post-form');
    let addPostBtn = document.getElementById('addPostBtn');
    redisplayAllPosts(postContainer);

    addPostBtn.addEventListener('click', function(e){
        addPostForm.style.display = 'block';
        editPostForm.style.display = 'hide';
    });
    addPostForm.addEventListener('submit', function(e){
        e.preventDefault();
        let postTitle = document.getElementById('postTitle').value;
        let postDate = document.getElementById('postDate').value;
        let postSummary = document.getElementById('postSummary').value;
        let post = {
            title: postTitle,
            date : postDate,
            summary : postSummary
        }
        createPost(post);
        redisplayAllPosts(postContainer);
        reload();
        hide();
    });

    var chosenEditTitle;
    let editBtns = document.querySelectorAll('.editPostBtn');
    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener('click', function(e) {
            editPostForm.style.display = "block";
            addPostForm.style.display = 'none';
            chosenEditTitle = editBtns[i].getAttribute('data-title');
            console.log("The chosenEditTitle is", chosenEditTitle);
            document.getElementById('postEditTitle').value = editBtns[i].getAttribute('data-title');
            document.getElementById('postEditDate').value = editBtns[i].getAttribute('data-date');
            document.getElementById('postEditSummary').value = editBtns[i].getAttribute('data-summary');
        });
    }
    editPostForm.addEventListener('submit', function(e){
        e.preventDefault();
        let postTitle = document.getElementById('postEditTitle').value;
        let postDate = document.getElementById('postEditDate').value;
        let postSummary = document.getElementById('postEditSummary').value;
        let post = {
            title: postTitle,
            date : postDate,
            summary : postSummary
        }
        deletePost(chosenEditTitle)
        createPost(post);
        redisplayAllPosts(postContainer);
        reload();
        hide();
    });

    let deleteBtns = document.querySelectorAll('.deletePostBtn');
    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', function(e) {
            editPostForm.style.display = 'none';
            addPostForm.style.display = 'none';
            if (confirm('Would you like to delete this post?')){
                deletePost(editBtns[i].getAttribute('data-title'))
            }
        });
    }
});

function reload() {
    let editPostForm = document.getElementById('editPostForm');
    let addPostForm = document.getElementById('insert-post-form');
    let editBtns = document.querySelectorAll('.editPostBtn');
    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener('click', function(e) {
            editPostForm.style.display = "block";
            addPostForm.style.display = 'none';
            document.getElementById('postEditTitle').value = editBtns[i].getAttribute('data-title');
            document.getElementById('postEditDate').value = editBtns[i].getAttribute('data-date');
            document.getElementById('postEditSummary').value = editBtns[i].getAttribute('data-summary');
        });
    }
    
    let deleteBtns = document.querySelectorAll('.deletePostBtn');
    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', function(e) {
            editPostForm.style.display = 'none';
            addPostForm.style.display = 'none';
            if (confirm('Would you like to delete this post?')){
                deletePost(editBtns[i].getAttribute('data-title'))
            }
        });
    }
}

function hide() {
    let editPostForm = document.getElementById('editPostForm');
    let addPostForm = document.getElementById('insert-post-form');
    editPostForm.style.display = 'none';
    addPostForm.style.display = 'none';
}