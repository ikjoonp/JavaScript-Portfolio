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
// Pushes the post object to the array and adds it to local storage.
export function createPost(post) {
    let posts = loadPosts();
    posts.push(post);
    storePosts(posts);
}
// Didn't use this function but will probably add in future for clarity
// export function updatePost(post) {
//     let posts = loadPosts();
//     posts[postID] = post;
//     storePosts(posts);
// }

// Deletes a post object by removing the object with its title and redisplaying.
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

// Returns the number of posts in case we must re-populate with sample posts.
export function countPosts() {
    let posts = loadPosts();
    return posts.length;
}

// Renders a single post, largely from discussion.
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
    // bury information within custom tags for use in delete/edit
    postEditBtn.setAttribute('data-title', post.title);
    postEditBtn.setAttribute('data-date', post.date);
    postEditBtn.setAttribute('data-summary', post.summary);
    return postEl;
}

// Displays all posts via renderPost. Largely from discussion.
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
    let cancelAddBtn = document.getElementById('cancelAdd');
    redisplayAllPosts(postContainer);

    /*
        Events for ADD operations
    */
    // Hide edit and show add forms when add button is clicked.
    addPostBtn.addEventListener('click', function(e){
        addPostForm.style.display = 'block';
        editPostForm.style.display = 'hide';
    });
    // Create and display a post object.
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
    // Hides both edit and add forms when add operation is cancelled.
    cancelAddBtn.addEventListener('click',function(e) {
        hide();
    });

    /*
        Events for EDIT operations
    */
    // Repopulates the edit form with the chosen post contents.
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
    // Deletes the chosen post and re-adds it with edits.
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

    /*
        Event for DELETE operation
    */
   // Deletes post via alert on chosen post.
    let deleteBtns = document.querySelectorAll('.deletePostBtn');
    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', function(e) {
            hide();
            if (confirm('Would you like to delete this post?')){
                deletePost(editBtns[i].getAttribute('data-title'))
            }
        });
    }
});

// Reassigns the eventListeners after an edit/delete/operation
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

// Hides both the edit and add forms.
function hide() {
    let editPostForm = document.getElementById('editPostForm');
    let addPostForm = document.getElementById('insert-post-form');
    editPostForm.style.display = 'none';
    addPostForm.style.display = 'none';
}