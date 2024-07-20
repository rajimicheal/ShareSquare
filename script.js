let posts = JSON.parse(localStorage.getItem('posts')) || [];

function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    document.getElementById('login').style.display = 'none';
    document.getElementById('postForm').style.display = 'block';
}

function post() {
    const text = document.getElementById('text').value;
    const image = document.getElementById('image').files[0];
    if (!text && !image) {
        alert("Please add text or an image.");
        return;
    }

    if (image) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newPost = {
                id: posts.length,
                text: text,
                image: e.target.result,
                likes: 0
            };
            posts.unshift(newPost);
            updatePosts();
            savePosts();
            clearForm();
        };
        reader.readAsDataURL(image);
    } else {
        const newPost = {
            id: posts.length,
            text: text,
            image: null,
            likes: 0
        };
        posts.unshift(newPost);
        updatePosts();
        savePosts();
        clearForm();
    }
}

function clearForm() {
    document.getElementById('text').value = '';
    document.getElementById('image').value = '';
}

function updatePosts() {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <p>${post.text}</p>
            ${post.image ? `<img src="${post.image}" alt="Post Image">` : ''}
            <button onclick="like(${post.id})">Like (${post.likes})</button>
        `;
        postsDiv.appendChild(postDiv);
    });
}

function like(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        updatePosts();
        savePosts();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    if (email && password) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('postForm').style.display = 'block';
    }
    updatePosts();
});
