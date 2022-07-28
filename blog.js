/**
 * @typedef {{
 *  title: string,
 *  date: string,
 *  summary: string
 * }} Post
 */

/*
    BUTTONS
*/

export function submit() {
    let addForm = document.getElementById('addForm');
    addForm.addEventListener('submit', function(e){
        
    })
}

export const examplePost = {
    "title": "TEST POST TITLE",
    "date": "04/04/2004",
    "summary": "TEST POST SUMMARY"
};

export function randomID() {
    return crypto.randomUUID();
}

/*
    STORAGE
*/

//Updates the 'posts' key with the database array.
function storePosts(posts) {
    localStorage.setItem("posts", JSON.stringify(posts));
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
export function updatePost(post, postID) {
    let posts = loadPosts();
    posts[postID] = post;
    storePosts(posts);
}
// Deletes a post object.
export function deletePost(postID) {
    let posts = loadPosts();
    delete posts[postID];               // MAY NEED FIX BC WE USING ARRAYS
    storePosts[posts];
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
    return postEl;
}

export function redisplayPost(post, container) {
    let postEl = renderPost(post);
    container.appendChild(postEl);
}

export function redisplayAllPosts(container) {
    let posts = loadPosts();
    for (let post of posts) {
        redisplayPost(post, container);
    }
}